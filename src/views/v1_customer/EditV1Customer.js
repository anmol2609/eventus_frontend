/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
import { CRow, CCol, CButton, CForm, CCloseButton } from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { getL3Customer } from '../../slices/l3CustomerSlice'
import SelectBox from '../../components/Form/SelectBox'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import { clearErrors, updateV1Customer } from '../../slices/v1Customer/UpdateV1Customerslice'
import Loader from '../../components/Loader'
import MultiSelectBox from '../../components/Form/MultiSelectBox'
import {
  createV1CustomerProduct,
} from '../../slices/v1CustomerProduct/CreateV1CustomerProductSlice'
import {
  updateV1CustomerProduct,
} from '../../slices/v1CustomerProduct/UpdateV1CustomerProductSlice'
import { CONSTANTS } from '../../utils/constants'

export default function EditV1Customer({ toggleSidebar, V1_customer_product }) {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const { V1_customer, loading: V1_customer_loading } = useSelector((state) => state.V1_customer)
  const { error, isUpdated, loading } = useSelector((state) => state.update_V1_customer)
  const { V1_products, loading: V1_products_loading } = useSelector((state) => state.V1_products)
  const { l3_customers: users } = useSelector((state) => state.l3_customers)
  // const { id } = useParams()

  let initial_state = {
    customer: '',
    api_key: '',
    base_url: '',
    status: '',
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [toggleCount, setToggleCount] = useState(0)
  const [isInitialRender, setIsInitialRender] = useState(true)
  const [selectedV1Products, setSelectedV1Products] = useState([])

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
    } else if (toggleCount === 0) {
      setToggleCount(1)
    }
  }, [toggleCount])

  useEffect(() => {
    // dispatch(getV1Customer(id))
    dispatch(getL3Customer())
  }, [])

  useEffect(() => {
    if (isUpdated) {
      const existingProductNames = V1_customer_product['products'].map(
        (product) => product.product.name,
      )
      const selectedProductNames = selectedV1Products.map((product) => product.label)

      for (let i = 0; i < selectedV1Products.length; ++i) {
        let value = selectedV1Products[i].label
        if (existingProductNames.includes(value) && selectedProductNames.includes(value)) {
          // Condition 1: Value is present in both existingProductNames and selectedProductNames - SKIP
        } else if (!existingProductNames.includes(value) && selectedProductNames.includes(value)) {
          // Condition 2: Value is not present in existingProductNames but is present in selectedProductNames - active & Create
          let data = {
            customer: V1_customer_product['_id']._id,
            product: selectedV1Products[i].value,
            status: CONSTANTS.STATUS.ACTIVE,
          }
          dispatch(createV1CustomerProduct(data))
        }
      }

      for (let i = 0; i < V1_customer_product['products'].length; ++i) {
        let value = V1_customer_product['products'][i].product.name
        // Condition 3: Value is present in existingProductNames but not in selectedProductNames - Inactive & update
        if (existingProductNames.includes(value) && !selectedProductNames.includes(value)) {
          let data = { status: CONSTANTS.STATUS.INACTIVE }
          dispatch(
            updateV1CustomerProduct(V1_customer_product['V1_customer_product_details']._id, data),
          )
        }
      }

      setSelectedV1Products([])
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
    if (V1_customer_product) {
      setUser({
        ...user,
        customer: V1_customer_product['customer_details']._id,
        api_key: V1_customer_product['_id'].api_key,
        base_url: V1_customer_product['_id'].base_url,
        status: V1_customer_product['_id'].status,
      })
    }
  }, [V1_customer_product])

  const submit = () => {
    if (validate_required_keys(user, setValidationError))
      dispatch(updateV1Customer(V1_customer_product['_id']._id, user))
  }

  return (
    <>
      {loading || V1_products_loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>Edit Vision One Customer</h5>
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
              <div className="create-V1-customer" style={{ borderTop: '2px solid #303030' }}>
                <CForm className="p-3">
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
                  </CRow>

                  <CRow>
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
                        value={
                          V1_customer_product &&
                          V1_customer_product['products'].map((product) => ({
                            value: product.product._id,
                            label: product.product.name,
                          }))
                        }
                        placeholder="Select Modules"
                        noOptionsMessage={() => 'No such module'}
                        onChange={setSelectedV1Products}
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
                      ? 'V1 Customer Updated Successfully'
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
