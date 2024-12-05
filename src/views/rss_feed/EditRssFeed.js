import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CForm } from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
import { getAllCustomers } from '../../actions/CustomerActions'
import SelectBox from '../../components/Form/SelectBox'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import { clearErrors, getRssFeed, updateRssFeed } from '../../actions/RssFeedActions'

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
      {loading || rss_feed_loading ? (
        <Loader />
      ) : (
        <CRow>
          <CCol xs>
            <Alert
              showAlert={isUpdated || error || validationError}
              variant={isUpdated ? 'success' : 'danger'}
              message={
                isUpdated
                  ? 'Rss Feed Updated Successfully'
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
              <CCardHeader>Edit Rss Feed</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Edit Rss Feed</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton type="button" color="secondary" onClick={() => navigate('/rss_feeds')}>
                      Cancel
                    </CButton>
                    <CButton type="button" color="primary" onClick={submit}>
                      Update
                    </CButton>
                  </span>
                </p>
                <div className="create-rss-feed">
                  <CForm>
                    <CRow>
                      <CCol sm={4}>
                        <TextInput
                          label="Name"
                          type="text"
                          placeholder="Enter Name"
                          value={user.name}
                          onChange={(e) => setUser({ ...user, name: e.target.value })}
                          id="name"
                        />
                      </CCol>
                      <CCol sm={4}>
                        <TextInput
                          label="URL"
                          type="text"
                          placeholder="Enter the URL"
                          value={user.url}
                          onChange={(e) => setUser({ ...user, url: e.target.value })}
                          id="url"
                          disabled
                        />
                      </CCol>
                      {/* <CCol sm={4}>
                        <TextInput
                          label="Rating"
                          type="number"
                          placeholder="Enter the Rating"
                          value={user.rating}
                          onChange={(e) => setUser({ ...user, rating: e.target.value })}
                          id="rating"
                          max_num={10}
                          min_num={0}
                        />
                      </CCol> */}
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
