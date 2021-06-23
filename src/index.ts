import { UniHttpStatic, UniHttpRequestConfig } from './types'
import UniHttp from './core/uni-http'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/merge-config'

function createInstance(config: UniHttpRequestConfig): UniHttpStatic {
  const context = new UniHttp()
  const instance = UniHttp.prototype.request.bind(context)

  extend(instance, context)
  return instance as UniHttpStatic
}

const uniHttp = createInstance(defaults)

uniHttp.create = function create(config: UniHttpRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

export default uniHttp


