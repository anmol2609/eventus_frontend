/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CONSTANTS } from '../../utils/constants'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCloseButton } from '@coreui/react'
//import { getL3Customer } from '../../actions/CustomerActions'
import { getL3Customer } from '../../slices/l3CustomerSlice'
import TextInput from '../../components/Form/TextInput'
import SelectBox from '../../components/Form/SelectBox'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
//import { clearErrors, createLoggerCustomer } from '../../actions/LoggerActions'
import { clearErrors, createLoggerCustomer } from '../../slices/logger/CreateLoggerCustomerSlice'
import MultiSelectBox from '../../components/Form/MultiSelectBox'

export default function NewLoggerCustomer({ toggleSidebar }) {
  const dispatch = useDispatch()
  const { error, success, loading } = useSelector((state) => state.create_logger_customer)
  const { logger_products, loading: logger_products_loading } = useSelector(
    (state) => state.logger_products,
  )
  const { l3_customers: users, loading: users_loading } = useSelector((state) => state.l3_customers)

  let initial_state = {
    customer: '',
    target: '',
    status: CONSTANTS.STATUS.ACTIVE,
    products: [],
  }
  const [customer, setCustomer] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])

  useEffect(() => {
    dispatch(getL3Customer())
  }, [])

  useEffect(() => {
    if (success || error) {
      setTimeout(
        () => {
          dispatch(clearErrors())

          if (success) {
            window.location.reload()
            dispatch(clearErrors())
          }
        },
        success ? 1000 : 2000,
      ) // clearing the success / error state so that the pop up disappears

      if (success) {
        setCustomer(initial_state)
        window.location.reload()
      }
    }
  }, [dispatch, error, success])

  const submit = () => {
    if (validate_required_keys(customer, setValidationError)) {
      customer.products = selectedProducts.map((product) => product.value)
      dispatch(createLoggerCustomer(customer))
    }
  }

  return (
    <>
      {loading || users_loading || logger_products_loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>Add Logger Customer</h5>
            <CCloseButton
              onClick={() => {
                setCustomer(initial_state)
                setValidationError('')
                dispatch(clearErrors())
                toggleSidebar()
              }}
            />
          </div>
          <CRow>
            <CCol xs>
              <div className="create-logger-customer" style={{ borderTop: '2px solid #303030' }}>
                <CForm className="p-3">
                  <CRow>
                    <CCol sm={6}>
                      <SelectBox
                        id="customer"
                        label="Customer"
                        defaultOption="Select Customer"
                        onChange={(e) => setCustomer({ ...customer, customer: e.target.value })}
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
                        label="Target"
                        type="text"
                        placeholder="Enter Target"
                        value={customer.target}
                        onChange={(e) => setCustomer({ ...customer, target: e.target.value })}
                        id="target"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6}>
                      <SelectBox
                        id="status"
                        label="Status"
                        defaultOption="Status"
                        onChange={(e) => setCustomer({ ...customer, status: e.target.value })}
                        options={Object.keys(CONSTANTS.STATUS).map((item) => (
                          <option key={item} value={CONSTANTS.STATUS[item]}>
                            {CONSTANTS.STATUS[item]}
                          </option>
                        ))}
                        value={customer.status}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={12}>
                      <MultiSelectBox
                        label="Select Products"
                        options={
                          logger_products &&
                          logger_products.map((logger_product) => ({
                            value: logger_product._id,
                            label: logger_product.product_name,
                          }))
                        }
                        value={selectedProducts}
                        placeholder="Select Products"
                        noOptionsMessage={() => 'No such product'}
                        onChange={setSelectedProducts}
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
                      ? 'Logger Customer Created Successfully'
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
