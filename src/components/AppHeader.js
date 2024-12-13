/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import { toggleSidebar } from '../actions/ThemeActions'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

import closeSidebar from '../assets/images/closeSidebar.svg'
import openSidebar from '../assets/images/openSidebar.svg'

const AppHeader = ({ name }) => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sideBarShow)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-2 p-0" ref={headerRef} style={{ zIndex: '0' }}>
      <CContainer
        className="d-flex align-items-center justify-content-start border-bottom px-4"
        style={{
          backgroundColor: '#141414',
        }}
        fluid
      >
        <CHeaderToggler
          onClick={() => {
            setSidebarOpen(!sidebarOpen)
            dispatch(toggleSidebar(!sidebarShow.sidebarShow))
          }}
          style={{
            marginLeft: sidebarOpen ? '-48.5px' : '-36px',
            marginBottom: '-58.5px',
          }}
        >
          <img
            src={sidebarOpen ? closeSidebar : openSidebar}
            style={{ width: '24px', height: '24px' }}
          />
        </CHeaderToggler>
        <div>
          <p style={{ fontSize: '14px', height: '30px', marginBottom: '0', paddingTop: '4px' }}>
            {name} 
          </p>
          <a href="https://uatiammodule.eventussecurity.com/static/index.html">link</a>
        </div>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
