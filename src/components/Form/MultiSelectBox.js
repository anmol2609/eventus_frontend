/* eslint-disable react/prop-types */
import { CFormLabel } from '@coreui/react'
import React from 'react'
import Select from 'react-select'
import { Colors } from '../../utils/colors'

export default function MultiSelectBox({
  options,
  label,
  value,
  placeholder,
  onChange,
  noOptionsMessage = () => {},
  bg_color,
}) {
  return (
    <div>
      {label && <CFormLabel>{label}</CFormLabel>}
      <Select
        options={options}
        isMulti
        isSearchable
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        noOptionsMessage={noOptionsMessage}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: bg_color ? bg_color : 'rgb(31, 31, 31)',
            borderColor: bg_color ? bg_color : Colors.INPUT_BORDER,
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: bg_color ? bg_color : 'rgb(31, 31, 31)',
            borderColor: bg_color ? bg_color : Colors.INPUT_BORDER,
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused
              ? Colors.BG_LIGHT
              : bg_color
                ? bg_color
                : 'rgb(31, 31, 31)',
          }),
          multiValue: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: Colors.BG_LIGHT,
          }),
          multiValueLabel: (baseStyles) => ({
            ...baseStyles,
            color: Colors.WHITE,
          }),
        }}
      />
    </div>
  )
}
