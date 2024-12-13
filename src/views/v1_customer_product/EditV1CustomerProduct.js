import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CForm } from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
import SelectBox from '../../components/Form/SelectBox'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import {
  getV1CustomerProduct,
} from '../../slices/v1CustomerProduct/GetV1CustomerProductSlice'
import {
  clearErrors,
  updateV1CustomerProduct,
} from '../../slices/v1CustomerProduct/UpdateV1CustomerProductSlice'

export default function EditV1CustomerProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, isUpdated, loading } = useSelector((state) => state.update_V1_customer_product)
  const { V1_products } = useSelector((state) => state.V1_products)
  const { V1_customer_product, loading: V1_customer_product_loading } = useSelector(
    (state) => state.V1_customer_product,
  )
  const { id } = useParams()

  let initial_state = {
    customer: '',
    product: '',
    status: '',
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    dispatch(getV1CustomerProduct(id))
  }, [])

  useEffect(() => {
    if (isUpdated) {
      dispatch(clearErrors())
      navigate(`/v1_customer_products/${user['customer']}`)
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
        customer: V1_customer_product.customer._id,
        product: V1_customer_product.product._id,
        status: V1_customer_product.status,
      })
    }
  }, [V1_customer_product])

  const submit = () => {
    if (validate_required_keys(user, setValidationError))
      dispatch(updateV1CustomerProduct(id, user))
  }

  return (
    <>
      {loading || V1_customer_product_loading ? (
        <Loader />
      ) : (
        <CRow>
          <CCol xs>
            <Alert
              showAlert={isUpdated || error || validationError}
              variant={isUpdated ? 'success' : 'danger'}
              message={
                isUpdated
                  ? 'V1 Customer Product Updated Successfully'
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
              <CCardHeader>Edit V1 Customer Product</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Edit V1 Customer Product</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      type="button"
                      color="secondary"
                      onClick={() => navigate(`/v1_customer_products/${user['customer']}`)}
                    >
                      Cancel
                    </CButton>
                    <CButton type="button" color="primary" onClick={submit}>
                      Update
                    </CButton>
                  </span>
                </p>
                <div className="edit-V1-customer-product">
                  <CForm>
                    <CRow>
                      <CCol sm={6}>
                        <SelectBox
                          id="product"
                          label="Product"
                          defaultOption="Select V1 Product"
                          onChange={(e) => setUser({ ...user, product: e.target.value })}
                          value={user && user.product}
                          options={
                            V1_products &&
                            V1_products.map((product) => (
                              <option key={product._id} value={product._id}>
                                {product.product_name}
                              </option>
                            ))
                          }
                        />
                      </CCol>
                      <CCol sm={6}>
                        <SelectBox
                          id="status"
                          label="Status"
                          defaultOption="Select Customer V1 Product Status"
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
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  )
}
