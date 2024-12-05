import { CONSTANTS } from '../constants'

export const validate_required_keys = (object, setValidationError) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (object[key] === null || object[key] === '') {
        setValidationError(`${key} is required`)
        return false
      }

      // validating the email
      if (key == 'email') {
        let is_valid_email = CONSTANTS.EMAIL_REGEX.test(object[key])
        if (!is_valid_email) {
          setValidationError('Invalid Email')
          return false
        }
      }
      

      // validating the URL format
      if (key == 'url' || key == 'base_url') {
        let is_valid_url = CONSTANTS.URL_REGEX.test(object[key])
        if (!is_valid_url) {
          setValidationError('Invalid URL')
          return false
        }
      }

      // validating the pass
      if (key == 'password' || key == 'password') {
        if (object['password'] !== object['confirmPassword']) {
            setValidationError('Password is not matching')
            return false
          }
        }
      }
  }
  return true
}
