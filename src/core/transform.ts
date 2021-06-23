import { UniHttpTransformer } from '../types'

export default function transform(
  data: any,
  header: any,
  fns?: UniHttpTransformer | UniHttpTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, header)
  })
  return data
}
