/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../utils/constants'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'

import TextInput from '../../components/Form/TextInput'
import SelectBox from '../../components/Form/SelectBox'
import { v4 as uuidv4 } from 'uuid'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import {
  clearCreateUserByTenantErrors,
  createUserByTenant,
} from '../../slices/userManagement/CreateUserByTenantDataSlice'

import {
  getTenantByTenancyLevel
} from '../../slices/tenantsSlice'
import {
  getTenantInfo
} from '../../slices/tenant/TenantInfoSlice'
export default function NewCustomer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { error:created_user_error, success:createdUserStatus, loading } = useSelector((state) => state.create_user_by_tenant)
  const {tenants, loading: tenants_loading } = useSelector((state) => state.tenants_by_tenancy_level)
  const {tenants:tenants_info, loading: tenants_info_loading } = useSelector((state) => state.get_tenant_info)
  let initial_state = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    confirmPassword:'',
    tenancy_level: null,
    tenant: '',
    user_type: '',
    providerName: '',
    destination: '',
    userName:'',
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [isTenancyDisabled, setIsTenancyDisabled] = useState(
    user.type === CONSTANTS.CUSTOMER_TYPE.ORGANIZATION,
  )

  useEffect(() => {
    if(tenants_info.length > 0) {
      setUser({...user, providerName: tenants_info[0].provider_name, destination: tenants_info[0].destination})
    }
    if (createdUserStatus || created_user_error) {
      setTimeout(() => {
        dispatch(clearCreateUserByTenantErrors())

        if (createdUserStatus) {
          navigate(
            `/customers?selectedView=${2}`,
          )
          dispatch(clearCreateUserByTenantErrors())
        }
      }, 1000) // clearing the success / error state so that the pop up disappears

      if (createdUserStatus) {
        setUser(initial_state)
      }
    }
  }, [dispatch, created_user_error, createdUserStatus,tenants_info])

  const submit = () => {
    let info = user.user_type === 'IDP' 
    ? {
      providerName: user.providerName,
      destination: user.destination,
      user_type: user.user_type,
      tenancy_level: user.tenancy_level,
      tenant: user.tenant.split('.')[0],
      tenant_name: user.tenant.split('.')[1],
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    } :
    {
      password: user.password,
      confirmPassword: user.confirmPassword,
      user_type: user.user_type,
      tenancy_level: user.tenancy_level,
      tenant: user.tenant.split('.')[0],
      tenant_name: user.tenant.split('.')[1],
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
    }
    if (validate_required_keys(info, setValidationError)) {
      dispatch(createUserByTenant(info))
    }
  }
  const user_types = [
    { value: CONSTANTS.USER_TYPE.IDP, label: 'IDP' },
    { value: CONSTANTS.USER_TYPE.LOCAL, label: 'LOCAL' },
  ]
  const onTenancyLevelChange = (e) => {  
    dispatch(getTenantByTenancyLevel(e.target.value))
    setUser({ ...user, tenancy_level: e.target.value, tenant:'' })
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <CRow>
          <CCol xs>
            <Alert
              showAlert={createdUserStatus || created_user_error || validationError}
              variant={createdUserStatus ? 'success' : 'danger'}
              message={
                createdUserStatus
                  ? 'Customer Created Successfully'
                  : validationError
                    ? validationError
                    : created_user_error
              }
            />
            <CCard
              className="mb-4"
              style={{
                backgroundColor: 'rgb(31, 31, 31)',
              }}
            >
              <CCardHeader>Create User</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>New User</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      variant="outline"
                      type="button"
                      color="secondary"
                      onClick={() =>
                        navigate(
                          `/customers?selectedView=${2}`,
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
                      <CCol sm={4}>
                        <SelectBox
                          id="tenancy_level"
                          label="Tenancy Level"
                          defaultOption="Select Tenancy Level"
                          onChange={(e) => onTenancyLevelChange(e)}
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
                          id="tenant"
                          label="Tenant"
                          defaultOption="Select Tenant"
                          onChange={(e) => {
                            console.log("Tenant")
                            let data = {
                              tenancy_level:user.tenancy_level,
                              tenant_code:e.target.value.split(".")[1]
                            }
                            dispatch(getTenantInfo(data))
                            setUser({ ...user, tenant: e.target.value })
                            console.log(tenants_info,"tenants")
                          }}
                          options={
                            !tenants_loading 
                            && tenants
                            .map((item) => (
                              <option key={item.tenant_uuid} value={item.tenant_uuid+"."+item.tenant_name}>
                                {item.tenant_name}
                              </option>
                            ))}
                          value={user.tenant_uuid}
                          disabled={!user.tenancy_level && tenants_loading}
                        />
                      </CCol>
                      <CCol sm={4}>
                        <SelectBox
                          id="user_type"
                          label="User type"
                          defaultOption="Select User Type"
                          onChange={(e) => setUser({ ...user, user_type: e.target.value })}
                          options={
                            user_types &&
                            user_types.map((item) => (
                              <option key={item.label} value={item.value}>
                                {item.label}
                              </option>
                            ))
                          }
                          value={user.user_type}
                        />
                      </CCol>
                    </CRow>
                    {
                    user.user_type === 'LOCAL' 
                    && <>
                        <CRow>
                            <CCol sm={6}>
                            <TextInput
                                label="First Name"
                                type="text"
                                placeholder="Enter First Name"
                                value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                id="firstName"
                                />
                            </CCol>
                            <CCol sm={6}>
                                <TextInput
                                label="Last Name"
                                type="text"
                                placeholder="Enter Last Name"
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                id="lastName"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol sm={6}>
                            <TextInput
                                label="User Name"
                                type="text"
                                placeholder="Enter User Name"
                                value={user.userName}
                                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                                id="userName"
                                />
                            </CCol>
                            <CCol sm={6}>
                                <TextInput
                                label="Email"
                                type="text"
                                placeholder="Enter Email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                id="email"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol sm={6}>
                            <TextInput
                                label="Password"
                                type="password"
                                placeholder="Enter Password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                id="password"
                                />
                            </CCol>
                            <CCol sm={6}>
                                <TextInput
                                label="Confirm Password"
                                type="text"
                                placeholder="Enter Confirm Password"
                                value={user.confirmPassword}
                                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                                id="confirmPassword"
                                />
                            </CCol>
                        </CRow>
                    </>
                    }
                    {
                    user.user_type === 'IDP' 
                    && <>
                        <CRow>
                        <CCol sm={4}>
                            <TextInput
                                label="First Name"
                                type="text"
                                placeholder="Enter First Name"
                                value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                id="firstName"
                            />
                        </CCol>
                        <CCol sm={4}>
                            <TextInput
                            label="Last Name"
                            type="text"
                            placeholder="Enter Last Name"
                            value={user.lastName}
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            id="lastName"
                            />
                        </CCol>
                        <CCol sm={4}>
                            <TextInput
                            label="Email"
                            type="text"
                            placeholder="Enter Email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            id="email"
                            />
                        </CCol>
                        </CRow>
                        <CRow>
                          <CCol sm={6}>
                            <TextInput
                                label="Provider Name"
                                type="text"
                                placeholder="Enter Provider Name"
                                value={user.providerName}
                                onChange={(e) => setUser({ ...user, providerName: e.target.value })}
                                id="providerName"
                                disabled
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
                              disabled
                              />
                          </CCol>
                        </CRow>
                    </>
                    }
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
