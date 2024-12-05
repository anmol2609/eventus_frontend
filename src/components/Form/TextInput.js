/* eslint-disable react/prop-types */
import React from 'react'
import { CFormInput, CFormLabel } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import '../index.css'

export default function TextInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  id,
  style,
  trailIconClick,
  bg_color,
  refVal,
  max_num = null,
  min_num = null,
  trailIcon = null,
  disabled = false,
  disableBottomMargin = false,
}) {
  return (
    <>
      {trailIcon ? (
        <div
          className="input-group"
          style={{
            ...style,
            borderRadius: 7,
            paddingRight: 5,
            outline: 'none',
          }}
        >
          <CFormInput
            id={id}
            type={type}
            placeholder={placeholder}
            aria-label="sm input example"
            value={value}
            onChange={onChange}
            readOnly={disabled}
            ref={refVal}
            style={{
              ...style,
              backgroundColor: bg_color ? bg_color : 'rgb(31, 31, 31)',
              border: 0,
            }}
            className="custom-input"
          />
          <span className="input-group-append">
            <button className="btn" type="button" onClick={trailIconClick}>
              <CIcon icon={trailIcon} />
            </button>
          </span>
        </div>
      ) : (
        <>
          {label && <CFormLabel htmlFor={id}>{label}</CFormLabel>}
          <CFormInput
            id={id}
            ref={refVal}
            type={type}
            placeholder={placeholder}
            aria-label="sm input example"
            value={value}
            onChange={onChange}
            style={{
              backgroundColor: bg_color ? bg_color : 'rgb(31, 31, 31)',
              marginBottom: !disableBottomMargin ? '1rem' : 0,
              ...style,
            }}
            readOnly={disabled}
            max={max_num}
            min={min_num}
          />
        </>
      )}
    </>
  )
}
