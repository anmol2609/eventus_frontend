/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CONSTANTS } from '../../utils/constants'
import Alert from '../../components/Alerts/Alert'
import { CForm, CCol, CRow, CButton, CCloseButton } from '@coreui/react'
import TextInput from '../../components/Form/TextInput'
import SelectBox from '../../components/Form/SelectBox'
import { validate_required_keys } from '../../utils/validators/required_key'
import Loader from '../../components/Loader'
//import { clearErrors, createLoggerProduct } from '../../actions/LoggerActions'
import { clearErrors, createLoggerProduct } from '../../slices/logger/CreateLoggerProductSlice'
import deleteIcon from '../../assets/images/deleteIcon.svg'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { Colors } from '../../utils/colors'

export default function NewLoggerProduct({ toggleSidebar }) {
  const dispatch = useDispatch()
  const { error, success, loading } = useSelector((state) => state.create_logger_product)

  const keywordRef = useRef([])
  const conditionRef = useRef([])

  let initial_state = {
    product_name: '',
    product_type: '',
    log_type: '',
    template_name: '',
    status: CONSTANTS.STATUS.ACTIVE,
    queue_size: CONSTANTS.DEFAULT_VALUES.LOGGER_PRODUCTS.QUEUE_SIZE,
    max_disk_space: CONSTANTS.DEFAULT_VALUES.LOGGER_PRODUCTS.MAX_DISK_SPACE,
    worker_threads: CONSTANTS.DEFAULT_VALUES.LOGGER_PRODUCTS.WORKER_THREADS,
    filename: CONSTANTS.DEFAULT_VALUES.LOGGER_PRODUCTS.FILENAME,
    keywords: [{}],
  }
  const [product, setProduct] = useState(initial_state)
  const [validationError, setValidationError] = useState('')
  const [newKeywords, setNewKeywords] = useState([
    {
      keyword: '',
      condition: '',
    },
  ])

  useEffect(() => {
    if (success || error) {
      setTimeout(
        () => {
          dispatch(clearErrors())

          if (success) {
            window.location.reload()
            dispatch(clearErrors())
          }
        },
        success ? 1000 : 2000,
      ) // clearing the success / error state so that the pop up disappears

      if (success) {
        setProduct(initial_state)
        window.location.reload()
      }
    }
  }, [dispatch, error, success])

  const submit = () => {
    if (validate_required_keys(product, setValidationError)) {
      product.keywords = newKeywords
      dispatch(createLoggerProduct(product))
    }
  }

  const ShowKeywords = ({ keyword, condition, index }) => (
    <CRow className="d-flex align-items-center justify-content-center my-1">
      <CCol sm={5}>
        <TextInput
          type="text"
          refVal={(el) => (keywordRef.current[index] = el)}
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => {
            setNewKeywords((prevKeywords) => {
              let updatedObj = [...prevKeywords]
              updatedObj[index]['keyword'] = e.target.value
              return updatedObj
            })

            setTimeout(() => keywordRef.current[index].focus(), 0)
          }}
          id="keyword"
          disableBottomMargin
        />
      </CCol>
      <CCol sm={5}>
        <SelectBox
          id="condition"
          defaultOption="Select Condition"
          refVal={(el) => (conditionRef.current[index] = el)}
          onChange={(e) => {
            setNewKeywords((prevKeywords) => {
              let updatedObj = [...prevKeywords]
              updatedObj[index]['condition'] = e.target.value
              return updatedObj
            })

            setTimeout(() => conditionRef.current[index].focus(), 0)
          }}
          options={
            <>
              <option key="and" value="and">
                and
              </option>
              <option key="or" value="or">
                or
              </option>
            </>
          }
          value={condition}
          disableBottomMargin
        />
      </CCol>
      <CCol sm={2}>
        <span className="d-flex align-items-center">
          <CButton style={{ padding: '2px' }} onClick={() => deleteKeywordsRow(index)}>
            {<img src={deleteIcon} />}
          </CButton>
        </span>
      </CCol>
    </CRow>
  )

  const deleteKeywordsRow = (idx) => {
    let updated_keywords = newKeywords.filter((_, index) => index !== idx)
    setNewKeywords(updated_keywords)
  }

  const addKeywordsRow = () => {
    setNewKeywords([
      ...newKeywords,
      {
        keyword: '',
        condition: '',
      },
    ])
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <span
          style={{
            height: '100vh',
            overflowY: 'auto',
          }}
        >
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>Add Logger Product</h5>
            <CCloseButton
              onClick={() => {
                setProduct(initial_state)
                setValidationError('')
                dispatch(clearErrors())
                toggleSidebar()
              }}
            />
          </div>
          <CRow className="m-0">
            <CCol xs>
              <div className="create-logger-product" style={{ borderTop: '2px solid #303030' }}>
                <CForm className="p-3">
                  <CRow>
                    <CCol sm={6}>
                      <TextInput
                        label="Product Name"
                        type="text"
                        placeholder="Enter Product Name"
                        value={product.product_name}
                        onChange={(e) => setProduct({ ...product, product_name: e.target.value })}
                        id="product_name"
                      />
                    </CCol>
                    <CCol sm={6}>
                      <TextInput
                        label="Product Type"
                        type="text"
                        placeholder="Enter Product Type"
                        value={product.product_type}
                        onChange={(e) => setProduct({ ...product, product_type: e.target.value })}
                        id="product_type"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6}>
                      <TextInput
                        label="Log Type"
                        type="text"
                        placeholder="Enter Log Type"
                        value={product.log_type}
                        onChange={(e) => setProduct({ ...product, log_type: e.target.value })}
                        id="log_type"
                      />
                    </CCol>
                    <CCol sm={6}>
                      <TextInput
                        label="Template Name"
                        type="text"
                        placeholder="Enter Template Name"
                        value={product.template_name}
                        onChange={(e) => {
                          let template_name = e.target.value
                          setProduct({
                            ...product,
                            template_name,
                            filename:
                              CONSTANTS.DEFAULT_VALUES.LOGGER_PRODUCTS.FILENAME +
                              template_name.toLowerCase().replace(/\s+/g, ''),
                          })
                        }}
                        id="template_name"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6}>
                      <TextInput
                        label="Queue Size"
                        type="number"
                        placeholder="Enter Queue Size"
                        value={product.queue_size}
                        onChange={(e) => setProduct({ ...product, queue_size: e.target.value })}
                        id="queue_size"
                      />
                    </CCol>
                    <CCol sm={6}>
                      <TextInput
                        label="Max Disk Space"
                        type="text"
                        placeholder="Enter Max Disk Space"
                        value={product.max_disk_space}
                        onChange={(e) => setProduct({ ...product, max_disk_space: e.target.value })}
                        id="max_disk_space"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6}>
                      <TextInput
                        label="Worker Threads"
                        type="number"
                        placeholder="Enter Worker Threads"
                        value={product.worker_threads}
                        onChange={(e) => setProduct({ ...product, worker_threads: e.target.value })}
                        id="worker_threads"
                      />
                    </CCol>
                    <CCol sm={6}>
                      <TextInput
                        label="FileName"
                        type="text"
                        placeholder="Enter FileName"
                        value={product.filename}
                        onChange={(e) => setProduct({ ...product, filename: e.target.value })}
                        id="filename"
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol sm={6}>
                      <SelectBox
                        id="status"
                        label="Status"
                        defaultOption="Status"
                        onChange={(e) => setProduct({ ...product, status: e.target.value })}
                        options={Object.keys(CONSTANTS.STATUS).map((item) => (
                          <option key={item} value={CONSTANTS.STATUS[item]}>
                            {CONSTANTS.STATUS[item]}
                          </option>
                        ))}
                        value={product.status}
                      />
                    </CCol>
                  </CRow>

                  <CRow>
                    <span className="mb-2">Keywords</span>
                    {newKeywords.map((keyword, index) => (
                      <ShowKeywords
                        key={index}
                        keyword={keyword.keyword}
                        index={index}
                        condition={keyword.condition}
                      />
                    ))}
                    <CButton
                      size="sm"
                      type="submit"
                      color="primary"
                      variant="outline"
                      style={{
                        fontSize: 13,
                        color: Colors.WHITE,
                        padding: '5px 16px',
                        borderRadius: 7,
                        width: 100,
                      }}
                      className="m-2"
                      onClick={addKeywordsRow}
                    >
                      <CIcon
                        icon={cilPlus}
                        customClassName="nav-icon"
                        style={{ height: 16, marginRight: 4 }}
                      />
                      Add
                    </CButton>
                  </CRow>
                </CForm>
              </div>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end px-3">
                <CButton variant="outline" type="button" color="secondary" onClick={toggleSidebar}>
                  Cancel
                </CButton>
                <CButton variant="outline" type="button" color="primary" onClick={submit}>
                  Save
                </CButton>
              </span>
              <div className="p-3">
                <Alert
                  showAlert={success || error || validationError}
                  variant={success ? 'success' : 'danger'}
                  message={
                    success
                      ? 'Logger Product Created Successfully'
                      : validationError
                        ? validationError
                        : error
                  }
                />
              </div>
            </CCol>
          </CRow>
        </span>
      )}
    </>
  )
}
