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
import {
  filterAWSCustomer,
  getAllAWSCustomers,
  searchAWSCustomer,
} from '../../slices/awsCustomer/GetAllAWSCustomersSlice'
import { readableDateFromString } from '../../helpers/DateHelpers'
import Enums from '../../utils/Enums'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { toggleRightSidebar } from '../../slices/ThemeSlice'
import { AppRightSidebar } from '../../components'
import { CONSTANTS } from '../../utils/constants'
import '../index.css'
import TextInput from '../../components/Form/TextInput'
import SelectBox from '../../components/Form/SelectBox'
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination'
import { cilMagnifyingGlass } from '@coreui/icons'
import ShowAllFilters from '../../components/ShowAllFilters'
import { getSearchParams } from '../../helpers/GetSearchParams'
import { Colors } from '../../utils/colors'
import { handleSort, sortData } from '../../helpers/SortHelpers'
import sortArrow from '../../assets/images/sortArrow.svg'

const AWSCustomer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { loading, aws_customers } = useSelector((state) => state.all_aws_customers)
  const { aws_customer } = useSelector((state) => state.update_aws_customer)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)

  const initial_filters = {
    status: '',
    parent_folder: '',
    bucket_name: '',
    access_key_id: '',
    secret_access_key: '',
    product_name: '',
    product_type: '',
    product_module: '',
  }
  const [filters, setFilters] = useState(initial_filters)
  const [searchTerm, setSearchTerm] = useState('')

  const filter_data = () => {
    navigate({
      pathname: '/aws_customers',
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  const search_data = () => {
    dispatch(searchAWSCustomer(searchTerm))
  }

  useEffect(() => {
    if (searchParams.size <= 0) dispatch(getAllAWSCustomers())
  }, [aws_customer])

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        filterAWSCustomer({
          status: searchParams.get('status'),
          parent_folder: searchParams.get('parent_folder'),
          bucket_name: searchParams.get('bucket_name'),
          access_key_id: searchParams.get('access_key_id'),
          product_name: searchParams.get('product_name'),
          product_type: searchParams.get('product_type'),
          product_module: searchParams.get('product_module'),
        }),
      )
    }
  }, [searchParams])

  const search_params_for_list = getSearchParams(searchParams)

  const [sortColumn, setSortColumn] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const sorted_aws_customers = aws_customers ? sortData(aws_customers, sortColumn, sortOrder) : []

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
                      id="customer_status"
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
                      placeholder="Parent Folder"
                      value={filters.parent_folder}
                      onChange={(e) => setFilters({ ...filters, parent_folder: e.target.value })}
                      id="parent_folder"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Access Key Id"
                      value={filters.access_key_id}
                      onChange={(e) => setFilters({ ...filters, access_key_id: e.target.value })}
                      id="access_key_id"
                    />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Secret Access Key"
                      value={filters.secret_access_key}
                      onChange={(e) =>
                        setFilters({ ...filters, secret_access_key: e.target.value })
                      }
                      id="secret_access_key"
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

                <CRow>
                  <CCol>
                    <TextInput
                      type="text"
                      placeholder="Bucket Name"
                      value={filters.bucket_name}
                      onChange={(e) => setFilters({ ...filters, bucket_name: e.target.value })}
                      id="bucket_name"
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
              style={{
                height: '30px',
                width: '6px',
                borderRadius: '10px 10px 10px 10px',
                backgroundColor: Colors.PINK,
              }}
            ></div>
            <span className="mr-4">Aws Customers</span>
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
              onClick={() => {
                navigate('/aws_customers/new')
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
              className={aws_customers && aws_customers.length === 0 ? 'mt-3' : 'sortable mb-0'}
            >
              {aws_customers ? (
                aws_customers.length === 0 ? (
                  <CTableHead className="text-center" style={{ fontSize: 16 }}>
                    No AWS Customer Found
                  </CTableHead>
                ) : (
                  <>
                    <CTableHead>
                      <CTableRow>
                        {[
                          'Customer',
                          'Bucket Name',
                          'Parent Folder',
                          'Access Key Id',
                          'Secret Access Key',
                          'Product Name',
                          'Product Type',
                          'Product Module',
                          'Log Type',
                          'Status',
                          'Created',
                        ].map((header) => (
                          <CTableHeaderCell
                            key={header}
                            scope="col"
                            onClick={() =>
                              handleSort(
                                header.toLowerCase().replace(' ', '_'),
                                sortColumn,
                                setSortColumn,
                                sortOrder,
                                setSortOrder,
                              )
                            }
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="d-flex justify-content-start align-items-center gap-1">
                              {header}
                              <img src={sortArrow} style={{ height: '16px', width: '16px' }}></img>
                            </div>
                          </CTableHeaderCell>
                        ))}
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {sorted_aws_customers.map((customer) => (
                        <CTableRow key={customer._id}>
                          <CTableDataCell>{customer['customer'].name}</CTableDataCell>
                          <CTableDataCell>{customer.bucket_name}</CTableDataCell>
                          <CTableDataCell>{customer.parent_folder}</CTableDataCell>
                          <CTableDataCell>{customer.access_key_id}</CTableDataCell>
                          <CTableDataCell>{customer.secret_access_key}</CTableDataCell>
                          <CTableDataCell>{customer.product_name}</CTableDataCell>
                          <CTableDataCell>{customer.product_type}</CTableDataCell>
                          <CTableDataCell>{customer.product_module}</CTableDataCell>
                          <CTableDataCell>{customer.log_type}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color={customer.status === Enums.STATUS.ACTIVE ? 'success' : 'danger'}
                              variant="outline"
                              shape="rounded-pill"
                            >
                              {customer.status.toLowerCase()}
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            {readableDateFromString(customer.created_at)}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color="primary"
                              variant="outline"
                              onClick={() => {
                                navigate(`/aws_customers/${customer._id}/edit`)
                              }}
                            >
                              Edit
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                    {/* <CTableHead>
                      <Pagination />
                    </CTableHead> */}
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

export default AWSCustomer
