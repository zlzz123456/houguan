import store from '@/store'
import { renew } from '@/utils/auth'
import { baseURL } from '@/utils/constants'

export async function fetchURL (url, opts) {
  opts = opts || {}
  opts.headers = opts.headers || {}

  let { headers, ...rest } = opts

  // console.log('store: ' + JSON.stringify(store.state.setting.jwt));
  let appId = store.state.setting.applicationObj.appId;
  let cId = store.state.setting.cId;
  let path = `${baseURL}${url}` + (url.indexOf('?') > -1 ? '&' : '?') + `appId=${appId}&cId=${cId}`;
  const res = await fetch(path, {
    headers: {
      'X-Auth': store.state.setting.jwt,
      ...headers
    },
    ...rest
  })

  if (res.headers.get('X-Renew-Token') === 'true') {
    await renew(store.state.setting.jwt)
  }

  return res
}

export async function fetchJSON (url, opts) {
  const res = await fetchURL(url, opts)

  if (res.status === 200) {
    return res.json()
  } else {
    throw new Error(res.status)
  }
}

export function removePrefix (url) {
  if (url.startsWith('/files')) {
    url = url.slice(6)
  }

  if (url === '') url = '/'
  if (url[0] !== '/') url = '/' + url
  return url
}

