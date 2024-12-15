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
import SelectBox from '../../components/Form/SelectBox'
import { AppRightSidebar } from '../../components'
import TextInput from '../../components/Form/TextInput'
import { CONSTANTS } from '../../utils/constants'
import Enums from '../../utils/Enums'
import { readableDateFromString } from '../../helpers/DateHelpers'
import { toggleRightSidebar } from '../../slices/ThemeSlice'
import '../index.css'
import { filterV1Customer } from '../../slices/v1Customer/GetAllV1Customerslice'
import Loader from '../../components/Loader'
import { cilMagnifyingGlass } from '@coreui/icons'
import { getSearchParams } from '../../helpers/GetSearchParams'
import ShowAllFilters from '../../components/ShowAllFilters'
// import {
//   getV1CustomerProductForCustomer,
//   searchV1CustomerProduct,
// } from '../../actions/V1CustomerProductActions'
import {
  getV1CustomerProductForCustomer,
} from '../../slices/v1CustomerProduct/GetV1CustomerProductForCustomerSlice'
import {
  searchV1CustomerProduct,
} from '../../slices/v1CustomerProduct/GetV1CustomerProductsSlice'
//import { getAllV1Products } from '../../actions/V1ProductActions'
import { getAllV1Products } from '../../slices/v1Product/GetAllV1ProductSlice'

export default function V1CustomerProductList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { V1_customer_products, loading } = useSelector(
    (state) => state.V1_customer_products_for_customer,
  )
  const { V1_products, loading: V1_product_loading } = useSelector((state) => state.V1_products)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)
  const { customer_id } = useParams()

  const initial_filters = {
    product: searchParams.get('product') || '',
    status: searchParams.get('status') || '',
  }
  const [filters, setFilters] = useState(initial_filters)
  const [searchTerm, setSearchTerm] = useState('')

  const search_data = () => {
    dispatch(searchV1CustomerProduct(searchTerm))
  }

  const filter = () => {
    navigate({
      pathname: `/v1_customer_products/${customer_id}`,
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  useEffect(() => {
    if (searchParams.size <= 0) dispatch(getV1CustomerProductForCustomer(customer_id))
    dispatch(getAllV1Products())
  }, [])

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        filterV1Customer({
          product: searchParams.get('product'),
          status: searchParams.get('status'),
        }),
      )
    }
  }, [searchParams])
  const search_params_for_list = getSearchParams(searchParams)

  return (
    <>
      {loading || V1_product_loading ? (
        <Loader />
      ) : (
        <>
          <AppRightSidebar>
            <CRow className="mx-2 my-4">
              <CForm>
                <CRow>
                  <CCol>
                    <SelectBox
                      id="product"
                      defaultOption="Select Product"
                      onChange={(e) => setFilters({ ...filters, product: e.target.value })}
                      options={
                        V1_products &&
                        V1_products.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.product_name}
                          </option>
                        ))
                      }
                      value={filters.product}
                    />
                  </CCol>
                </CRow>

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

                <div className="d-grid gap-2">
                  <CButton size="sm" type="submit" color="primary" onClick={filter}>
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
            <span>V1 Customer Products</span>
            <TextInput
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="search"
              style={{
                width: '70%',
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
                navigate(`/v1_customer_products/${customer_id}/new`)
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
              className={
                V1_customer_products && V1_customer_products.length === 0 ? 'mt-3' : 'mb-0'
              }
            >
              {V1_customer_products ? (
                V1_customer_products.length === 0 ? (
                  <CTableHead className="text-center" style={{ fontSize: 16 }}>
                    No V1 Customer Products Found
                  </CTableHead>
                ) : (
                  <>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Created</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {V1_customer_products.map((customer_product) => (
                        <CTableRow key={customer_product._id}>
                          <CTableDataCell>
                            {customer_product['product'].product_name}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color={
                                customer_product.status === Enums.STATUS.ACTIVE
                                  ? 'success'
                                  : 'danger'
                              }
                              variant="outline"
                              shape="rounded-pill"
                            >
                              {customer_product.status.toLowerCase()}
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            {readableDateFromString(customer_product.created_at)}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color="primary"
                              variant="outline"
                              onClick={() => {
                                navigate(`/v1_customer_products/${customer_product._id}/edit`)
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
