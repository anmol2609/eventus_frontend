/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CRow, CCol, CButton, CForm, CCloseButton } from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
import SelectBox from '../../components/Form/SelectBox'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import { clearErrors, getV1Product, updateV1Product } from '../../actions/V1ProductActions'
import Loader from '../../components/Loader'

export default function EditV1Product({ toggleSidebar, id }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { V1_product, loading: V1_product_loading } = useSelector((state) => state.V1_product)
  const { error, isUpdated, loading } = useSelector((state) => state.update_V1_product)
  // const { id } = useParams()

  let initial_state = {
    product_name: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.V1.PRODUCT_NAME,
    product_type: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.V1.PRODUCT_TYPE,
    product_module: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.V1.PRODUCT_MODULE,
    name: '',
    url: '',
    interval: '',
    status: '',
  }
  const [product, setProduct] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [toggleCount, setToggleCount] = useState(0)
  const [isInitialRender, setIsInitialRender] = useState(true)

  useEffect(() => {
    dispatch(getV1Product(id))
  }, [id])

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
    } else if (toggleCount === 0) {
      setToggleCount(1)
    }
  }, [toggleCount])

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
    if (V1_product) {
      setProduct({
        ...product,
        name: V1_product.name,
        url: V1_product.url,
        interval: V1_product.interval,
        product_name: V1_product.product_name,
        product_type: V1_product.product_type,
        product_module: V1_product.product_module,
        status: V1_product.status,
      })
    }
  }, [V1_product])

  const submit = () => {
    if (validate_required_keys(product, setValidationError)) dispatch(updateV1Product(id, product))
  }

  return (
    <>
      {loading | V1_product_loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center p-3">
            <h5>Edit Vision One Product</h5>
            <CCloseButton
              onClick={() => {
                setProduct(initial_state)
                setValidationError('')
                dispatch(clearErrors())
                toggleSidebar()
              }}
            />
          </div>
          <CRow>
            <CCol xs>
              <div className="update-V1-product" style={{ borderTop: '2px solid #303030' }}>
                <CForm className="p-3">
                  <CRow>
                    <CCol sm={4}>
                      <TextInput
                        label="Name"
                        type="text"
                        placeholder="Enter Name"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        id="name"
                      />
                    </CCol>
                    <CCol sm={4}>
                      <TextInput
                        label="URL"
                        id="url"
                        type="text"
                        placeholder="Enter the URL"
                        value={product.url}
                        onChange={(e) => setProduct({ ...product, url: e.target.value })}
                      />
                    </CCol>
                    <CCol sm={4}>
                      <TextInput
                        label="Interval"
                        id="interval"
                        type="number"
                        placeholder="Enter Interval"
                        value={product.interval}
                        onChange={(e) => setProduct({ ...product, interval: e.target.value })}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6}>
                      <SelectBox
                        id="status"
                        label="Status"
                        defaultOption="Select Product Status"
                        onChange={(e) => setProduct({ ...product, status: e.target.value })}
                        options={Object.keys(CONSTANTS.STATUS).map((item) => (
                          <option key={item} value={CONSTANTS.STATUS[item]}>
                            {CONSTANTS.STATUS[item]}
                          </option>
                        ))}
                        value={product.status}
                      />
                    </CCol>
                  </CRow>
                </CForm>
              </div>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end px-3">
                <CButton type="button" color="secondary" onClick={toggleSidebar}>
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
                      ? 'V1 Product Updated Successfully'
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
