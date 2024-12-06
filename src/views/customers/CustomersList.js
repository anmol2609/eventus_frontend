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
import { CONSTANTS } from '../../utils/constants'
import Enums from '../../utils/Enums'
import { filterCustomer, getAllCustomers, searchCustomer } from '../../actions/CustomerActions'
import { readableDateFromString } from '../../helpers/DateHelpers'
import { toggleRightSidebar } from '../../actions/ThemeActions'
import { getAllDataCenters } from '../../actions/DataCenterActions'
import '../index.css'
import Loader from '../../components/Loader'
import { cilMagnifyingGlass } from '@coreui/icons'
import ShowAllFilters from '../../components/ShowAllFilters'
import { getSearchParams } from '../../helpers/GetSearchParams'
import { Colors } from '../../utils/colors'
import sortArrow from '../../assets/images/sortArrow.svg'
import { handleSort, sortData } from '../../helpers/SortHelpers'
import { SubHeaders } from '../../helpers/SubHeaders'
import Pagination from '../../components/Pagination'
import filterIcon from '../../assets/images/filterIcon.svg'
import sortByIcon from '../../assets/images/sortByIcon.svg'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import deleteIcon from '../../assets/images/deleteIcon.svg'
import editIcon from '../../assets/images/editIcon.svg'
import { updateCustomer } from '../../actions/CustomerActions'
import { filterUser, getAllUsers,searchUserByEmail,DeleteUser } from '../../actions/UserActions'
import { getAllUsersData, deleteUserData, clearUserErrors, filterUserData, searchUserData} from '../../slices/userSlice'

