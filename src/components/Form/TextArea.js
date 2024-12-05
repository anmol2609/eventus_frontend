/* eslint-disable react/prop-types */
import React from 'react'
import { CFormTextarea } from '@coreui/react'

export default function TextArea({
  label,
  placeholder,
  value,
  onChange,
  id,
  style,
  rows = 4,
  subText = '',
  disabled = false,
}) {
  return (
    <>
      <CFormTextarea
        id={id}
        label={label}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          backgroundColor: 'rgb(31, 31, 31)',
          marginBottom: '1rem',
          ...style,
        }}
        text={subText}
        disabled={disabled}
      ></CFormTextarea>
    </>
  )
}
