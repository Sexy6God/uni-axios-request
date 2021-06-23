import { UniHttpRequestConfig } from './types'

const defaults: UniHttpRequestConfig = {
  endpoint: '',
  method: 'GET',
  timeout: 60000,
  dataType: 'json',
  header: {
    common: {}
  },
  responseType: 'text',
  sslVerify: true,
  withCredentials: false,
  firstIpv4: false,
  transformRequest: [
    function(data: any, header: any): any {
      return data
    }
  ],
  transformResponse: [
    function(data: any): any {
      return data
    }
  ],
  validateFn (response) {
    const status = response.statusCode
    return status >= 200 && status < 300
  }
}

export default defaults
