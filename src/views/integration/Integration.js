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
  const toggleSidebar = () => {
    setSidebarVisible((prevSidebarVisible) =>
      prevSidebarVisible === 0 ? 1 : prevSidebarVisible === 1 ? 2 : 1,
    )
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedView, setSelectedView] = useState(0)
  const [timeColOrder, setTimeColOrder] = useState('desc')
  const [selectedSOARProductId, setSelectedSOARProductId] = useState()
  const [sideBarToShow, setSideBarToShow] = useState('new')

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
      .header-container {
        flex-direction: column !important;
        gap: 1rem;
      }
      .action-buttons {
        width: 100%;
        justify-content: flex-end !important;
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
        width: 'calc(50% - 16px)', // Make it take up half the container width minus margin
        minWidth: '250px', // Minimum width to maintain readability
        maxWidth: '100%', // Ensure it doesn't overflow on small screens
      }}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex align-items-center" style={{ marginBottom: '8px' }}>
          <div
            style={{
              borderRadius: '5px',
              width: '30px',
              height: '30px',
              marginRight: '8px',
            }}
          >
            <img
              src={icon}
              style={{
                height: '20px',
                width: '20px',
                objectFit: 'contain',
              }}
              alt={title}
            />
          </div>
          <div style={{ fontSize: '16px', wordBreak: 'break-word' }}>{title}</div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <CButton
            style={{ padding: '2px' }}
            onClick={() => {
              setSelectedSOARProductId(id)
              toggleSidebar()
              setSideBarToShow('edit')
            }}
          >
            <img src={editIcon} alt="Edit" />
          </CButton>
          <CButton
            style={{ padding: '2px', color: Colors.RED }}
            onClick={() => {
              const isConfirmed = window.confirm('Are you sure you want to delete this?')
              if (isConfirmed) {
                updateSOARProducts(id, { is_deleted: true })
              }
            }}
          >
            <img src={deleteIcon} alt="Delete" />
          </CButton>
        </div>
      </div>
      <div
        style={{
          fontSize: '13px',
          fontWeight: 300,
          color: Colors.WHITE_70,
          wordBreak: 'break-word',
        }}
      >
        {subTitle}
      </div>
    </div>
  )

  return (
    <CContainer fluid className="p-0">
      {loading || update_SOAR_product_loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="header-container d-flex justify-content-between align-items-center"
            style={{
              borderBottom: `1px solid ${Colors.LIGHT_GRAY}`,
              padding: '1rem',
            }}
          >
            <div className="d-flex flex-wrap gap-2">
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

            {selectedView == 0 && (
              <div className="action-buttons d-flex justify-content-start align-items-center gap-2">
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
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2px',
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
                    <div
                      className={`sidebar-overlay ${
                        sidebarVisible === 1
                          ? 'slide-in'
                          : sidebarVisible === 2
                            ? 'slide-out'
                            : 'hidden-sidebar'
                      }`}
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
                }
              </div>
            )}
          </div>

          {selectedView == 0 && (
            <div
              className="d-flex flex-row flex-wrap"
              style={{
                padding: '1rem',
                gap: '1rem',
              }}
            >
              {SOAR_products.map((item, index) => (
                <DataBrick
                  id={item._id}
                  key={index}
                  title={item.product_name}
                  subTitle="Enterprise cybersecurity platform powered by & ..."
                  icon={index === 0 ? TrendMicroIcon : TrendMicroIcon}
                  index={index}
                />
              ))}
            </div>
          )}
        </>
      )}
    </CContainer>
  )
}