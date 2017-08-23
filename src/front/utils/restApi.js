import Vue from 'vue'

export function makeRequest ({ url, method = 'get', data = {} }) {
  return new Promise((resolve, reject) => {
    Vue.http[method](url, data)
      .then(response => {
        const { code, msg } = response.data
        if (code === 200) {
          resolve(msg)
        } else {
          reject({ code, msg })
        }
      })
      .catch(() => {
        reject({ code: -1, msg: '服务器故障' })
      })
  })
}
