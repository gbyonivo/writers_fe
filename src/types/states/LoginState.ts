import { User } from 'writers_shared'

export interface LoginState {
  user?: User
  token: string
}

export interface AddUserParams {
  user: User
  token: string
}

export enum LoginAttemptStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  NOT_FOUND = 'NOT_FOUND',
  INVALID_NUMBER = 'INVALID_NUMBER',
}

export interface AuthenticateReturn {
  status: LoginAttemptStatus
  userAndToken?: AddUserParams
  formattedPhone?: string
}

export interface AuthenticateParams {
  value: string
  formattedValue: string
  isValidNumber: (val: string) => boolean
}

export interface UseAuthReturn {
  login: (value: AuthenticateParams) => Promise<AuthenticateReturn>
  logout: () => void
}
