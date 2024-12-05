/* eslint-disable react/prop-types */
import { CSpinner } from '@coreui/react'
import React from 'react'

export default function Loader({ color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CSpinner color={color || 'primary'} />
    </div>
  )
}
