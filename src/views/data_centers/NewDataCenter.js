import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../utils/constants'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import TextInput from '../../components/Form/TextInput'
import SelectBox from '../../components/Form/SelectBox'
import { validate_required_keys } from '../../utils/validators/required_key'
import { clearErrors, createDataCenter } from '../../actions/DataCenterActions'
import TextArea from '../../components/Form/TextArea'
import Loader from '../../components/Loader'

export default function NewDataCenter() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, success, loading } = useSelector((state) => state.create_data_center)

  let initial_state = {
    name: '',
    description: '',
    ip_address: '',
    port: '',
    status: '',
  }
  const [dataCenter, setDataCenter] = useState(initial_state)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (success || error) {
      setTimeout(
        () => {
          dispatch(clearErrors())

          if (success) {
            navigate('/data_centers')
            dispatch(clearErrors())
          }
        },
        success ? 1000 : 2000,
      ) // clearing the success / error state so that the pop up disappears

      if (success) {
        setDataCenter(initial_state)
      }
    }
  }, [dispatch, error, success])

  const submit = () => {
    if (validate_required_keys(dataCenter, setValidationError)) {
      dispatch(createDataCenter(dataCenter))
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
                  ? 'Data Center Created Successfully'
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
              <CCardHeader>Create Data Center</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>New Data Center</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      variant="outline"
                      type="button"
                      color="secondary"
                      onClick={() => navigate('/data_centers')}
                    >
                      Cancel
                    </CButton>
                    <CButton variant="outline" type="button" color="primary" onClick={submit}>
                      Save
                    </CButton>
                  </span>
                </p>
                <div className="create-data-center">
                  <CForm>
                    <CRow>
                      <CCol sm={4}>
                        <TextInput
                          label="Name"
                          type="text"
                          placeholder="Enter Name"
                          value={dataCenter.name}
                          onChange={(e) => setDataCenter({ ...dataCenter, name: e.target.value })}
                          id="name"
                        />
                      </CCol>
                      <CCol sm={4}>
                        <TextInput
                          label="IP Address"
                          id="ip_address"
                          type="text"
                          placeholder="Enter IP Address"
                          value={dataCenter.ip_address}
                          onChange={(e) =>
                            setDataCenter({ ...dataCenter, ip_address: e.target.value })
                          }
                        />
                      </CCol>
                      <CCol sm={4}>
                        <TextInput
                          label="PORT"
                          id="port"
                          type="text"
                          placeholder="Enter the PORT"
                          value={dataCenter.port}
                          onChange={(e) => setDataCenter({ ...dataCenter, port: e.target.value })}
                        />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol sm={6}>
                        <TextArea
                          id="description"
                          placeholder="Enter the description"
                          value={dataCenter.description}
                          onChange={(e) =>
                            setDataCenter({ ...dataCenter, description: e.target.value })
                          }
                          label="Description"
                          rows={5}
                        />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol sm={6}>
                        <SelectBox
                          id="status"
                          label="Status"
                          defaultOption="Select Data Center Status"
                          onChange={(e) => setDataCenter({ ...dataCenter, status: e.target.value })}
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
