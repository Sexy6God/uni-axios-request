import {flattenHeader, processHeader} from "../helpers/header";
import { Method, UniHttpRequestConfig, UniHttpResponse, UniHttpTask} from "../types";


import {isReqeustConfig,
  isUploadFileConfig,
  processDownloadFileConfig,
  processRequestConfig,
  processUploadFileConfig,} from '../helpers/config'
import transform from "./transform";
import {combineURL, isAbsoluteURL} from "../helpers/url";

export function dispatchRequest (config: UniHttpRequestConfig) {
  const { validateFn, procesTask } = config
  const _config = processConfig(config)

  return new Promise((resolve, reject) => {
    _config.success = (response: any ) => {
      response.config = config
      if (!validateFn || validateFn(response)) {
        response.data = transformResponseData(response)
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.statusCode}`))
      }
    } 

    _config.fail = (err:{errMsg: string} ) => {
      reject(new Error(`Request failed with errMsg ${err.errMsg}`))
    }

    let task: UniHttpTask

    if ( isReqeustConfig(config)){
      task = uni.request(_config as any)
    } else if (isUploadFileConfig(config)) {
      task = uni.uploadFile(_config as any)
    } else {
      task = uni.downloadFile(_config as any)
    }

    if (procesTask) procesTask(task)
  })
}


function processConfig(config: UniHttpRequestConfig): UniHttpRequestConfig {
  config.url = transformURL(config)
  config.header = flattenHeader(config.header, config.method!)
  config.header = processHeader(config.header, config.method!)
  config.data = transform(config.data, config.header, config.transformRequest)
  const uniRequestMethod: Method[] = ['GET', 'POST', 'PUT', 'DELETE', 'CONNECT', 'HEAD', 'OPTIONS', 'TRACE']
  const configMethod = config.method as Method

  // uni.request options
  if (uniRequestMethod.includes(configMethod)) {
    return processRequestConfig(config)
  } else if (configMethod === 'UPLOAD') {
    // uni.uploadFile options
    return processUploadFileConfig(config)
  } else {
    // uni.downloadFile options
    return processDownloadFileConfig(config)
  }
}

function transformResponseData(res: UniHttpResponse): UniHttpResponse {
  res.data = transform(res.data || res.tempFilePath, res.header, res.config.transformResponse)
  return res.data
}

function transformURL(config: UniHttpRequestConfig): string {
  let { url, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return url!
}
