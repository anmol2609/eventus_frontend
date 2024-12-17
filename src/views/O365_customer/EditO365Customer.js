/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
import { CRow, CCol, CButton, CForm, CCloseButton } from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
import { getL3Customer } from '../../slices/l3CustomerSlice'
import SelectBox from '../../components/Form/SelectBox'
import TextInput from '../../components/Form/TextInput'
import { getO365Customer } from '../../slices/O365Customers/GetO365CustomerSlice'
import { clearErrors, updateO365Customer } from '../../slices/O365Customers/UpdateO365CustomerSlice'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'

export default function EditO365Customer({ toggleSidebar, id }) {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { O365_customer, loading: O365_customer_loading } = useSelector(
    (state) => state.O365_customer,
  )
  const { error, isUpdated, loading } = useSelector((state) => state.update_O365_customer)
  const { l3_customers: users } = useSelector((state) => state.l3_customers)
  const [toggleCount, setToggleCount] = useState(0)
  // const { id } = useParams()

  let initial_state = {
    customer: '',
    tenant_id: '',
    client_id: '',
    client_secret: '',
    product_name: '',
    product_type: '',
    product_module: '',
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
    dispatch(getO365Customer(id))
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
    if (O365_customer) {
      setUser({
        ...user,
        customer: O365_customer.customer._id,
        tenant_id: O365_customer.tenant_id,
        client_id: O365_customer.client_id,
        client_secret: O365_customer.client_secret,
        product_name: O365_customer.product_name,
        product_type: O365_customer.product_type,
        product_module: O365_customer.product_module,
        status: O365_customer.status,
      })
    }
  }, [O365_customer])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) dispatch(updateO365Customer(id, user))
  }

  return (
    <>
      {loading || O365_customer_loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>Edit O365 Customer</h5>
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
              <div className="create-O365-customer" style={{ borderTop: '2px solid #303030' }}>
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
                    <CCol sm={4}>
                      <TextInput
                        label="Tenant Id"
                        type="text"
                        placeholder="Enter Tenant Id"
                        value={user.tenant_id}
                        onChange={(e) => setUser({ ...user, tenant_id: e.target.value })}
                        id="tenant_id"
                      />
                    </CCol>
                    <CCol sm={4}>
                      <TextInput
                        label="Client Id"
                        type="text"
                        placeholder="Enter Client Id"
                        value={user.client_id}
                        onChange={(e) => setUser({ ...user, client_id: e.target.value })}
                        id="client_id"
                      />
                    </CCol>
                    <CCol sm={4}>
                      <TextInput
                        label="Client Secret"
                        id="client_secret"
                        type="text"
                        placeholder="Enter Client Secret"
                        value={user.client_secret}
                        onChange={(e) => setUser({ ...user, client_secret: e.target.value })}
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
                      ? 'O365 User Updated Successfully'
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
