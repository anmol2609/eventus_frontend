/* eslint-disable react/prop-types */
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
  CTableFoot,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import SelectBox from '../../components/Form/SelectBox'
import { AppRightSidebar } from '../../components'
import TextInput from '../../components/Form/TextInput'
import { readableDateTimeFromString } from '../../helpers/DateHelpers'
import { toggleRightSidebar } from '../../actions/ThemeActions'
import '../index.css'
import { Colors } from '../../utils/colors'
import Loader from '../../components/Loader'
import { cilMagnifyingGlass } from '@coreui/icons'
import download_csv from '../../assets/images/download_csv.svg'
import download_html from '../../assets/images/download_html.svg'
import {
  filterFeedEntry,
  getAllFeedEntries,
  getApprovedFeedEntries,
  getCompletedFeedEntries,
  searchFeedEntry,
} from '../../actions/FeedEntryActions'
import { getAllRssFeeds } from '../../slices/rssFeed/GetRssFeedsSlice'
import { getArtifactByFeedEntry } from '../../slices/Artifact/GetAllArtifactsSlice'
import { CONSTANTS } from '../../utils/constants'
import { ratingStyles } from '../../helpers/CSSHelpers'
import Pagination from '../../components/Pagination'
import defaultProfile from '../../assets/images/profile.svg'
import { handleSort, sortData } from '../../helpers/SortHelpers'
import sortArrow from '../../assets/images/sortArrow.svg'
import filterIcon from '../../assets/images/filterIcon.svg'
import sortByIcon from '../../assets/images/sortByIcon.svg'
import { SubHeaders } from '../../helpers/SubHeaders'
import { getMlModel } from '../../slices/mlModel/GetMlModelSlice'
import FeedEntryHTMLFile from './FeedEntryHTMLFile'
import { getAllMitre } from '../../slices/mitre/GetAllMitreSlice'

