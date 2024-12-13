/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CRow,
  CCol,
  CButton,
  CForm,
  CCloseButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
} from '@coreui/react'
import Alert from '../../components/Alerts/Alert'
import { CONSTANTS } from '../../utils/constants'
import TextInput from '../../components/Form/TextInput'
import { validate_required_keys } from '../../utils/validators/required_key'
//import { clearErrors, getSOARProduct, updateSOARProduct } from '../../actions/SOARProductActions'
import Loader from '../../components/Loader'
import deleteIcon from '../../assets/images/deleteIcon.svg'
import editIcon from '../../assets/images/editIcon.svg'
import { Colors } from '../../utils/colors'
import { getSOARProduct } from '../../slices/SOARProduct/GetSOARProductSlice'
import { clearErrors, updateSOARProduct } from '../../slices/SOARProduct/UpdateSOARProductSlice'

export default function EditSOARProduct({ toggleSidebar, id }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { SOAR_product, loading: SOAR_loading } = useSelector((state) => state.SOAR_product)
  const { error, isUpdated, loading } = useSelector((state) => state.update_SOAR_product)
  const [toggleCount, setToggleCount] = useState(0)
  const [isInitialRender, setIsInitialRender] = useState(true)
  // const { id } = useParams()

  let initial_state = {
    extra_data_field: '',
    field_in_log: '',
    status: CONSTANTS.STATUS.ACTIVE,
  }
  const [user, setUser] = useState(initial_state)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
    } else if (toggleCount === 0) {
      setToggleCount(1)
    }
  }, [toggleCount])

  useEffect(() => {
    dispatch(getSOARProduct(id))
  }, [id])

  useEffect(() => {
    if (isUpdated) {
      dispatch(clearErrors())
      window.location.reload()
      if (toggleCount === 0) toggleSidebar()
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearErrors())
      }, 2000)
    }
  }, [dispatch, isUpdated, error])

  const addRowSet = () => {
    setUser({
      ...user,
      field_in_log: [...user.field_in_log, ''],
      extra_data_field: [...user.extra_data_field, ''],
    })
  }

  const deleteDataCell = (index) => {
    const updated_field_in_log = user.field_in_log.filter((_, i) => i !== index)
    const updated_extra_data_field = user.extra_data_field.filter((_, i) => i !== index)

    setUser({
      ...user,
      field_in_log: updated_field_in_log,
      extra_data_field: updated_extra_data_field,
    })
  }

  useEffect(() => {
    if (SOAR_product) {
      setUser({
        ...user,
        product_name: SOAR_product.product_name,
        extra_data_field: SOAR_product.extra_data_field,
        field_in_log: SOAR_product.field_in_log,
        status: SOAR_product.status,
      })
    }
  }, [SOAR_product])

  const submit = () => {
    if (validate_required_keys(user, setValidationError)) dispatch(updateSOARProduct(id, user))
  }

  return (
    <>
      {loading || SOAR_loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center px-3 py-3">
            <h5>{user.product_name} Fields Configuration</h5>
            <CCloseButton
              onClick={() => {
                setUser(initial_state)
                setValidationError('')
                dispatch(clearErrors())
                toggleSidebar()
                setValidationError('setValidationError')
              }}
            />
          </div>
          <CRow>
            <CCol xs>
              <div className="update-SOAR-product" style={{ borderTop: '2px solid #303030' }}>
                <CForm className="p-3">
                  <h5 style={{ fontWeight: 400, marginTop: 10 }}>{user.product_name} Fields</h5>
                  <CCard
                    className="mb-4"
                    style={{
                      marginTop: '12px',
                      border: '1px solid #303030',
                      borderRadius: '6px',
                      overflow: 'hidden',
                    }}
                  >
                    <CTable
                      hover
                      responsive
                      caption="top"
                      style={{
                        fontWeight: '600',
                        fontSize: 14,
                        borderCollapse: 'collapse',
                      }}
                      align="middle"
                      className={'mb-0'}
                    >
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col" className="table_updated">
                            Field in log
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col" className="table_updated">
                            Extra Data
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col" className="table_updated">
                            Action
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {user && user.field_in_log.length > 0
                          ? user.field_in_log.map((_, index) => (
                              <CTableRow key={user._id}>
                                <CTableDataCell align="middle" className="table_updated">
                                  <TextInput
                                    type="text"
                                    placeholder="Enter Field"
                                    value={user.field_in_log[index]}
                                    onChange={(e) => {
                                      const updated_field_in_log = [...user.field_in_log]
                                      updated_field_in_log[index] = e.target.value
                                      setUser({ ...user, field_in_log: updated_field_in_log })
                                    }}
                                    id="field_in_log"
                                    bg_color="rgb(26, 26, 26)"
                                    disableBottomMargin
                                  />
                                </CTableDataCell>
                                <CTableDataCell align="middle" className="table_updated">
                                  <TextInput
                                    type="text"
                                    placeholder="Enter Extra Data"
                                    value={user.extra_data_field[index]}
                                    onChange={(e) => {
                                      const updated_extra_data_field = [...user.extra_data_field]
                                      updated_extra_data_field[index] = e.target.value
                                      setUser({
                                        ...user,
                                        extra_data_field: updated_extra_data_field,
                                      })
                                    }}
                                    id="extra_data_field"
                                    bg_color="rgb(26, 26, 26)"
                                    disableBottomMargin
                                  />
                                </CTableDataCell>
                                <CTableDataCell className="table_updated">
                                  <span className="d-flex align-items-center">
                                    <CButton
                                      style={{ padding: '2px', color: Colors.RED }}
                                      onClick={() => deleteDataCell(index)}
                                    >
                                      {<img src={deleteIcon} />}
                                    </CButton>
                                  </span>
                                </CTableDataCell>
                              </CTableRow>
                            ))
                          : null}

                        {/* <CTableRow align="middle">
                          <FieldSet />
                          <CTableDataCell>
                            <ActionSet />
                          </CTableDataCell>
                        </CTableRow> */}
                      </CTableBody>
                    </CTable>
                  </CCard>

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
                    }}
                    onClick={addRowSet}
                  >
                    Add Field
                  </CButton>
                </CForm>
              </div>
              <span className="d-grid gap-2 d-md-flex justify-content-md-end px-3">
                <CButton
                  type="button"
                  color="secondary"
                  onClick={() => {
                    toggleSidebar()
                    setValidationError('')
                  }}
                >
                  Cancel
                </CButton>
                <CButton type="button" color="primary" onClick={submit}>
                  Save
                </CButton>
              </span>
              <div className="p-3">
                <Alert
                  showAlert={isUpdated || error || validationError}
                  variant={isUpdated ? 'success' : 'danger'}
                  message={
                    isUpdated
                      ? 'SOAR Product Updated Successfully'
                      : validationError
                        ? validationError
                        : error
                  }
                />
              </div>
            </CCol>
          </CRow>
        </>
      )}
    </>
  )
}
