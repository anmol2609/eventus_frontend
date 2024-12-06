import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CForm } from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
import SelectBox from '../../components/Form/SelectBox'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import TextArea from '../../components/Form/TextArea'
import { clearDataCenterErrors, getDataCenter, updateDataCenter } from '../../slices/DataCenterslice'
import Loader from '../../components/Loader'

export default function EditDataCenter() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data_center, fetch_data_center_status: data_center_loading } = useSelector((state) => state.data_center)
  const { error, updatedDataCenterStatus:isUpdated, loading } = useSelector((state) => state.data_center)
  const { id } = useParams()

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
    dispatch(getDataCenter(id))
  }, [])

  useEffect(() => {
    if (isUpdated) {
      dispatch(clearDataCenterErrors())
      navigate('/data_centers')
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearDataCenterErrors())
      }, 2000)
    }
  }, [dispatch, isUpdated, error])

  useEffect(() => {
    if (data_center) {
      setDataCenter({
        ...dataCenter,
        name: data_center.name,
        description: data_center.description,
        ip_address: data_center.ip_address,
        port: data_center.port,
        status: data_center.status,
      })
    }
  }, [data_center])

  const submit = () => {
    if (validate_required_keys(dataCenter, setValidationError)){
      let data ={
        id, dataCenter
      }
      dispatch(updateDataCenter(data))
    }
  }

  return (
    <>
      {loading || !data_center_loading ? (
        <Loader />
      ) : (
        <CRow>
          <CCol xs>
            <Alert
              showAlert={isUpdated || error || validationError}
              variant={isUpdated ? 'success' : 'danger'}
              message={
                isUpdated
                  ? 'Data Center Updated Successfully'
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
              <CCardHeader>Edit Data Center</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Edit Data Center</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      type="button"
                      color="secondary"
                      onClick={() => navigate('/data_centers')}
                    >
                      Cancel
                    </CButton>
                    <CButton type="button" color="primary" onClick={submit}>
                      Update
                    </CButton>
                  </span>
                </p>
                <div className="update-data-center">
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
                          value={dataCenter.status}
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
