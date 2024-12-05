/* eslint-disable react/prop-types */
import React from 'react'
import { CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilWarning } from '@coreui/icons'

export default function Alert({ showAlert, message, variant }) {
  return showAlert ? (
    <CAlert color={variant} className="d-flex align-items-center">
      <CIcon
        icon={variant == 'success' ? cilCheckCircle : cilWarning}
        className="flex-shrink-0 me-2"
        width={24}
        height={24}
      />
      <div>{message}</div>
    </CAlert>
  ) : null
}
