import React from 'react'
import { useLocation } from 'react-router-dom'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
const DefaultLayout = () => {
  const location = useLocation()
  const getPageName = () => {
    const name = location.pathname.split('/').slice(0, 2).join('/')
    const headerPageMap = {
      '/rss_feeds': 'RSS Feeds Management',
      '/feed_entry': 'TI Canvas & Feeds',
    }
    return headerPageMap[name] ? headerPageMap[name] : 'Management'
  }
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader name={getPageName()} />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
