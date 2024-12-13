import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CONSTANTS } from '../../utils/constants'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import SelectBox from '../../components/Form/SelectBox'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import { getAllV1Products } from '../../slices/v1Product/GetAllV1ProductSlice'
import { getV1Customer } from '../../slices/v1Customer/GetV1Customerslice'
import { clearErrors, createV1CustomerProduct } from '../../slices/v1CustomerProduct/CreateV1CustomerProductSlice'

export default function NewV1CustomerProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { V1_products, loading } = useSelector((state) => state.V1_products)
  const {
    success,
    error,
    loading: create_v1_product_loading,
  } = useSelector((state) => state.create_V1_customer_product)
  // const { V1_customer, loading: V1_customer_loading } = useSelector((state) => state.V1_customer)
  const { customer_id } = useParams()

  let initial_state = {
    customer: customer_id,
    product: '',
    status: '',
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    dispatch(getAllV1Products())
    dispatch(getV1Customer(customer_id))
  }, [])

  useEffect(() => {
    if (success || error) {
      setTimeout(
        () => {
          dispatch(clearErrors())

          if (success) {
            navigate(`/v1_customer_products/${customer_id}`)
            dispatch(clearErrors())
          }
        },
        success ? 1000 : 2000,
      ) // clearing the success / error state so that the pop up disappears

      if (success) {
        setUser(initial_state)
      }
    }
  }, [dispatch, error, success])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) {
      dispatch(createV1CustomerProduct(user))
    }
  }

  return (
    <>
      {loading || create_v1_product_loading ? (
        <Loader />
      ) : (
        <CRow>
          <CCol xs>
            <Alert
              showAlert={success || error || validationError}
              variant={success ? 'success' : 'danger'}
              message={
                success
                  ? 'V1 Customer Product Created Successfully'
                  : validationError
                    ? validationError
                    : error
              }
            />
            <CCard
              className="mb-4"
              style={{
                backgroundColor: 'rgb(31, 31, 31)',
              }}
            >
              <CCardHeader>Create V1 Customer Product</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>New V1 Customer Product</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      variant="outline"
                      type="button"
                      color="secondary"
                      onClick={() => navigate(`/v1_customer_products/${customer_id}`)}
                    >
                      Cancel
                    </CButton>
                    <CButton variant="outline" type="button" color="primary" onClick={submit}>
                      Save
                    </CButton>
                  </span>
                </p>
                <div className="create-v1-customer-product">
                  <CForm>
                    <CRow>
                      <CCol sm={6}>
                        <SelectBox
                          id="product"
                          label="Product"
                          defaultOption="Select V1 Product"
                          onChange={(e) => setUser({ ...user, product: e.target.value })}
                          options={
                            V1_products &&
                            V1_products.map((user) => (
                              <option key={user._id} value={user._id}>
                                {user.product_name}
                              </option>
                            ))
                          }
                        />
                      </CCol>

                      <CCol sm={6}>
                        <SelectBox
                          id="status"
                          label="Status"
                          defaultOption="Select Customer Product Status"
                          onChange={(e) => setUser({ ...user, status: e.target.value })}
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
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  )
}
