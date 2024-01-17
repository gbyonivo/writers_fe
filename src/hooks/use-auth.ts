import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'

import { removeUser } from '../store/slices/login'
import {
  AuthenticateReturn,
  LoginAttemptStatus,
  UseAuthReturn,
} from '../types/states/LoginState'

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
      const { data: token } = await axios.get(
        `http://localhost:4000/login/${formattedValue}`,
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
      console.log(e)
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
