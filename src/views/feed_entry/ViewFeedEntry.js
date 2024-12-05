/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CRow, CCol, CButton, CTooltip } from '@coreui/react'
import { CONSTANTS } from '../../utils/constants'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import { clearErrors, getFeedEntry, updateFeedEntry } from '../../actions/FeedEntryActions'
import TextArea from '../../components/Form/TextArea'
import { Colors } from '../../utils/colors'
import CIcon from '@coreui/icons-react'
import { cilX, cilCheckAlt, cilCopy } from '@coreui/icons'
import LockIcon from '../../assets/images/padlock.png'
import '../index.css'
import { updateMlModel } from '../../actions/MlModelActions'

export default function ViewFeedEntry() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { feed_entry, loading: feed_entry_loading } = useSelector((state) => state.feed_entry)
  const { error, isUpdated, loading } = useSelector((state) => state.update_feed_entry)
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
  const [selectedResponse, setSelectedResponse] = useState(0)
  const [copyContent, setCopyContent] = useState('Copy')

  useEffect(() => {
    dispatch(getFeedEntry(id))
  }, [])

  useEffect(() => {
    if (isUpdated) {
      dispatch(clearErrors())
      navigate('/feed_entry')
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearErrors())
      }, 2000)
    }
  }, [dispatch, isUpdated, error])

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
    }
  }, [feed_entry])

  const submit = () => {
    const excludedKeys = ['summary', 'scraped_content', 'feedback', 'content', 'rating', 'response']
    const validation_keys = Object.keys(user)
      .filter((key) => !excludedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = user[key]
        return obj
      }, {})

    if (validate_required_keys(validation_keys, setValidationError))
      dispatch(updateFeedEntry(id, { ...user, rss_feed: user.rss_feed._id }))

    dispatch(updateMlModel(user.feed_id, { rating: user.rating }))
  }

  const ShowContent = ({ title, content, isURL, icon, canCopy }) => {
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
            }}
          >
            {content}
          </span>
        )}
      </div>
    )
  }

  return (
    <>
      {loading || feed_entry_loading ? (
        <Loader />
      ) : (
        <div>
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
                  padding: '4px 22px',
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
                }}
              >
                Submit
              </CButton>
            </div>
          </span>

          <CRow>
            <CCol md={8}>
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
                  <ShowContent title="Name" content={user['rss_feed'].name} />
                </CCol>
                <CCol md={7}>
                  <ShowContent title="Summary" content={user.summary} />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                <CCol md={5}>
                  <ShowContent title="Feed Id" content={user.feed_id} />
                </CCol>
                <CCol md={7}>
                  <ShowContent title="URL" content={user.link} isURL={true} />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                <ShowContent title="Body" content={user.scraped_content} icon={cilCopy} canCopy />
              </CRow>
            </CCol>
            <CCol
              md={4}
              style={{ minHeight: '85vh', borderLeft: `1px solid ${Colors.LIGHT_GRAY}` }}
            >
              <div
                className="mt-3 d-flex"
                style={{
                  backgroundColor: Colors.BG_LIGHT,
                  borderRadius: 100,
                  padding: '4px 5px',
                }}
              >
                <span
                  style={{
                    width: '50%',
                    textAlign: 'center',
                    borderRadius: 100,
                    backgroundColor: selectedResponse === 0 ? Colors.RED : Colors.TRANSPARENT,
                    padding: '4px 6px',
                    fontSize: 12,
                  }}
                  className="response-btn"
                  onClick={() => {
                    setSelectedResponse(0)
                    setUser({ ...user, response: CONSTANTS.FEED_ENTRY_RESPONSE.REJECT })
                  }}
                >
                  <CIcon icon={cilX} style={{ height: 13, marginRight: 4 }} />
                  Reject
                </span>
                <span
                  style={{
                    width: '50%',
                    textAlign: 'center',
                    borderRadius: 100,
                    backgroundColor: selectedResponse === 1 ? Colors.GREEN : Colors.TRANSPARENT,
                    padding: '4px 6px',
                    fontSize: 12,
                  }}
                  className="response-btn"
                  onClick={() => {
                    setSelectedResponse(1)
                    setUser({ ...user, response: CONSTANTS.FEED_ENTRY_RESPONSE.APPROVE })
                  }}
                >
                  <CIcon icon={cilCheckAlt} style={{ height: 13, marginRight: 4 }} />
                  Approve
                </span>
                <span
                  style={{
                    width: '50%',
                    textAlign: 'center',
                    borderRadius: 100,
                    backgroundColor: selectedResponse === 2 ? Colors.BLUE_BG : Colors.TRANSPARENT,
                    padding: '4px 6px',
                    fontSize: 12,
                  }}
                  className="response-btn"
                  onClick={() => {
                    setSelectedResponse(2)
                    setUser({ ...user, response: CONSTANTS.FEED_ENTRY_RESPONSE.DUPLICATE })
                  }}
                >
                  <CIcon icon={cilCopy} style={{ height: 13, marginRight: 4 }} />
                  Mark Duplicate
                </span>
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

              <div className="mt-4">
                <TextInput
                  label="Rating"
                  type="number"
                  min_num={0}
                  max_num={10}
                  placeholder="Enter the rating"
                  value={user.rating}
                  onChange={(e) => setUser({ ...user, rating: e.target.value })}
                  id="rating"
                />
              </div>
            </CCol>
          </CRow>
        </div>
      )}
    </>
  )
}
