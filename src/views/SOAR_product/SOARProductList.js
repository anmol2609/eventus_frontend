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
import { toggleRightSidebar } from '../../slices/ThemeSlice'
import '../index.css'
import {
  filterSOARProduct,
  getAllSOARProducts,
  searchSOARProduct,
} from '../../slices/SOARProduct/GetAllSOARProductsSlice'
import Loader from '../../components/Loader'
import { cilMagnifyingGlass } from '@coreui/icons'
import { getSearchParams } from '../../helpers/GetSearchParams'
import ShowAllFilters from '../../components/ShowAllFilters'

export default function SOARProductList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { SOAR_products, loading } = useSelector((state) => state.SOAR_products)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)

  const initial_filters = {
    product_name: searchParams.get('product_name') || '',
    extra_data_field: searchParams.get('extra_data_field') || '',
    field_in_log: searchParams.get('field_in_log') || '',
    status: searchParams.get('status') || '',
  }
  const [filters, setFilters] = useState(initial_filters)
  const [searchTerm, setSearchTerm] = useState('')

  const search_data = () => {
    dispatch(searchSOARProduct(searchTerm))
  }

  const filter = () => {
    navigate({
      pathname: '/soar_products',
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  useEffect(() => {
    if (searchParams.size <= 0) dispatch(getAllSOARProducts())
  }, [])

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        filterSOARProduct({
          product_name: searchParams.get('product_name'),
          extra_data_field: searchParams.get('extra_data_field'),
          field_in_log: searchParams.get('field_in_log'),
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
                      placeholder="Field in Log"
                      value={filters.field_in_log}
                      onChange={(e) => setFilters({ ...filters, field_in_log: e.target.value })}
                      id="field_in_log"
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
            className="callout callout-primary d-flex align-items-center justify-content-between gap-3"
            style={{
              height: 55,
              backgroundColor: 'rgb(40, 40, 40)',
            }}
          >
            <span className="mr-4">SOAR Products</span>
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
                navigate('/soar_products/new')
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
              className={SOAR_products && SOAR_products.length === 0 ? 'mt-3' : 'mb-0'}
            >
              {SOAR_products ? (
                SOAR_products.length === 0 ? (
                  <CTableHead className="text-center" style={{ fontSize: 16 }}>
                    No SOAR Products Found
                  </CTableHead>
                ) : (
                  <>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Extra Data Field</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Field In Log</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Created</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {SOAR_products.map((product) => (
                        <CTableRow key={product._id}>
                          <CTableDataCell>{product.product_name}</CTableDataCell>
                          <CTableDataCell>{product.extra_data_field}</CTableDataCell>
                          <CTableDataCell>{product.field_in_log}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color={product.status === Enums.STATUS.ACTIVE ? 'success' : 'danger'}
                              variant="outline"
                              shape="rounded-pill"
                            >
                              {product.status.toLowerCase()}
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            {readableDateFromString(product.created_at)}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              size="sm"
                              color="primary"
                              variant="outline"
                              onClick={() => {
                                navigate(`/soar_products/${product._id}/edit`)
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
