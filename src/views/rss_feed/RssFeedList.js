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
import { AppRightSidebar } from '../../components'
import TextInput from '../../components/Form/TextInput'
import { CONSTANTS } from '../../utils/constants'
import { readableDateFromString } from '../../helpers/DateHelpers'
import { toggleRightSidebar } from '../../actions/ThemeActions'
import '../index.css'
import { Colors } from '../../utils/colors'
import Loader from '../../components/Loader'
import { cilMagnifyingGlass } from '@coreui/icons'
import { getSearchParams } from '../../helpers/GetSearchParams'
import { filterRssFeed, getAllRssFeeds, searchRssFeed } from '../../actions/RssFeedActions'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { ratingStyles } from '../../helpers/CSSHelpers'
import Pagination from '../../components/Pagination'
import { handleSort, sortData } from '../../helpers/SortHelpers'
import sortArrow from '../../assets/images/sortArrow.svg'
import filterIcon from '../../assets/images/filterIcon.svg'
import sortByIcon from '../../assets/images/sortByIcon.svg'
import { SubHeaders } from '../../helpers/SubHeaders'
import deleteIcon from '../../assets/images/deleteIcon.svg'
import editIcon from '../../assets/images/editIcon.svg'
import { updateRssFeed } from '../../actions/RssFeedActions'
import NewRssFeed from './NewRssFeed'

