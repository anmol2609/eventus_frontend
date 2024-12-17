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
import { filterV1Product, getAllV1Products, searchV1Product } from '../../slices/v1Product/GetAllV1ProductSlice'
import { Colors } from '../../utils/colors'
import Loader from '../../components/Loader'
import { cilMagnifyingGlass } from '@coreui/icons'
import { getSearchParams } from '../../helpers/GetSearchParams'
import ShowAllFilters from '../../components/ShowAllFilters'

export default function V1ProductList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { V1_products, loading } = useSelector((state) => state.V1_products)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)

  const initial_filters = {
    name: searchParams.get('name') || '',
    url: searchParams.get('url') || '',
    interval: searchParams.get('interval') || '',
    product_name: searchParams.get('product_name') || '',
    product_type: searchParams.get('product_type') || '',
    product_module: searchParams.get('product_module') || '',
    log_type: searchParams.get('log_type') || '',
    status: searchParams.get('status') || '',
  }
  const [filters, setFilters] = useState(initial_filters)
  const [searchTerm, setSearchTerm] = useState('')

  const search_data = () => {
    dispatch(searchV1Product(searchTerm))
  }

  const filter = () => {
    navigate({
      pathname: '/v1_products',
      search: `?${createSearchParams(filters)}`,
    })
    dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))
  }

  useEffect(() => {
    if (searchParams.size <= 0) dispatch(getAllV1Products())
  }, [])

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        filterV1Product({
          name: searchParams.get('name'),
          url: searchParams.get('url'),
          interval: searchParams.get('interval'),
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
                      placeholder="interval"
                      value={filters.interval}
                      onChange={(e) => setFilters({ ...filters, interval: e.target.value })}
                      id="interval"
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
                      placeholder="Log Type"
                      value={filters.log_type}
                      onChange={(e) => setFilters({ ...filters, log_type: e.target.value })}
                      id="log_type"
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
            <span className="mr-4">V1 Products</span>
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
                navigate('/v1_products/new')
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
              className={V1_products && V1_products.length === 0 ? 'mt-3' : 'mb-0'}
            >
              {V1_products ? (
                V1_products.length === 0 ? (
                  <CTableHead className="text-center" style={{ fontSize: 16 }}>
                    No V1 Products Found
                  </CTableHead>
                ) : (
                  <>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">URL</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Interval</CTableHeaderCell>
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
                      {V1_products.map((product) => (
                        <CTableRow key={product._id}>
                          <CTableDataCell>{product.name}</CTableDataCell>
                          <CTableDataCell>
                            <a
                              style={{ color: Colors.LINK }}
                              target="_blank"
                              href={product.url}
                              rel="noreferrer"
                            >
                              {product.url}
                            </a>
                          </CTableDataCell>
                          <CTableDataCell>{product.interval}</CTableDataCell>
                          <CTableDataCell>{product.product_name}</CTableDataCell>
                          <CTableDataCell>{product.product_type}</CTableDataCell>
                          <CTableDataCell>{product.product_module}</CTableDataCell>
                          <CTableDataCell>{product.log_type}</CTableDataCell>
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
                                navigate(`/v1_products/${product._id}/edit`)
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
