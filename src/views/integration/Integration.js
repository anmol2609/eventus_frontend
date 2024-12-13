/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { SubHeaders } from '../../helpers/SubHeaders'
import { Colors } from '../../utils/colors'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import AWSIcon from '../../assets/images/AWS_icon.png'
import TrendMicroIcon from '../../assets/images/trend_micro_icon.png'
import sortByIcon from '../../assets/images/sortByIcon.svg'
import deleteIcon from '../../assets/images/deleteIcon.svg'
import editIcon from '../../assets/images/editIcon.svg'
import '../index.css'
//import { getAllSOARProducts, updateSOARProduct } from '../../actions/SOARProductActions'
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
  .slide-out{
    animation: slideOut 0.3s ease-in-out forwards;
  }
  .hidden-sidebar{
    visibility: hidden;
  }
`

  const updateSOARProducts = (id, data) => {
    dispatch(updateSOARProduct(id, data))
  }

  const DataBrick = ({ id, title, subTitle, icon, index }) => (
    <div
      className="clickable"
      style={{
        backgroundColor: Colors.BG_LIGHT_2,
        padding: 12,
        marginTop: 8,
        marginRight: 16,
        borderRadius: 7,
        border: `1px solid ${Colors.BG_LIGHT}`,
      }}
    >
      <span className="d-flex justify-content-between align-items-center">
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
        <span className="d-flex align-items-center">
          <CButton
            style={{ padding: '2px' }}
            onClick={() => {
              setSelectedSOARProductId(id)
              toggleSidebar()
              setSideBarToShow('edit')
            }}
          >
            {<img src={editIcon} />}
          </CButton>
          <CButton
            style={{ padding: '2px', color: Colors.RED }}
            onClick={() => {
              const isConfirmed = window.confirm('Are you sure you want to delete this?')
              if (isConfirmed) {
                const data = {
                  is_deleted: true,
                }
                updateSOARProducts(id, data)
              }
            }}
          >
            {<img src={deleteIcon} />}
          </CButton>
        </span>
      </span>
      <div style={{ fontSize: 13, fontWeight: 300, color: Colors.WHITE_70 }}>{subTitle}</div>
    </div>
  )

  return (
    <>
      {loading || update_SOAR_product_loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ borderBottom: `1px solid ${Colors.LIGHT_GRAY}` }}
          >
            <span className="d-flex">
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
            </span>

            {selectedView == 0 ? (
              <div className="d-flex justify-content-start align-items-center gap-2">
                {/* <CButton
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
                  // onClick={() =>
                  //   timeColOrder === 'asc' ? setTimeColOrder('desc') : setTimeColOrder('asc')
                  // }
                >
                  <div className="d-flex justify-content-start align-items-center gap-1">
                    <img src={sortByIcon} style={{ height: '16px', width: '16px' }}></img>
                    {`Sort By: Date`}
                  </div>
                </CButton> */}
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
                      {sideBarToShow === 'edit' ? (
                        <EditSOARProduct toggleSidebar={toggleSidebar} id={selectedSOARProductId} />
                      ) : (
                        <NewSOARProduct toggleSidebar={toggleSidebar} />
                      )}
                    </div>
                  </>
                }
              </div>
            ) : null}
          </div>

          {selectedView == 0 ? (
            <div className="d-flex flex-row flex-wrap">
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
          ) : null}
        </>
      )}
    </>
  )
}