export default function RssFeedList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { rss_feeds, loading } = useSelector((state) => state.rss_feeds)
  const { rss_feed } = useSelector((state) => state.update_rss_feed)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)

  const initial_filters = {
    name: searchParams.get('name') || '',
    url: searchParams.get('url') || '',
    rating: searchParams.get('rating') || '',
    last_sent: searchParams.get('last_sent') || '',
    status: searchParams.get('status') || '',
  }
  const [filters, setFilters] = useState(initial_filters)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedView, setSelectedView] = useState(0)

  const search_data = () => {
    dispatch(searchRssFeed(searchTerm))
  }

  const filter = () => {
    navigate({
      pathname: '/rss_feeds',
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  useEffect(() => {
    if (searchParams.size <= 0) dispatch(getAllRssFeeds())
  }, [rss_feed])

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        filterRssFeed({
          name: searchParams.get('name'),
          url: searchParams.get('url'),
          last_sent: searchParams.get('last_sent'),
          rating: searchParams.get('rating'),
          status: searchParams.get('status'),
        }),
      )
    }
  }, [searchParams])
  const search_params_for_list = getSearchParams(searchParams)

  const submit = (id, data) => {
    dispatch(updateRssFeed(id, data))
  }

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const [timeColOrder, setTimeColOrder] = useState('desc')

  const rss_feeds_items = rss_feeds
    ? rss_feeds
        .filter((item) => item.status === 'active')
        .sort((a, b) => {
          let aValue = new Date(a['created_at'])
          let bValue = new Date(b['created_at'])
          if (aValue < bValue) return timeColOrder === 'asc' ? -1 : 1
          if (aValue > bValue) return timeColOrder === 'asc' ? 1 : -1
          return 0
        })
        .slice(indexOfFirstItem, indexOfLastItem)
    : []
  const rss_feeds_length = rss_feeds ? rss_feeds.length : 0
  const rss_feeds_pages = Math.ceil(rss_feeds_length / itemsPerPage)

  const columnToDataMap = {
    Name: ['name'],
    'RSS URL': ['url'],
    'Last Sent': ['last_sent'],
    'Average Rating': ['rating'],
    Created: ['created_at'],
  }

  const [sortColumn, setSortColumn] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const sorted_rss_feeds_items = rss_feeds_items
    ? sortData(rss_feeds_items, sortColumn, sortOrder, columnToDataMap)
    : []
  rss_feeds_items

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const [sidebarVisible, setSidebarVisible] = useState(0)

  const toggleSidebar = () => {
    setSidebarVisible((prevSidebarVisible) =>
      prevSidebarVisible === 0 ? 1 : prevSidebarVisible === 1 ? 2 : 1,
    )
  }

  const styles = `
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes slideOut {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
  .slide-in {
    animation: slideIn 0.3s ease-in-out forwards;
  }
  .slide-out{
    animation: slideOut 0.3s ease-in-out forwards;
  }
  .hidden-sidebar{
    visibility: hidden;
  }
`

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
                      placeholder="Name"
                      value={filters.name}
                      onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                      id="name"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="URL"
                      value={filters.url}
                      onChange={(e) => setFilters({ ...filters, url: e.target.value })}
                      id="url"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="number"
                      placeholder="rating"
                      value={filters.rating}
                      onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                      id="rating"
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

          <div
            className="d-flex"
            style={{
              borderBottom: `1px solid ${Colors.LIGHT_GRAY}`,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 7,
            }}
          >
            <SubHeaders
              title="RSS Feeds"
              index={0}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
            />

            <style>{styles}</style>
            <CButton
              size="sm"
              type="button"
              variant="outline"
              className="mr-3 btn-configure"
              color="light"
              onClick={toggleSidebar}
              style={{
                padding: '4px 12px',
                borderRadius: 8,
                height: 36,
                backgroundColor: Colors.BLUE,
                borderColor: Colors.BLUE,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 2,
              }}
            >
              <CIcon
                icon={cilPlus}
                customClassName="nav-icon"
                style={{ height: 16, marginRight: 4 }}
              />
              Configure
            </CButton>
            {
              <>
                {/* Overlay to darken the background */}
                {sidebarVisible === 1 && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100vw',
                      height: '100vh',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 9,
                    }}
                  />
                )}
                {/* Sidebar component */}
                <div
                  className={
                    sidebarVisible === 1
                      ? 'slide-in'
                      : sidebarVisible === 2
                        ? 'slide-out'
                        : 'hidden-sidebar'
                  }
                  style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '40vw',
                    backgroundColor: '#1a1a1a',
                    boxShadow: '-2px 0 5px rgba(0,0,0,0.5)',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <NewRssFeed toggleSidebar={toggleSidebar}></NewRssFeed>
                </div>
              </>
            }
          </div>

          <div
            className="my-2 d-flex align-items-center justify-content-between"
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
              <span style={{ width: 110 }}>Rss Feeds</span>
              <span
                style={{
                  fontSize: 11,
                  marginLeft: 4,
                  marginRight: 16,
                  backgroundColor: Colors.LIGHT_GRAY,
                  borderRadius: 100,
                  padding: '4px 5px',
                }}
              >
                {rss_feeds && rss_feeds.length <= 10 ? rss_feeds.length : '10+'}
              </span>
              <TextInput
                type="text"
                placeholder="Search here...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="search"
                style={{
                  // width: '25%',
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
                  {'Sort By: Created'}
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
              className={rss_feeds && rss_feeds.length === 0 ? 'mt-3' : 'mb-0'}
            >
              {rss_feeds ? (
                rss_feeds.length === 0 ? (
                  <CTableHead className="text-center" style={{ fontSize: 16 }}>
                    No Rss Feeds Found
                  </CTableHead>
                ) : (
                  <>
                    <CTableHead>
                      <CTableRow>
                        {Object.keys(columnToDataMap).map((header) => (
                          <CTableHeaderCell
                            key={header}
                            scope="col"
                            onClick={() =>
                              handleSort(header, sortColumn, setSortColumn, sortOrder, setSortOrder)
                            }
                            style={{ fontWeight: '400', color: '#FCFCFC', cursor: 'pointer' }}
                          >
                            <div className="d-flex justify-content-start align-items-center gap-1">
                              {header}
                              <img src={sortArrow} style={{ height: '16px', width: '16px' }}></img>
                            </div>
                          </CTableHeaderCell>
                        ))}
                        <CTableHeaderCell
                          scope="col"
                          style={{ fontWeight: '400', color: '#FCFCFC', cursor: 'pointer' }}
                        >
                          Action
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {sorted_rss_feeds_items.map((feed) => (
                        <CTableRow key={feed._id}>
                          <CTableDataCell>{feed.name}</CTableDataCell>
                          <CTableDataCell>
                            <a
                              style={{ color: Colors.LINK }}
                              target="_blank"
                              href={feed.url}
                              rel="noreferrer"
                            >
                              {feed.url}
                            </a>
                          </CTableDataCell>
                          <CTableDataCell>{readableDateFromString(feed.last_sent)}</CTableDataCell>
                          <CTableDataCell>
                            <div style={ratingStyles(feed.rating)}>{feed.rating}</div>
                          </CTableDataCell>
                          {/* <CTableDataCell>
                            <CButton
                              size="sm"
                              color={feed.status === Enums.STATUS.ACTIVE ? 'success' : 'danger'}
                              variant="outline"
                              shape="rounded-pill"
                            >
                              {feed.status.toLowerCase()}
                            </CButton>
                          </CTableDataCell> */}
                          <CTableDataCell>{readableDateFromString(feed.created_at)}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              style={{ padding: '2px' }}
                              onClick={() => {
                                navigate(`/rss_feeds/${feed._id}/edit`)
                              }}
                            >
                              {<img src={editIcon} />}
                            </CButton>
                            <CButton
                              style={{ padding: '2px' }}
                              onClick={() => {
                                const isConfirmed = window.confirm(
                                  'Are you sure you want to delete this?',
                                )
                                if (isConfirmed) {
                                  const data = {
                                    name: feed.name,
                                    rating: feed.rating,
                                    url: feed.url,
                                    is_deleted: true,
                                  }
                                  submit(feed._id, data)
                                }
                              }}
                            >
                              {<img src={deleteIcon} />}
                            </CButton>
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
                            totalPages={rss_feeds_pages}
                            onPageChange={handlePageChange}
                            totalItems={rss_feeds_length}
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
        </>
      )}
    </>
  )
}
