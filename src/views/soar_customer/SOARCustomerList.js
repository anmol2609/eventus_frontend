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
//import { getAllCustomers } from '../../actions/CustomerActions'
import { getAllCustomers } from '../../slices/customerSlice'
import { readableDateFromString } from '../../helpers/DateHelpers'
import { toggleRightSidebar } from '../../slices/ThemeSlice'
import '../index.css'
import {
  filterSOARCustomer,
  getAllSOARCustomers,
  searchSOARCustomer,
} from '../../slices/SOARCustomer/GetAllSOARCustomersSlice'
import { Colors } from '../../utils/colors'
import Loader from '../../components/Loader'
import { cilMagnifyingGlass } from '@coreui/icons'
import { getSearchParams } from '../../helpers/GetSearchParams'
import ShowAllFilters from '../../components/ShowAllFilters'

export default function SOARCustomersList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { users } = useSelector((state) => state.customers)
  const { SOAR_customers, loading } = useSelector((state) => state.SOAR_customers)
  const { SOAR_customer } = useSelector((state) => state.update_SOAR_customer)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)

  const initial_filters = {
    customer: searchParams.get('customer') || '',
    url: searchParams.get('url') || '',
    api_key: searchParams.get('api_key') || '',
    status: searchParams.get('status') || '',
  }
  const [filters, setFilters] = useState(initial_filters)
  const [searchTerm, setSearchTerm] = useState('')

  const search_data = () => {
    dispatch(searchSOARCustomer(searchTerm))
  }

  const filter = () => {
    navigate({
      pathname: '/soar_customers',
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  useEffect(() => {
    if (searchParams.size <= 0) dispatch(getAllSOARCustomers())
    dispatch(getAllCustomers())
  }, [SOAR_customer])

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        filterSOARCustomer({
          customer: searchParams.get('customer'),
          url: searchParams.get('url'),
          api_key: searchParams.get('api_key'),
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
                      placeholder="API Key"
                      value={filters.api_key}
                      onChange={(e) => setFilters({ ...filters, api_key: e.target.value })}
                      id="api_key"
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

                <div className="d-grid gap-2">
                  <CButton size="sm" type="submit" color="primary" onClick={filter}>
                    Filter
                  </CButton>
                </div>
              </CForm>
            </CRow>
          </AppRightSidebar>
          <div
            className="callout callout-success d-flex align-items-center justify-content-between gap-3"
            style={{
              height: 55,
              backgroundColor: 'rgb(40, 40, 40)',
            }}
          >
            <span className="mr-4">SOAR Customers</span>
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
                navigate('/soar_customers/new')
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
              className={SOAR_customers && SOAR_customers.length === 0 ? 'mt-3' : 'mb-0'}
            >
              {SOAR_customers ? (
                SOAR_customers.length === 0 ? (
                  <CTableHead className="text-center" style={{ fontSize: 16 }}>
                    No SOAR Customers Found
                  </CTableHead>
                ) : (
                  <>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">API Key</CTableHeaderCell>
                        <CTableHeaderCell scope="col">URL</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Created</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {SOAR_customers.map((user) => (
                        <CTableRow key={user._id}>
                          <CTableDataCell>{user['customer'].name}</CTableDataCell>
                          <CTableDataCell>{user.api_key}</CTableDataCell>
                          <CTableDataCell>
                            <a
                              style={{ color: Colors.LINK }}
                              target="_blank"
                              href={user.url}
                              rel="noreferrer"
                            >
                              {user.url}
                            </a>
                          </CTableDataCell>
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
                                navigate(`/soar_customers/${user._id}/edit`)
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
