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
//import { filterCustomer, getAllCustomers, searchCustomer } from '../../actions/CustomerActions'
import { readableDateFromString } from '../../helpers/DateHelpers'
import { getAllDataCenters } from '../../slices/DataCenterslice'
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
import { updateCustomer } from '../../slices/customerSlice'
import { toggleRightSidebar } from '../../slices/ThemeSlice'
import {
  getUsersByTenant,
  clearUserByTenantErrors,
  filterUsersByTenant,
  searchUsersByTenant,
} from '../../slices/userManagement/GetAllUsersByTenantSlice'

import {
  deleteUserByTenant,
  clearDeleteUserByTenantError,
} from '../../slices/userManagement/DeleteUserBytenantSlice'
//import { deleteUserByTenant } from '../../slices/userSlice'

import {
  filterCustomer,
  getAllCustomers,
  searchCustomer,
  clearCustomerErrors,
} from '../../slices/customerSlice'

export default function CustomersList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { customers: users, loading } = useSelector((state) => state.customer)
  const {
    users_by_tenant: userList,
    loading: user_list_loading,
    error: userListError,
  } = useSelector((state) => state.users_by_tenant)
  const { success: delete_success } = useSelector((state) => state.delete_user_by_tenant)
  const { updatedCustomerStatus: isUpdated } = useSelector((state) => state.customer)
  const { data_centers } = useSelector((state) => state.data_center)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)
  const initial_filters = {
    name: searchParams.get('name') || '',
    firstName: searchParams.get('firstName') || '',
    lastName: searchParams.get('lastName') || '',
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (delete_success) {
      dispatch(clearUserByTenantErrors())
      dispatch(clearCustomerErrors())
      dispatch(clearDeleteUserByTenantError())
    }
    setSearchParams({
      ...searchParams,
      selectedView,
    })
    selectedView === 2 && dispatch(getUsersByTenant())
  }, [selectedView, delete_success])

  const search_data = () => {
    dispatch(searchCustomer(searchTerm))
  }
  const search_email_data = () => {
    dispatch(searchUsersByTenant(searchEmail))
  }

  const filter_data = () => {
    navigate({
      pathname: '/customers',
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  const filter_user_data = () => {
    Object.keys(filters).forEach((key) => {
      if (filters[key] === '') {
        delete filters[key]
      }
    })
    Object.keys(filters).length !== 0 && dispatch(filterUsersByTenant(filters))
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }
  useEffect(() => {
    if (searchParams.size <= 0) dispatch(getAllCustomers())
    dispatch(getAllDataCenters())
  }, [])

  useEffect(() => {
    dispatch(getAllCustomers())
  }, [isUpdated])

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        filterCustomer({
          name: searchParams.get('name'),
          email: searchParams.get('email'),
          firstName: searchParams.get('firstName'),
          lastName: searchParams.get('lastName'),
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
    let updatedFieldRecords = {
      user_id: id,
      update_fields: data,
    }
    dispatch(updateCustomer(updatedFieldRecords))
  }
  const deleteUserHandler = (id) => {
    console.log('deleting user)', id)
    dispatch(deleteUserByTenant(id))
  }
  const partnerUser = users
    ? users.filter((user) => user.type === CONSTANTS.CUSTOMER_TYPE.PARTNER)
    : []
  const organizationUser = users
    ? users.filter((user) => user.type === CONSTANTS.CUSTOMER_TYPE.ORGANIZATION)
    : []
  const endUser = userList
    ? userList.filter((item) => item.user_type == 'IDP' || item.user_type == 'LOCAL')
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
      Email: ['email'],
      'Tenancy Level': ['tenancy_level'],
      Tenant: ['tenant_code'],
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

  const endUser_items = endUser
    ? endUser
        .sort((a, b) => {
          let aValue = new Date(a['user_type'])
          let bValue = new Date(b['user_type'])
          if (aValue < bValue) return timeColOrder === 'asc' ? -1 : 1
          if (aValue > bValue) return timeColOrder === 'asc' ? 1 : -1
          return 0
        })
        .slice(indexOfFirstItem, indexOfLastItem)
    : []
  const endUser_length = endUser ? endUser.length : 0
  const endUser_pages = Math.ceil(endUser_length / itemsPerPage)

  const [sortColumn, setSortColumn] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const sortedPartnerUsers = partnerUser_items
    ? sortData(partnerUser_items, sortColumn, sortOrder, columnToDataMap[0])
    : []
  const sortedOrganizationUsers = organizationUser_items
    ? sortData(organizationUser_items, sortColumn, sortOrder, columnToDataMap[0])
    : []
  const sortedEndUsers = endUser_items
    ? sortData(endUser_items, sortColumn, sortOrder, columnToUserDataMap[0])
    : []

  return (
    <>
      {loading || user_list_loading ? (
        <Loader />
      ) : (
        <>
          {selectedView === 0 && (
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
          )}
          {selectedView === 2 && (
            <AppRightSidebar>
              <CRow className="mx-2 my-4">
                <CForm>
                  <CRow>
                    <CCol>
                      <TextInput
                        type="text"
                        placeholder="First Name"
                        value={filters.firstName}
                        onChange={(e) => setFilters({ ...filters, firstName: e.target.value })}
                        id="firstName"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <TextInput
                        type="text"
                        placeholder="Last Name"
                        value={filters.lastName}
                        onChange={(e) => setFilters({ ...filters, lastName: e.target.value })}
                        id="lastName"
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
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${Colors.LIGHT_GRAY}`,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'flex-start',
              }}
            >
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
                marginTop: '15px',
                padding: '4px 12px',
                borderRadius: '8px',
                height: '36px',
                backgroundColor: Colors.BLUE,
                borderColor: Colors.BLUE,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                fontSize: '12px',
              }}
            >
              <CIcon
                icon={cilPlus}
                customClassName="nav-icon"
                style={{ height: '16px', marginRight: '4px' }}
              />
              {selectedView === 2 ? <>Add User</> : <>Add Customer</>}
            </CButton>
          </div>
          <div
            className="my-2 d-flex align-items-center justify-content-between"
            style={{
              height: 'auto',
              padding: '8px',
              borderRadius: '10px',
              backgroundColor: 'rgb(40, 40, 40)',
              flexWrap: 'wrap',
            }}
          >
            {/* {
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
            } */}
            {selectedView === 0 && (
              <div
                className="d-flex align-items-center"
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
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
                  style={{
                    flexGrow: 1,
                    minWidth: '120px',
                    maxWidth: '200px',
                  }}
                >
                  <span>Total</span>
                  <span
                    style={{
                      fontSize: '11px',
                      marginLeft: '4px',
                      marginRight: '16px',
                      backgroundColor: Colors.LIGHT_GRAY,
                      borderRadius: '100px',
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
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      position: 'relative',
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search here..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      id="search"
                      style={{
                        flexGrow: 2,
                        minWidth:
                          windowWidth <= 370 ? '10px' : windowWidth <= 768 ? '100%' : '180px',
                        maxWidth: windowWidth <= 768 ? '100%' : '400px',
                        width: windowWidth <= 370 ? '120px' : 'auto',
                        height: windowWidth <= 370 ? '30px' : '40px',

                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                      }}
                    />
                    <button
                      onClick={search_data}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '0 12px',
                        height: windowWidth <= 370 ? '36px' : '44px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease, transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                    >
                      <img
                        src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtNTMzLWljb24tMjlfMS5wbmc.png"
                        alt="Search Icon"
                        style={{
                          width: '20px',
                          height: '20px',
                          display: 'block', // Ensures no inline spacing
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {selectedView === 2 && (
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

                    '@media (max-width: 380px)': {
                      marginBottom: '19px',
                    },
                  }}
                  trailIcon={cilMagnifyingGlass}
                  trailIconClick={search_email_data}
                />
              </div>
            )}

            <div
              className="d-flex justify-content-start align-items-center gap-2 md:mt-5"
              style={{
                flexWrap: 'wrap',
                '@media (max-width: 768px)': {
                  marginTop: '10px',
                },
                '@media (max-width: 380px)': {
                  marginTop: '10px',
                },
              }}
            >
              <CButton
                size="sm"
                type="submit"
                color="primary"
                variant="outline"
                shape="rounded-pill"
                style={{
                  fontSize: '13px',
                  color: Colors.WHITE,
                  padding: '5px 10px',

                  // Media query for small (sm) and medium (md) devices
                }}
                onClick={() => dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))}
              >
                <div className="flex justify-start items-center gap-1 sm:ml-6 ml-10 ">
                  <img src={filterIcon} alt="Filter" className="w-4 h-4" />
                  <span className="text-sm text-gray-700">Add Filter</span>
                </div>
              </CButton>
              <CButton
                size="sm"
                type="submit"
                color="primary"
                variant="outline"
                shape="rounded-pill"
                style={{
                  fontSize: '13px',
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
                {userList.length === 0 ? (
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
                      {sortedEndUsers &&
                        sortedEndUsers.map((user) => (
                          <CTableRow key={user._id}>
                            <CTableDataCell>{user.email}</CTableDataCell>
                            <CTableDataCell>{user.tenancy_level}</CTableDataCell>
                            <CTableDataCell>{user.tenant_name}</CTableDataCell>
                            <CTableDataCell>{user.user_type}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                style={{ padding: '2px' }}
                                onClick={() => {
                                  navigate(`/users/${user.user_id}/edit`)
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
                                    deleteUserHandler(user.user_id)
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
                            totalPages={endUser_pages}
                            onPageChange={handlePageChange}
                            totalItems={endUser_length}
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
