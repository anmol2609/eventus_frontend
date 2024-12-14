/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  CRow,
  CCol,
  CButton,
  CTooltip,
  CCard,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { CONSTANTS } from '../../utils/constants'
import SelectBox from '../../components/Form/SelectBox'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import {
  clearErrors,
  updateFeedEntry,
} from '../../slices/feedEntry/UpdateFeedEntrySlice'
import {
  updateFeedEntryByCurrentValue,
} from '../../slices/feedEntry/UpdateFeedEntryByCurrentValueSlice'
import {
  getFeedEntry
} from '../../slices/feedEntry/GetFeedEntrySlice'
import TextArea from '../../components/Form/TextArea'
import TextInput from '../../components/Form/TextInput'
import { Colors } from '../../utils/colors'
import CIcon from '@coreui/icons-react'
import { cilCheckAlt, cilCopy } from '@coreui/icons'
import '../index.css'
import Alert from '../../components/Alerts/Alert'
import { getArtifactByFeedEntry } from '../../slices/Artifact/GetAllArtifactsSlice'
import { testArtifact } from '../../slices/Artifact/TestArtifactSlice'
import { updateArtifact } from '../../slices/Artifact/UpdateArtifactSlice'
import { AppRightSidebar } from '../../components'
import { toggleRightSidebar } from '../../slices/ThemeSlice'
import LockIcon from '../../assets/images/padlock.png'
import deleteIcon from '../../assets/images/deleteIcon.svg'
import { getAllTags } from '../../slices/tags/Tagsslice'
import { getAllMitre } from '../../slices/mitre/GetAllMitreSlice'
import { cilPlus } from '@coreui/icons'
import { updateMlModel } from '../../slices/mlModel/UpdateMlModelSlice'
import { getMlModel } from '../../slices/mlModel/GetMlModelSlice'

