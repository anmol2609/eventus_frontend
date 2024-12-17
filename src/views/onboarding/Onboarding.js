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
  CCol,
  CTableFoot,
  CTooltip,
} from '@coreui/react'
import '../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CONSTANTS } from '../../utils/constants'
import { Colors } from '../../utils/colors'
import Loader from '../../components/Loader'
import { SubHeaders } from '../../helpers/SubHeaders'
//import { getAllSOARCustomers, updateSOARCustomer } from '../../actions/SOARCustomerActions'
import { getAllSOARCustomers } from '../../slices/SOARCustomer/GetAllSOARCustomersSlice'
import { updateSOARCustomer } from '../../slices/SOARCustomer/UpdateSOARCustomerSlice'

import { handleSort, sortData } from '../../helpers/SortHelpers'
import sortArrow from '../../assets/images/sortArrow.svg'
import sortByIcon from '../../assets/images/sortByIcon.svg'
import deleteIcon from '../../assets/images/deleteIcon.svg'
import editIcon from '../../assets/images/editIcon.svg'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMagnifyingGlass } from '@coreui/icons'
import NewSOARCustomer from '../soar_customer/NewSOARCustomer'
import NewAWSCustomer from '../aws_customer/NewAWSCustomer'
import NewO365Customer from '../O365_customer/NewO365Customer'
import NewV1Product from '../V1_product/NewV1Product'
import EditV1Product from '../V1_product/EditV1Product'
import TextInput from '../../components/Form/TextInput'
import AWSIcon from '../../assets/images/AWS_icon.png'
import TrendMicroIcon from '../../assets/images/trend_micro_icon.png'
//import { getAllAWSCustomers, updateAWSCustomer } from '../../actions/AWSCustomerActions'
import { getAllAWSCustomers } from '../../slices/awsCustomer/GetAllAWSCustomersSlice'
import { updateAWSCustomer } from '../../slices/awsCustomer/UpdateAWSCustomerSlice'

import { readableDateFromString } from '../../helpers/DateHelpers'
import { getAllO365Customers } from '../../slices/O365Customers/GetAllO365CustomersSlice'
import { updateO365Customer } from '../../slices/O365Customers/UpdateO365CustomerSlice'
//import { getAllV1Products, updateV1Product } from '../../actions/V1ProductActions'
import {getAllV1Products} from '../../slices/v1Product/GetAllV1ProductSlice'
import {updateV1Product} from '../../slices/v1Product/UpdateV1ProductSlice'

import Pagination from '../../components/Pagination'
import NewV1Customer from '../v1_customer/NewV1Customer'
import EditV1Customer from '../v1_customer/EditV1Customer'
// import {
//   getAllV1CustomerProducts,
//   updateV1CustomerProduct,
// } from '../../actions/V1CustomerProductActions'

import {getAllV1CustomerProducts} from '../../slices/v1CustomerProduct/GetV1CustomerProductsSlice'
import {updateV1CustomerProduct} from '../../slices/v1CustomerProduct/UpdateV1CustomerProductSlice'

import EditAWSCustomer from '../aws_customer/EditAWSCustomer'
import EditO365Customer from '../O365_customer/EditO365Customer'
import EditSOARCustomer from '../soar_customer/EditSOARCustomer'
// import {
//   getAllLoggerCustomers,
//   getAllLoggerProducts,
//   updateLoggerCustomer,
// } from '../../actions/LoggerActions'
import {getAllLoggerCustomers} from '../../slices/logger/GetAllLoggerCustomersSlice'
import {getAllLoggerProducts} from '../../slices/logger/GetAllLoggerProductsSlice'
import {updateLoggerCustomer} from '../../slices/logger/UpdateLoggerCustomerSlice'

import NewLoggerCustomer from '../logger/NewLoggerCustomer'
import EditLoggerCustomer from '../logger/EditLoggerCustomer'
import NewLoggerProduct from '../logger/NewLoggerProduct'
import EditLoggerProduct from '../logger/EditLoggerProduct'

