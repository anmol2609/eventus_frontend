import React from 'react'
import { useLocation } from 'react-router-dom'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import  { InterfaceServiceClient }  from './../grpc/interface_grpc_web_pb';
import {InterfaceRequest , InterfaceResponse } from './../grpc/interface_pb';
const DefaultLayout = () => {
  // Define the gRPC server address
  const serverAddress = '155.248.243.157:50052'; // Change this to your server address
  // Initialize the client
  
  const client = new InterfaceServiceClient(serverAddress);
  // Initialize the client
  // Create a new InterfaceRequest object and populate it
  const request = new InterfaceRequest();
  request.setAppId('iam_0.1');
  request.setResourcePath('get_user_detail');
  request.setRequestData(JSON.stringify({ session_id: '978a8eae-5482-482c-9b70-12c4c7b5ce4c'}));
    // Metadata (optional)
  const metadata = {
    authorization: 'Bearer sample+token', // Example metadata
  };
  // Send the request using the client
client.sendRequest(request, metadata, (error, response) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log('Response received:');
  console.log('Status:', response.getStatus());
  console.log('Message:', response.getMessage());
  console.log('Response Data:', response.getResponseData());
});
  console.log(request,"requestrequest")
  console.log(InterfaceServiceClient,"InterfaceServiceClient")
  console.log(InterfaceRequest,"InterfaceRequest")
  console.log(InterfaceResponse,"reqreqreqreq")
  console.log(metadata,"metadatametadata")
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