export default function ViewFeedEntryAndArtifacts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const tagRef = useRef([])
  const valueRef = useRef([])
  const contentRef = useRef([])
  const updatedValueRef = useRef([])

  const tacticRef = useRef([])
  const techniqueIdRef = useRef([])
  const techniqueRef = useRef([])

  const [searchParams] = useSearchParams()
  const { feed_entry, loading: feed_entry_loading } = useSelector((state) => state.feed_entry)
  const { error, isUpdated, loading, success } = useSelector((state) => state.update_feed_entry)
  const { artifacts } = useSelector((state) => state.artifacts)
  const { isUpdated: artifact_updated, loading: artifact_update_loading } = useSelector(
    (state) => state.update_artifact,
  )
  const {
    data: test_artifacts_data,
    loading: test_artifacts_data_loading,
    success: test_artifacts_success,
  } = useSelector((state) => state.test_artifacts)
  const { tags } = useSelector((state) => state.all_tags)
  const { mitre } = useSelector((state) => state.all_mitre)
  const { model } = useSelector((state) => state.ml_model)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)
  const { id } = useParams()

  let initial_state = {
    title: '',
    link: '',
    feed_id: '',
    rss_feed: '',
    published: '',
    summary: '',
    scraped_content: '',
    feedback: '',
    content: '',
    rating: null,
    response: null,
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [selectedView, setSelectedView] = useState(0)
  const [copyContent, _] = useState('Copy')
  const [severity, setSeverity] = useState(
    'Non consequat quis qui laborum tempor velit do pariatur irure quis qui. Enim aute veniam est ipsum cillum labore ad adipisicing dolor laboris deserunt. Ex do exercitation enim commodo aliqua sunt sit aute anim eu elit commodo fugiat commodo. Magna sunt exercitation incididunt consequat fugiat enim mollit irure eu deserunt culpa eiusmod. Ex consectetur sint enim culpa ipsum sunt aliquip. Et enim excepteur id exercitation pariatur laborum aute consequat nulla et elit sunt magna.',
  )
  const [severityLevel, setSeverityLevel] = useState()
  const [selectedArtifacts, setSelectedArtifacts] = useState({})
  const [artifactsToTest, setArtifactsToTest] = useState({})
  const [artifactStatus, setArtifactStatus] = useState('')
  const [selectAll, setSelectAll] = useState(false)
  const [newTags, setNewTags] = useState(tags)
  const [newMitre, setNewMitre] = useState(mitre)
  const [updatedSummary, setUpdatedSummary] = useState('')

  useEffect(() => {
    dispatch(toggleRightSidebar(false))
    dispatch(getFeedEntry(id))
    dispatch(getArtifactByFeedEntry(id))
    dispatch(testArtifact([]))
  }, [])

  useEffect(() => {
    if (isUpdated) {
      dispatch(clearErrors())
      dispatch(toggleRightSidebar(false))
      navigate('/feed_entry')
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearErrors())
      }, 2000)
    }

    if (artifact_updated) dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }, [dispatch, isUpdated, artifact_updated, error])

  useEffect(() => {
    setNewTags(tags)
  }, [tags])

  useEffect(() => {
    setNewMitre(mitre)
  }, [mitre])

  useEffect(() => {
    if (feed_entry) {
      setUser({
        ...user,
        title: feed_entry.title,
        link: feed_entry.link,
        feed_id: feed_entry.feed_id,
        rss_feed: feed_entry.rss_feed,
        published: feed_entry.published,
        summary: feed_entry.summary,
        scraped_content: feed_entry.scraped_content,
        feedback: feed_entry.feedback,
        content: feed_entry.content,
        rating: feed_entry.rating,
        response: feed_entry.response,
      })
      dispatch(getAllTags(feed_entry.feed_id))
      dispatch(getAllMitre(feed_entry.feed_id))
      dispatch(getMlModel(feed_entry.feed_id))
    }
  }, [feed_entry])

  useEffect(() => {
    let list = {}
    artifacts &&
      artifacts.forEach(function (arrayItem) {
        list[arrayItem._id] = false
      })
    setSelectedArtifacts(list)
  }, [artifacts])

  useEffect(() => {
    if (
      rightSidebarShow.rightSidebarShow !== undefined &&
      test_artifacts_data &&
      test_artifacts_data.length > 0
    ) {
      dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
    }
  }, [test_artifacts_success])

  useEffect(() => {
    setSeverityLevel(model?.severity_level)
    setUpdatedSummary(model?.summary || user?.summary)
  }, [model])

  const test_with_virustotal = () => {
    let x = Object.entries(selectedArtifacts)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key)
    dispatch(testArtifact(x))
  }

  const updateArtifactsStatus = () => {
    for (const artifact_value in artifactsToTest) {
      if (artifactsToTest[artifact_value]) {
        let artifact = artifacts.filter((arti) => arti.value === artifact_value)
        dispatch(updateArtifact(artifact[0]._id, { status: artifactStatus }))
      }
    }
  }

  const submit = () => {
    const excludedKeys = ['summary', 'scraped_content', 'feedback', 'content', 'rating', 'response']
    const validation_keys = Object.keys(user)
      .filter((key) => !excludedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = user[key]
        return obj
      }, {})

    if (validate_required_keys(validation_keys, setValidationError))
      dispatch(updateFeedEntry(id, { ...user, rss_feed: user.rss_feed._id, completed: true }))

    const tagsPayload = {
      field_name: 'tags',
      current_value: [tags],
      new_value: [newTags],
    }
    const mitrePayload = {
      field_name: 'mitre',
      current_value: mitre,
      new_value: newMitre,
    }
    dispatch(updateFeedEntryByCurrentValue(user.feed_id, tagsPayload))
    dispatch(updateFeedEntryByCurrentValue(user.feed_id, mitrePayload))
    dispatch(
      updateMlModel(user.feed_id, { summary: updatedSummary, severity_level: severityLevel }),
    )
  }

  const ShowContent = ({ title, content, isURL, icon, canCopy }) => {
    // setCopyContent('Copy')
    return (
      <div className="d-flex flex-column">
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: 16,
          }}
        >
          <span>{title}&nbsp;:</span>
          {icon ? (
            <CTooltip content={canCopy ? copyContent : null}>
              <CIcon
                icon={icon}
                style={{ height: 18 }}
                className="clickable"
                onClick={() => {
                  if (canCopy) {
                    navigator.clipboard.writeText(content)
                    // setCopyContent('Copied')
                  }
                }}
              />
            </CTooltip>
          ) : null}
        </span>
        {isURL ? (
          <a
            className="link"
            href={content}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 15,
              color: Colors.LINK,
            }}
          >
            {content}
          </a>
        ) : (
          <span
            style={{
              fontSize: 15,
              color: Colors.WHITE_70,
              overflowWrap: 'anywhere',
            }}
          >
            {content}
          </span>
        )}
      </div>
    )
  }

  const SubHeaders = ({ title, index }) => (
    <div style={{ marginRight: 10 }}>
      <div
        onClick={() => setSelectedView(index)}
        className="mx-2 rss-feed-view"
        style={{
          fontSize: 14,
          fontWeight: 300,
          textAlign: 'center',
          color: index === selectedView ? Colors.WHITE : Colors.GRAY,
          paddingBottom: 10,
        }}
      >
        {title}
      </div>
      <div
        style={{
          height: 4,
          width: 76,
          borderTopRightRadius: 100,
          borderTopLeftRadius: 100,
          borderBottom: index === selectedView ? `4px solid ${Colors.BLUE}` : 'none',
        }}
      ></div>
    </div>
  )

  const deleteTagDataCell = (tag, index) => {
    let statuses = newTags[tag].status
    statuses[index] = 'inactive'

    setNewTags((prevState) => ({
      ...prevState,
      [tag]: {
        ...prevState[tag],
        status: statuses,
      },
    }))
  }

  const ShowTags = ({ tag, content, value, updated_value, index, status, tagName }) => (
    <CTable
      responsive
      style={{
        fontWeight: '600',
        fontSize: 14,
        borderCollapse: 'collapse',
      }}
      align="middle"
      className="mb-0"
    >
      <CTableBody>
        {value.map((_, idx) => (
          <CTableRow key={`${tagName}_${idx}`}>
            {idx === 0 ? (
              <CTableDataCell align="middle" className="no-border-table">
                <TextInput
                  type="text"
                  placeholder="Tag"
                  value={tag}
                  refVal={(el) => (tagRef.current[index] = el)}
                  disabled={!(index >= Object.keys(tags).length)}
                  onChange={(e) => {
                    let new_tagName = e.target.value

                    setNewTags((prevState) => {
                      const updatedObject = { ...prevState }

                      updatedObject[new_tagName] = {
                        ...updatedObject[tagName],
                        key: new_tagName,
                      }
                      delete updatedObject[tagName]
                      setTimeout(() => tagRef.current[index].focus(), 0)
                      return updatedObject
                    })
                  }}
                  id="content"
                  bg_color="rgb(26, 26, 26)"
                  disableBottomMargin
                />
              </CTableDataCell>
            ) : (
              <CTableDataCell align="middle" className="no-border-table" />
            )}
            {status[idx] === 'active' ? (
              <>
                <CTableDataCell align="middle" className="no-border-table">
                  <TextInput
                    type="text"
                    refVal={(el) => (valueRef.current[index] = el)}
                    placeholder="Value"
                    value={value[idx]}
                    disabled={!(index >= Object.keys(tags).length)}
                    onChange={(e) => {
                      const new_value = newTags[tagName].value
                      new_value[idx] = e.target.value

                      setNewTags((prevState) => ({
                        ...prevState,
                        [tagName]: {
                          ...prevState[tagName],
                          value: new_value,
                        },
                      }))

                      setTimeout(() => valueRef.current[index].focus(), 0)
                    }}
                    id="value"
                    bg_color="rgb(26, 26, 26)"
                    disableBottomMargin
                  />
                </CTableDataCell>
                <CTableDataCell align="middle" className="no-border-table">
                  <TextInput
                    type="text"
                    placeholder="Content"
                    refVal={(el) => (contentRef.current[index] = el)}
                    value={content[idx]}
                    disabled={!(index >= Object.keys(tags).length)}
                    onChange={(e) => {
                      const new_content = newTags[tagName].content
                      new_content[idx] = e.target.value

                      setNewTags((prevState) => ({
                        ...prevState,
                        [tagName]: {
                          ...prevState[tagName],
                          content: new_content,
                        },
                      }))

                      setTimeout(() => contentRef.current[index].focus(), 0)
                    }}
                    id="content"
                    bg_color="rgb(26, 26, 26)"
                    disableBottomMargin
                  />
                </CTableDataCell>
                <CTableDataCell align="middle" className="no-border-table">
                  <TextInput
                    type="text"
                    placeholder="Updated Value"
                    refVal={(el) => (updatedValueRef.current[index] = el)}
                    value={updated_value[idx]}
                    onChange={(e) => {
                      const new_updated_value = newTags[tagName].updated_value
                      new_updated_value[idx] = e.target.value

                      setNewTags((prevState) => ({
                        ...prevState,
                        [tagName]: {
                          ...prevState[tagName],
                          updated_value: new_updated_value,
                        },
                      }))

                      setTimeout(() => updatedValueRef.current[index].focus(), 0)
                    }}
                    id="updated_value"
                    bg_color="rgb(26, 26, 26)"
                    disableBottomMargin
                  />
                </CTableDataCell>
                <CTableDataCell className="no-border-table">
                  <span className="d-flex align-items-center">
                    <CButton
                      style={{ padding: '2px', color: Colors.RED }}
                      onClick={() => {
                        deleteTagDataCell(tagName, idx)
                      }}
                    >
                      {<img src={deleteIcon} />}
                    </CButton>
                  </span>
                </CTableDataCell>
              </>
            ) : null}
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )

  const ShowIndividualTags = () => (
    <CTable
      responsive
      style={{
        fontWeight: '600',
        fontSize: 14,
        borderCollapse: 'collapse',
      }}
      align="middle"
      className="mb-0"
    >
      <CTableBody>
        {model && model['target_sector'] && (
          <CTableRow key="targeted_sector">
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                value="Target Sector"
                disabled
                id="target_sector"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                value={model['target_sector']}
                disabled
                id="target_sector"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                placeholder="Content"
                onChange={() => {}}
                id="target_sector_content"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                placeholder="Updated Value"
                onChange={() => {}}
                id="target_sector_updated_value"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell className="no-border-table">
              <span className="d-flex align-items-center">
                <CButton style={{ padding: '2px', color: Colors.RED }} onClick={() => {}}>
                  {<img src={deleteIcon} />}
                </CButton>
              </span>
            </CTableDataCell>
          </CTableRow>
        )}

        {model && model['target_region'] && (
          <CTableRow key="target_region">
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                value="Target Region"
                disabled
                id="target_region"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                value={model['target_region']}
                disabled
                id="target_region"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                placeholder="Content"
                onChange={() => {}}
                id="target_region_content"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                placeholder="Updated Value"
                onChange={() => {}}
                id="target_region_updated_value"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell className="no-border-table">
              <span className="d-flex align-items-center">
                <CButton style={{ padding: '2px', color: Colors.RED }} onClick={() => {}}>
                  {<img src={deleteIcon} />}
                </CButton>
              </span>
            </CTableDataCell>
          </CTableRow>
        )}

        {model && model['Threat_Actor_Type'] && (
          <CTableRow key="Threat_Actor_Type">
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                value="Threat Actor Type"
                disabled
                id="Threat_Actor_Type"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                value={model['Threat_Actor_Type']}
                disabled
                id="Threat_Actor_Type"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                placeholder="Content"
                onChange={() => {}}
                id="Threat_Actor_Type_content"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                placeholder="Updated Value"
                onChange={() => {}}
                id="Threat_Actor_Type_updated_value"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell className="no-border-table">
              <span className="d-flex align-items-center">
                <CButton style={{ padding: '2px', color: Colors.RED }} onClick={() => {}}>
                  {<img src={deleteIcon} />}
                </CButton>
              </span>
            </CTableDataCell>
          </CTableRow>
        )}

        {model && model['Threat_Actor_Region'] && (
          <CTableRow key="Threat_Actor_Region">
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                value="Threat Actor Region"
                disabled
                id="Threat_Actor_Region"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                value={model['Threat_Actor_Region']}
                disabled
                id="Threat_Actor_Region"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                placeholder="Content"
                onChange={() => {}}
                id="Threat_Actor_Region_content"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                placeholder="Updated Value"
                onChange={() => {}}
                id="Threat_Actor_Region_updated_value"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell className="no-border-table">
              <span className="d-flex align-items-center">
                <CButton style={{ padding: '2px', color: Colors.RED }} onClick={() => {}}>
                  {<img src={deleteIcon} />}
                </CButton>
              </span>
            </CTableDataCell>
          </CTableRow>
        )}

        {model && model['threat_type'] && (
          <CTableRow key="threat_type">
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                value="Threat Type"
                disabled
                id="threat_type"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                value={model['threat_type']}
                disabled
                id="threat_type"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                placeholder="Content"
                onChange={() => {}}
                id="Threat_Type_content"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell align="middle" className="no-border-table">
              <TextInput
                type="text"
                placeholder="Updated Value"
                onChange={() => {}}
                id="Threat_Type_updated_value"
                bg_color="rgb(26, 26, 26)"
                disableBottomMargin
              />
            </CTableDataCell>
            <CTableDataCell className="no-border-table">
              <span className="d-flex align-items-center">
                <CButton style={{ padding: '2px', color: Colors.RED }} onClick={() => {}}>
                  {<img src={deleteIcon} />}
                </CButton>
              </span>
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  )

  const addTagRowSet = () => {
    setNewTags({
      ...newTags,
      '': {
        content: [''],
        value: [''],
        updated_value: [''],
        key: '',
        status: ['active'],
      },
    })
  }

  const addMitreRowSet = () => {
    setNewMitre([...newMitre, '--'])
  }

  const deleteMitreDataCell = (index) => {
    const updatedMitre = newMitre.filter((_, idx) => idx !== index)
    setNewMitre(updatedMitre)
  }

  const ShowMitre = ({ tactic, techniqueId, technique, index }) => (
    <CTable
      responsive
      style={{
        fontWeight: '600',
        fontSize: 14,
        borderCollapse: 'collapse',
      }}
      align="middle"
      className="mb-0"
    >
      <CTableBody>
        <CTableRow key={index}>
          <CTableDataCell align="middle" className="no-border-table">
            <TextInput
              type="text"
              placeholder="Tactic"
              value={tactic}
              refVal={(el) => (tacticRef.current[index] = el)}
              disabled={!(index >= mitre.length)}
              onChange={(e) => {
                setNewMitre((prevItems) => {
                  const updatedMitre = [...prevItems]
                  const parts = updatedMitre[index].split('-')
                  parts[0] = e.target.value
                  updatedMitre[index] = parts.join('-')

                  setTimeout(() => tacticRef.current[index].focus(), 0)
                  return updatedMitre
                })
              }}
              id="tactic"
              bg_color="rgb(26, 26, 26)"
              disableBottomMargin
            />
          </CTableDataCell>

          <CTableDataCell align="middle" className="no-border-table">
            <TextInput
              type="text"
              placeholder="Technique Id"
              refVal={(el) => (techniqueIdRef.current[index] = el)}
              value={techniqueId}
              disabled={!(index >= mitre.length)}
              onChange={(e) => {
                setNewMitre((prevItems) => {
                  const updatedMitre = [...prevItems]
                  const parts = updatedMitre[index].split('-')
                  parts[1] = e.target.value
                  updatedMitre[index] = parts.join('-')

                  setTimeout(() => techniqueIdRef.current[index].focus(), 0)
                  return updatedMitre
                })
              }}
              id="techniqueId"
              bg_color="rgb(26, 26, 26)"
              disableBottomMargin
            />
          </CTableDataCell>
          <CTableDataCell align="middle" className="no-border-table">
            <TextInput
              type="text"
              refVal={(el) => (techniqueRef.current[index] = el)}
              placeholder="Technique"
              value={technique}
              onChange={(e) => {
                setNewMitre((prevItems) => {
                  const updatedMitre = [...prevItems]
                  const parts = updatedMitre[index].split('-')
                  parts[2] = e.target.value
                  updatedMitre[index] = parts.join('-')

                  setTimeout(() => techniqueRef.current[index].focus(), 0)
                  return updatedMitre
                })
              }}
              id="technique"
              bg_color="rgb(26, 26, 26)"
              disableBottomMargin
            />
          </CTableDataCell>
          <CTableDataCell className="no-border-table">
            <span className="d-flex align-items-center">
              <CButton
                style={{ padding: '2px', color: Colors.RED }}
                onClick={() => {
                  deleteMitreDataCell(index)
                }}
              >
                {<img src={deleteIcon} />}
              </CButton>
            </span>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  )

  return (
    <>
      {loading || feed_entry_loading || test_artifacts_data_loading || artifact_update_loading ? (
        <Loader />
      ) : (
        <div>
          <AppRightSidebar bigSidebar={true} showBackdrop={false}>
            {test_artifacts_data && (
              <div className="mx-3 my-4">
                <span style={{ fontSize: 14, fontWeight: 400, marginBottom: 10 }}>Result</span>
                <CCard>
                  <CTable
                    hover
                    responsive
                    caption="top"
                    style={{ fontSize: 13, marginBottom: 7 }}
                    align="middle"
                    className={
                      test_artifacts_data && test_artifacts_data.length === 0 ? 'mt-3' : 'mb-0'
                    }
                  >
                    {test_artifacts_data.length === 0 ? null : (
                      <>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell className="text-center"></CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Artifact</CTableHeaderCell>
                            <CTableHeaderCell scope="col">VT Malicious</CTableHeaderCell>
                            <CTableHeaderCell scope="col">VT Undetected</CTableHeaderCell>
                            <CTableHeaderCell scope="col">KAV Zone</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {test_artifacts_data.map((artifact) => (
                            <CTableRow key={artifact.artifact}>
                              <CTableDataCell className=" text-center">
                                <input
                                  className="form-check-input mt-0"
                                  type="checkbox"
                                  checked={artifactsToTest[artifact.artifact]}
                                  onChange={() => {
                                    setArtifactsToTest((prevState) => ({
                                      ...prevState,
                                      [artifact.artifact]: !prevState[artifact.artifact],
                                    }))
                                  }}
                                />
                              </CTableDataCell>
                              <CTableDataCell>{artifact.artifact}</CTableDataCell>
                              <CTableDataCell>{artifact.virustotal_malicious}</CTableDataCell>
                              <CTableDataCell>{artifact.virustotal_undetected}</CTableDataCell>
                              <CTableDataCell>{artifact.ksp_zone}</CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </>
                    )}
                  </CTable>
                </CCard>
              </div>
            )}

            {test_artifacts_data && test_artifacts_data.length > 0 && (
              <div
                className="d-flex align-items-center mx-3"
                style={{
                  marginTop: 7,
                }}
              >
                <SelectBox
                  id="status"
                  defaultOption="Select Status"
                  onChange={(e) => setArtifactStatus(e.target.value)}
                  options={Object.keys(CONSTANTS.ARTIFACTS_STATUS).map((item) => (
                    <option key={item} value={CONSTANTS.ARTIFACTS_STATUS[item]}>
                      {CONSTANTS.ARTIFACTS_STATUS[item]}
                    </option>
                  ))}
                  value={artifactStatus}
                  width={250}
                />
                <CButton
                  color="primary"
                  onClick={updateArtifactsStatus}
                  style={{
                    marginTop: -15,
                    padding: '4px 19px',
                    borderRadius: 8,
                    height: 37,
                    marginLeft: 25,
                    backgroundColor: Colors.BLUE,
                    borderColor: Colors.BLUE,
                    fontSize: 14,
                    fontWeight: 300,
                  }}
                >
                  Submit
                </CButton>
              </div>
            )}
          </AppRightSidebar>

          <Alert
            showAlert={success || error || validationError}
            variant={success ? 'success' : 'danger'}
            message={
              success ? 'Artifact Created Successfully' : validationError ? validationError : error
            }
          />
          <span
            className="d-grid gap-2 d-md-flex justify-content-md-between"
            style={{ borderBottom: `1px solid ${Colors.LIGHT_GRAY}`, marginTop: -10 }}
          >
            <div className="d-flex align-items-center" style={{ padding: '10px' }}>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: Colors.LIGHT_GRAY,
                  borderRadius: '5px',
                  width: '30px',
                  height: '30px',
                  marginRight: '10px',
                }}
              >
                <img src={LockIcon} style={{ height: '18px', width: '18px' }}></img>
              </div>
              <div className="d-flex flex-column">
                <p style={{ fontSize: '0.75em', color: Colors.GRAY, margin: 0 }}>Locked By</p>
                <p style={{ fontSize: '1em', color: Colors.WHITE, margin: 0 }}>{'Username'}</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <CButton
                type="button"
                color="secondary"
                onClick={() => {
                  const returnPage = parseInt(searchParams.get('returnPage')) || 1
                  const selectedView = parseInt(searchParams.get('selectedView')) || 0
                  navigate(`/feed_entry?returnPage=${returnPage}&selectedView=${selectedView}`)
                }}
                style={{
                  padding: '4px 22px',
                  borderRadius: 8,
                  height: 36,
                  backgroundColor: Colors.DARK,
                  borderColor: Colors.DARK,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 7,
                  fontSize: 14,
                }}
              >
                Cancel
              </CButton>
              <CButton
                type="button"
                color="primary"
                onClick={submit}
                style={{
                  padding: '4px 19px',
                  borderRadius: 8,
                  height: 36,
                  backgroundColor: Colors.BLUE,
                  borderColor: Colors.BLUE,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 7,
                  fontSize: 14,
                  fontWeight: 300,
                }}
              >
                <CIcon icon={cilCheckAlt} style={{ height: 19, marginRight: 4 }} />
                Mark as Completed
              </CButton>
            </div>
          </span>

          <CRow>
            <CCol md={6}>
              <div
                className="feed-entry-title"
                style={{
                  fontSize: 16,
                  padding: '10px 0px',
                  paddingRight: 5,
                  borderBottom: `1px solid ${Colors.LIGHT_GRAY}`,
                  marginRight: -12,
                }}
              >
                {user.title}
              </div>

              <CRow className="mt-4">
                <CCol md={5}>
                  <ShowContent title="Feed Id" content={user.feed_id} />
                </CCol>
                <CCol md={7}>
                  <ShowContent title="RSS URL" content={user.link} isURL />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                <CCol md={5}>
                  <ShowContent title="Links" content={user.link} isURL />
                </CCol>
                <CCol md={7}>
                  <ShowContent title="Summary" content={user.summary} />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                <ShowContent title="Body" content={user.scraped_content} icon={cilCopy} canCopy />
              </CRow>
            </CCol>
            <CCol
              md={6}
              style={{ minHeight: '85vh', borderLeft: `1px solid ${Colors.LIGHT_GRAY}` }}
            >
              <div
                className="d-flex"
                style={{
                  borderBottom: `1px solid ${Colors.LIGHT_GRAY}`,
                  marginLeft: -12,
                  paddingTop: 9,
                  paddingLeft: 16,
                }}
              >
                <SubHeaders title="Severity" index={0} />
                <SubHeaders title="Tagging" index={1} />
                <SubHeaders title="Summary" index={2} />
                <SubHeaders title="Mitre" index={3} />
                <SubHeaders title="Artifacts" index={4} />
              </div>

              {selectedView === 0 ? (
                <>
                  {/* <div className="mt-4">
                    <TextArea
                      id="severity"
                      placeholder="Severity"
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                      label="Severity"
                      rows={4}
                    />
                  </div> */}

                  <div className="mt-4">
                    <TextInput
                      id="severity_level"
                      label="Severity Level"
                      placeholder="L/M/H"
                      value={severityLevel}
                      onChange={(e) => setSeverityLevel(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <TextArea
                      id="feedback"
                      placeholder="Enter the feedback"
                      value={user.feedback}
                      onChange={(e) => setUser({ ...user, feedback: e.target.value })}
                      label="Feedback"
                      rows={4}
                    />
                  </div>

                  <div className="mt-4">
                    <TextArea
                      id="content"
                      placeholder="Enter the content"
                      value={user.content}
                      onChange={(e) => setUser({ ...user, content: e.target.value })}
                      label="Content"
                      rows={4}
                    />
                  </div>
                </>
              ) : selectedView === 1 ? (
                <div>
                  <div style={{ fontSize: 17, margin: 10 }}>Tags</div>
                  {newTags &&
                    Object.entries(newTags).map(([key, tag], index) => (
                      <ShowTags
                        tag={tag.key}
                        key={tag.key}
                        tagName={key}
                        content={tag.content}
                        value={tag.value}
                        updated_value={tag.updated_value}
                        status={tag.status}
                        index={index}
                      />
                    ))}
                  <ShowIndividualTags />
                  <CButton
                    size="sm"
                    type="submit"
                    color="primary"
                    variant="outline"
                    style={{
                      fontSize: 13,
                      color: Colors.WHITE,
                      padding: '5px 16px',
                      borderRadius: 7,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={addTagRowSet}
                  >
                    <CIcon
                      icon={cilPlus}
                      customClassName="nav-icon"
                      style={{ height: 16, marginRight: 4 }}
                    />
                    Add
                  </CButton>
                </div>
              ) : selectedView === 2 ? (
                <>
                  <div className="mt-4">
                    <TextArea
                      id="summary"
                      placeholder="Enter the Summary"
                      value={updatedSummary}
                      onChange={(e) => setUpdatedSummary(e.target.value)}
                      label="Summary"
                      rows={6}
                    />
                  </div>
                </>
              ) : selectedView === 3 ? (
                <div>
                  <div style={{ fontSize: 17, margin: 10 }}>Mitre</div>
                  {newMitre &&
                    newMitre.map((mitre, index) => (
                      <ShowMitre
                        key={index}
                        tactic={mitre.split('-')[0]}
                        techniqueId={mitre.split('-')[1]}
                        technique={mitre.split('-')[2]}
                        index={index}
                      />
                    ))}
                  <CButton
                    size="sm"
                    type="submit"
                    color="primary"
                    variant="outline"
                    style={{
                      fontSize: 13,
                      color: Colors.WHITE,
                      padding: '5px 16px',
                      borderRadius: 7,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={addMitreRowSet}
                  >
                    <CIcon
                      icon={cilPlus}
                      customClassName="nav-icon"
                      style={{ height: 16, marginRight: 4 }}
                    />
                    Add
                  </CButton>
                </div>
              ) : selectedView === 4 ? (
                <>
                  <CCard className="m-2">
                    <CTable
                      hover
                      responsive
                      caption="top"
                      style={{ fontSize: 13 }}
                      align="middle"
                      className={artifacts && artifacts.length === 0 ? 'mt-3' : 'mb-0'}
                    >
                      {artifacts ? (
                        artifacts.length === 0 ? (
                          <CTableHead className="text-center" style={{ fontSize: 16 }}>
                            No Artifacts
                          </CTableHead>
                        ) : (
                          <>
                            <CTableHead>
                              <CTableRow>
                                <CTableHeaderCell className="text-center">
                                  <input
                                    className="form-check-input mt-0"
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={() => {
                                      const allSelected =
                                        Object.keys(selectedArtifacts).length ===
                                          artifacts.length && artifacts.length > 0

                                      if (allSelected) {
                                        setSelectedArtifacts({})
                                        setSelectAll(false)
                                      } else {
                                        const newSelectedArtifacts = {}
                                        artifacts.forEach((artifact) => {
                                          newSelectedArtifacts[artifact._id] = true
                                        })
                                        setSelectedArtifacts(newSelectedArtifacts)
                                        setSelectAll(true)
                                      }
                                    }}
                                  />
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Value</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {artifacts
                                .filter(
                                  (artifact, index, self) =>
                                    index ===
                                    self.findIndex(
                                      (t) =>
                                        t.artifact_type === artifact.artifact_type &&
                                        t.value === artifact.value,
                                    ),
                                )
                                .map((artifact) => (
                                  <CTableRow key={artifact._id}>
                                    <CTableDataCell className="text-center">
                                      <input
                                        className="form-check-input mt-0"
                                        type="checkbox"
                                        checked={selectedArtifacts[artifact._id]}
                                        onChange={() => {
                                          setSelectedArtifacts((prevState) => {
                                            const newState = {
                                              ...prevState,
                                              [artifact._id]: !prevState[artifact._id],
                                            }
                                            const allSelected = artifacts.every(
                                              (a) => newState[a._id],
                                            )
                                            setSelectAll(allSelected)
                                            return newState
                                          })
                                        }}
                                      />
                                    </CTableDataCell>
                                    <CTableDataCell>{artifact.artifact_type}</CTableDataCell>
                                    <CTableDataCell>{artifact.value}</CTableDataCell>
                                    <CTableDataCell>
                                      {artifact.status && (
                                        <span
                                          style={{
                                            border: `1px solid ${Colors.BLUE_DARK}`,
                                            borderRadius: 4,
                                            padding: '2px 4px',
                                          }}
                                        >
                                          {artifact.status}
                                        </span>
                                      )}
                                    </CTableDataCell>
                                  </CTableRow>
                                ))}
                            </CTableBody>
                          </>
                        )
                      ) : null}
                    </CTable>
                  </CCard>

                  <CButton
                    type="button"
                    color="secondary"
                    style={{
                      padding: '4px 22px',
                      borderRadius: 8,
                      height: 36,
                      backgroundColor: Colors.DARK,
                      borderColor: Colors.DARK,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 7,
                      fontSize: 12,
                    }}
                    className="mx-2 mb-3"
                    onClick={test_with_virustotal}
                  >
                    Test with VirusTotal
                  </CButton>
                </>
              ) : null}
            </CCol>
          </CRow>
        </div>
      )}
    </>
  )
}
