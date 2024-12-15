/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../utils/constants'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCloseButton } from '@coreui/react'
import { getL3Customer } from '../../slices/l3CustomerSlice'
import TextInput from '../../components/Form/TextInput'
import SelectBox from '../../components/Form/SelectBox'
import { clearErrors, createO365Customer } from '../../slices/O365Customers/CreateO365CustomerSlice'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'

export default function NewO365Customer({ toggleSidebar }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, success, loading } = useSelector((state) => state.create_O365_customer)
  const { l3_customers: users, loading: users_loading } = useSelector((state) => state.l3_customer)

  let initial_state = {
    customer: '',
    tenant_id: '',
    client_id: '',
    client_secret: '',
    product_name: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.O365.PRODUCT_NAME,
    product_type: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.O365.PRODUCT_TYPE,
    product_module: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.O365.PRODUCT_MODULE,
    status: CONSTANTS.STATUS.ACTIVE,
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [toggleCount, setToggleCount] = useState(0)

  useEffect(() => {
    if (toggleCount === 0) {
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
        setUser(initial_state)
        window.location.reload()
        if (toggleCount === 0) toggleSidebar()
      }
    }
  }, [dispatch, error, success])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) {
      dispatch(createO365Customer(user))
    }
  }

  return (
    <>
      {loading || users_loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>Add O365 Customer</h5>
            <CCloseButton
              onClick={() => {
                setUser(initial_state)
                setValidationError('')
                dispatch(clearErrors())
                toggleSidebar()
              }}
            />
          </div>
          <CRow>
            <CCol xs>
              <div className="create-aws-customer" style={{ borderTop: '2px solid #303030' }}>
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
                        label="Tenant id"
                        type="text"
                        placeholder="Enter Tenant Id"
                        value={user.tenant_id}
                        onChange={(e) => setUser({ ...user, tenant_id: e.target.value })}
                        id="tenant_id"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6}>
                      <TextInput
                        label="Client Id"
                        type="text"
                        placeholder="Enter Client Id"
                        value={user.client_id}
                        onChange={(e) => setUser({ ...user, client_id: e.target.value })}
                        id="client_id"
                      />
                    </CCol>
                    <CCol sm={6}>
                      <TextInput
                        label="Client Secret"
                        type="text"
                        placeholder="Enter Client Secret"
                        value={user.client_secret}
                        onChange={(e) => setUser({ ...user, client_secret: e.target.value })}
                        id="client_secret"
                      />
                    </CCol>
                  </CRow>
                </CForm>
              </div>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end px-3">
                <CButton variant="outline" type="button" color="secondary" onClick={toggleSidebar}>
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
                      ? 'O365 Customer Created Successfully'
                      : validationError
                        ? validationError
                        : error
                  }
                />
              </div>
            </CCol>
          </CRow>
        </>
      )}
    </>
  )
}
