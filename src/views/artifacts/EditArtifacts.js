import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CForm } from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
import SelectBox from '../../components/Form/SelectBox'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import TextArea from '../../components/Form/TextArea'
import { clearErrors, updateArtifact } from '../../slices/Artifact/UpdateArtifactSlice'
import {  getArtifact } from '../../slices/Artifact/GetArtifactSlice'

export default function EditArtifacts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, isUpdated, loading } = useSelector((state) => state.update_artifact)
  const { artifact } = useSelector((state) => state.artifact)
  const { id } = useParams()

  let initial_state = {
    feed_entry: '',
    artifact_type: '',
    value: '',
    status: '',
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    dispatch(getArtifact(id))
  }, [])

  useEffect(() => {
    if (isUpdated) {
      dispatch(clearErrors())
      navigate(`/artifacts/${artifact['feed_entry']._id}`)
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearErrors())
      }, 2000)
    }
  }, [dispatch, isUpdated, error])

  useEffect(() => {
    if (artifact) {
      setUser({
        ...user,
        artifact_type: artifact.artifact_type,
        value: artifact.value,
        feed_entry: artifact['feed_entry']._id,
        status: artifact.status,
      })
    }
  }, [artifact])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) dispatch(updateArtifact(id, user))
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <CRow>
          <CCol xs>
            <Alert
              showAlert={isUpdated || error || validationError}
              variant={isUpdated ? 'success' : 'danger'}
              message={
                isUpdated
                  ? 'Artifact Updated Successfully'
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
              <CCardHeader>Edit Artifact</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Edit Artifact</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      type="button"
                      color="secondary"
                      onClick={() => navigate(`/artifacts/${artifact['feed_entry']._id}`)}
                    >
                      Cancel
                    </CButton>
                    <CButton type="button" color="primary" onClick={submit}>
                      Update
                    </CButton>
                  </span>
                </p>
                <div className="update-artifact">
                  <CForm>
                    <CRow>
                      <CCol sm={4}>
                        <TextInput
                          label="Artifact Type"
                          type="text"
                          placeholder="Enter Artifact Type"
                          value={user.artifact_type}
                          onChange={(e) => setUser({ ...user, artifact_type: e.target.value })}
                          id="artifact_type"
                        />
                      </CCol>
                      <CCol sm={4}>
                        <TextInput
                          label="Artifact Value"
                          type="text"
                          placeholder="Enter Artifact Value"
                          value={user.value}
                          onChange={(e) => setUser({ ...user, value: e.target.value })}
                          id="value"
                        />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol sm={6}>
                        <SelectBox
                          id="status"
                          label="Status"
                          defaultOption="Select Artifact Status"
                          onChange={(e) => setUser({ ...user, status: e.target.value })}
                          options={Object.keys(CONSTANTS.STATUS).map((item) => (
                            <option key={item} value={CONSTANTS.STATUS[item]}>
                              {CONSTANTS.STATUS[item]}
                            </option>
                          ))}
                          value={user.status}
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
