import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CONSTANTS } from '../../utils/constants'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import { clearErrors, createArtifact } from '../../slices/Artifact/CreateArtifactSlice'

import SelectBox from '../../components/Form/SelectBox'

export default function NewArtifact() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, success, loading } = useSelector((state) => state.create_artifact)
  const { feed_id } = useParams()

  let initial_state = {
    feed_entry: feed_id,
    artifact_type: '',
    value: '',
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
            navigate(`artifacts/${feed_id}`)
            dispatch(clearErrors())
          }
        },
        success ? 1000 : 2000,
      ) // clearing the success / error state so that the pop up disappears

      if (success) {
        setUser(initial_state)
      }
    }
  }, [dispatch, error, success])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) {
      dispatch(createArtifact(user))
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
                  ? 'Artifact Created Successfully'
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
              <CCardHeader>Create Artifact</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>New Artifact</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      variant="outline"
                      type="button"
                      color="secondary"
                      onClick={() => navigate(`/artifacts/${feed_id}`)}
                    >
                      Cancel
                    </CButton>
                    <CButton variant="outline" type="button" color="primary" onClick={submit}>
                      Save
                    </CButton>
                  </span>
                </p>
                <div className="create-artifact">
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
