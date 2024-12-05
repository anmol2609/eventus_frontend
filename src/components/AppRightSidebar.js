/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { CSidebar, CSidebarHeader, CSidebarBrand, CCloseButton } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleRightSidebar } from '../actions/ThemeActions'
import './index.css'

export default function AppRightSidebar({ children, bigSidebar, showBackdrop }) {
  const dispatch = useDispatch()
  const rightSidebarShowUnfoldable = useSelector((state) => state.sidebarUnfoldable)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)

  // This useEffect is to handle the custom backdrop on desktop view
  // useEffect(() => {
  //   const newDiv = document.createElement('div')
  //   newDiv.className = 'sidebar-backdrop show fade'
  //   newDiv.id = 'custom-backdrop-div'

  //   if (rightSidebarShow.rightSidebarShow && showBackdrop) {
  //     document.body.appendChild(newDiv)
  //   } else {
  //     const existingDiv = document.getElementById('custom-backdrop-div')
  //     if (existingDiv) document.body.removeChild(existingDiv)
  //   }
  // }, [rightSidebarShow.rightSidebarShow])

  return (
    <CSidebar
      size="lg"
      className={`border-end right-sidebar ${bigSidebar ? 'big-sidebar' : null}`}
      // colorScheme="dark"
      style={{
        backgroundColor: '#141414',
        overflowY: 'auto',
      }}
      unfoldable={rightSidebarShowUnfoldable}
      visible={rightSidebarShow.rightSidebarShow}
      // onVisibleChange={(visible) => {
      //   dispatch(toggleRightSidebar(visible))
      // }}
      placement="end"
      overlaid
    >
      <CSidebarHeader className="border-bottom">
        {/* <CSidebarBrand to="/" style={{ textDecoration: 'none' }}>
          Apply Filter
        </CSidebarBrand> */}
        <CCloseButton
          // className="d-lg-none"
          dark
          onClick={() => dispatch(toggleRightSidebar(!rightSidebarShow.rightSidebarShow))}
        />
      </CSidebarHeader>
      {children}
    </CSidebar>
  )
}
