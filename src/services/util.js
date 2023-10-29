export const cleanUpEmptyParams = (params) => {
  let filteredParams = {}
  if (params && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        filteredParams[key] = value
      }
    })
  }
  return filteredParams
}

export const INTERNAL_SERVER_ERROR = 500

export const REST_SERVER_URL = 'http://localhost:8080'
