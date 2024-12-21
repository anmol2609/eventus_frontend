import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CForm,
  CContainer,
} from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
import SelectBox from '../../components/Form/SelectBox'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import { getRssFeed } from '../../slices/rssFeed/GetRssFeedSlice'
import { clearErrors, updateRssFeed } from '../../slices/rssFeed/UpdateRssFeedSlice'

const styles = `
  .edit-rss-container {
    padding: 1rem;
  }

  .card-header-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem 0;
  }

  .button-group {
    display: flex;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    .edit-rss-container {
      padding: 0.5rem;
    }

    .card-header-content {
      flex-direction: column;
      align-items: stretch;
    }

    .button-group {
      width: 100%;
    }

    .button-group button {
      flex: 1;
    }

    .form-column {
      margin-bottom: 1rem;
    }
  }

  .custom-card {
    background-color: rgb(31, 31, 31);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .custom-card-header {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .custom-card-body {
    padding: 1.5rem;
  }

  .form-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`

export default function EditRssFeed() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { rss_feed, loading: rss_feed_loading } = useSelector((state) => state.rss_feed)
  const { error, isUpdated, loading } = useSelector((state) => state.update_rss_feed)
  const { id } = useParams()

  let initial_state = {
    name: '',
    rating: '',
    url: '',
    status: CONSTANTS.STATUS.ACTIVE,
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    dispatch(getRssFeed(id))
  }, [])

  useEffect(() => {
    if (isUpdated) {
      dispatch(clearErrors())
      navigate('/rss_feeds')
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearErrors())
      }, 2000)
    }
  }, [dispatch, isUpdated, error])

  useEffect(() => {
    if (rss_feed) {
      setUser({
        ...user,
        name: rss_feed.name,
        rating: rss_feed.rating,
        url: rss_feed.url,
        status: rss_feed.status,
      })
    }
  }, [rss_feed])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) dispatch(updateRssFeed(id, user))
  }

  return (
    <>
      <style>{styles}</style>
      {loading || rss_feed_loading ? (
        <Loader />
      ) : (
        <CContainer fluid className="edit-rss-container">
          <CRow>
            <CCol xs={12}>
              <Alert
                showAlert={isUpdated || error || validationError}
                variant={isUpdated ? 'success' : 'danger'}
                message={
                  isUpdated
                    ? 'RSS Feed Updated Successfully'
                    : validationError
                      ? validationError
                      : error
                }
              />
              <CCard className="custom-card">
                <CCardHeader className="custom-card-header">
                  <div className="card-header-content">
                    <h4 className="mb-0">Edit RSS Feed</h4>
                    <div className="button-group">
                      <CButton
                        type="button"
                        color="secondary"
                        onClick={() => navigate('/rss_feeds')}
                        className="px-3 py-2"
                      >
                        Cancel
                      </CButton>
                      <CButton type="button" color="primary" onClick={submit} className="px-3 py-2">
                        Update
                      </CButton>
                    </div>
                  </div>
                </CCardHeader>
                <CCardBody className="custom-card-body">
                  <div className="create-rss-feed">
                    <CForm>
                      <div className="form-grid">
                        <div className="form-column">
                          <TextInput
                            label="Name"
                            type="text"
                            placeholder="Enter Name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            id="name"
                          />
                        </div>
                        <div className="form-column">
                          <TextInput
                            label="URL"
                            type="text"
                            placeholder="Enter the URL"
                            value={user.url}
                            onChange={(e) => setUser({ ...user, url: e.target.value })}
                            id="url"
                            disabled
                          />
                        </div>
                      </div>
                    </CForm>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </>
  )
}
