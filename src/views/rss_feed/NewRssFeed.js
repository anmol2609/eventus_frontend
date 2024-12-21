/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/Alerts/Alert'
import { CButton, CCloseButton, CContainer } from '@coreui/react'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
import { configureRssFeed } from '../../slices/rssFeed/ConfigureRssFeedSlice'
import { clearErrors, createRssFeed } from '../../slices/rssFeed/CreateRssFeedSlice'

const styles = `
  .new-rss-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 100vh;
  }

  .header-section {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 60px;
  }

  .content-section {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem;
    border-top: 2px solid #303030;
    border-bottom: 2px solid #303030;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 100%;
  }

  .button-section {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .action-button {
    min-width: 98px;
    height: 36px;
    padding: 0.5rem 1rem;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .header-section {
      padding: 0.75rem;
    }

    .content-section {
      padding: 0.75rem;
    }

    .button-section {
      padding: 0.75rem;
      justify-content: stretch;
    }

    .action-button {
      flex: 1;
      min-width: 80px;
    }
  }

  @media (max-width: 480px) {
    .header-section h5 {
      font-size: 1rem;
    }

    .content-section {
      padding: 0.5rem;
    }

    .button-section {
      flex-direction: column;
      gap: 0.5rem;
    }

    .action-button {
      width: 100%;
      height: 44px;
    }
  }

  .custom-input {
    font-size: 14px;
    width: 100%;
  }

  .alert-wrapper {
    margin-top: 1rem;
  }
`

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

  const initial_state = {
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
      )

      if (success) {
        setUser(initial_state)
      }
    }
  }, [dispatch, error, success])

  const handleClose = () => {
    setUser(initial_state)
    setValidationError('')
    dispatch(clearErrors())
    toggleSidebar()
  }

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
      <style>{styles}</style>
      <div className="new-rss-container">
        <div className="header-section">
          <h5 className="mb-0">Configure New RSS Feed</h5>
          <CCloseButton onClick={handleClose} />
        </div>

        <div className="content-section">
          <div className="form-container">
            <TextInput
              label="RSS Name"
              type="text"
              placeholder="Enter RSS Name"
              value={user.name}
              className="custom-input"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              id="name"
            />

            <TextInput
              label="RSS URL"
              type="text"
              placeholder="Enter URL"
              value={user.url}
              className="custom-input"
              onChange={(e) => setUser({ ...user, url: e.target.value })}
              id="url"
            />

            <div className="alert-wrapper">
              <Alert
                showAlert={
                  success || configure_success || error || validationError || configure_error
                }
                variant={success || configure_success ? 'success' : 'danger'}
                message={
                  success
                    ? 'RSS Feed Created Successfully'
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
          </div>
        </div>

        <div className="button-section">
          <CButton
            type="button"
            className="action-button"
            style={{
              background: '#242424',
              border: '2px solid #303030',
              color: 'white',
            }}
            onClick={handleClose}
          >
            Cancel
          </CButton>
          <CButton
            type="button"
            className="action-button"
            style={{
              background: 'linear-gradient(#426CFF, #2C54DE)',
              color: 'white',
            }}
            onClick={configure_feed}
          >
            Test
          </CButton>
          <CButton
            disabled={!is_configured}
            type="button"
            className="action-button"
            style={{
              background: is_configured ? '#1a1a1a' : '#242424',
              color: 'white',
              border: is_configured ? '2px solid green' : '2px solid #303030',
            }}
            onClick={submit}
          >
            Save
          </CButton>
        </div>
      </div>
    </>
  )
}