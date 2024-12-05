/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../utils/constants'
import { clearErrors, createAWSCustomer } from '../../actions/AWSCustomerActions'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCloseButton } from '@coreui/react'
import { getL3Customer } from '../../actions/CustomerActions'
import TextInput from '../../components/Form/TextInput'
import SelectBox from '../../components/Form/SelectBox'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'

export default function NewAWSCustomer({ toggleSidebar }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { l3_customers: users } = useSelector((state) => state.l3_customers)
  const {
    error: AwsCreateError,
    success: AwsCreateSuccess,
    loading,
  } = useSelector((state) => state.create_aws_customer)

  let initial_state = {
    customer: '',
    access_key_id: '',
    secret_access_key: '',
    bucket_name: '',
    parent_folder: '',
    product_name: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.AWS.PRODUCT_NAME,
    product_type: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.AWS.PRODUCT_TYPE,
    product_module: CONSTANTS.DEFAULT_VALUES.CUSTOMER_DETAILS.AWS.PRODUCT_MODULE,
    status: CONSTANTS.STATUS.ACTIVE,
  }
  const [awsUser, setAWSUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [toggleCount, setToggleCount] = useState(0)

  useEffect(() => {
    if (AwsCreateSuccess || AwsCreateError) {
      setTimeout(() => {
        dispatch(clearErrors())

        if (AwsCreateSuccess) {
          dispatch(clearErrors())
        }
      }, 1000) // clearing the success / error state so that the pop up disappears

      if (AwsCreateSuccess) {
        setAWSUser(initial_state)
        window.location.reload()
        if (toggleCount === 0) toggleSidebar()
      }
    }
  }, [AwsCreateError, AwsCreateSuccess])

  useEffect(() => {
    if (toggleCount === 0) {
      setToggleCount(1)
    }
  }, [toggleCount])

  useEffect(() => {
    dispatch(getL3Customer())
  }, [])

  const submit = () => {
    if (validate_required_keys(awsUser, setValidationError)) {
      dispatch(createAWSCustomer(awsUser))
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>Add AWS Customer</h5>
            <CCloseButton
              onClick={() => {
                setAWSUser(initial_state)
                setValidationError('')
                dispatch(clearErrors())
                toggleSidebar()
              }}
            />
          </div>
          <CRow>
            <CCol xs>
              <div className="create-aws-customer" style={{ borderTop: '2px solid #303030' }}>
                <CForm className="p-3">
                  <CRow>
                    <CCol sm={6}>
                      <SelectBox
                        id="customer"
                        label="Customer"
                        defaultOption="Select Customer"
                        onChange={(e) => setAWSUser({ ...awsUser, customer: e.target.value })}
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
                        label="Access Key Id"
                        type="text"
                        placeholder="Enter Access Key Id"
                        value={awsUser.access_key_id}
                        onChange={(e) => setAWSUser({ ...awsUser, access_key_id: e.target.value })}
                        id="access_key_id"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6}>
                      <TextInput
                        label="Secret Access Key"
                        type="text"
                        placeholder="Enter Secret Access Key"
                        value={awsUser.secret_access_key}
                        onChange={(e) =>
                          setAWSUser({ ...awsUser, secret_access_key: e.target.value })
                        }
                        id="secret_access_key"
                      />
                    </CCol>
                    <CCol sm={6}>
                      <TextInput
                        label="Bucket Name"
                        id="bucket_name"
                        type="text"
                        placeholder="Enter Bucket Name"
                        value={awsUser.bucket_name}
                        onChange={(e) => setAWSUser({ ...awsUser, bucket_name: e.target.value })}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6}>
                      <TextInput
                        label="Parent Folder"
                        id="parent_folder"
                        type="text"
                        placeholder="Enter Parent Folder"
                        value={awsUser.parent_folder}
                        onChange={(e) => setAWSUser({ ...awsUser, parent_folder: e.target.value })}
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
                  showAlert={AwsCreateSuccess || AwsCreateError || validationError}
                  variant={AwsCreateSuccess ? 'success' : 'danger'}
                  message={
                    AwsCreateSuccess
                      ? 'AWS Customer Created Successfully'
                      : validationError
                        ? validationError
                        : AwsCreateError
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
