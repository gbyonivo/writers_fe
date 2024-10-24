import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'

import { removeUser } from '../store/slices/login'
import {
  AuthenticateReturn,
  LoginAttemptStatus,
  UseAuthReturn,
} from '../types/states/LoginState'
import { apiUrl } from '../utils/constants'

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch()

  const login = async ({
    value,
    formattedValue,
    isValidNumber,
  }): Promise<AuthenticateReturn> => {
    const isNumberValid = isValidNumber(value)
    if (!isNumberValid) {
      return { status: LoginAttemptStatus.INVALID_NUMBER }
    }
    try {
      console.log(apiUrl)
      const { data: token } = await axios.get(
        `${apiUrl}/login/${formattedValue}`,
      )
      return {
        status: LoginAttemptStatus.SUCCESS,
        userAndToken: { user: jwtDecode(token), token },
      }
    } catch (e) {
      if (e.request.status === 404) {
        return {
          status: LoginAttemptStatus.NOT_FOUND,
          formattedPhone: formattedValue,
        }
      }
      return { status: LoginAttemptStatus.FAILED }
    }
  }

  const logout = () => {
    dispatch(removeUser())
  }

  return {
    login,
    logout,
  }
}
