/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { SubHeaders } from '../../helpers/SubHeaders'
import { Colors } from '../../utils/colors'
import { CButton, CContainer, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import AWSIcon from '../../assets/images/AWS_icon.png'
import TrendMicroIcon from '../../assets/images/trend_micro_icon.png'
import sortByIcon from '../../assets/images/sortByIcon.svg'
import deleteIcon from '../../assets/images/deleteIcon.svg'
import editIcon from '../../assets/images/editIcon.svg'
import '../index.css'
import { updateSOARProduct } from '../../slices/SOARProduct/UpdateSOARProductSlice'
import { getAllSOARProducts } from '../../slices/SOARProduct/GetAllSOARProductsSlice'
import { CONSTANTS } from '../../utils/constants'
import EditSOARProduct from '../SOAR_product/EditSOARProduct'
import NewSOARProduct from '../SOAR_product/NewSOARProduct'

export default function Integration() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, SOAR_products } = useSelector((state) => state.SOAR_products)
  const { SOAR_product } = useSelector((state) => state.create_SOAR_product)
  const { loading: update_SOAR_product_loading, SOAR_product: updated_SOAR_product } = useSelector(
    (state) => state.update_SOAR_product,
  )

  useEffect(() => {
    dispatch(getAllSOARProducts())
  }, [updated_SOAR_product, SOAR_product])

  const [sidebarVisible, setSidebarVisible] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedView, setSelectedView] = useState(0)
  const [timeColOrder, setTimeColOrder] = useState('desc')
  const [selectedSOARProductId, setSelectedSOARProductId] = useState()
  const [sideBarToShow, setSideBarToShow] = useState('new')

  const toggleSidebar = () => {
    setSidebarVisible((prevSidebarVisible) =>
      prevSidebarVisible === 0 ? 1 : prevSidebarVisible === 1 ? 2 : 1,
    )
  }

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
    .slide-out {
      animation: slideOut 0.3s ease-in-out forwards;
    }
    .hidden-sidebar {
      visibility: hidden;
    }
    
    @media (max-width: 768px) {
      .sidebar-overlay {
        width: 100vw !important;
      }
      .data-brick {
        width: 100% !important;
        margin-right: 0 !important;
      }
      .header-controls {
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 1rem !important;
      }
      .sub-headers {
        flex-wrap: wrap !important;
      }
    }
  `

  const updateSOARProducts = (id, data) => {
    dispatch(updateSOARProduct(id, data))
  }

  const DataBrick = ({ id, title, subTitle, icon, index }) => (
    <div
      className="clickable data-brick"
      style={{
        backgroundColor: Colors.BG_LIGHT_2,
        padding: '12px',
        marginTop: '8px',
        marginRight: '16px',
        borderRadius: '7px',
        border: `1px solid ${Colors.BG_LIGHT}`,
        width: 'calc(50% - 16px)', // Makes it responsive
        minWidth: '250px',
      }}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex align-items-center mb-2 mb-sm-0">
          <div
            style={{
              borderRadius: '5px',
              width: '30px',
              height: '30px',
              marginRight: '8px',
            }}
          >
            <img src={icon} style={{ height: '20px', width: '20px' }} alt="product icon" />
          </div>
          <div style={{ fontSize: '16px', wordBreak: 'break-word' }}>{title}</div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <CButton
            size="sm"
            style={{ padding: '2px' }}
            onClick={() => {
              setSelectedSOARProductId(id)
              toggleSidebar()
              setSideBarToShow('edit')
            }}
          >
            <img src={editIcon} alt="edit" />
          </CButton>
          <CButton
            size="sm"
            style={{ padding: '2px', color: Colors.RED }}
            onClick={() => {
              const isConfirmed = window.confirm('Are you sure you want to delete this?')
              if (isConfirmed) {
                updateSOARProducts(id, { is_deleted: true })
              }
            }}
          >
            <img src={deleteIcon} alt="delete" />
          </CButton>
        </div>
      </div>
      <div style={{ fontSize: '13px', fontWeight: 300, color: Colors.WHITE_70 }}>{subTitle}</div>
    </div>
  )

  return (
    <CContainer fluid className="p-0">
      {loading || update_SOAR_product_loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="header-controls d-flex justify-content-between align-items-center"
            style={{ borderBottom: `1px solid ${Colors.LIGHT_GRAY}`, padding: '1rem 0' }}
          >
            <div className="sub-headers d-flex">
              <SubHeaders
                title="SOAR Fields"
                index={0}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                setCurrentPage={setCurrentPage}
              />
              <SubHeaders
                title="Retention"
                index={1}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                setCurrentPage={setCurrentPage}
              />
            </div>

            {selectedView === 0 && (
              <div className="d-flex justify-content-start align-items-center gap-2 flex-wrap">
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
                    borderRadius: '8px',
                    height: '36px',
                    backgroundColor: Colors.BLUE,
                    borderColor: Colors.BLUE,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2px',
                  }}
                >
                  <CIcon
                    icon={cilPlus}
                    customClassName="nav-icon"
                    style={{ height: '16px', marginRight: '4px' }}
                  />
                  Add New
                </CButton>
              </div>
            )}
          </div>

          {selectedView === 0 && (
            <CRow className="g-3">
              {SOAR_products.map((item, index) => (
                <CCol xs={12} md={6} key={item._id}>
                  <DataBrick
                    id={item._id}
                    title={item.product_name}
                    subTitle="Enterprise cybersecurity platform powered by & ..."
                    icon={TrendMicroIcon}
                    index={index}
                  />
                </CCol>
              ))}
            </CRow>
          )}

          <style>{styles}</style>

          {sidebarVisible > 0 && (
            <>
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
                  onClick={toggleSidebar}
                />
              )}
              <div
                className={
                  sidebarVisible === 1
                    ? 'slide-in sidebar-overlay'
                    : sidebarVisible === 2
                      ? 'slide-out sidebar-overlay'
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
                  overflowY: 'auto',
                }}
              >
                {sideBarToShow === 'edit' ? (
                  <EditSOARProduct toggleSidebar={toggleSidebar} id={selectedSOARProductId} />
                ) : (
                  <NewSOARProduct toggleSidebar={toggleSidebar} />
                )}
              </div>
            </>
          )}
        </>
      )}
    </CContainer>
  )
}