export default function CustomersList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { users, loading } = useSelector((state) => state.customers)
  const { userList, loading: user_list_loading, error: userListError} = useSelector((state) => state.user)
  const { deletedUserStatus:delete_success} = useSelector((state) => state.user)
  const { customer } = useSelector((state) => state.update_customer)
  const { data_centers } = useSelector((state) => state.data_centers)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)
  const initial_filters = {
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    tenant_code: searchParams.get('tenant_code') || '',
    tenancy_level: searchParams.get('tenancy_level') || '',
    status: searchParams.get('status') || '',
    type: searchParams.get('type') || '',
    data_center: searchParams.get('data_center') || '',
  }
  const [filters, setFilters] = useState(initial_filters)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedView, setSelectedView] = useState(parseInt(searchParams.get('selectedView')) || 0)
  const [searchEmail, setSearchEmail] = useState('')
  
  useEffect(() => {
    if(delete_success){
      dispatch(clearUserErrors());
    }
    setSearchParams({
      ...searchParams,
      selectedView,
    })
    selectedView === 2 && dispatch(getAllUsersData())
    
  }, [selectedView,delete_success])

  const search_data = () => {
    dispatch(searchCustomer(searchTerm))
  }
  const search_email_data = () => {
    dispatch(searchUserData(searchEmail))
  }
  

  const filter_data = () => {
    navigate({
      pathname: '/customers',
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  const filter_user_data = () => {
    Object.keys(filters).forEach((key)=>{
      if(filters[key] === ""){
        delete filters[key]
      }
    })
    dispatch(filterUserData(filters))
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }
  useEffect(() => {
    if (searchParams.size <= 0) dispatch(getAllCustomers())
    dispatch(getAllDataCenters())
  }, [])

  useEffect(() => {
    dispatch(getAllCustomers())
  }, [customer])

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        filterCustomer({
          name: searchParams.get('name'),
          email: searchParams.get('email'),
          tenant_code: searchParams.get('tenant_code'),
          tenancy_level: searchParams.get('tenancy_level'),
          status: searchParams.get('status'),
          type: searchParams.get('type'),
          data_center: searchParams.get('data_center'),
        }),
      )
    }
  }, [searchParams])

  const search_params_for_list = getSearchParams(searchParams)

  const submit = (id, data) => {
    dispatch(updateCustomer(id, data))
  }
  const deleteUserHandler = (id) => {
    dispatch(deleteUserData(id))
  }
  const partnerUser = users
    ? users.filter((user) => user.type === CONSTANTS.CUSTOMER_TYPE.PARTNER)
    : []
  const organizationUser = users
    ? users.filter((user) => user.type === CONSTANTS.CUSTOMER_TYPE.ORGANIZATION)
    : []

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const columnToDataMap = [
    {
      Name: ['name'],
      'Tenant Code': ['tenant_code'],
      'Data Center': ['data_center', 'name'],
      'Tenancy Level': ['tenancy_level'],
      Status: ['status'],
      Created: ['created_at'],
    },
  ]
  const columnToUserDataMap = [
    {
      'Email': ['email'],
      'Tenancy Level': ['tenancy_level'],
      'Tenant': ['tenant_code'],
      'User Type': ['tenancy_level'],
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const [timeColOrder, setTimeColOrder] = useState('desc')

  const partnerUser_items = partnerUser
    ? partnerUser
        .sort((a, b) => {
          let aValue = new Date(a['created_at'])
          let bValue = new Date(b['created_at'])
          if (aValue < bValue) return timeColOrder === 'asc' ? -1 : 1
          if (aValue > bValue) return timeColOrder === 'asc' ? 1 : -1
          return 0
        })
        .slice(indexOfFirstItem, indexOfLastItem)
    : []
  const partnerUser_length = partnerUser ? partnerUser.length : 0
  const partnerUser_pages = Math.ceil(partnerUser_length / itemsPerPage)
  const organizationUser_items = organizationUser
    ? organizationUser
        .sort((a, b) => {
          let aValue = new Date(a['created_at'])
          let bValue = new Date(b['created_at'])
          if (aValue < bValue) return timeColOrder === 'asc' ? -1 : 1
          if (aValue > bValue) return timeColOrder === 'asc' ? 1 : -1
          return 0
        })
        .slice(indexOfFirstItem, indexOfLastItem)
    : []
  const organizationUser_length = organizationUser ? organizationUser.length : 0
  const organizationUser_pages = Math.ceil(organizationUser_length / itemsPerPage)

  const [sortColumn, setSortColumn] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const sortedPartnerUsers = partnerUser_items
    ? sortData(partnerUser_items, sortColumn, sortOrder, columnToDataMap[0])
    : []
  const sortedOrganizationUsers = organizationUser_items
    ? sortData(organizationUser_items, sortColumn, sortOrder, columnToDataMap[0])
    : []

  return (
    <>
      {loading || user_list_loading ? (
        <Loader />
      ) : (
        <>
          {selectedView === 0 &&
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
                      placeholder="Email"
                      value={filters.email}
                      onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                      id="email"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Tenant Code"
                      value={filters.tenant_code}
                      onChange={(e) => setFilters({ ...filters, tenant_code: e.target.value })}
                      id="tenant_code"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <SelectBox
                      id="type"
                      defaultOption="Select Tenancy Level"
                      onChange={(e) => setFilters({ ...filters, tenancy_level: e.target.value })}
                      options={Object.keys(CONSTANTS.TENANCY_LEVEL).map((item) => (
                        <option key={item} value={CONSTANTS.TENANCY_LEVEL[item]}>
                          {CONSTANTS.TENANCY_LEVEL[item]}
                        </option>
                      ))}
                      value={filters.tenancy_level}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <SelectBox
                      id="customer_type"
                      defaultOption="Select Customer Type"
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                      options={Object.keys(CONSTANTS.CUSTOMER_TYPE).map((item) => (
                        <option key={item} value={CONSTANTS.CUSTOMER_TYPE[item]}>
                          {CONSTANTS.CUSTOMER_TYPE[item]}
                        </option>
                      ))}
                      value={filters.type}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <SelectBox
                      id="data_center"
                      defaultOption="Select Data Center"
                      onChange={(e) => setFilters({ ...filters, data_center: e.target.value })}
                      options={
                        data_centers &&
                        data_centers.map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        ))
                      }
                      value={filters.data_center}
                    />
                  </CCol>
                </CRow>

                <div className="d-grid gap-2">
                  <CButton size="sm" type="submit" color="primary" onClick={filter_data}>
                    Filter
                  </CButton>
                </div>
              </CForm>
            </CRow>
          </AppRightSidebar>
          }
          {selectedView === 2 &&
          <AppRightSidebar>
            <CRow className="mx-2 my-4">
              <CForm>
                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="First Name"
                      value={filters.name}
                      onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                      id="firstName"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <SelectBox
                      id="type"
                      defaultOption="Select Tenancy Level"
                      onChange={(e) => setFilters({ ...filters, tenancy_level: e.target.value })}
                      options={Object.keys(CONSTANTS.TENANCY_LEVEL).map((item) => (
                        <option key={item} value={CONSTANTS.TENANCY_LEVEL[item]}>
                          {CONSTANTS.TENANCY_LEVEL[item]}
                        </option>
                      ))}
                      value={filters.tenancy_level}
                    />
                  </CCol>
                </CRow>
                <div className="d-grid gap-2">
                  <CButton size="sm" type="submit" color="primary" onClick={filter_user_data}>
                    Filter
                  </CButton>
                </div>
              </CForm>
            </CRow>
          </AppRightSidebar>
          }
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ borderBottom: `1px solid ${Colors.LIGHT_GRAY}` }}
          >
            <div className="d-flex">
              <SubHeaders
                title="Partners"
                index={0}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                setCurrentPage={setCurrentPage}
              />
              <SubHeaders
                title="Organizations"
                index={1}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                setCurrentPage={setCurrentPage}
              />
              <SubHeaders
                title="Users"
                index={2}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                setCurrentPage={setCurrentPage}
              />
            </div>

            <CButton
              size="sm"
              type="submit"
              variant="outline"
              className="mr-3 btn-configure"
              color="light"
              onClick={() => {
                selectedView === 2
                ? navigate('/users/new', {
                  state: {
                    user_type: 'local',
                  },
                }) 
                : navigate('/customers/new', {
                  state: {
                    customer_type:
                      selectedView === 0
                        ? CONSTANTS.CUSTOMER_TYPE.PARTNER
                        : CONSTANTS.CUSTOMER_TYPE.ORGANIZATION,
                  },
                })
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
              {selectedView === 2 ? <>Add User</>: <>Add Customer</>}
            </CButton>
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
            {
              selectedView === 0 && (
            <div
              className="mr-4"
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              <div
                style={{
                  height: '30px',
                  width: '12px',
                  marginRight: '6px',
                  borderRadius: '8px',
                  backgroundColor: Colors.PINK,
                }}
              ></div>
              <div
                className="d-flex justify-content-between align-items-center gap-10"
                style={{ width: '83px', height: '32px' }}
              >
                <span>Total</span>
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
                  {selectedView === 0
                    ? partnerUser && partnerUser.length <= 100
                      ? partnerUser.length
                      : '100+'
                    : organizationUser && organizationUser.length <= 100
                      ? organizationUser.length
                      : '100+'}
                </span>
              </div>

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
              )
            }
            {
              selectedView === 2 && (
                <div
                  className="mr-4"
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                >
                  <div
                    style={{
                      height: '30px',
                      width: '12px',
                      marginRight: '6px',
                      borderRadius: '8px',
                      backgroundColor: Colors.PINK,
                    }}
                  ></div>
                  <div
                    className="d-flex justify-content-between align-items-center gap-10"
                    style={{ width: '83px', height: '32px' }}
                  >
                    <span>Total</span>
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
                     {typeof userListError === 'undefined' ? userList.length : 0}
                    </span>
                  </div>

                  <TextInput
                    type="text"
                    placeholder="Search here...."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    id="search"
                    style={{
                      // width: '25%',
                      backgroundColor: 'rgb(31, 31, 31)',
                      height: 40,
                      marginBottom: 0,
                    }}
                    trailIcon={cilMagnifyingGlass}
                    trailIconClick={search_email_data}
                  />
                </div>
              )
            }
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
                  {'Sort By: Date'}
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
          {/*Partners */}
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
                className={users && users.length === 0 ? 'mt-3' : 'mb-0'}
              >
                {users && users.length === 0 ? (
                  <CTableHead className="text-center" style={{ fontSize: 16 }}>
                    No Customers Found
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
                      {sortedPartnerUsers.map((user) => (
                        <CTableRow key={user._id}>
                          <CTableDataCell>{user.name}</CTableDataCell>
                          <CTableDataCell>{user.tenant_code}</CTableDataCell>
                          <CTableDataCell>{user['data_center'].name}</CTableDataCell>
                          <CTableDataCell>{user.tenancy_level}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color={user.status === Enums.STATUS.ACTIVE ? 'success' : 'danger'}
                              variant="outline"
                              shape="rounded-pill"
                            >
                              {user.status.toLowerCase()}
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>{readableDateFromString(user.created_at)}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              style={{ padding: '2px' }}
                              onClick={() => {
                                navigate(`/customers/${user._id}/edit`)
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
                                    type: user.type,
                                    name: user.name,
                                    email: user.email,
                                    tenancy_level: user.tenancy_level,
                                    tenant_code: user.tenant_code,
                                    data_center: user.data_center._id,
                                    status: user.status,
                                    is_deleted: true,
                                    uuid: user.uuid,
                                  }
                                  submit(user._id, data)
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
                        <CTableDataCell colSpan="8">
                          {' '}
                          <Pagination
                            currentPage={currentPage}
                            totalPages={partnerUser_pages}
                            onPageChange={handlePageChange}
                            totalItems={partnerUser_length}
                            itemsPerPage={itemsPerPage}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    </CTableFoot>
                  </>
                )}
              </CTable>
            </CCard>
          )}

          {/*Organizations */}
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
                className={users && users.length === 0 ? 'mt-3' : 'mb-0'}
              >
                {users ? (
                  users.length === 0 ? (
                    <CTableHead className="text-center" style={{ fontSize: 16 }}>
                      No Customers Found
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
                          <CTableHeaderCell
                            scope="col"
                            style={{ fontWeight: '400', color: '#FCFCFC', cursor: 'pointer' }}
                          >
                            Action
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {sortedOrganizationUsers.map((user) => (
                          <CTableRow key={user._id}>
                            <CTableDataCell>{user.name}</CTableDataCell>
                            <CTableDataCell>{user.tenant_code}</CTableDataCell>
                            <CTableDataCell>{user['data_center'].name}</CTableDataCell>
                            <CTableDataCell>{user.tenancy_level}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                size="sm"
                                color={user.status === Enums.STATUS.ACTIVE ? 'success' : 'danger'}
                                variant="outline"
                                shape="rounded-pill"
                              >
                                {user.status.toLowerCase()}
                              </CButton>
                            </CTableDataCell>
                            <CTableDataCell>
                              {readableDateFromString(user.created_at)}
                            </CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                style={{ padding: '2px' }}
                                onClick={() => {
                                  navigate(`/customers/${user._id}/edit`)
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
                                      type: user.type,
                                      name: user.name,
                                      email: user.email,
                                      tenancy_level: user.tenancy_level,
                                      tenant_code: user.tenant_code,
                                      data_center: user.data_center._id,
                                      status: user.status,
                                      is_deleted: true,
                                      uuid: user.uuid,
                                    }
                                    submit(user._id, data)
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
                          <CTableDataCell colSpan="8">
                            {' '}
                            <Pagination
                              currentPage={currentPage}
                              totalPages={organizationUser_pages}
                              onPageChange={handlePageChange}
                              totalItems={organizationUser_length}
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

          {/*Users */}
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
                className={userList && userList.length === 0 ? 'mt-3' : 'mb-0'}
              >
                { userList.length === 0 ? (
                  <CTableHead className="text-center" style={{ fontSize: 16 }}>
                    No User Found
                  </CTableHead>
                ) : (
                  <>
                    <CTableHead>
                      <CTableRow>
                        {Object.keys(columnToUserDataMap[0]).map((header) => (
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
                      {userList.map((user) => (
                        <CTableRow key={user._id}>
                          <CTableDataCell>{user.email}</CTableDataCell>
                          <CTableDataCell>{user.tenancy_level}</CTableDataCell>
                          <CTableDataCell>{user.tenant_name}</CTableDataCell>
                          <CTableDataCell>{user.user_type}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              style={{ padding: '2px' }}
                              onClick={() => {
                                navigate(`/users/${user._id}/edit`)
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
                                  deleteUserHandler(user._id)
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
                        <CTableDataCell colSpan="8">
                          {' '}
                          <Pagination
                            currentPage={currentPage}
                            totalPages={partnerUser_pages}
                            onPageChange={handlePageChange}
                            totalItems={partnerUser_length}
                            itemsPerPage={itemsPerPage}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    </CTableFoot>
                  </>
                )}
              </CTable>
            </CCard>
          )}
        </>
      )}
    </>
  )
}
