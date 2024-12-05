/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/Alerts/Alert'
import { CButton, CCloseButton } from '@coreui/react'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import { clearErrors, configureRssFeed, createRssFeed } from '../../actions/RssFeedActions'

export default function NewRssFeed({ toggleSidebar }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    is_configured,
    loading: configure_loading,
    success: configure_success,
    error: configure_error,
  } = useSelector((state) => state.configured_rss_feed)
  const { error, success, loading } = useSelector((state) => state.create_rss_feed)

  let initial_state = {
    name: '',
    url: '',
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (success || error || configure_success) {
      setTimeout(
        () => {
          dispatch(clearErrors())

          if (success) {
            navigate('/rss_feeds')
            dispatch(clearErrors())
          } else if (configure_success) {
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
      dispatch(createRssFeed(user))
    }
  }

  const configure_feed = () => {
    if (validate_required_keys(user, setValidationError)) dispatch(configureRssFeed(user))
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-3 py-3">
        <h5>Configure New RSS Feed</h5>
        <CCloseButton
          onClick={() => {
            setUser(initial_state)
            setValidationError('')
            dispatch(clearErrors())
            toggleSidebar()
          }}
        />
      </div>
      <div
        className="d-flex flex-column gap-1 px-3 flex-grow-1 py-2"
        style={{ borderTop: '2px solid #303030', borderBottom: '2px solid #303030' }}
      >
        <TextInput
          label="RSS Name"
          type="text"
          placeholder="Enter RSS Name"
          value={user.name}
          style={{ fontSize: '12px', fontWeight: '400' }}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          id="name"
        />

        <TextInput
          label="RSS URL"
          type="text"
          placeholder="Enter URL"
          value={user.url}
          style={{ fontSize: '12px', fontWeight: '400' }}
          onChange={(e) => setUser({ ...user, url: e.target.value })}
          id="url"
        />
        <Alert
          showAlert={success || configure_success || error || validationError || configure_error}
          variant={success || configure_success ? 'success' : 'danger'}
          message={
            success
              ? 'Rss Feed Created Successfully'
              : configure_success
                ? 'Feed URL is Valid'
                : validationError
                  ? validationError
                  : configure_error
                    ? configure_error
                    : error
          }
        />
      </div>
      <div
        style={{
          margin: '12px 20px 12px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.5rem',
        }}
      >
        <CButton
          type="button"
          style={{
            background: '#242424',
            border: '2px solid #303030',
            color: 'white',
            width: '98px',
            height: '36px',
          }}
          onClick={() => {
            setUser(initial_state)
            setValidationError('')
            dispatch(clearErrors())
            toggleSidebar()
          }}
        >
          Cancel
        </CButton>
        <CButton
          type="button"
          style={{
            background: 'linear-gradient(#426CFF, #2C54DE)',
            color: 'white',
            width: '98px',
            height: '36px',
          }}
          onClick={configure_feed}
        >
          Test
        </CButton>
        <CButton
          disabled={!is_configured}
          type="button"
          style={{
            background: is_configured ? '#1a1a1a' : '#242424',
            color: 'white',
            border: is_configured ? '2px solid green' : '2px solid #303030',
            width: '98px',
            height: '36px',
          }}
          onClick={submit}
        >
          Save
        </CButton>
      </div>
    </>
  )
}
