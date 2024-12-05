/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getAWSCustomer, updateAWSCustomer } from '../../actions/AWSCustomerActions'
// import { useNavigate, useParams } from 'react-router-dom'
import { CRow, CCol, CButton, CForm, CCloseButton } from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
import { getL3Customer } from '../../actions/CustomerActions'
import SelectBox from '../../components/Form/SelectBox'
import TextInput from '../../components/Form/TextInput'
import Loader from '../../components/Loader'

export default function EditAWSCustomer({ toggleSidebar, id }) {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { aws_customer, loading: customer_loading } = useSelector((state) => state.aws_customer)
  const { error, isUpdated, loading } = useSelector((state) => state.update_aws_customer)
  // const { users } = useSelector((state) => state.customers)
  const { l3_customers: users } = useSelector((state) => state.l3_customers)
  // const { id } = useParams()

  let initial_state = {
    customer: '',
    access_key_id: '',
    secret_access_key: '',
    product_name: '',
    product_type: '',
    product_module: '',
    bucket_name: '',
    parent_folder: '',
    status: CONSTANTS.STATUS.ACTIVE,
  }
  const [toggleCount, setToggleCount] = useState(0)
  const [isInitialRender, setIsInitialRender] = useState(true)
  const [awsUser, setAWSUser] = useState(initial_state)

  useEffect(() => {
    dispatch(getAWSCustomer(id))
    dispatch(getL3Customer())
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
    if (aws_customer) {
      setAWSUser({
        ...awsUser,
        customer: aws_customer.customer._id,
        access_key_id: aws_customer.access_key_id,
        secret_access_key: aws_customer.secret_access_key,
        product_name: aws_customer.product_name,
        product_type: aws_customer.product_type,
        product_module: aws_customer.product_module,
        parent_folder: aws_customer.parent_folder,
        bucket_name: aws_customer.bucket_name,
        status: aws_customer.status,
      })
    }
  }, [aws_customer])

  const submit = () => {
    dispatch(updateAWSCustomer(id, awsUser))
  }

  return (
    <>
      {loading || customer_loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>Edit AWS Customer</h5>
            <CCloseButton
              onClick={() => {
                setAWSUser(initial_state)
                dispatch(clearErrors())
                toggleSidebar()
                setValidationError('')
              }}
            />
          </div>
          <CRow>
            <CCol xs>
              <div className="create-aws-customer" style={{ borderTop: '2px solid #303030' }}>
                <CForm className="px-3">
                  <CRow>
                    <CCol sm={6}>
                      <SelectBox
                        id="customer"
                        label="Customer"
                        defaultOption="Select Customer"
                        onChange={(e) => setAWSUser({ ...awsUser, customer: e.target.value })}
                        value={awsUser && awsUser.customer}
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
                  </CRow>

                  <CRow>
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
                    <CCol sm={6}>
                      <TextInput
                        label="Secret Access Key"
                        id="secret_access_key"
                        type="text"
                        placeholder="Enter Secret Access Key"
                        value={awsUser.secret_access_key}
                        onChange={(e) =>
                          setAWSUser({ ...awsUser, secret_access_key: e.target.value })
                        }
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={4}>
                      <TextInput
                        label="Bucket Name"
                        type="text"
                        placeholder="Enter Bucket Name"
                        value={awsUser.bucket_name}
                        onChange={(e) => setAWSUser({ ...awsUser, bucket_name: e.target.value })}
                        id="bucket_name"
                      />
                    </CCol>
                    <CCol sm={4}>
                      <TextInput
                        label="Parent Folder"
                        type="text"
                        placeholder="Enter Parent Folder"
                        value={awsUser.parent_folder}
                        onChange={(e) => setAWSUser({ ...awsUser, parent_folder: e.target.value })}
                        id="parent_folder"
                      />
                    </CCol>
                    <CCol sm={4}>
                      <SelectBox
                        id="status"
                        label="Status"
                        defaultOption="Select Customer Status"
                        onChange={(e) => setAWSUser({ ...awsUser, status: e.target.value })}
                        value={awsUser && awsUser.status}
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
                  showAlert={isUpdated || error}
                  variant={isUpdated ? 'success' : 'danger'}
                  message={isUpdated ? 'AWS User Updated Successfully' : error}
                />
              </div>
            </CCol>
          </CRow>
        </>
      )}
    </>
  )
}
