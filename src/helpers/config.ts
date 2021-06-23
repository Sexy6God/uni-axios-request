import { UniHttpRequestConfig} from '../types/index'

export function isReqeustConfig (config:  UniHttpRequestConfig):boolean{
  return ['GET', 'POST', 'PUT', 'DELETE', 'CONNECT', 'HEAD', 'OPTIONS', 'TRACE'].includes(config.method!)
}

export function isUploadFileConfig (config:  UniHttpRequestConfig):boolean{
  return config.method === 'UPLOAD'
}

export function isDownloadFileConfig (config:  UniHttpRequestConfig):boolean{
return config.method === 'DOWNLOAD'
}

export function processRequestConfig(config:  UniHttpRequestConfig) : UniHttpRequestConfig {
  const configKeys = ['url','data','header','method','timeout','dataType','responseType','sslVerify','withCredentials','firstIpv4',]
  return procesConfig(config, configKeys)

}

export function processUploadFileConfig(config:  UniHttpRequestConfig) : UniHttpRequestConfig {
  const configKeys = ['url', 'fileType', 'file', 'filePath', 'name', 'files', 'header', 'formData', 'timeout', ]
  return procesConfig(config, configKeys)
}

export function processDownloadFileConfig(config:  UniHttpRequestConfig): UniHttpRequestConfig {
  const configKeys = ['url', 'header', 'timeout']
  return procesConfig(config, configKeys)
} 

function procesConfig(config:  UniHttpRequestConfig, keys: string[]): UniHttpRequestConfig {
  const _config: UniHttpRequestConfig = {}
  keys.forEach((key) => {
    if (config[key]) {
      _config[key] = config[key]
    }
  })
  return _config
} 
