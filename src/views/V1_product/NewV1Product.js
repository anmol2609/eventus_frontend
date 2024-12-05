/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../utils/constants'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCloseButton } from '@coreui/react'
import TextInput from '../../components/Form/TextInput'
import SelectBox from '../../components/Form/SelectBox'
import { validate_required_keys } from '../../utils/validators/required_key'
import { clearErrors, createV1Product } from '../../actions/V1ProductActions'
import Loader from '../../components/Loader'

export default function NewV1Product({ toggleSidebar }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, success, loading } = useSelector((state) => state.create_V1_product)

  let initial_state = {
    product_name: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.V1.PRODUCT_NAME,
    product_type: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.V1.PRODUCT_TYPE,
    product_module: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.V1.PRODUCT_MODULE,
    name: '',
    url: '',
    interval: '',
    status: CONSTANTS.STATUS.ACTIVE,
  }
  const [product, setProduct] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [toggleCount, setToggleCount] = useState(0)
  const [isInitialRender, setIsInitialRender] = useState(true)

  useEffect(() => {
    if (success || error) {
      setTimeout(
        () => {
          dispatch(clearErrors())

          if (success) {
            dispatch(clearErrors())
          }
        },
        success ? 1000 : 2000,
      ) // clearing the success / error state so that the pop up disappears

      if (success) {
        setProduct(initial_state)
        window.location.reload()
        if (toggleCount === 0) toggleSidebar()
      }
    }
  }, [dispatch, error, success])

  // This useEffect gets called in the initial render as well which updates the toggleCount to 1 & hence sideBar never closes, so adding isInitialRender here & restricting the toggleCount update in the initial render.
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
    } else if (toggleCount === 0) {
      setToggleCount(1)
    }
  }, [toggleCount])

  const submit = () => {
    if (validate_required_keys(product, setValidationError)) {
      dispatch(createV1Product(product))
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center p-3">
            <h5>Add Vision One Module</h5>
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
              <div className="create-v1-product" style={{ borderTop: '2px solid #303030' }}>
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
                        label="Base URL"
                        id="url"
                        type="text"
                        placeholder="Enter Base URL"
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
                      ? 'V1 Product Created Successfully'
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
