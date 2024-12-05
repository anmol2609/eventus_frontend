/* eslint-disable react/prop-types */
import React from 'react'
import { CFormSelect, CFormLabel } from '@coreui/react'

export default function SelectBox({
  label,
  id,
  onChange,
  defaultOption,
  options,
  value,
  width,
  disabled = false,
  disableBottomMargin = false,
}) {
  return (
    <>
      {label && <CFormLabel htmlFor={id}>{label}</CFormLabel>}
      <CFormSelect
        disabled={disabled}
        className={disableBottomMargin ? '' : 'mb-3'}
        id={id}
        aria-label={label}
        onChange={onChange}
        style={{
          backgroundColor: 'rgb(31, 31, 31)',
          width: width ? width : null,
        }}
        value={value}
      >
        <option value="">{defaultOption}</option>
        {options}
      </CFormSelect>
    </>
  )
}
