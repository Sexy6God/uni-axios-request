
import {Method} from "../types"
import {deepMerge} from "./util"
import { isPlainObject } from './util'

export function flattenHeader(header: any, method: Method): any {
  if (!header) {
    return header
  }
  header = deepMerge(header.common || {}, header[method] || {}, header)

  delete header.common

  const methodsToDelete: Method[] = [ 'GET','POST', 'PUT', 'HEAD','DELETE','CONNECT','HEAD', 'OPTIONS', 'TRACE',  'UPLOAD', 'DOWNLOAD']

  methodsToDelete.forEach(method => {
    delete header[method]
  })

  return header
}

function normalizeHeaderName (header: any, normalizedName: string): void {
  if (!header) {
    return
  }
  Object.keys(header).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      header[normalizedName] = header[name]
      delete header[name]
    }
  })
}

export function processHeader (header: any, method?: Method ): any {
  if (!header) {
    return header
  }
  normalizeHeaderName(header, 'content-type')

  if (['UPLOAD', 'DOWNLOAD'].includes(method!)) {
    if (header['Referer']) 
      delete header['Referer']
  } else {
    if (header && !header['content-type']) {
      header['content-type'] = 'application/json;charset=utf-8'
    }
  }
  return header
}
