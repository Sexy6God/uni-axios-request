import {UniHttpInterceptors} from "../core/uni-http"

export interface UniHttpRequestConfig  {
  baseURL?: string;
  //  资源url
  url?: string;
  // 文件类型，image/video/audio，仅支付宝小程序，且必填。
  fileType?: 'image' | 'video' | 'audio';
  // 要上传的文件对象
  file?: File;
  // 要上传文件资源的路径
  filePath?: string;
  // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
  name?: string;
  // HTTP 请求中其他额外的 form data
  formData?: any;
  // 需要上传的文件列表。
  files?: UploadFileOptions[];
  // 请求的参数
  data?: DateType;
  // 设置请求的 header，header 中不能设置 Referer。
  header?: any;
  method?: Method;
  //  超时时间，单位 ms
  timeout?: number;
  //  如果设为json，会尝试对返回的数据做一次 JSON.parse
  dataType?: string;
  //  设置响应的数据类型。合法值：text、arraybuffer
  responseType?: string;
  //  验证 ssl 证书
  sslVerify?: boolean;
  // 跨域请求时是否携带凭证
  withCredentials?: boolean;
  //  DNS解析时优先使用 ipv4
  firstIpv4?: boolean;
  transformRequest?: UniHttpTransformer | UniHttpTransformer[]
  transformResponse?: UniHttpTransformer | UniHttpTransformer[]
  // 自定义验证器
  validateFn?: (response: UniHttpResponse) => boolean
  // 处理请求任务
  procesTask?: (task: UniHttpTask) => void
  [propName: string]: any
}

export type UniHttpTask = UniApp.RequestTask | UniApp.UploadTask | UniApp.DownloadTask
export interface UniHttpUploadFileConfig {
  url?: string;
  /**
  * 文件类型，image/video/audio，仅支付宝小程序，且必填。
  * - image: 图像
  * - video: 视频
  * - audio: 音频
  */
  fileType?: 'image' | 'video' | 'audio';
  // 要上传的文件对象
  file?: File;
  // 要上传文件资源的路径
  filePath?: string;
  // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
  name?: string;
  //  需要上传的文件列表。
  files?: UploadFileOptions [];
  //  HTTP 请求 Header, header 中不能设置 Referer
  header?: any;
  //  HTTP 请求中其他额外的 form data
  formData?: any;
  timeout?: number;
  transformRequest?: UniHttpTransformer | UniHttpTransformer[]
  transformResponse?: UniHttpTransformer | UniHttpTransformer[]
  // 自定义验证器
  validateFn?: (response: UniHttpResponse) => boolean
  procesTask?: (task: UniApp.UploadTask) => void
}

export interface UniHttpDownloadFileConfig {
  baseURL?: string;
  // 下载资源的 url
  url?: string;
  // HTTP 请求 Header，header 中不能设置 Referer
  header?: any;
  // 超时时间，单位 ms
  timeout?: number;
  transformRequest?: UniHttpTransformer | UniHttpTransformer[]
  transformResponse?: UniHttpTransformer | UniHttpTransformer[]
  // 自定义验证器
  validateFn?: (response: UniHttpResponse) => boolean
  procesTask?: (task: UniApp.DownloadTask) => void
}

export interface UploadFileOptions {
  //  multipart 提交时，表单的项目名，默认为 file，如果 name 不填或填的值相同，可能导致服务端读取文件时只能读取到一个文件。
  name?: string;
  //  要上传的文件对象
  file?: File;
  // 要上传文件资源的路径
  uri?: string;
}
export interface UniHttpTransformer {
  (data: any, header?: any): any
}

export type DateType =  string | object | ArrayBuffer
export interface  UniHttpResponse<T = any>  {
  //  开发者服务器返回的数据
  data?: T;
  // 临时文件路径，下载后的文件会存储到一个临时文件
  tempFilePath?: string;
  //  开发者服务器返回的 HTTP 状态码
  statusCode: number;
  //  开发者服务器返回的 HTTP Response Header
  header?: any;
  //  开发者服务器返回的 cookies，格式为字符串数组
  cookies?: string [];
  config: UniHttpRequestConfig

}

export type Method = 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'HEAD'
  | 'OPTIONS'
  | 'TRACE'
  | 'UPLOAD'
  | 'DOWNLOAD'


export interface UniHttpPromise<T = any> extends Promise<UniHttpResponse<T>> {}

export interface UniHttp {
  defaults: UniHttpRequestConfig
  interceptors: UniHttpInterceptors
  request<T = any>(config: UniHttpRequestConfig): UniHttpPromise<T>
  get<T = any>(url: string, data?: DateType, config?: UniHttpRequestConfig ): UniHttpPromise<T>
  post<T = any>(url: string, data?: DateType, config?: UniHttpRequestConfig  ): UniHttpPromise<T>
  put<T = any>(url: string, data?: DateType, config?: UniHttpRequestConfig  ): UniHttpPromise<T>
  delete1<T = any>(url: string, data?: DateType, config?: UniHttpRequestConfig  ): UniHttpPromise<T>
  connect<T = any>(url: string, data?: DateType, config?: UniHttpRequestConfig ): UniHttpPromise<T>
  head<T = any>(url: string, data?: DateType, config?: UniHttpRequestConfig  ): UniHttpPromise<T>
  options<T = any>(url: string, data?: DateType, config?: UniHttpRequestConfig  ): UniHttpPromise<T>
  trace<T = any>(url: string, data?: DateType, config?: UniHttpRequestConfig  ): UniHttpPromise<T>
  uploadFile<T = any>(url: string, filePath: string, config?: UniHttpRequestConfig  ): UniHttpPromise<T>
  downloadFile<T = any>(url: string, config?: UniHttpRequestConfig ): UniHttpPromise<T>
}

export interface UniHttpInstance extends UniHttp {
  <T = any>(config: UniHttpRequestConfig): UniHttpPromise<T>
  <T = any>(url: string, config?: UniHttpRequestConfig): UniHttpPromise<T>
}

export interface UniHttpStatic extends UniHttpInstance{
  create(config?: UniHttpRequestConfig): UniHttpInstance
}
export interface ResolvedFn<T=any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}


export interface PromiseChain {
  resolved: ResolvedFn | ((config: UniHttpRequestConfig) => UniHttpPromise)
  rejected?: RejectedFn
}