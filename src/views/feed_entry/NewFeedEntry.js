import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import { clearErrors, createFeedEntry } from '../../actions/FeedEntryActions'
import SelectBox from '../../components/Form/SelectBox'
import { getAllRssFeeds } from '../../actions/RssFeedActions'
import TextArea from '../../components/Form/TextArea'
import { CONSTANTS } from '../../utils/constants'

export default function NewFeedEntry() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, success, loading } = useSelector((state) => state.create_feed_entry)
  const { rss_feeds } = useSelector((state) => state.rss_feeds)

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
    if (success || error) {
      setTimeout(
        () => {
          dispatch(clearErrors())

          if (success) {
            navigate('/feed_entry')
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

  useEffect(() => {
    dispatch(getAllRssFeeds())
  }, [])

  const submit = () => {
    const excludedKeys = ['summary', 'scraped_content', 'feedback', 'content', 'rating', 'response']
    const validation_keys = Object.keys(user)
      .filter((key) => !excludedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = user[key]
        return obj
      }, {})

    if (validate_required_keys(validation_keys, setValidationError)) {
      dispatch(createFeedEntry(user))
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
                  ? 'Feed Entry Created Successfully'
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
              <CCardHeader>Create Feed Entry</CCardHeader>
              <CCardBody>
                <p
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>New Feed Entry</span>
                  <span className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      variant="outline"
                      type="button"
                      color="secondary"
                      onClick={() => navigate('/feed_entry')}
                    >
                      Cancel
                    </CButton>
                    <CButton variant="outline" type="button" color="primary" onClick={submit}>
                      Save
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