export default function Onboarding() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const { aws_customer: create_aws_customer } = useSelector((state) => state.create_aws_customer)
  const { loading: aws_customer_loading, aws_customers } = useSelector(
    (state) => state.all_aws_customers,
  )
  const { loading: aws_customer_update_loading, aws_customer } = useSelector(
    (state) => state.update_aws_customer,
  )

  const { O365_customer: create_O365_customer } = useSelector((state) => state.create_O365_customer)
  const { loading: O365_customers_loading, O365_customers } = useSelector(
    (state) => state.O365_customers,
  )
  const { loading: O365_customer_update_loading, O365_customer } = useSelector(
    (state) => state.update_O365_customer,
  )

  const { V1_products } = useSelector((state) => state.V1_products)
  const { loading: update_V1_product_loading, V1_product } = useSelector(
    (state) => state.update_V1_product,
  )

  const { V1_customer_products } = useSelector((state) => state.V1_customer_products_for_customer)
  const { loading: update_V1_customer_product_loading, V1_customer_product } = useSelector(
    (state) => state.update_V1_customer_product,
  )
  const { V1_customer_product: create_V1_customer_product } = useSelector(
    (state) => state.create_V1_customer_product,
  )

  const { V1_product: create_V1_product } = useSelector((state) => state.create_V1_product)

  const { loading, SOAR_customers } = useSelector((state) => state.SOAR_customers)
  const { loading: soar_customer_update_loading, SOAR_customer: updated_SOAR_customer } =
    useSelector((state) => state.update_SOAR_customer)
  const { SOAR_customer } = useSelector((state) => state.create_SOAR_customer)

  const { loading: logger_products_loading, logger_products } = useSelector(
    (state) => state.logger_products,
  )

  const { loading: logger_customers_loading, logger_customers } = useSelector(
    (state) => state.logger_customers,
  )

  const { loading: update_logger_customer_loading, logger_customer } = useSelector(
    (state) => state.update_logger_customer,
  )

  const [timeColOrder, setTimeColOrder] = useState('desc')
  const [selectedSaasIndex, setSelectedSaasIndex] = useState(
    parseInt(searchParams.get('selectedSaasIndex')) || 0,
  )
  const [selectedSaasView, setSelectedSaasView] = useState(
    parseInt(searchParams.get('selectedSaasView')) || 0,
  )
  const [sideBarToShow, setSideBarToShow] = useState('new')
  const [selectedV1CustomerProduct, setSelectedV1CustomerProduct] = useState()
  const [selectedV1ProductId, setSelectedV1ProductId] = useState()
  const [selectedAwsCustomerId, setSelectedAwsCustomerId] = useState()
  const [selectedLoggerCustomerId, setSelectedLoggerCustomerId] = useState()
  const [selectedLoggerProductId, setSelectedLoggerProductId] = useState()
  const [selectedO365CustomerId, setSelectedO365CustomerId] = useState()
  const [selectedSOARCustomerId, setSelectedSOARCustomerId] = useState()
  const [hoveredV1CustomerProducts, setHoveredV1CustomerProducts] = useState([])

  const [openLoggerProduct, setOpenLoggerProduct] = useState(false)

  const initialPage = parseInt(searchParams.get('returnPage')) || 1
  const initialView = parseInt(searchParams.get('selectedView')) || 0

  const [selectedView, setSelectedView] = useState(initialView)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const itemsPerPage = 10
  const V1_products_length = V1_products ? V1_products.length : 0
  const V1_products_pages = Math.ceil(V1_products_length / itemsPerPage)

  const V1_customer_products_length = V1_customer_products ? V1_customer_products.length : 0
  const V1_customer_products_pages = Math.ceil(V1_customer_products_length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getAllSOARCustomers())
    dispatch(getAllAWSCustomers())
    dispatch(getAllO365Customers())
    dispatch(getAllV1Products())
    dispatch(getAllV1CustomerProducts())
    dispatch(getAllLoggerProducts())
    dispatch(getAllLoggerCustomers())
  }, [
    updated_SOAR_customer,
    aws_customer,
    O365_customer,
    create_aws_customer,
    create_O365_customer,
    V1_product,
    create_V1_product,
    V1_customer_product,
    SOAR_customer,
    create_V1_customer_product,
    logger_customer,
  ])

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      selectedSaasIndex,
      selectedSaasView,
      selectedView,
    })
  }, [selectedSaasIndex, selectedSaasView, selectedView])

  const updateSoarCustomer = (id, data) => {
    dispatch(updateSOARCustomer(id, data))
  }

  const updateAWSCustomers = (id, data) => {
    dispatch(updateAWSCustomer(id, data))
  }

  const updateO365Customers = (id, data) => {
    dispatch(updateO365Customer(id, data))
  }

  const updateV1Products = (id, data) => {
    dispatch(updateV1Product(id, data))
  }

  const updateV1CustomerProducts = (id, data) => {
    dispatch(updateV1CustomerProduct(id, data))
  }

  const updateLoggerCustomers = (id, data) => {
    dispatch(updateLoggerCustomer(id, data))
  }

  const StatusButton = ({ status }) =>
    status ? (
      <CButton
        size="sm"
        color={status === CONSTANTS.STATUS.ACTIVE ? 'success' : 'danger'}
        variant="outline"
        shape="rounded-pill"
      >
        {status.toLowerCase()}
      </CButton>
    ) : null

  const DataBrick = ({ title, subTitle, icon, index }) => (
    <div
      onClick={() => {
        setSelectedSaasView(index)
        setSelectedSaasIndex(index)
      }}
      className="clickable"
      style={{
        backgroundColor: Colors.BG_LIGHT_2,
        padding: 12,
        marginTop: 8,
        borderRadius: 7,
        border:
          selectedSaasIndex === index ? `1px solid ${Colors.BLUE}` : `1px solid ${Colors.BG_LIGHT}`,
      }}
    >
      <span className="d-flex align-items-center">
        <div
          style={{
            borderRadius: '5px',
            width: '30px',
            height: '30px',
          }}
        >
          <img src={icon} style={{ height: '20px', width: '20px' }}></img>
        </div>
        <div style={{ fontSize: 16 }}>{title}</div>
      </span>
      <div style={{ fontSize: 13, fontWeight: 300, color: Colors.WHITE_70 }}>{subTitle}</div>
    </div>
  )

  const LoggerCustomerBrick = ({ title, subTitle, icon, id }) => (
    <div
      className="clickable"
      style={{
        backgroundColor: Colors.BG_LIGHT_2,
        padding: 12,
        marginTop: 8,
        borderRadius: 7,
        border: `1px solid ${Colors.BG_LIGHT}`,
      }}
    >
      <span className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div
            style={{
              borderRadius: '5px',
              width: '30px',
              height: '30px',
            }}
          >
            <img src={icon} style={{ height: '20px', width: '20px' }}></img>
          </div>
          <div style={{ fontSize: 16 }}>{title}</div>
        </div>
        <div>
          <CButton
            style={{ padding: '2px' }}
            onClick={() => {
              toggleSidebar()
              setSideBarToShow('edit')
              setOpenLoggerProduct(true)
              setSelectedLoggerProductId(id)
            }}
          >
            {<img src={editIcon} />}
          </CButton>
        </div>
      </span>
      <div style={{ fontSize: 13, fontWeight: 300, color: Colors.WHITE_70 }}>{subTitle}</div>
    </div>
  )

  const columnToDataMap = [
    {
      // AWS Customer
      Name: ['customer', 'name'],
      Status: ['status'],
      'Created on': ['created_at'],
    },
    {
      // O365 Customer
      Name: ['customer', 'name'],
      Status: ['status'],
      'Created on': ['created_at'],
    },
    {
      // SOAR Customer
      Customer: ['customer', 'name'],
      URL: ['response'],
      Status: ['status'],
      'API Key': ['api_key'],
    },
    {
      // Vision One Customers / Vision One Customer Products
      Name: ['customer_details', 'name'],
      Modules: ['product', 'name'],
      Status: 'status',
      'Created on': ['created_at'],
    },
    {
      // Vision One Modules / Vision One Products
      'Module Name': ['name'],
      'Base URL': ['url'],
      Interval: 'interval',
      Status: ['status'],
      'Created on': ['created_at'],
    },
    {
      Customer: ['customer', 'name'],
      'Logger Device': ['products'],
      Status: ['status'],
      'Created on': ['created_at'],
    },
  ]

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

  const [sidebarVisible, setSidebarVisible] = useState(0)
  const toggleSidebar = () => {
    setSidebarVisible((prevSidebarVisible) =>
      prevSidebarVisible === 0 ? 1 : prevSidebarVisible === 1 ? 2 : 1,
    )
  }

  const [sortColumn, setSortColumn] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const sorted_AWS_customer_items = aws_customers
    ? sortData(aws_customers, sortColumn, sortOrder, columnToDataMap[0])
    : []

  const sorted_O365_customer_items = O365_customers
    ? sortData(O365_customers, sortColumn, sortOrder, columnToDataMap[1])
    : []

  const sorted_SOAR_customer_items = SOAR_customers
    ? sortData(SOAR_customers, sortColumn, sortOrder, columnToDataMap[2])
    : []

  const sorted_V1_customer_products = V1_customer_products
    ? sortData(V1_customer_products, sortColumn, sortOrder, columnToDataMap[3])
    : []

  const sorted_V1_products = V1_products
    ? sortData(V1_products, sortColumn, sortOrder, columnToDataMap[4])
    : []

  const sorted_logger_customer_items = logger_customers
    ? sortData(logger_customers, sortColumn, sortOrder, columnToDataMap[5])
    : []

  return (
    <>
      {loading ||
      soar_customer_update_loading ||
      aws_customer_loading ||
      aws_customer_update_loading ||
      O365_customers_loading ||
      O365_customer_update_loading ||
      update_V1_product_loading ||
      update_V1_customer_product_loading ||
      logger_products_loading ||
      logger_customers_loading ||
      update_logger_customer_loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ borderBottom: `1px solid ${Colors.LIGHT_GRAY}` }}
          >
            <span className="d-flex">
              <SubHeaders
                title="SaaS Products"
                index={0}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                selectedSaasIndex={0}
                setSelectedSaasIndex={setSelectedSaasIndex}
                selectedSaasView={0}
                setSelectedSaasView={setSelectedSaasView}
                setCurrentPage={setCurrentPage}
              />
              <SubHeaders
                title="Logger"
                index={1}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                selectedSaasView={4}
                setSelectedSaasView={setSelectedSaasView}
                setCurrentPage={setCurrentPage}
              />
              <SubHeaders
                title="Soar Customer"
                index={2}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                setCurrentPage={setCurrentPage}
              />
            </span>

            {selectedView == 2 ? (
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
                  onClick={() =>
                    timeColOrder === 'asc' ? setTimeColOrder('desc') : setTimeColOrder('asc')
                  }
                >
                  <div className="d-flex justify-content-start align-items-center gap-1">
                    <img src={sortByIcon} style={{ height: '16px', width: '16px' }}></img>
                    {`Sort By: Date`}
                  </div>
                </CButton>
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
                  <style>{styles}</style>
                  <CIcon
                    icon={cilPlus}
                    customClassName="nav-icon"
                    style={{ height: 16, marginRight: 4 }}
                  />
                  Add New
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
                      {sideBarToShow === 'new' ? (
                        <NewSOARCustomer toggleSidebar={toggleSidebar}></NewSOARCustomer>
                      ) : (
                        <EditSOARCustomer
                          toggleSidebar={toggleSidebar}
                          id={selectedSOARCustomerId}
                        />
                      )}
                    </div>
                  </>
                }
              </div>
            ) : null}
          </div>

          {selectedView == 0 ? (
            <div>
              <CRow>
                <CCol md={3}>
                  <div className="d-flex justify-content-between align-items-center gap-2 my-2">
                    <span style={{ fontSize: 18, fontWeight: 500 }}>Products</span>
                    <CButton
                      size="sm"
                      type="button"
                      variant="outline"
                      className="mr-3 btn-configure"
                      color="light"
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
                      <style>{styles}</style>
                      <CIcon
                        icon={cilPlus}
                        customClassName="nav-icon"
                        style={{ height: 16, marginRight: 4 }}
                      />
                      Add New
                    </CButton>
                  </div>

                  <TextInput
                    type="text"
                    placeholder="Search"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    id="search"
                    style={{
                      backgroundColor: 'rgb(31, 31, 31)',
                      height: 40,
                    }}
                    trailIcon={cilMagnifyingGlass}
                  />

                  <div
                    style={{ borderBottom: `1px solid ${Colors.LIGHT_GRAY}`, marginRight: -12 }}
                    className="mt-2"
                  />

                  <DataBrick
                    title="AWS"
                    subTitle="Enterprise cybersecurity platform powered by ..."
                    icon={AWSIcon}
                    index={0}
                  />
                  <DataBrick
                    title="O365"
                    subTitle="Enterprise cybersecurity platform powered by &..."
                    icon={TrendMicroIcon}
                    index={1}
                  />
                  <DataBrick
                    title="Trend Micro"
                    subTitle="Enterprise cybersecurity platform powered by &..."
                    icon={TrendMicroIcon}
                    index={2}
                  />
                </CCol>

                <CCol
                  md={9}
                  style={{ minHeight: '85vh', borderLeft: `1px solid ${Colors.LIGHT_GRAY}` }}
                >
                  <div
                    className="d-flex justify-content-between align-items-center mt-2"
                    style={{
                      borderBottom: `1px solid ${Colors.LIGHT_GRAY}`,
                      marginLeft: -12,
                      paddingLeft: 12,
                    }}
                  >
                    <span className="d-flex">
                      {selectedSaasIndex === 0 ? (
                        <SubHeaders
                          title="AWS Customers"
                          index={0}
                          selectedView={selectedSaasView}
                          setSelectedView={setSelectedSaasView}
                        />
                      ) : selectedSaasIndex === 1 ? (
                        <SubHeaders
                          title="O365 Customers"
                          index={1}
                          selectedView={selectedSaasView}
                          setSelectedView={setSelectedSaasView}
                        />
                      ) : selectedSaasIndex === 2 ? (
                        <span className="d-flex">
                          <SubHeaders
                            title="Vision One Customers"
                            index={2}
                            selectedView={selectedSaasView}
                            setSelectedView={setSelectedSaasView}
                          />
                          <SubHeaders
                            title="Modules"
                            index={3}
                            selectedView={selectedSaasView}
                            setSelectedView={setSelectedSaasView}
                          />
                        </span>
                      ) : null}
                    </span>

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
                        onClick={() =>
                          timeColOrder === 'asc' ? setTimeColOrder('desc') : setTimeColOrder('asc')
                        }
                      >
                        <div className="d-flex justify-content-start align-items-center gap-1">
                          <img src={sortByIcon} style={{ height: '16px', width: '16px' }}></img>
                          {`Sort By: Date`}
                        </div>
                      </CButton>
                      <CButton
                        size="sm"
                        type="button"
                        variant="outline"
                        className="mr-3 btn-configure"
                        color="light"
                        onClick={() => {
                          toggleSidebar()
                          setSideBarToShow('new')
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
                        <style>{styles}</style>
                        <CIcon
                          icon={cilPlus}
                          customClassName="nav-icon"
                          style={{ height: 16, marginRight: 4 }}
                        />
                        Add New
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
                            {selectedSaasIndex === 0 ? (
                              sideBarToShow === 'new' ? (
                                <NewAWSCustomer toggleSidebar={toggleSidebar} />
                              ) : (
                                <EditAWSCustomer
                                  toggleSidebar={toggleSidebar}
                                  id={selectedAwsCustomerId}
                                />
                              )
                            ) : selectedSaasIndex === 1 ? (
                              sideBarToShow === 'new' ? (
                                <NewO365Customer toggleSidebar={toggleSidebar} />
                              ) : (
                                <EditO365Customer
                                  toggleSidebar={toggleSidebar}
                                  id={selectedO365CustomerId}
                                />
                              )
                            ) : selectedSaasView === 2 ? (
                              sideBarToShow === 'new' ? (
                                <NewV1Customer toggleSidebar={toggleSidebar} />
                              ) : (
                                <EditV1Customer
                                  toggleSidebar={toggleSidebar}
                                  V1_customer_product={selectedV1CustomerProduct}
                                />
                              )
                            ) : selectedSaasView === 3 ? (
                              sideBarToShow === 'new' ? (
                                <NewV1Product toggleSidebar={toggleSidebar} />
                              ) : (
                                <EditV1Product
                                  toggleSidebar={toggleSidebar}
                                  id={selectedV1ProductId}
                                />
                              )
                            ) : null}
                          </div>
                        </>
                      }
                    </div>
                  </div>

                  {selectedSaasIndex == 0 ? (
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
                        className={aws_customers && aws_customers.length === 0 ? 'mt-3' : 'mb-0'}
                      >
                        {aws_customers ? (
                          aws_customers.length === 0 ? (
                            <CTableHead className="text-center" style={{ fontSize: 16 }}>
                              No AWS Customers Found
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
                                      style={{
                                        fontWeight: '400',
                                        color: '#FCFCFC',
                                        cursor: 'pointer',
                                      }}
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
                                    style={{
                                      fontWeight: '400',
                                      color: '#FCFCFC',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Action
                                  </CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {sorted_AWS_customer_items.map((aws_customer) => (
                                  <CTableRow key={aws_customer._id}>
                                    <CTableDataCell>{aws_customer['customer'].name}</CTableDataCell>
                                    <CTableDataCell>
                                      <StatusButton status={aws_customer.status} />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {readableDateFromString(aws_customer.created_at)}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <CButton
                                        style={{ padding: '2px' }}
                                        onClick={() => {
                                          toggleSidebar()
                                          setSideBarToShow('edit')
                                          setSelectedAwsCustomerId(aws_customer._id)
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
                                              is_deleted: true,
                                            }
                                            updateAWSCustomers(aws_customer._id, data)
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
                  ) : selectedSaasIndex == 1 ? (
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
                                  {Object.keys(columnToDataMap[1]).map((header) => (
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
                                      style={{
                                        fontWeight: '400',
                                        color: '#FCFCFC',
                                        cursor: 'pointer',
                                      }}
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
                                    style={{
                                      fontWeight: '400',
                                      color: '#FCFCFC',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Action
                                  </CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {sorted_O365_customer_items.map((O365_cust) => (
                                  <CTableRow key={O365_cust._id}>
                                    <CTableDataCell>{O365_cust['customer'].name}</CTableDataCell>
                                    <CTableDataCell>
                                      <StatusButton status={O365_cust.status} />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {readableDateFromString(O365_cust.created_at)}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <CButton
                                        style={{ padding: '2px' }}
                                        onClick={() => {
                                          toggleSidebar()
                                          setSideBarToShow('edit')
                                          setSelectedO365CustomerId(O365_cust._id)
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
                                              is_deleted: true,
                                            }
                                            updateO365Customers(O365_cust._id, data)
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
                  ) : selectedSaasIndex === 2 ? (
                    selectedSaasView === 2 ? (
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
                          className={
                            V1_customer_products && V1_customer_products.length === 0
                              ? 'mt-3'
                              : 'mb-0'
                          }
                        >
                          {V1_customer_products ? (
                            V1_customer_products.length === 0 ? (
                              <CTableHead className="text-center" style={{ fontSize: 16 }}>
                                No Vision One Customers Found
                              </CTableHead>
                            ) : (
                              <>
                                <CTableHead>
                                  <CTableRow>
                                    {Object.keys(columnToDataMap[3]).map((header) => (
                                      <CTableHeaderCell
                                        key={header}
                                        scope="col"
                                        onClick={
                                          () => {}
                                          // handleSort(
                                          //   header,
                                          //   sortColumn,
                                          //   setSortColumn,
                                          //   sortOrder,
                                          //   setSortOrder,
                                          // )
                                        }
                                        style={{
                                          fontWeight: '400',
                                          color: '#FCFCFC',
                                          cursor: 'pointer',
                                        }}
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
                                      style={{
                                        fontWeight: '400',
                                        color: '#FCFCFC',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      Action
                                    </CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {sorted_V1_customer_products.map((V1_customer_product) => (
                                    <CTableRow
                                      key={V1_customer_product['V1_customer_product_details']._id}
                                    >
                                      <CTableDataCell>
                                        {V1_customer_product['customer_details'].name}
                                      </CTableDataCell>
                                      <CTooltip
                                        content={
                                          hoveredV1CustomerProducts.length > 0
                                            ? hoveredV1CustomerProducts.join(', ')
                                            : ''
                                        }
                                        placement="bottom"
                                      >
                                        <CTableDataCell
                                          onMouseOver={() => {
                                            const product_names = V1_customer_product[
                                              'products'
                                            ].map((product) => product.product.name)
                                            setHoveredV1CustomerProducts(product_names)
                                          }}
                                          onMouseOut={() => setHoveredV1CustomerProducts([])}
                                        >
                                          <span>
                                            {(() => {
                                              const product_names = V1_customer_product[
                                                'products'
                                              ].map((product) => product.product.name)
                                              return product_names.slice(0, 2).join(', ')
                                            })()}
                                            <span>
                                              {V1_customer_product['products'].length > 2 &&
                                                ` +${V1_customer_product['products'].length - 2}`}
                                            </span>
                                          </span>
                                        </CTableDataCell>
                                      </CTooltip>

                                      <CTableDataCell>
                                        <StatusButton status={V1_customer_product['_id'].status} />
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {readableDateFromString(
                                          V1_customer_product['V1_customer_product_details']
                                            .created_at,
                                        )}
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        <CButton
                                          style={{ padding: '2px' }}
                                          onClick={() => {
                                            toggleSidebar()
                                            setSideBarToShow('edit')
                                            setSelectedV1CustomerProduct(V1_customer_product)
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
                                                is_deleted: true,
                                              }
                                              for (
                                                let i = 0;
                                                i <
                                                V1_customer_product['V1_customer_product_ids']
                                                  .length;
                                                ++i
                                              ) {
                                                updateV1CustomerProducts(
                                                  V1_customer_product['V1_customer_product_ids'][i],
                                                  data,
                                                )
                                              }
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
                          {sorted_V1_customer_products.length > 0 && (
                            <CTableFoot>
                              <CTableRow>
                                <CTableDataCell colSpan="8">
                                  {' '}
                                  <Pagination
                                    currentPage={currentPage}
                                    totalPages={V1_customer_products_pages}
                                    onPageChange={handlePageChange}
                                    totalItems={V1_customer_products_length}
                                    itemsPerPage={itemsPerPage}
                                  />
                                </CTableDataCell>
                              </CTableRow>
                            </CTableFoot>
                          )}
                        </CTable>
                      </CCard>
                    ) : selectedSaasView == 3 ? (
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
                          className={V1_products && V1_products.length === 0 ? 'mt-3' : 'mb-0'}
                        >
                          {V1_products ? (
                            V1_products.length === 0 ? (
                              <CTableHead className="text-center" style={{ fontSize: 16 }}>
                                No Vision One Products Found
                              </CTableHead>
                            ) : (
                              <>
                                <CTableHead>
                                  <CTableRow>
                                    {Object.keys(columnToDataMap[4]).map((header) => (
                                      <CTableHeaderCell
                                        key={header}
                                        scope="col"
                                        // onClick={() =>
                                        //   handleSort(
                                        //     header,
                                        //     sortColumn,
                                        //     setSortColumn,
                                        //     sortOrder,
                                        //     setSortOrder,
                                        //   )
                                        // }
                                        style={{
                                          fontWeight: '400',
                                          color: '#FCFCFC',
                                          cursor: 'pointer',
                                        }}
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
                                      style={{
                                        fontWeight: '400',
                                        color: '#FCFCFC',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      Action
                                    </CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {sorted_V1_products.map((V1_product) => (
                                    <CTableRow key={V1_product._id}>
                                      <CTableDataCell>{V1_product.name}</CTableDataCell>
                                      <CTableDataCell>
                                        <a
                                          style={{ color: Colors.LINK }}
                                          target="_blank"
                                          href={V1_product.url}
                                          rel="noreferrer"
                                        >
                                          {V1_product.url}
                                        </a>
                                      </CTableDataCell>
                                      <CTableDataCell>{V1_product.interval}</CTableDataCell>
                                      <CTableDataCell>
                                        <StatusButton status={V1_product.status} />
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {readableDateFromString(V1_product.created_at)}
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        <CButton
                                          style={{ padding: '2px' }}
                                          onClick={() => {
                                            toggleSidebar()
                                            setSideBarToShow('edit')
                                            setSelectedV1ProductId(V1_product._id)
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
                                                is_deleted: true,
                                              }
                                              updateV1Products(V1_product._id, data)
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
                          {sorted_V1_products.length > 0 && (
                            <CTableFoot>
                              <CTableRow>
                                <CTableDataCell colSpan="8">
                                  {' '}
                                  <Pagination
                                    currentPage={currentPage}
                                    totalPages={V1_products_pages}
                                    onPageChange={handlePageChange}
                                    totalItems={V1_products_length}
                                    itemsPerPage={itemsPerPage}
                                  />
                                </CTableDataCell>
                              </CTableRow>
                            </CTableFoot>
                          )}
                        </CTable>
                      </CCard>
                    ) : null
                  ) : null}
                </CCol>
              </CRow>
            </div>
          ) : selectedView === 1 ? (
            <div>
              <CRow>
                <CCol md={3}>
                  <div className="d-flex justify-content-between align-items-center gap-2 my-2">
                    <span style={{ fontSize: 18, fontWeight: 500 }}>Products</span>
                    <CButton
                      size="sm"
                      type="button"
                      variant="outline"
                      className="mr-3 btn-configure"
                      color="light"
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
                      onClick={() => {
                        toggleSidebar()
                        setOpenLoggerProduct(true)
                        setSideBarToShow('new')
                      }}
                    >
                      <style>{styles}</style>
                      <CIcon
                        icon={cilPlus}
                        customClassName="nav-icon"
                        style={{ height: 16, marginRight: 4 }}
                        onClick={() => {}}
                      />
                      Add New
                    </CButton>
                  </div>

                  <TextInput
                    type="text"
                    placeholder="Search"
                    id="search"
                    style={{
                      backgroundColor: 'rgb(31, 31, 31)',
                      height: 40,
                    }}
                    trailIcon={cilMagnifyingGlass}
                  />

                  <div
                    style={{ borderBottom: `1px solid ${Colors.LIGHT_GRAY}`, marginRight: -12 }}
                    className="mt-2"
                  />
                  {logger_products.map((product, index) => (
                    <LoggerCustomerBrick
                      key={index}
                      id={product._id}
                      title={product.product_name}
                      subTitle="Enterprise cybersecurity platform powered by &..."
                      icon={TrendMicroIcon}
                      index={index + 1}
                    />
                  ))}
                </CCol>

                <CCol
                  md={9}
                  style={{ minHeight: '85vh', borderLeft: `1px solid ${Colors.LIGHT_GRAY}` }}
                >
                  <div
                    className="d-flex justify-content-between align-items-center mt-2"
                    style={{
                      borderBottom: `1px solid ${Colors.LIGHT_GRAY}`,
                      marginLeft: -12,
                      paddingLeft: 12,
                    }}
                  >
                    <span className="d-flex">
                      <SubHeaders
                        title="Logger Customers"
                        index={4}
                        selectedView={selectedSaasView}
                        setSelectedView={setSelectedSaasView}
                      />
                    </span>

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
                        onClick={() =>
                          timeColOrder === 'asc' ? setTimeColOrder('desc') : setTimeColOrder('asc')
                        }
                      >
                        <div className="d-flex justify-content-start align-items-center gap-1">
                          <img src={sortByIcon} style={{ height: '16px', width: '16px' }}></img>
                          {`Sort By: Date`}
                        </div>
                      </CButton>
                      <CButton
                        size="sm"
                        type="button"
                        variant="outline"
                        className="mr-3 btn-configure"
                        color="light"
                        onClick={() => {
                          toggleSidebar()
                          setOpenLoggerProduct(false)
                          setSideBarToShow('new')
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
                        <style>{styles}</style>
                        <CIcon
                          icon={cilPlus}
                          customClassName="nav-icon"
                          style={{ height: 16, marginRight: 4 }}
                        />
                        Add New
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
                            {selectedSaasView === 4 ? (
                              openLoggerProduct ? (
                                sideBarToShow === 'new' ? (
                                  <NewLoggerProduct toggleSidebar={toggleSidebar} />
                                ) : (
                                  <EditLoggerProduct
                                    toggleSidebar={toggleSidebar}
                                    id={selectedLoggerProductId}
                                  />
                                )
                              ) : sideBarToShow === 'new' ? (
                                <NewLoggerCustomer toggleSidebar={toggleSidebar} />
                              ) : (
                                <EditLoggerCustomer
                                  toggleSidebar={toggleSidebar}
                                  id={selectedLoggerCustomerId}
                                />
                              )
                            ) : null}
                          </div>
                        </>
                      }
                    </div>
                  </div>

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
                      className={
                        logger_customers && logger_customers.length === 0 ? 'mt-3' : 'mb-0'
                      }
                    >
                      {logger_customers ? (
                        logger_customers.length === 0 ? (
                          <CTableHead className="text-center" style={{ fontSize: 16 }}>
                            No Logger Customers Found
                          </CTableHead>
                        ) : (
                          <>
                            <CTableHead>
                              <CTableRow>
                                {Object.keys(columnToDataMap[5]).map((header) => (
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
                                    style={{
                                      fontWeight: '400',
                                      color: '#FCFCFC',
                                      cursor: 'pointer',
                                    }}
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
                                  style={{
                                    fontWeight: '400',
                                    color: '#FCFCFC',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Action
                                </CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {sorted_logger_customer_items.map((logger_customer) => (
                                <CTableRow key={logger_customer._id}>
                                  <CTableDataCell>
                                    {logger_customer['customer'].name}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {logger_customer['products'].length}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <StatusButton status={logger_customer.status} />
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {readableDateFromString(logger_customer.created_at)}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <CButton
                                      style={{ padding: '2px' }}
                                      onClick={() => {
                                        toggleSidebar()
                                        setOpenLoggerProduct(false)
                                        setSideBarToShow('edit')
                                        setSelectedLoggerCustomerId(logger_customer._id)
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
                                            is_deleted: true,
                                          }
                                          updateLoggerCustomers(logger_customer._id, data)
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
                </CCol>
              </CRow>
            </div>
          ) : null}

          {/* Soar Customer */}
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
                align="middle"
                className={SOAR_customers && SOAR_customers.length === 0 ? 'mt-3' : 'mb-0'}
              >
                {SOAR_customers ? (
                  SOAR_customers.length === 0 ? (
                    <CTableHead className="text-center" style={{ fontSize: 16 }}>
                      No Soar Customers Found
                    </CTableHead>
                  ) : (
                    <>
                      <CTableHead>
                        <CTableRow>
                          {Object.keys(columnToDataMap[2]).map((header) => (
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
                        {sorted_SOAR_customer_items.map((soar_customer) => (
                          <CTableRow key={soar_customer._id}>
                            <CTableDataCell>{soar_customer['customer'].name}</CTableDataCell>
                            <CTableDataCell>
                              <a
                                style={{ color: Colors.LINK }}
                                target="_blank"
                                href={soar_customer.url}
                                rel="noreferrer"
                              >
                                {soar_customer.url}
                              </a>
                            </CTableDataCell>
                            <CTableDataCell>
                              <StatusButton status={soar_customer.status} />
                            </CTableDataCell>
                            <CTableDataCell>{soar_customer.api_key}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                style={{ padding: '2px' }}
                                onClick={() => {
                                  toggleSidebar()
                                  setSideBarToShow('edit')
                                  setSelectedSOARCustomerId(soar_customer._id)
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
                                      url: soar_customer.url,
                                      api_key: soar_customer.api_key,
                                      is_deleted: true,
                                    }
                                    updateSoarCustomer(soar_customer._id, data)
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
          )}
        </>
      )}
    </>
  )
}
