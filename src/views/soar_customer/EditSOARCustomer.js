/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CForm,
  CCloseButton,
} from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
import { getL3Customer } from '../../slices/l3CustomerSlice'
import SelectBox from '../../components/Form/SelectBox'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import { getSOARCustomer } from '../../slices/SOARCustomer/GetSOARCustomerSlice'
import { clearErrors, updateSOARCustomer } from '../../slices/SOARCustomer/UpdateSOARCustomerSlice'
import Loader from '../../components/Loader'

export default function EditSOARCustomer({ toggleSidebar, id }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { SOAR_customer, loading: SOAR_loading } = useSelector((state) => state.SOAR_customer)
  const { error, isUpdated, loading } = useSelector((state) => state.update_SOAR_customer)
  const { l3_customers: users } = useSelector((state) => state.l3_customers)
  const [toggleCount, setToggleCount] = useState(0)
  // const { id } = useParams()

  let initial_state = {
    customer: '',
    api_key: '',
    url: '',
    status: '',
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (toggleCount === 0) {
      setToggleCount(1)
    }
  }, [toggleCount])

  useEffect(() => {
    dispatch(getSOARCustomer(id))
    dispatch(getL3Customer())
  }, [id])

  useEffect(() => {
    if (isUpdated) {
      dispatch(clearErrors())
      window.location.reload()
      if (toggleCount === 0) toggleSidebar()
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearErrors())
      }, 2000)
    }
  }, [dispatch, isUpdated, error])

  useEffect(() => {
    if (SOAR_customer) {
      setUser({
        ...user,
        customer: SOAR_customer.customer._id,
        api_key: SOAR_customer.api_key,
        url: SOAR_customer.url,
        status: SOAR_customer.status,
      })
    }
  }, [SOAR_customer])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) dispatch(updateSOARCustomer(id, user))
  }

  return (
    <>
      {loading || SOAR_loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>Edit SOAR Customer</h5>
            <CCloseButton
              onClick={() => {
                setUser(initial_state)
                dispatch(clearErrors())
                toggleSidebar()
                setValidationError('')
              }}
            />
          </div>
          <CRow>
            <CCol xs>
              <div className="create-SOAR-customer" style={{ borderTop: '2px solid #303030' }}>
                <CForm className="px-3">
                  <CRow>
                    <CCol sm={6}>
                      <SelectBox
                        id="customer"
                        label="Customer"
                        defaultOption="Select Customer"
                        onChange={(e) => setUser({ ...user, customer: e.target.value })}
                        value={user && user.customer}
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
                        label="URL"
                        type="text"
                        placeholder="Enter the URL"
                        value={user.url}
                        onChange={(e) => setUser({ ...user, url: e.target.value })}
                        id="url"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={4}>
                      <SelectBox
                        id="status"
                        label="Status"
                        defaultOption="Select Customer Status"
                        onChange={(e) => setUser({ ...user, status: e.target.value })}
                        value={user && user.status}
                        options={Object.keys(CONSTANTS.STATUS).map((item) => (
                          <option key={item} value={CONSTANTS.STATUS[item]}>
                            {CONSTANTS.STATUS[item]}
                          </option>
                        ))}
                      />
                    </CCol>
                  </CRow>
                </CForm>
              </div>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end px-3">
                <CButton
                  type="button"
                  color="secondary"
                  onClick={() => {
                    toggleSidebar()
                    setValidationError('')
                  }}
                >
                  Cancel
                </CButton>
                <CButton type="button" color="primary" onClick={submit}>
                  Update
                </CButton>
              </span>
              <div className="p-3">
                <Alert
                  showAlert={isUpdated || error || validationError}
                  variant={isUpdated ? 'success' : 'danger'}
                  message={
                    isUpdated
                      ? 'SOAR Customer Updated Successfully'
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
