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
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import SelectBox from '../../components/Form/SelectBox'
import { AppRightSidebar } from '../../components'
import TextInput from '../../components/Form/TextInput'
import { CONSTANTS } from '../../utils/constants'
import Enums from '../../utils/Enums'
import { readableDateFromString } from '../../helpers/DateHelpers'
import { toggleRightSidebar } from '../../actions/ThemeActions'
import '../index.css'
import {
  filterDataCenter,
  getAllDataCenters,
  searchDataCenter,
  updateDataCenter,
} from '../../actions/DataCenterActions'
import Loader from '../../components/Loader'
import { cilMagnifyingGlass } from '@coreui/icons'
import ShowAllFilters from '../../components/ShowAllFilters'
import { getSearchParams } from '../../helpers/GetSearchParams'
import { Colors } from '../../utils/colors'
import { handleSort, sortData } from '../../helpers/SortHelpers'
import sortArrow from '../../assets/images/sortArrow.svg'
import deleteIcon from '../../assets/images/deleteIcon.svg'
import editIcon from '../../assets/images/editIcon.svg'
import { SubHeaders } from '../../helpers/SubHeaders'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

export default function DataCenterList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data_centers, loading } = useSelector((state) => state.data_centers)
  const { data_center } = useSelector((state) => state.update_data_center)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)

  const initial_filters = {
    name: searchParams.get('name') || '',
    description: searchParams.get('description') || '',
    ip_address: searchParams.get('ip_address') || '',
    port: searchParams.get('port') || '',
    status: searchParams.get('status') || '',
  }
  const [filters, setFilters] = useState(initial_filters)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedView, setSelectedView] = useState(0)

  const search_data = () => {
    dispatch(searchDataCenter(searchTerm))
  }

  const filter = () => {
    navigate({
      pathname: '/data_centers',
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  useEffect(() => {
    if (searchParams.size <= 0) dispatch(getAllDataCenters())
  }, [data_center])

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        filterDataCenter({
          name: searchParams.get('name'),
          description: searchParams.get('description'),
          ip_address: searchParams.get('ip_address'),
          port: searchParams.get('port'),
          status: searchParams.get('status'),
        }),
      )
    }
  }, [searchParams])
  const search_params_for_list = getSearchParams(searchParams)

  const submit = (id, dataCenter) => {
    dispatch(updateDataCenter(id, dataCenter))
  }
  const columnToDataMap = [
    {
      Name: ['name'],
      Description: ['description'],
      'IP Address': ['ip_address'],
      Port: ['port'],
      Status: ['status'],
      'Created on': ['created_at'],
    },
  ]
  const [sortColumn, setSortColumn] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const sorted_data_centers = data_centers
    ? sortData(data_centers, sortColumn, sortOrder, columnToDataMap[0])
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
                </CRow>

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
                      placeholder="Description"
                      value={filters.description}
                      onChange={(e) => setFilters({ ...filters, description: e.target.value })}
                      id="description"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="number"
                      placeholder="IP Address"
                      value={filters.ip_address}
                      onChange={(e) => setFilters({ ...filters, ip_address: e.target.value })}
                      id="ip_address"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Port"
                      value={filters.port}
                      onChange={(e) => setFilters({ ...filters, port: e.target.value })}
                      id="port"
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
            className="d-flex justify-content-between align-items-center"
            style={{ borderBottom: `1px solid ${Colors.LIGHT_GRAY}` }}
          >
            <div className="d-flex">
              <SubHeaders
                title="Data Center"
                index={0}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
              />
            </div>

            <CButton
              size="sm"
              type="submit"
              variant="outline"
              className="mr-3 btn-configure"
              color="light"
              onClick={() => {
                navigate('/data_centers/new')
              }}
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
              Add New
            </CButton>
          </div>
          {/* Filters here */}
          <ShowAllFilters
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            search_params_for_list={search_params_for_list}
          />

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
              className={data_centers && data_centers.length === 0 ? 'mt-3' : 'mb-0'}
            >
              {data_centers ? (
                data_centers.length === 0 ? (
                  <CTableHead className="text-center" style={{ fontSize: 16 }}>
                    No Data Centers Found
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
                                header.toLowerCase(),
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
                      {sorted_data_centers.map((data_center) => (
                        <CTableRow key={data_center._id}>
                          <CTableDataCell>{data_center.name}</CTableDataCell>
                          <CTableDataCell>{data_center.description}</CTableDataCell>
                          <CTableDataCell>{data_center.ip_address}</CTableDataCell>
                          <CTableDataCell>{data_center.port}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color={
                                data_center.status === Enums.STATUS.ACTIVE ? 'success' : 'danger'
                              }
                              variant="outline"
                              shape="rounded-pill"
                            >
                              {data_center.status.toLowerCase()}
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            {readableDateFromString(data_center.created_at)}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              style={{ padding: '2px' }}
                              onClick={() => {
                                navigate(`/data_centers/${data_center._id}/edit`)
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
                                    name: data_center.name,
                                    description: data_center.description,
                                    ip_address: data_center.ip_address,
                                    port: data_center.port,
                                    is_deleted: true,
                                  }
                                  submit(data_center._id, data)
                                }
                              }}
                            >
                              {<img src={deleteIcon} />}
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
