import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../utils/constants'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import TextInput from '../../components/Form/TextInput'
import SelectBox from '../../components/Form/SelectBox'
import { validate_required_keys } from '../../utils/validators/required_key'
import { clearErrors, createSOARProduct } from '../../slices/soarProductSlice'
import TextArea from '../../components/Form/TextArea'
import Loader from '../../components/Loader'

export default function NewSOARProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, success, loading } = useSelector((state) => state.soarProducts)

  const initial_state = {
    product_name: '',
    extra_data_field: '',
    field_in_log: '',
    status: '',
  }

  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (success || error) {
      setTimeout(
        () => {
          dispatch(clearErrors())

          if (success) {
            navigate('/soar_products')
          }
        },
        success ? 1000 : 2000,
      )

      if (success) {
        setUser(initial_state)
      }
    }
  }, [dispatch, error, success, navigate])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) {
      dispatch(createSOARProduct(user))
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <CRow>
          <CCol xs>
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
            <CCard
              className="mb-4"
              style={{
                backgroundColor: 'rgb(31, 31, 31)',
              }}
            >
              <CCardHeader>Create SOAR Product</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>New SOAR Product</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      variant="outline"
                      type="button"
                      color="secondary"
                      onClick={() => navigate('/soar_products')}
                    >
                      Cancel
                    </CButton>
                    <CButton variant="outline" type="button" color="primary" onClick={submit}>
                      Save
                    </CButton>
                  </span>
                </p>
                <div className="create-soar-product">
                  <CForm>
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
                        <TextInput
                          label="Field In Log"
                          type="text"
                          placeholder="Enter Field In Log"
                          value={user.field_in_log}
                          onChange={(e) => setUser({ ...user, field_in_log: e.target.value })}
                          id="field_in_log"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol sm={6}>
                        <TextArea
                          id="extra_data_field"
                          placeholder="Enter Extra Data Field"
                          value={user.extra_data_field}
                          onChange={(e) => setUser({ ...user, extra_data_field: e.target.value })}
                          label="Extra Data Field"
                          rows={5}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol sm={6}>
                        <SelectBox
                          id="status"
                          label="Customer Status"
                          defaultOption="Select Customer Status"
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