export default function FeedEntryList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { feed_entries, loading } = useSelector((state) => state.feed_entries)
  const { artifacts } = useSelector((state) => state.artifacts)
  const { approved_feed_entries } = useSelector((state) => state.approved_feed_entries)
  const { completed_feed_entries } = useSelector((state) => state.completed_feed_entries)
  const { rss_feeds } = useSelector((state) => state.rss_feeds)
  const { model: ml_model } = useSelector((state) => state.ml_model)
  // const { mitre } = useSelector((state) => state.all_mitre)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)

  const initial_filters = {
    rss_feed: searchParams.get('rss_fed') || '',
    status: searchParams.get('status') || '',
    start_date: searchParams.get('start_date') || '',
    end_date: searchParams.get('end_date') || '',
  }
  const [filters, setFilters] = useState(initial_filters)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFeedEntry, setSelectedFeedEntry] = useState()
  const [selectedHTMLFeedEntry, setSelectedHTMLFeedEntry] = useState()
  const [initialRender, setInitialRender] = useState(0)

  const search_data = () => {
    dispatch(searchFeedEntry(searchTerm))
  }

  const filter = () => {
    navigate({
      pathname: '/feed_entry',
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  useEffect(() => {
    dispatch(getAllFeedEntries())
    dispatch(toggleRightSidebar(false))
    dispatch(getAllRssFeeds())
    dispatch(getApprovedFeedEntries())
    dispatch(getCompletedFeedEntries())
  }, [])

  useEffect(() => {
    if (searchParams.size > 0) {
      let feed = searchParams.get('rss_feed')
      let status = searchParams.get('status')
      let start_date = searchParams.get('start_date')
      let end_date = searchParams.get('end_date')
      if (feed || status || start_date || end_date) {
        dispatch(
          filterFeedEntry({
            rss_feed: searchParams.get('rss_feed'),
            status: searchParams.get('status'),
            start_date: searchParams.get('start_date'),
            end_date: searchParams.get('end_date'),
          }),
        )
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (initialRender === 0) {
      setInitialRender(1)
      return
    } // skipping the first render, since it is the page load

    scheduleCSV()
  }, [artifacts])

  useEffect(() => {
    if (initialRender === 0) {
      setInitialRender(1)
      return
    }

    if (ml_model !== undefined && ml_model !== null) scheduleHTML()
  }, [ml_model])

  const scheduleCSV = () => {
    if (artifacts && artifacts.length >= 0) {
      var csvContent = `Type,Object\n`
      artifacts.forEach(function (artifact) {
        // TODO - Add the check to only allow WHITELISTED Artifacts to be downloaded.
        if (artifact.status === CONSTANTS.ARTIFACTS_STATUS.WHITELIST)
          csvContent += `${artifact.artifact_type},${artifact.value}\n`
      })

      var blob = new Blob([csvContent], { type: 'text/csv' })
      var url = URL.createObjectURL(blob)
      var a = document.createElement('a')
      a.href = url
      a.download = 'artifacts_' + selectedFeedEntry + '.csv'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const scheduleHTML = (feed) => {
    if (ml_model) {
      let model = ml_model.length === 0 ? null : ml_model
      feed = selectedHTMLFeedEntry

      var feedId = feed['feed_id']
      var summary = model && model['summary'] ? model['summary'] : feed['summary']
      var title = feed['title']
      var feedLink = feed['link']
      var threatType = model && model['threat_type'] ? model['threat_type'] : ''
      var severityLevel = model && model['severity_level'] ? model['severity_level'] : ''
      var targetedSector = model && model['target_sector'] ? model['target_sector'] : ''
      var targetedRegion = model && model['target_region'] ? model['target_region'] : ''
      var threatActorType = model && model['Threat_Actor_Type'] ? model['Threat_Actor_Type'] : ''
      var threatActorRegion =
        model && model['Threat_Actor_Region'] ? model['Threat_Actor_Region'] : ''
      var mitres = feed['mitre']
      var tags = feed['tags']

      var advisoryContent = FeedEntryHTMLFile(
        summary,
        title,
        feedLink,
        threatType,
        severityLevel,
        targetedSector,
        targetedRegion,
        threatActorType,
        threatActorRegion,
        mitres,
        tags,
      )

      var blob = new Blob([advisoryContent], { type: 'text/html' })
      var url = URL.createObjectURL(blob)
      var a = document.createElement('a')
      a.href = url
      a.download = 'threat_advisory_' + feedId + '.html'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const downloadCSV = (feed_id) => {
    setSelectedFeedEntry(feed_id)
    dispatch(getArtifactByFeedEntry(feed_id))
  }

  const downloadHTML = (feed) => {
    setSelectedHTMLFeedEntry(feed)
    dispatch(getMlModel(feed.feed_id))
    // dispatch(getAllMitre(feed.feed_id))
  }

  const initialPage = parseInt(searchParams.get('returnPage')) || 1
  const initialView = parseInt(searchParams.get('selectedView')) || 0

  const [selectedView, setSelectedView] = useState(initialView)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const itemsPerPage = 10

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const [timeColOrder, setTimeColOrder] = useState('desc')

  const StatusButton = ({ status }) =>
    status ? (
      <CButton
        size="sm"
        color={
          status === CONSTANTS.FEED_ENTRY_RESPONSE.APPROVE
            ? 'success'
            : status === CONSTANTS.FEED_ENTRY_RESPONSE.REJECT
              ? 'danger'
              : 'info'
        }
        variant="outline"
        shape="rounded-pill"
        className="text-capitalize"
      >
        {status === CONSTANTS.FEED_ENTRY_RESPONSE.APPROVE
          ? 'Approved'
          : status === CONSTANTS.FEED_ENTRY_RESPONSE.REJECT
            ? 'Rejected'
            : status}
      </CButton>
    ) : null

  const feed_entries_items = feed_entries
    ? feed_entries
        .sort((a, b) => {
          let aValue = new Date(a['published'])
          let bValue = new Date(b['published'])
          if (aValue < bValue) return timeColOrder === 'asc' ? -1 : 1
          if (aValue > bValue) return timeColOrder === 'asc' ? 1 : -1
          return 0
        })
        .slice(indexOfFirstItem, indexOfLastItem)
    : []
  const feed_entries_length = feed_entries ? feed_entries.length : 0
  const feed_entries_pages = Math.ceil(feed_entries_length / itemsPerPage)

  const approved_feed_entries_items = approved_feed_entries
    ? approved_feed_entries
        .sort((a, b) => {
          let aValue = new Date(a['created_at'])
          let bValue = new Date(b['created_at'])
          if (aValue < bValue) return timeColOrder === 'asc' ? -1 : 1
          if (aValue > bValue) return timeColOrder === 'asc' ? 1 : -1
          return 0
        })
        .slice(indexOfFirstItem, indexOfLastItem)
    : []
  const approved_feed_entries_length = approved_feed_entries ? approved_feed_entries.length : 0
  const approved_feed_entries_pages = Math.ceil(approved_feed_entries_length / itemsPerPage)

  const completed_feed_entries_items = completed_feed_entries
    ? completed_feed_entries
        .sort((a, b) => {
          let aValue = new Date(a['created_at'])
          let bValue = new Date(b['created_at'])
          if (aValue < bValue) return timeColOrder === 'asc' ? -1 : 1
          if (aValue > bValue) return timeColOrder === 'asc' ? 1 : -1
          return 0
        })
        .slice(indexOfFirstItem, indexOfLastItem)
    : []
  const completed_feed_entries_length = completed_feed_entries ? completed_feed_entries.length : 0
  const completed_feed_entries_pages = Math.ceil(completed_feed_entries_length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const columnToDataMap = [
    {
      'Feed Id': ['feed_id'],
      Origin: ['rss_feed', 'name'],
      Title: ['title'],
      Source: ['link'],
      Status: ['response'],
      Time: ['published'],
      Rating: ['rating'],
    },
    {
      'Feed Id': ['feed_id'],
      Name: ['rss_feed', 'name'],
      Title: ['title'],
      'RSS URL': ['rss_feed', 'url'],
      Status: ['response'],
      'Last Sent': ['created_at'],
      Rating: ['rating'],
      Owner: [],
    },
    {
      'Feed Id': ['feed_id'],
      Name: ['rss_feed', 'name'],
      Title: ['title'],
      'RSS URL': ['rss_feed', 'url'],
      'Last Sent': ['created_at'],
      Rating: ['rating'],
    },
  ]

  const [sortColumn, setSortColumn] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const sorted_feed_entries_items = feed_entries_items
    ? sortData(feed_entries_items, sortColumn, sortOrder, columnToDataMap[0])
    : []

  const sorted_approved_feed_entries_items = approved_feed_entries_items
    ? sortData(approved_feed_entries_items, sortColumn, sortOrder, columnToDataMap[1])
    : []

  const sorted_completed_feed_entries_items = completed_feed_entries_items
    ? sortData(completed_feed_entries_items, sortColumn, sortOrder, columnToDataMap[2])
    : []

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
                    <SelectBox
                      id="rss_feed"
                      defaultOption="Select Rss Feed"
                      onChange={(e) => setFilters({ ...filters, rss_feed: e.target.value })}
                      options={
                        rss_feeds &&
                        rss_feeds.map((feed) => (
                          <option key={feed._id} value={feed._id}>
                            {feed.name}
                          </option>
                        ))
                      }
                      value={filters.rss_feed}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <SelectBox
                      id="status"
                      defaultOption="Select Status"
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      options={Object.keys(CONSTANTS.FEED_ENTRY_RESPONSE).map((item) => (
                        <option key={item} value={CONSTANTS.FEED_ENTRY_RESPONSE[item]}>
                          {CONSTANTS.FEED_ENTRY_RESPONSE[item]}
                        </option>
                      ))}
                      value={filters.status}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="date"
                      placeholder="Start Date"
                      value={filters.start_date}
                      onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
                      id="start_date"
                      label="Start Date"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="date"
                      placeholder="End Date"
                      value={filters.end_date}
                      onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
                      id="end_date"
                      label="End Date"
                    />
                  </CCol>
                </CRow>

                <div className="d-grid gap-2">
                  <CButton size="sm" type="submit" color="primary" onClick={filter}>
                    Filter
                  </CButton>
                </div>
              </CForm>
            </CRow>
          </AppRightSidebar>

          <div className="d-flex" style={{ borderBottom: `1px solid ${Colors.LIGHT_GRAY}` }}>
            <SubHeaders
              title="RSS Feeds"
              index={0}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
              setCurrentPage={setCurrentPage}
            />
            <SubHeaders
              title="RSS Board"
              index={1}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
              setCurrentPage={setCurrentPage}
            />
            <SubHeaders
              title="RSS View"
              index={2}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
              setCurrentPage={setCurrentPage}
            />
          </div>

          <div
            className="my-2 d-flex align-items-center justify-content-between gap-3"
            style={{
              height: 48,
              paddingLeft: 8,
              paddingRight: 8,
              borderRadius: 10,
              backgroundColor: 'rgb(40, 40, 40)',
            }}
          >
            <div
              className="mr-4"
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              <div
                style={{
                  height: '30px',
                  width: '8px',
                  marginRight: '5px',
                  borderRadius: '10px 10px 10px 10px',
                  backgroundColor: Colors.PINK,
                }}
              ></div>
              <span style={{ width: selectedView === 0 ? 115 : selectedView === 1 ? 240 : 180 }}>
                {selectedView === 0
                  ? 'RSS Feeds'
                  : selectedView === 1
                    ? 'Approved RSS Feeds'
                    : 'RSS Feeds View'}
              </span>
              <span
                style={{
                  fontSize: 11,
                  marginLeft: 10,
                  marginRight: 10,
                  backgroundColor: Colors.LIGHT_GRAY,
                  borderRadius: 100,
                  padding: '4px 5px',
                }}
              >
                {selectedView === 0
                  ? feed_entries && feed_entries.length <= 100
                    ? feed_entries.length
                    : '100+'
                  : selectedView == 1
                    ? approved_feed_entries && approved_feed_entries.length <= 100
                      ? approved_feed_entries.length
                      : '100+'
                    : completed_feed_entries && completed_feed_entries.length <= 100
                      ? completed_feed_entries.length
                      : '100+'}
              </span>
              <TextInput
                type="text"
                placeholder="Search here...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="search"
                style={{
                  // width: '75%',
                  backgroundColor: 'rgb(31, 31, 31)',
                  height: 40,
                  marginBottom: 0,
                }}
                trailIcon={cilMagnifyingGlass}
                trailIconClick={search_data}
              />
            </div>
            <div className="d-flex justify-content-start align-items-center gap-2">
              <CButton
                size="sm"
                type="submit"
                color="primary"
                variant="outline"
                shape="rounded-pill"
                style={{
                  fontSize: 13,
                  color: Colors.WHITE,
                  padding: '5px 10px',
                }}
                onClick={() => dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))}
              >
                <div className="d-flex justify-content-start align-items-center gap-1">
                  <img src={filterIcon} style={{ height: '16px', width: '16px' }}></img>
                  {'Add Filter'}
                </div>
              </CButton>
              <CButton
                size="sm"
                type="submit"
                color="primary"
                variant="outline"
                shape="rounded-pill"
                style={{
                  fontSize: 13,
                  color: Colors.WHITE,
                  padding: '5px 10px',
                }}
                onClick={() =>
                  timeColOrder === 'asc' ? setTimeColOrder('desc') : setTimeColOrder('asc')
                }
              >
                <div className="d-flex justify-content-start align-items-center gap-1">
                  <img src={sortByIcon} style={{ height: '16px', width: '16px' }}></img>
                  {`Sort By: Date`}
                </div>
              </CButton>
            </div>
          </div>

          {/* Filters here */}
          {/* <ShowAllFilters
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            search_params_for_list={search_params_for_list}
          /> */}

          {/* All Feeds */}
          {selectedView === 0 && (
            <CCard
              className="mb-4"
              style={{
                marginTop: '12px',
                border: '1px solid #303030',
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <CTable
                hover
                responsive
                caption="top"
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  borderColor: '#303030',
                  borderCollapse: 'collapse',
                }}
                align="middle"
                className={feed_entries && feed_entries.length === 0 ? 'mt-3' : 'mb-0'}
              >
                {feed_entries ? (
                  feed_entries.length === 0 ? (
                    <CTableHead className="text-center" style={{ fontSize: 16 }}>
                      No Feed Entries Found
                    </CTableHead>
                  ) : (
                    <>
                      <CTableHead>
                        <CTableRow>
                          {Object.keys(columnToDataMap[0]).map((header) => (
                            <CTableHeaderCell
                              key={header}
                              scope="col"
                              onClick={() =>
                                handleSort(
                                  header,
                                  sortColumn,
                                  setSortColumn,
                                  sortOrder,
                                  setSortOrder,
                                )
                              }
                              style={{ fontWeight: '400', color: '#FCFCFC', cursor: 'pointer' }}
                            >
                              <div className="d-flex justify-content-start align-items-center gap-1">
                                {header}
                                <img
                                  src={sortArrow}
                                  style={{ height: '16px', width: '16px' }}
                                ></img>
                              </div>
                            </CTableHeaderCell>
                          ))}
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {sorted_feed_entries_items.map((feed) => (
                          <CTableRow
                            key={feed._id}
                            className="clickable-row"
                            onClick={() => {
                              navigate(
                                `/feed_entry/${feed._id}/view?returnPage=${currentPage}&selectedView=${selectedView}`,
                              )
                            }}
                          >
                            <CTableDataCell>{feed.feed_id}</CTableDataCell>
                            <CTableDataCell>{feed['rss_feed'].name}</CTableDataCell>
                            <CTableDataCell>{feed.title}</CTableDataCell>
                            <CTableDataCell>
                              <a
                                style={{ color: Colors.LINK }}
                                target="_blank"
                                href={feed.link}
                                rel="noreferrer"
                              >
                                {feed.link}
                              </a>
                            </CTableDataCell>
                            <CTableDataCell>
                              <StatusButton status={feed.response ? feed.response : 'Draft'} />
                            </CTableDataCell>
                            <CTableDataCell>
                              {readableDateTimeFromString(feed.published)}
                            </CTableDataCell>
                            <CTableDataCell>
                              <div style={ratingStyles(feed.rating)}>
                                {feed.rating ? feed.rating : 0.0}
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                      <CTableFoot>
                        <CTableRow>
                          <CTableDataCell colSpan="6">
                            {' '}
                            <Pagination
                              currentPage={currentPage}
                              totalPages={feed_entries_pages}
                              onPageChange={handlePageChange}
                              totalItems={feed_entries_length}
                              itemsPerPage={itemsPerPage}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      </CTableFoot>
                    </>
                  )
                ) : null}
              </CTable>
            </CCard>
          )}

          {/* Approved Feeds */}
          {selectedView === 1 && (
            <CCard
              className="mb-4"
              style={{
                marginTop: '12px',
                border: '1px solid #303030',
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <CTable
                hover
                responsive
                caption="top"
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  borderColor: '#303030',
                  borderCollapse: 'collapse',
                }}
                align="middle"
                className={
                  approved_feed_entries && approved_feed_entries.length === 0 ? 'mt-3' : 'mb-0'
                }
              >
                {approved_feed_entries ? (
                  approved_feed_entries.length === 0 ? (
                    <CTableHead className="text-center" style={{ fontSize: 16 }}>
                      No Approved Feed Entries Found
                    </CTableHead>
                  ) : (
                    <>
                      <CTableHead>
                        <CTableRow>
                          {Object.keys(columnToDataMap[1]).map((header) => (
                            <CTableHeaderCell
                              key={header}
                              scope="col"
                              onClick={() =>
                                handleSort(
                                  header,
                                  sortColumn,
                                  setSortColumn,
                                  sortOrder,
                                  setSortOrder,
                                )
                              }
                              style={{ fontWeight: '400', color: '#FCFCFC', cursor: 'pointer' }}
                            >
                              <div className="d-flex justify-content-start align-items-center gap-1">
                                {header}
                                <img
                                  src={sortArrow}
                                  style={{ height: '16px', width: '16px' }}
                                ></img>
                              </div>
                            </CTableHeaderCell>
                          ))}
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {sorted_approved_feed_entries_items.map((feed) => (
                          <CTableRow
                            className="clickable-row"
                            key={feed._id}
                            onClick={() => {
                              navigate(
                                `/feed_entry/${feed._id}/view_artifacts?returnPage=${currentPage}&selectedView=${selectedView}`,
                              )
                            }}
                          >
                            <CTableDataCell>{feed.feed_id}</CTableDataCell>
                            <CTableDataCell>{feed['rss_feed'].name}</CTableDataCell>
                            <CTableDataCell>{feed.title}</CTableDataCell>
                            <CTableDataCell>
                              <a
                                style={{ color: Colors.LINK }}
                                target="_blank"
                                href={feed.link}
                                rel="noreferrer"
                              >
                                {feed['rss_feed'].url}
                              </a>
                            </CTableDataCell>
                            <CTableDataCell>
                              <StatusButton
                                status={feed['completed'] ? 'Completed' : feed.response}
                              />
                            </CTableDataCell>
                            <CTableDataCell>
                              {readableDateTimeFromString(feed.created_at)}
                            </CTableDataCell>
                            <CTableDataCell>
                              <div style={ratingStyles(feed.rating)}>
                                {feed.rating ? feed.rating : 0.0}
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="d-flex justify-content-start align-items-center gap-2">
                                <img
                                  src={defaultProfile}
                                  style={{ height: '18px', width: '18px' }}
                                ></img>
                                <p style={{ fontSize: '13px', margin: 0 }}>{'Username'}</p>
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                      <CTableFoot>
                        <CTableRow>
                          <CTableDataCell colSpan="6">
                            {' '}
                            <Pagination
                              currentPage={currentPage}
                              totalPages={approved_feed_entries_pages}
                              onPageChange={handlePageChange}
                              totalItems={approved_feed_entries_length}
                              itemsPerPage={itemsPerPage}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      </CTableFoot>
                    </>
                  )
                ) : null}
              </CTable>
            </CCard>
          )}

          {/* RSS View for Download */}
          {selectedView === 2 && (
            <CCard
              className="mb-4"
              style={{
                marginTop: '12px',
                border: '1px solid #303030',
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <CTable
                hover
                responsive
                caption="top"
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  borderColor: '#303030',
                  borderCollapse: 'collapse',
                }}
                align="middle"
                className={
                  completed_feed_entries && completed_feed_entries.length === 0 ? 'mt-3' : 'mb-0'
                }
              >
                {completed_feed_entries ? (
                  completed_feed_entries.length === 0 ? (
                    <CTableHead className="text-center" style={{ fontSize: 16 }}>
                      No Completed Feed Entries Found
                    </CTableHead>
                  ) : (
                    <>
                      <CTableHead>
                        <CTableRow>
                          {Object.keys(columnToDataMap[2]).map((header) => (
                            <CTableHeaderCell
                              key={header}
                              scope="col"
                              onClick={() =>
                                handleSort(
                                  header,
                                  sortColumn,
                                  setSortColumn,
                                  sortOrder,
                                  setSortOrder,
                                )
                              }
                              style={{ fontWeight: '400', color: '#FCFCFC', cursor: 'pointer' }}
                            >
                              <div className="d-flex justify-content-start align-items-center gap-1">
                                {header}
                                <img
                                  src={sortArrow}
                                  style={{ height: '16px', width: '16px' }}
                                ></img>
                              </div>
                            </CTableHeaderCell>
                          ))}
                          <CTableHeaderCell
                            scope="col"
                            style={{ fontWeight: '400', color: '#FCFCFC', cursor: 'pointer' }}
                          >
                            Download
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {sorted_completed_feed_entries_items.map((feed) => (
                          <CTableRow key={feed._id}>
                            <CTableDataCell>{feed.feed_id}</CTableDataCell>
                            <CTableDataCell>{feed.rss_feed.name}</CTableDataCell>
                            <CTableDataCell>{feed.title}</CTableDataCell>
                            <CTableDataCell>
                              <a
                                style={{ color: Colors.LINK }}
                                target="_blank"
                                href={feed.link}
                                rel="noreferrer"
                              >
                                {feed.link}
                              </a>
                            </CTableDataCell>
                            <CTableDataCell>
                              {readableDateTimeFromString(feed.created_at)}
                            </CTableDataCell>
                            <CTableDataCell>
                              <div style={ratingStyles(feed.rating)}>
                                {feed.rating ? feed.rating : 0.0}
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <img
                                src={download_html}
                                className="download-btn"
                                style={{ marginRight: 10, width: 19 }}
                                onClick={() => downloadHTML(feed)}
                              />
                              <img
                                src={download_csv}
                                className="download-btn"
                                style={{ width: 15 }}
                                onClick={() => downloadCSV(feed._id)}
                              />
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                      <CTableFoot>
                        <CTableRow>
                          <CTableDataCell colSpan="6">
                            {' '}
                            <Pagination
                              currentPage={currentPage}
                              totalPages={completed_feed_entries_pages}
                              onPageChange={handlePageChange}
                              totalItems={completed_feed_entries_length}
                              itemsPerPage={itemsPerPage}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      </CTableFoot>
                    </>
                  )
                ) : null}
              </CTable>
            </CCard>
          )}
        </>
      )}
    </>
  )
}
