export const VALIDATION_ERROR = 'ValidationError'

export const handleAppErrors = (error: any, singleValidation?: boolean) => {
  if (error?.name === VALIDATION_ERROR && singleValidation) {
    return error.message
  }
  return 'Sorry we encountered an error.'
}
