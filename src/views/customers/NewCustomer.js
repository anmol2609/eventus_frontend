/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../utils/constants'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
// import {
//   //clearCustomerErrors,
//   //createCustomer,
//   // getL0Customer,
//   // getL1Customer,
//   // getL2Customer,
// } from '../../actions/CustomerActions'
import TextInput from '../../components/Form/TextInput'
import SelectBox from '../../components/Form/SelectBox'
import { v4 as uuidv4 } from 'uuid'
//import { getAllDataCenters } from '../../actions/DataCenterActions'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import { getAllDataCenters } from '../../slices/DataCenterslice'
import {
  clearCustomerErrors,
   createCustomer
} from '../../slices/customerSlice'
import {
  getL0Customer
} from '../../slices/l0CustomerSlice'
import {
  getL1Customer
} from '../../slices/l1CustomerSlice'
import {
  getL2Customer
} from '../../slices/l2CustomerSlice'
export default function NewCustomer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const data = useSelector((state) => state)
  console.log(data,"new users")
  const customer_type = location.state.customer_type || CONSTANTS.CUSTOMER_TYPE.PARTNER
  const { error:created_cutomer_error, createdCustomerStatus, loading } = useSelector((state) => state.customer)
  const { l0_customers } = useSelector((state) => state.l0_customer)
  const { l1_customers } = useSelector((state) => state.l1_customer)
  const { l2_customers } = useSelector((state) => state.l2_customer)
  const { data_centers, loading: data_centers_loading } = useSelector((state) => state.data_center)
  
  let initial_state = {
    type: customer_type,
    name: '',
    tenancy_level:
      customer_type === CONSTANTS.CUSTOMER_TYPE.ORGANIZATION ? CONSTANTS.TENANCY_LEVEL.L3 : '',
    tenant_code: '',
    data_center: '6746bfd50a780fe605c191ba',
    status: CONSTANTS.STATUS.ACTIVE,
    uuid: uuidv4(),
    provider_name: '',
    destination: '',
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [isTenancyDisabled, setIsTenancyDisabled] = useState(
    user.type === CONSTANTS.CUSTOMER_TYPE.ORGANIZATION,
  )

  useEffect(() => {
    dispatch(getAllDataCenters())
    dispatch(getL0Customer())
    dispatch(getL1Customer())
    dispatch(getL2Customer())
  }, [])

  useEffect(() => {
    if (createdCustomerStatus || created_cutomer_error) {
      setTimeout(() => {
        dispatch(clearCustomerErrors())

        if (createdCustomerStatus) {
          navigate(
            `/customers?selectedView=${user.type === CONSTANTS.CUSTOMER_TYPE.ORGANIZATION ? 1 : 0}`,
          )
          dispatch(clearCustomerErrors())
        }
      }, 1000) // clearing the createdCustomerStatus / error state so that the pop up disappears

      if (createdCustomerStatus) {
        setUser(initial_state)
      }
    }
  }, [dispatch, created_cutomer_error, createdCustomerStatus])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) {
      dispatch(createCustomer(user))
    }
  }

  return (
    <>
      {loading || data_centers_loading ? (
        <Loader />
      ) : (
        <CRow>
          <CCol xs>
            <Alert
              showAlert={createdCustomerStatus || created_cutomer_error || validationError}
              variant={createdCustomerStatus ? 'success' : 'danger'}
              message={
                createdCustomerStatus
                  ? 'Customer Created Successfully'
                  : validationError
                    ? validationError
                    : created_cutomer_error
              }
            />
            <CCard
              className="mb-4"
              style={{
                backgroundColor: 'rgb(31, 31, 31)',
              }}
            >
              <CCardHeader>Create Customer</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>New Customer</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      variant="outline"
                      type="button"
                      color="secondary"
                      onClick={() =>
                        navigate(
                          `/customers?selectedView=${user.type === CONSTANTS.CUSTOMER_TYPE.ORGANIZATION ? 1 : 0}`,
                        )
                      }
                    >
                      Cancel
                    </CButton>
                    <CButton variant="outline" type="button" color="primary" onClick={submit}>
                      Save
                    </CButton>
                  </span>
                </p>
                <div className="create-aws-customer">
                  <CForm>
                    <CRow>
                      <CCol sm={6}>
                        <SelectBox
                          id="customer_type"
                          label="Customer Type"
                          defaultOption="Select Customer Type"
                          value={user.type}
                          onChange={(e) => {
                            let customer_type = e.target.value
                            if (customer_type === CONSTANTS.CUSTOMER_TYPE.ORGANIZATION) {
                              setUser({
                                ...user,
                                tenancy_level: CONSTANTS.TENANCY_LEVEL['L3'],
                                type: customer_type,
                              })
                              setIsTenancyDisabled(true)
                            } else {
                              setIsTenancyDisabled(false)
                              setUser({ ...user, type: customer_type })
                            }
                          }}
                          options={Object.keys(CONSTANTS.CUSTOMER_TYPE).map((item) => (
                            <option key={item} value={CONSTANTS.CUSTOMER_TYPE[item]}>
                              {CONSTANTS.CUSTOMER_TYPE[item]}
                            </option>
                          ))}
                        />
                      </CCol>
                      <CCol sm={6}>
                        <TextInput
                          label="Customer Name"
                          type="text"
                          placeholder="Enter Customer Name"
                          value={user.name}
                          onChange={(e) => setUser({ ...user, name: e.target.value })}
                          id="name"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol sm={6}>
                        <TextInput
                          label="UUID"
                          type="text"
                          placeholder=""
                          value={user.uuid}
                          onChange={(e) => setUser({ ...user, uuid: e.target.value })}
                          id="uuid"
                        />
                      </CCol>
                      <CCol
                        sm={3}
                        className="align-baseline d-flex justify-content-start align-items-end"
                      >
                        <CButton
                          className="mb-3"
                          color="secondary"
                          onClick={() => {
                            let uuid = uuidv4()
                            setUser({ ...user, uuid })
                          }}
                        >
                          Generate
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                    <CCol sm={6}>
                      <TextInput
                      label="Provider Name"
                      type="text"
                      placeholder="Enter Provider Name"
                      value={user.provider_name}
                      onChange={(e) => setUser({ ...user, provider_name: e.target.value })}
                      id="provider_name"
                      />
                      </CCol>
                        <CCol sm={6}>
                            <TextInput
                            label="Destination"
                            type="text"
                            placeholder="Enter Destination"
                            value={user.destination}
                            onChange={(e) => setUser({ ...user, destination: e.target.value })}
                            id="destination"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                      <CCol sm={4}>
                        <TextInput
                          label="Tenant Code"
                          type="text"
                          placeholder="Enter Tenant Code"
                          value={user.tenant_code}
                          onChange={(e) => setUser({ ...user, tenant_code: e.target.value })}
                          id="tenant_code"
                        />
                      </CCol>
                      <CCol sm={4}>
                        <SelectBox
                          id="tenancy_level"
                          label="Tenancy Level"
                          defaultOption="Select Tenancy Level"
                          onChange={(e) => setUser({ ...user, tenancy_level: e.target.value })}
                          options={Object.keys(CONSTANTS.TENANCY_LEVEL)
                            .filter((item) => {
                              if (user.type === CONSTANTS.CUSTOMER_TYPE.PARTNER) {
                                return CONSTANTS.TENANCY_LEVEL[item] !== CONSTANTS.TENANCY_LEVEL.L3 // Exclude level 3 if type is partner
                              }
                              return true
                            })
                            .map((item) => (
                              <option key={item} value={CONSTANTS.TENANCY_LEVEL[item]}>
                                {CONSTANTS.TENANCY_LEVEL[item]}
                              </option>
                            ))}
                          value={user.tenancy_level}
                          disabled={isTenancyDisabled}
                        />
                      </CCol>
                      <CCol sm={4}>
                        <SelectBox
                          id="data_center"
                          label="Data Center"
                          defaultOption="Select Data Center"
                          onChange={(e) => setUser({ ...user, data_center: e.target.value })}
                          options={
                            data_centers &&
                            data_centers.map((user) => (
                              <option key={user._id} value={user._id}>
                                {user.name}
                              </option>
                            ))
                          }
                        />
                      </CCol>
                    </CRow>

                    <CRow>
                      {user.tenancy_level === CONSTANTS.TENANCY_LEVEL.L3 && (
                        <CCol sm={4}>
                          <SelectBox
                            id="l2_tenancy_partner"
                            label="L2 Tenancy Partner"
                            defaultOption="Select L2 Tenancy Level"
                            onChange={(e) =>
                              setUser({ ...user, l2_tenancy_partner: e.target.value })
                            }
                            options={
                              l2_customers &&
                              l2_customers.map((user) => (
                                <option key={user._id} value={user._id}>
                                  {user.name}
                                </option>
                              ))
                            }
                            value={user.l2_tenancy_partner}
                          />
                        </CCol>
                      )}
                      {user.tenancy_level === CONSTANTS.TENANCY_LEVEL.L2 && (
                        <CCol sm={4}>
                          <SelectBox
                            id="l1_tenancy_partner"
                            label="L1 Tenancy Partner"
                            defaultOption="Select L1 Tenancy Level"
                            onChange={(e) =>
                              setUser({ ...user, l1_tenancy_partner: e.target.value })
                            }
                            options={
                              l1_customers &&
                              l1_customers.map((user) => (
                                <option key={user._id} value={user._id}>
                                  {user.name}
                                </option>
                              ))
                            }
                            value={user.l1_tenancy_partner}
                          />
                        </CCol>
                      )}
                      {user.tenancy_level === CONSTANTS.TENANCY_LEVEL.L1 && (
                        <CCol sm={4}>
                          <SelectBox
                            id="l0_tenancy_partner"
                            label="L0 Tenancy Partner"
                            defaultOption="Select L0 Tenancy Level"
                            onChange={(e) =>
                              setUser({ ...user, l0_tenancy_partner: e.target.value })
                            }
                            options={
                              l0_customers &&
                              l0_customers.map((user) => (
                                <option key={user._id} value={user._id}>
                                  {user.name}
                                </option>
                              ))
                            }
                            value={user.l0_tenancy_partner}
                          />
                        </CCol>
                      )}
                      <CCol sm={4}>
                        <SelectBox
                          id="status"
                          label="Status"
                          defaultOption="Select Customer Status"
                          onChange={(e) => setUser({ ...user, status: e.target.value })}
                          value={user.status}
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
