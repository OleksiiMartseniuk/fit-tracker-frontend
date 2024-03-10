import { boot } from 'quasar/wrappers'
import { Cookies } from 'quasar'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_URL })

export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.interceptors.request.use((config) => {
    const token = Cookies.get('token')
    if (token) { config.headers.Authorization = `Bearer ${token}` }
    return config
  })
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(process.env)
      if (error.response.status === 401) {
        Cookies.remove('token')
        Cookies.remove('userData')
        if (router.currentRoute.value.name !== 'login') { router.push({ name: 'login' }) }
      }
      return Promise.reject(error)
    }
  )
})

export { api }
