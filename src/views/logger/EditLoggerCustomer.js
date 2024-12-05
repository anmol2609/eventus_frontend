/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CRow, CCol, CButton, CForm, CCloseButton } from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
import { getL3Customer } from '../../actions/CustomerActions'
import SelectBox from '../../components/Form/SelectBox'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import { clearErrors, getLoggerCustomer, updateLoggerCustomer } from '../../actions/LoggerActions'
import MultiSelectBox from '../../components/Form/MultiSelectBox'
import ConfigFile from './ConfigFile'

export default function EditLoggerCustomer({ toggleSidebar, id }) {
  const dispatch = useDispatch()
  const { logger_customer, loading: logger_customer_loading } = useSelector(
    (state) => state.logger_customer,
  )
  const { error, isUpdated, loading } = useSelector((state) => state.update_logger_customer)
  const { l3_customers: users } = useSelector((state) => state.l3_customers)
  const { logger_products } = useSelector((state) => state.logger_products)

  let initial_state = {
    customer: '',
    target: '',
    products: [],
    status: '',
  }
  const [selectedLoggerProducts, setSelectedLoggerProducts] = useState([])
  const [customer, setCustomer] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [loggerType, setLoggerType] = useState('logger01')

  useEffect(() => {
    dispatch(getLoggerCustomer(id))
    dispatch(getL3Customer())
  }, [id])

  useEffect(() => {
    if (isUpdated) {
      window.location.reload()
      dispatch(clearErrors())
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearErrors())
      }, 2000)
    }
  }, [dispatch, isUpdated, error])

  useEffect(() => {
    if (logger_customer) {
      setCustomer({
        ...customer,
        customer: logger_customer.customer._id,
        products: logger_customer.products,
        target: logger_customer.target,
        status: logger_customer.status,
      })

      let products = logger_customer['product_details'].map((product) => ({
        value: product._id,
        label: product.product_name,
      }))
      setSelectedLoggerProducts(products)
    }
  }, [logger_customer])

  const submit = () => {
    if (validate_required_keys(customer, setValidationError)) {
      customer.products = selectedLoggerProducts.map((product) => product.value)
      dispatch(updateLoggerCustomer(id, customer))
    }
  }

  const downloadConfigFile = () => {
    if (logger_customer) {
      const loggerFile = ConfigFile(logger_customer, loggerType)
      var blob = new Blob([loggerFile], { type: 'text/plain' })
      var url = URL.createObjectURL(blob)
      var a = document.createElement('a')
      a.href = url
      a.download = logger_customer.customer.name + '_rsyslog.conf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <>
      {loading || logger_customer_loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>Edit Logger Customer</h5>
            <CCloseButton
              onClick={() => {
                setCustomer(initial_state)
                dispatch(clearErrors())
                toggleSidebar()
                setValidationError('')
              }}
            />
          </div>
          <CRow>
            <CCol xs>
              <div className="create-logger-customer" style={{ borderTop: '2px solid #303030' }}>
                <CForm className="px-3">
                  <CRow>
                    <CCol sm={6}>
                      <SelectBox
                        id="customer"
                        label="Customer"
                        defaultOption="Select Customer"
                        onChange={(e) => setCustomer({ ...customer, customer: e.target.value })}
                        value={customer && customer.customer}
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
                        value={selectedLoggerProducts}
                        placeholder="Select Products"
                        noOptionsMessage={() => 'No such product'}
                        onChange={setSelectedLoggerProducts}
                      />
                    </CCol>
                  </CRow>

                  <CRow className="mt-3">
                    <CCol sm={6}>
                      <SelectBox
                        id="Logger Type"
                        label="Type"
                        defaultOption="Logger Type"
                        onChange={(e) => setLoggerType(e.target.value)}
                        options={['logger01', 'logger02', 'logger03'].map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                        value={loggerType}
                      />
                    </CCol>
                    <CCol sm={6}>
                      <div className="mt-3" />
                      <CButton
                        size="sm"
                        variant="outline"
                        type="button"
                        color="success"
                        className="m-3"
                        onClick={downloadConfigFile}
                      >
                        Download Config
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </div>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end p-3">
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
                      ? 'Logger Customer Updated Successfully'
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
