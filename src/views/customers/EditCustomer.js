import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CForm } from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
// import {
//   clearCustomerErrors,
//   getCustomer,
//   getL0Customer,
//   getL1Customer,
//   getL2Customer,
//   updateCustomer,
// } from '../../actions/CustomerActions'
import SelectBox from '../../components/Form/SelectBox'
import TextInput from '../../components/Form/TextInput'
//import { getAllDataCenters } from '../../actions/DataCenterActions'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import { getAllDataCenters } from '../../slices/DataCenterslice'
import {
  clearCustomerErrors,
  updateCustomer,
  getCustomer
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
export default function EditCustomer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, updatedCustomerStatus:isUpdated, loading } = useSelector((state) => state.customer)
  const { data_centers, loading: data_center_loading } = useSelector((state) => state.data_center)
  const { customer } = useSelector((state) => state.customer)
  const { l0_customers } = useSelector((state) => state.l0_customer)
  const { l1_customers } = useSelector((state) => state.l1_customer)
  const { l2_customers } = useSelector((state) => state.l2_customer)
  const { id } = useParams()
  let initial_state = {
    type: '',
    name: '',
    tenancy_level: '',
    tenant_code: '',
    data_center: '675293e61334560ab9577ce4',
    status: CONSTANTS.STATUS.ACTIVE,
    uuid: '',
    provider_name: '',
    destination: '',
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [isTenancyDisabled, setIsTenancyDisabled] = useState(false)

  useEffect(() => {
    dispatch(getCustomer(id))
    dispatch(getAllDataCenters())
    dispatch(getL0Customer())
    dispatch(getL1Customer())
    dispatch(getL2Customer())
  }, [])

  useEffect(() => {
    if (isUpdated) {
      dispatch(clearCustomerErrors())
      navigate(
        `/customers?selectedView=${user.type === CONSTANTS.CUSTOMER_TYPE.ORGANIZATION ? 1 : 0}`,
      )
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearCustomerErrors())
      }, 2000)
    }
  }, [dispatch, isUpdated, error])

  useEffect(() => {
    if (customer) {
      
      setUser({
        ...user,
        type: customer?.type,
        name: customer?.name,
        tenancy_level: customer?.tenancy_level,
        tenant_code: customer?.tenant_code,
        data_center: '675293e61334560ab9577ce4',
        uuid: customer?.uuid,
        l0_tenancy_partner: customer?.l0_tenancy_partner,
        l1_tenancy_partner: customer?.l1_tenancy_partner,
        l2_tenancy_partner: customer?.l2_tenancy_partner,
        status: customer?.status,
        provider_name: customer?.provider_name,
      destination: customer?.destination,
      })
      setIsTenancyDisabled(customer.type === CONSTANTS.CUSTOMER_TYPE.ORGANIZATION)
    }
  }, [customer])

  const submit = () => {
    const excludedKeys = ['l0_tenancy_partner', 'l1_tenancy_partner', 'l2_tenancy_partner']
    const validation_keys = Object.keys(user)
      .filter((key) => !excludedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = user[key]
        return obj
      }, {})

    if (validate_required_keys(validation_keys, setValidationError))
      console.log("updateCustomer")
    let data ={
      id, user
    }
      dispatch(updateCustomer(data))
  }

  return (
    <>
      {loading || data_center_loading ? (
        <Loader />
      ) : (
        <CRow>
          <CCol xs>
            <Alert
              showAlert={isUpdated || error || validationError}
              variant={isUpdated ? 'success' : 'danger'}
              message={
                isUpdated
                  ? 'Customer Updated Successfully'
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
              <CCardHeader>Edit Customer</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Edit Customer</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
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
                    <CButton type="button" color="primary" onClick={submit}>
                      Update
                    </CButton>
                  </span>
                </p>
                <div className="create-customer">
                  <CForm>
                    <CRow>
                      <CCol sm={6}>
                        <SelectBox
                          id="customer_type"
                          label="Customer Type"
                          defaultOption="Select Customer Type"
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
                          value={user && user.type}
                        />
                      </CCol>
                    </CRow>
                    <CRow>
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
                          disabled
                        />
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
                          options={Object.keys(CONSTANTS.TENANCY_LEVEL).map((item) => (
                            <option key={item} value={CONSTANTS.TENANCY_LEVEL[item]}>
                              {CONSTANTS.TENANCY_LEVEL[item]}
                            </option>
                          ))}
                          value={user && user.tenancy_level}
                          disabled={isTenancyDisabled}
                        />
                      </CCol>
                      {/* <CCol sm={4}>
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
                          value={user && user.data_center}
                        />
                      </CCol> */}
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
                    </CRow>

                    <CRow>
                      <CCol sm={6}>
                        <SelectBox
                          id="status"
                          label="Status"
                          defaultOption="Select Customer Status"
                          onChange={(e) => setUser({ ...user, status: e.target.value })}
                          options={Object.keys(CONSTANTS.STATUS).map((item) => (
                            <option key={item} value={CONSTANTS.STATUS[item]}>
                              {CONSTANTS.STATUS[item]}
                            </option>
                          ))}
                          value={user && user.status}
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
