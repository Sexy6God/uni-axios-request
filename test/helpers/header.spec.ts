import { processHeader, flattenHeader } from '../../src/helpers/header'

describe('helpers:header', () => {

  describe('processHeader', () => {
    test('should normalize Content-Type header name', () => {
      const header: any = {
        'conTenT-Type': 'foo/bar',
        'Content-length': 1024
      }
      processHeader(header, "GET")
      expect(header['content-type']).toBe('foo/bar')
      expect(header['ConTent-Type']).toBeUndefined()
      expect(header['Content-length']).toBe(1024)
    })



    test('should do nothing if header is undefined or null', () => {
      expect(processHeader(undefined, "GET")).toBeUndefined()
      expect(processHeader(null, "GET")).toBeNull()
    })

    test('should set not Referer if method is UPLOAD or DOWNLOAD', () => {
      const header1: any = {
        Referer: 'xxx'
      }
      processHeader(header1, 'GET')
      expect(header1['Referer']).toBe('xxx')
      const header2: any = {
        Referer: 'xxx'
      }
      processHeader(header2, 'UPLOAD')
      expect(header2['Referer']).toBeUndefined()
      const header3: any = {
        Referer: 'xxx'
      }
      processHeader(header3, 'DOWNLOAD')
      expect(header3['Referer']).toBeUndefined()
    })    
  })

  describe('flattenHeader', () => {
    test('should flatten the header and include common header', () => {
      const header = {
        Accept: 'application/json',
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        GET: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        POST: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }

      expect(flattenHeader(header, 'GET')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'commonHeaderValue',
        'X-GET-HEADER': 'getHeaderValue'
      })
    })

    test('should flatten the header without common header', () => {
      const header = {
        Accept: 'application/json',
        GET: {
          'X-GET-HEADER': 'getHeaderValue'
        }
      }

      expect(flattenHeader(header, 'CONNECT')).toEqual({
        Accept: 'application/json'
      })
    })

    test('should do nothing if header is undefined or null', () => {
      expect(flattenHeader(undefined, 'GET')).toBeUndefined()
      expect(flattenHeader(null, 'POST')).toBeNull()
    })
  })
})
