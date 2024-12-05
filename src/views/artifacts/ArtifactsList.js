import React, { useEffect, useState } from 'react'
import {
  CCard,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CForm,
  CCol,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AppRightSidebar } from '../../components'
import TextInput from '../../components/Form/TextInput'
import Enums from '../../utils/Enums'
import { readableDateFromString } from '../../helpers/DateHelpers'
import { toggleRightSidebar } from '../../actions/ThemeActions'
import '../index.css'
import Loader from '../../components/Loader'
import { getSearchParams } from '../../helpers/GetSearchParams'
import ShowAllFilters from '../../components/ShowAllFilters'
import {
  filterArtifact,
  getArtifactByFeedEntry,
  searchArtifact,
} from '../../actions/ArtifactActions'
import SelectBox from '../../components/Form/SelectBox'
import { CONSTANTS } from '../../utils/constants'

export default function ArtifactsList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { artifacts, loading } = useSelector((state) => state.artifacts)
  const { feed_id } = useParams()
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)

  const initial_filters = {
    feed_entry: feed_id,
    artifact_type: searchParams.get('artifact_type') || '',
    value: searchParams.get('value') || '',
    status: searchParams.get('status') || '',
  }
  const [filters, setFilters] = useState(initial_filters)
  const [searchTerm, setSearchTerm] = useState('')

  const search_data = () => {
    dispatch(searchArtifact(searchTerm))
  }

  const filter = () => {
    navigate({
      pathname: `/artifacts/${feed_id}`,
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  useEffect(() => {
    if (searchParams.size <= 0) dispatch(getArtifactByFeedEntry(feed_id))
  }, [])

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        filterArtifact({
          feed_entry: feed_id,
          artifact_type: searchParams.get('artifact_type'),
          value: searchParams.get('value'),
          status: searchParams.get('status'),
        }),
      )
    }
  }, [searchParams])
  const search_params_for_list = getSearchParams(searchParams)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <AppRightSidebar>
            <CRow className="mx-2 my-4">
              <CForm>
                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Artifact Type"
                      value={filters.artifact_type}
                      onChange={(e) => setFilters({ ...filters, artifact_type: e.target.value })}
                      id="artifact_type"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Value"
                      value={filters.value}
                      onChange={(e) => setFilters({ ...filters, value: e.target.value })}
                      id="value"
                    />
                  </CCol>
                </CRow>
                <CCol>
                  <SelectBox
                    id="status"
                    defaultOption="Select Status"
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    options={Object.keys(CONSTANTS.STATUS).map((item) => (
                      <option key={item} value={CONSTANTS.STATUS[item]}>
                        {CONSTANTS.STATUS[item]}
                      </option>
                    ))}
                    value={filters.status}
                  />
                </CCol>
                <CRow></CRow>

                <div className="d-grid gap-2">
                  <CButton size="sm" type="submit" color="primary" onClick={filter}>
                    Filter
                  </CButton>
                </div>
              </CForm>
            </CRow>
          </AppRightSidebar>
          <div
            className="callout callout-secondary d-flex align-items-center justify-content-between gap-3"
            style={{
              height: 55,
              backgroundColor: 'rgb(40, 40, 40)',
            }}
          >
            <span className="mr-4">Artifacts</span>
            {/* <TextInput
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="search"
              style={{
                width: '75%',
                backgroundColor: 'rgb(31, 31, 31)',
                height: 40,
                marginBottom: 0,
              }}
              trailIcon={cilMagnifyingGlass}
              trailIconClick={search_data}
            /> */}

            <div>
              <CButton
                size="sm"
                type="submit"
                color="primary"
                variant="outline"
                onClick={() => dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))}
                style={{ marginRight: 16 }}
              >
                Filter
              </CButton>
              <CButton
                size="sm"
                type="submit"
                variant="outline"
                className="mr-3"
                color="light"
                onClick={() => {
                  navigate(`/artifacts/${feed_id}/new`)
                }}
              >
                New
              </CButton>
            </div>
          </div>

          {/* Filters here */}
          <ShowAllFilters
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            search_params_for_list={search_params_for_list}
          />

          <CCard className="mb-4">
            <CTable
              hover
              responsive
              caption="top"
              style={{ fontSize: 12 }}
              align="middle"
              className={artifacts && artifacts.length === 0 ? 'mt-3' : 'mb-0'}
            >
              {artifacts ? (
                artifacts.length === 0 ? (
                  <CTableHead className="text-center" style={{ fontSize: 16 }}>
                    No Artifacts Found
                  </CTableHead>
                ) : (
                  <>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Artifact Type</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Value</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Created</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {artifacts.map((artifact) => (
                        <CTableRow key={artifact._id}>
                          <CTableDataCell>{artifact.artifact_type}</CTableDataCell>
                          <CTableDataCell>{artifact.value}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color={artifact.status === Enums.STATUS.ACTIVE ? 'success' : 'danger'}
                              variant="outline"
                              shape="rounded-pill"
                            >
                              {artifact.status.toLowerCase()}
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            {readableDateFromString(artifact.created_at)}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color="primary"
                              variant="outline"
                              onClick={() => {
                                navigate(`/artifacts/${artifact._id}/edit`)
                              }}
                            >
                              Edit
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </>
                )
              ) : null}
            </CTable>
          </CCard>
        </>
      )}
    </>
  )
}
