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
import { clearErrors, getFeedEntry, updateFeedEntry } from '../../actions/FeedEntryActions'
import TextArea from '../../components/Form/TextArea'

export default function EditFeedEntry() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { feed_entry, loading: feed_entry_loading } = useSelector((state) => state.feed_entry)
  const { rss_feeds } = useSelector((state) => state.rss_feeds)
  const { error, isUpdated, loading } = useSelector((state) => state.update_feed_entry)
  const { id } = useParams()

  let initial_state = {
    title: '',
    link: '',
    feed_id: '',
    rss_feed: '',
    published: '',
    summary: '',
    scraped_content: '',
    feedback: '',
    content: '',
    rating: null,
    response: null,
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    dispatch(getFeedEntry(id))
  }, [])

  useEffect(() => {
    if (isUpdated) {
      dispatch(clearErrors())
      navigate('/feed_entry')
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearErrors())
      }, 2000)
    }
  }, [dispatch, isUpdated, error])

  useEffect(() => {
    if (feed_entry) {
      setUser({
        ...user,
        title: feed_entry.title,
        link: feed_entry.link,
        feed_id: feed_entry.feed_id,
        rss_feed: feed_entry.rss_feed._id,
        published: feed_entry.published,
        summary: feed_entry.summary,
        scraped_content: feed_entry.scraped_content,
        feedback: feed_entry.feed_entry,
        content: feed_entry.content,
        rating: feed_entry.rating,
        response: feed_entry.response,
      })
    }
  }, [feed_entry])

  const submit = () => {
    const excludedKeys = ['summary', 'scraped_content', 'feedback', 'content', 'rating', 'response']
    const validation_keys = Object.keys(user)
      .filter((key) => !excludedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = user[key]
        return obj
      }, {})

    if (validate_required_keys(validation_keys, setValidationError))
      dispatch(updateFeedEntry(id, user))
  }

  return (
    <>
      {loading || feed_entry_loading ? (
        <Loader />
      ) : (
        <CRow>
          <CCol xs>
            <Alert
              showAlert={isUpdated || error || validationError}
              variant={isUpdated ? 'success' : 'danger'}
              message={
                isUpdated
                  ? 'Feed Entry Updated Successfully'
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
              <CCardHeader>Edit Feed Entry</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Edit Feed Entry</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      type="button"
                      color="secondary"
                      onClick={() => navigate('/feed_entry')}
                    >
                      Cancel
                    </CButton>
                    <CButton type="button" color="primary" onClick={submit}>
                      Update
                    </CButton>
                  </span>
                </p>
                <div className="create-feed-entry">
                  <CForm>
                    <CRow>
                      <CCol sm={4}>
                        <TextInput
                          label="Title"
                          type="text"
                          placeholder="Enter Title"
                          value={user.title}
                          onChange={(e) => setUser({ ...user, title: e.target.value })}
                          id="title"
                        />
                      </CCol>
                      <CCol sm={4}>
                        <TextInput
                          label="Link"
                          type="text"
                          placeholder="Enter the Link"
                          value={user.link}
                          onChange={(e) => setUser({ ...user, link: e.target.value })}
                          id="link"
                        />
                      </CCol>
                      <CCol sm={4}>
                        <TextInput
                          label="Feed Id"
                          type="text"
                          placeholder="Enter Feed Id"
                          value={user.feed_id}
                          onChange={(e) => setUser({ ...user, feed_id: e.target.value })}
                          id="feed_id"
                        />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol sm={4}>
                        <SelectBox
                          label="Rss Feed"
                          id="rss_feed"
                          defaultOption="Select Rss Feed"
                          onChange={(e) => setUser({ ...user, rss_feed: e.target.value })}
                          options={
                            rss_feeds &&
                            rss_feeds.map((feed) => (
                              <option key={feed._id} value={feed._id}>
                                {feed.name}
                              </option>
                            ))
                          }
                          disabled={true}
                          value={user.rss_feed}
                        />
                      </CCol>
                      <CCol sm={4}>
                        <TextInput
                          label="Published"
                          type="date"
                          placeholder="Enter Published Date"
                          value={user.published}
                          onChange={(e) => setUser({ ...user, published: e.target.value })}
                          id="published"
                        />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol sm={4}>
                        <TextArea
                          id="summary"
                          placeholder="Enter the summary"
                          value={user.summary}
                          onChange={(e) => setUser({ ...user, summary: e.target.value })}
                          label="Summary"
                          rows={4}
                        />
                      </CCol>
                      <CCol sm={4}>
                        <TextArea
                          id="scraped_content"
                          placeholder="Enter the scraped content"
                          value={user.scraped_content}
                          onChange={(e) => setUser({ ...user, scraped_content: e.target.value })}
                          label="Scraped Content"
                          rows={4}
                        />
                      </CCol>
                      <CCol sm={4}>
                        <SelectBox
                          label="Feed Response"
                          id="response"
                          defaultOption="Select Feed Response"
                          onChange={(e) => setUser({ ...user, response: e.target.value })}
                          options={Object.keys(CONSTANTS.FEED_ENTRY_RESPONSE).map((item) => (
                            <option key={item} value={CONSTANTS.FEED_ENTRY_RESPONSE[item]}>
                              {CONSTANTS.FEED_ENTRY_RESPONSE[item]}
                            </option>
                          ))}
                          value={user.response}
                        />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol sm={4}>
                        <TextArea
                          id="feedback"
                          placeholder="Enter the feedback"
                          value={user.feedback}
                          onChange={(e) => setUser({ ...user, feedback: e.target.value })}
                          label="Feedback"
                          rows={2}
                        />
                      </CCol>
                      <CCol sm={4}>
                        <TextArea
                          id="content"
                          placeholder="Enter the content"
                          value={user.content}
                          onChange={(e) => setUser({ ...user, content: e.target.value })}
                          label="Content"
                          rows={2}
                        />
                      </CCol>
                      <CCol sm={4}>
                        <TextInput
                          label="Rating"
                          type="number"
                          min_num={0}
                          max_num={10}
                          placeholder="Enter the rating"
                          value={user.rating}
                          onChange={(e) => setUser({ ...user, rating: e.target.value })}
                          id="rating"
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
