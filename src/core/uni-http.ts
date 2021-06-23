import {PromiseChain, UniHttpResponse, UniHttpRequestConfig, UniHttpUploadFileConfig, UniHttpDownloadFileConfig} from "../types"
import {dispatchRequest} from "./dispatch-request"
import InterceptorManager from "./Interceptor"
import initConfig from '../defaults'
import mergeConfig from "./merge-config"


export interface UniHttpInterceptors {
  request: InterceptorManager<UniHttpRequestConfig>
  response: InterceptorManager<UniHttpResponse>
}

export default class UniHttp {
  defaults: UniHttpRequestConfig
  interceptors: UniHttpInterceptors

  constructor() {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<UniHttpRequestConfig>(),
      response: new InterceptorManager<UniHttpResponse>()
    }
  }

  request(url: any, config?: any) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    
    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]
  
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
  
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
  
    let promise = Promise.resolve(config)
  
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }


  get (url: string, data?: string | object | ArrayBuffer, config?:  UniHttpRequestConfig){
    return this.request({ method:'GET', ...config, url, data })
  }
  
  post (url: string, data?: string | object | ArrayBuffer, config?:  UniHttpRequestConfig){
    return this.request({ method: 'POST', ...config, url, data })
  }
  UniHttpRequestConfig (url: string, data?: string | object | ArrayBuffer, config?: UniHttpRequestConfig){
    
    return this.request({ modthod: 'PUT', ...config, url, data })
  }
  
  
  delete1 (url: string, data?: string | object | ArrayBuffer, config?:  UniHttpRequestConfig){
    
    return this.request({ method: 'DELETE', ...config, url, data })
  }
  
  connect (url: string, data?: string | object | ArrayBuffer, config?:  UniHttpRequestConfig){
    return this.request({ method: 'CONNECT',...config,url,data })
  }
  
  head (url: string, data?: string | object | ArrayBuffer, config?:  UniHttpRequestConfig){
    return this.request({ method: 'HEAD', ...config, url, data })
  }
  
  options (url: string, data?: string | object | ArrayBuffer, config?: UniHttpRequestConfig){
    return this.request({ method: 'OPTIONS', ...config, url, data })
  }
  
  trace (url: string, data?: string | object | ArrayBuffer, config?:  UniHttpRequestConfig){
    return this.request({ method: 'TRACE', ...config, url, data })
  }
  
  uploadFile (url: string, filePath: string, config?:  UniHttpUploadFileConfig){
    return this.request({ method: 'UPLOAD', ...config, url, filePath })
  }
  
  downloadFile (url: string, config?:  UniHttpDownloadFileConfig){
    return this.request({ method: 'DOWNLOAD', ...config, url })
  }
}