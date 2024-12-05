// /* eslint-disable react/prop-types */
// import { cilX } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import React from 'react'

// export default function ShowAllFilters({ searchParams, setSearchParams, search_params_for_list }) {
//   return (
//     searchParams && (
//       <div
//         className="mb-3 d-flex rounded-pill py-1"
//         // style={{ backgroundColor: 'rgb(300, 300, 300, 0.05)' }}
//       >
//         {/* #2F2F2F */}
//         {Object.entries(search_params_for_list).map(
//           ([key, value]) =>
//             value && (
//               <div
//                 key={key}
//                 style={{ fontSize: 12, backgroundColor: '#5949DE' }}
//                 className="text-light mx-1 rounded-pill px-2 py-1"
//               >
//                 <b>{key}</b>: {value}
//                 <CIcon
//                   onClick={() => {
//                     searchParams.delete(key)
//                     setSearchParams(searchParams)
//                   }}
//                   icon={cilX}
//                   style={{ paddingTop: 4, marginLeft: 5, fontWeight: 'bold' }}
//                 />
//               </div>
//             ),
//         )}
//       </div>
//     )
//   )
// }

import React from 'react'

export default function ShowAllFilters() {
  return <></>
}
