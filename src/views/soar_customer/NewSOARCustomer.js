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
import Loader from '../../components/Loader'
import { createSOARCustomer, clearErrors } from '../../actions/SOARCustomerActions'

export default function NewSOARCustomer({ toggleSidebar }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, success, loading } = useSelector((state) => state.create_SOAR_customer)
  const { l3_customers: users, loading: users_loading } = useSelector((state) => state.l3_customers)

  let initial_state = {
    customer: '',
    api_key: '',
    url: '',
    status: CONSTANTS.STATUS.ACTIVE,
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [toggleCount, setToggleCount] = useState(0)

  useEffect(() => {
    dispatch(getL3Customer())
  }, [])

  useEffect(() => {
    if (success || error) {
      setTimeout(
        () => {
          dispatch(clearErrors())

          if (success) {
            navigate('/onboarding')
            dispatch(clearErrors())
          }
        },
        success ? 1000 : 2000,
      ) // clearing the success / error state so that the pop up disappears

      if (success) {
        setUser(initial_state)
        window.location.reload()
        if (toggleCount === 0) toggleSidebar()
      }
    }
  }, [dispatch, error, success])

  useEffect(() => {
    if (toggleCount === 0) {
      setToggleCount(1)
    }
  }, [toggleCount])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) {
      dispatch(createSOARCustomer(user))
    }
  }

  return (
    <>
      {loading || users_loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>Add SOAR Customer</h5>
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
              <div className="create-soar-customer" style={{ borderTop: '2px solid #303030' }}>
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
                      <TextInput
                        label="Base URL"
                        type="text"
                        placeholder="Enter the URL"
                        value={user.url}
                        onChange={(e) => setUser({ ...user, url: e.target.value })}
                        id="url"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6}>
                      <SelectBox
                        id="status"
                        label="Status"
                        defaultOption="Select Customer Status"
                        onChange={(e) => setUser({ ...user, status: e.target.value })}
                        options={Object.keys(CONSTANTS.STATUS).map((item) => (
                          <option key={item} value={CONSTANTS.STATUS[item]}>
                            {CONSTANTS.STATUS[item]}
                          </option>
                        ))}
                        value={user.status}
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
                      ? 'SOAR Customer Created Successfully'
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
