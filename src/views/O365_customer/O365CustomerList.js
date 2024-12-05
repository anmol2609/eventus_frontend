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
import { getAllCustomers } from '../../actions/CustomerActions'
import { readableDateFromString } from '../../helpers/DateHelpers'
import { toggleRightSidebar } from '../../actions/ThemeActions'
import '../index.css'
import {
  filterO365Customer,
  getAllO365Customers,
  searchO365Customer,
} from '../../actions/O365CustomerActions'
import Loader from '../../components/Loader'
import { cilMagnifyingGlass } from '@coreui/icons'
import ShowAllFilters from '../../components/ShowAllFilters'
import { getSearchParams } from '../../helpers/GetSearchParams'

export default function O365CustomersList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { users } = useSelector((state) => state.customers)
  const { O365_customers, loading } = useSelector((state) => state.O365_customers)
  const { O365_customer } = useSelector((state) => state.update_O365_customer)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)

  const initial_filters = {
    customer: searchParams.get('customer') || '',
    tenant_id: searchParams.get('tenant_id') || '',
    client_id: searchParams.get('client_id') || '',
    client_secret: searchParams.get('client_secret') || '',
    product_name: searchParams.get('product_name') || '',
    product_type: searchParams.get('product_type') || '',
    product_module: searchParams.get('product_module') || '',
    log_type: searchParams.get('log_type') || '',
    status: searchParams.get('status') || '',
  }
  const [filters, setFilters] = useState(initial_filters)
  const [searchTerm, setSearchTerm] = useState('')

  const search_data = () => {
    dispatch(searchO365Customer(searchTerm))
  }

  const filter_data = () => {
    navigate({
      pathname: '/O365_customers',
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  useEffect(() => {
    if (searchParams.size <= 0) dispatch(getAllO365Customers())
    dispatch(getAllCustomers())
  }, [O365_customer])

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        filterO365Customer({
          customer: searchParams.get('customer'),
          tenant_id: searchParams.get('tenant_id'),
          client_id: searchParams.get('client_id'),
          client_secret: searchParams.get('client_secret'),
          product_name: searchParams.get('product_name'),
          product_type: searchParams.get('product_type'),
          product_module: searchParams.get('product_module'),
          log_type: searchParams.get('log_type'),
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
                    <SelectBox
                      id="customer"
                      defaultOption="Select Customer"
                      onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
                      options={
                        users &&
                        users.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))
                      }
                      value={filters.customer}
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Tenant Id"
                      value={filters.tenant_id}
                      onChange={(e) => setFilters({ ...filters, tenant_id: e.target.value })}
                      id="tenant_id"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Client Id"
                      value={filters.client_id}
                      onChange={(e) => setFilters({ ...filters, client_id: e.target.value })}
                      id="client_id"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Client Secret"
                      value={filters.client_secret}
                      onChange={(e) => setFilters({ ...filters, client_secret: e.target.value })}
                      id="client_secret"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Product Name"
                      value={filters.product_name}
                      onChange={(e) => setFilters({ ...filters, product_name: e.target.value })}
                      id="product_name"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Product Type"
                      value={filters.product_type}
                      onChange={(e) => setFilters({ ...filters, product_type: e.target.value })}
                      id="product_type"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Product Module"
                      value={filters.product_module}
                      onChange={(e) => setFilters({ ...filters, product_module: e.target.value })}
                      id="product_module"
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
          <div
            className="callout callout-warning d-flex align-items-center justify-content-between gap-3"
            style={{
              height: 55,
              backgroundColor: 'rgb(40, 40, 40)',
            }}
          >
            <span className="mr-4">O365 Customers</span>
            <TextInput
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
            />

            <CButton
              size="sm"
              type="submit"
              color="primary"
              variant="outline"
              onClick={() => dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))}
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
                navigate('/O365_customers/new')
              }}
            >
              New
            </CButton>
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
              className={O365_customers && O365_customers.length === 0 ? 'mt-3' : 'mb-0'}
            >
              {O365_customers ? (
                O365_customers.length === 0 ? (
                  <CTableHead className="text-center" style={{ fontSize: 16 }}>
                    No O365 Customers Found
                  </CTableHead>
                ) : (
                  <>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Tenant Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Client Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Client Secret</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Product Module</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Log Type</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Created</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {O365_customers.map((user) => (
                        <CTableRow key={user._id}>
                          <CTableDataCell>{user['customer'].name}</CTableDataCell>
                          <CTableDataCell>{user.tenant_id}</CTableDataCell>
                          <CTableDataCell>{user.client_id}</CTableDataCell>
                          <CTableDataCell>{user.client_secret}</CTableDataCell>
                          <CTableDataCell>{user.product_name}</CTableDataCell>
                          <CTableDataCell>{user.product_type}</CTableDataCell>
                          <CTableDataCell>{user.product_module}</CTableDataCell>
                          <CTableDataCell>{user.log_type}</CTableDataCell>
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
                              size="sm"
                              color="primary"
                              variant="outline"
                              onClick={() => {
                                navigate(`/O365_customers/${user._id}/edit`)
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
