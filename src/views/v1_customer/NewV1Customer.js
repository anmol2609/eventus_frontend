/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../utils/constants'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCloseButton } from '@coreui/react'
import { getL3Customer } from '../../actions/CustomerActions'
import TextInput from '../../components/Form/TextInput'
import SelectBox from '../../components/Form/SelectBox'
import { validate_required_keys } from '../../utils/validators/required_key'
import { clearErrors, createV1Customer } from '../../actions/V1CustomerActions'
import Loader from '../../components/Loader'
import MultiSelectBox from '../../components/Form/MultiSelectBox'
import { createV1CustomerProduct } from '../../actions/V1CustomerProductActions'

export default function NewV1Customer({ toggleSidebar }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, success, loading } = useSelector((state) => state.create_V1_customer)
  const { V1_products, loading: V1_products_loading } = useSelector((state) => state.V1_products)
  const { l3_customers: users, loading: users_loading } = useSelector((state) => state.l3_customers)
  const { V1_customer } = useSelector((state) => state.create_V1_customer)

  let V1_customer_initial_state = {
    customer: '',
    api_key: '',
    base_url: '',
    status: CONSTANTS.STATUS.ACTIVE,
  }
  let V1_products_initial_state = []
  const [user, setUser] = useState(V1_customer_initial_state)
  const [validationError, setValidationError] = useState('')
  const [selectedV1Products, setSelectedV1Products] = useState(V1_products_initial_state)
  const [toggleCount, setToggleCount] = useState(0)
  const [isInitialRender, setIsInitialRender] = useState(true)

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
    } else if (toggleCount === 0) {
      setToggleCount(1)
    }
  }, [toggleCount])

  useEffect(() => {
    dispatch(getL3Customer())
  }, [])

  useEffect(() => {
    if (success || error) {
      setTimeout(() => {
        dispatch(clearErrors())

        if (success) {
          dispatch(clearErrors())
        }
      }, 1000) // clearing the success / error state so that the pop up disappears

      if (success) {
        setUser(V1_customer_initial_state)
        window.location.reload()
        if (toggleCount === 0) toggleSidebar()
      }
    }

    if (V1_customer && V1_customer.data) {
      for (let i = 0; i < selectedV1Products.length; ++i) {
        let data = {
          customer: V1_customer.data._id,
          product: selectedV1Products[i].value,
          status: CONSTANTS.STATUS.ACTIVE,
        }
        dispatch(createV1CustomerProduct(data))
      }
      setSelectedV1Products(V1_products_initial_state)
    }
  }, [dispatch, error, success, V1_customer])

  const submit = () => {
    if (validate_required_keys(user, setValidationError) && validateV1CustomerProduct()) {
      dispatch(createV1Customer(user))
    }
  }

  const validateV1CustomerProduct = () => {
    if (selectedV1Products.length === 0) {
      setValidationError('Please Select Modules')
      return false
    }
    return true
  }

  return (
    <>
      {loading || users_loading || V1_products_loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center p-3">
            <h5>Vision One Customer</h5>
            <CCloseButton
              onClick={() => {
                setUser(V1_customer_initial_state)
                setValidationError('')
                dispatch(clearErrors())
                toggleSidebar()
              }}
            />
          </div>
          <CRow>
            <CCol xs>
              <div className="create-v1-customer" style={{ borderTop: '2px solid #303030' }}>
                <CForm className="p-3">
                  <CRow>
                    <CCol sm={6}>
                      <SelectBox
                        id="customer"
                        label="Customer"
                        defaultOption="Select Customer"
                        onChange={(e) => setUser({ ...user, customer: e.target.value })}
                        options={
                          users &&
                          users.map((user) => (
                            <option key={user._id} value={user._id}>
                              {user.name}
                            </option>
                          ))
                        }
                      />
                    </CCol>
                    <CCol sm={6}>
                      <TextInput
                        label="Base URL"
                        type="text"
                        placeholder="Enter the URL"
                        value={user.base_url}
                        onChange={(e) => setUser({ ...user, base_url: e.target.value })}
                        id="base_url"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6}>
                      <TextInput
                        label="API Key"
                        type="text"
                        placeholder="Enter API Key"
                        value={user.api_key}
                        onChange={(e) => setUser({ ...user, api_key: e.target.value })}
                        id="api_key"
                      />
                    </CCol>
                    <CCol sm={6}>
                      <MultiSelectBox
                        label="Select Modules"
                        options={
                          V1_products &&
                          V1_products.map((V1_product) => ({
                            value: V1_product._id,
                            label: V1_product.name,
                          }))
                        }
                        value={selectedV1Products}
                        placeholder="Select Modules"
                        noOptionsMessage={() => 'No such module'}
                        onChange={setSelectedV1Products}
                      />
                    </CCol>
                  </CRow>
                </CForm>
                <span className="d-grid gap-2 d-md-flex justify-content-md-end px-3">
                  <CButton
                    variant="outline"
                    type="button"
                    color="secondary"
                    onClick={toggleSidebar}
                  >
                    Cancel
                  </CButton>
                  <CButton variant="outline" type="button" color="primary" onClick={submit}>
                    Save
                  </CButton>
                </span>
                <div className="p-3">
                  <Alert
                    showAlert={success || error || validationError}
                    variant={success ? 'success' : 'danger'}
                    message={
                      success
                        ? 'V1 Customer Created Successfully'
                        : validationError
                          ? validationError
                          : error
                    }
                  />
                </div>
              </div>
            </CCol>
          </CRow>
        </>
      )}
    </>
  )
}
