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
import { clearErrors, createSOARProduct } from '../../slices/SOARProduct/CreateSOARProductSlice'
import Loader from '../../components/Loader'

export default function NewSOARProduct({ toggleSidebar }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, success, loading } = useSelector((state) => state.create_SOAR_product)
  const [toggleCount, setToggleCount] = useState(0)
  const [isInitialRender, setIsInitialRender] = useState(true)

  let initial_state = {
    product_name: '',
    status: CONSTANTS.STATUS.ACTIVE,
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
    } else if (toggleCount === 0) {
      setToggleCount(1)
    }
  }, [toggleCount])

  useEffect(() => {
    if (success || error) {
      setTimeout(() => {
        dispatch(clearErrors())

        if (success) {
          dispatch(clearErrors())
        }
      }, 1000) // clearing the success / error state so that the pop up disappears

      if (success) {
        setUser(initial_state)
        window.location.reload()
        if (toggleCount === 0) toggleSidebar()
      }
    }
  }, [dispatch, error, success])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) {
      dispatch(createSOARProduct(user))
      toggleSidebar()
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>New SOAR Product</h5>
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
              <div className="create-soar-product" style={{ borderTop: '2px solid #303030' }}>
                <CForm className="p-3">
                  <CRow>
                    <CCol sm={6}>
                      <TextInput
                        label="Product Name"
                        type="text"
                        placeholder="Enter Product Name"
                        value={user.product_name}
                        onChange={(e) => setUser({ ...user, product_name: e.target.value })}
                        id="product_name"
                      />
                    </CCol>
                    <CCol sm={6}>
                      <SelectBox
                        id="status"
                        label="Status"
                        defaultOption="Select Product Status"
                        value={user.status}
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
                      ? 'SOAR Product Created Successfully'
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
