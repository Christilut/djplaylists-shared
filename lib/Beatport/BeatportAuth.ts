import Axios from 'axios'
import { BEATPORT_API_URL, IBeatportAuthResponse } from './interface'

const STORAGE_KEY_BEATPORT_AUTH = 'beatport-auth'
const AUTH_REDIRECT_URI = 'https://api.rekord.cloud/public/auth/beatport/token'
const ACCESS_TOKEN_URI = 'https://api.rekord.cloud/public/auth/beatport/token-access'
const REFRESH_TOKEN_URI = 'https://api.rekord.cloud/public/auth/beatport/token-refresh'

export abstract class BeatportAuth {
  static userId: string = ''
  static accessToken: string = ''
  static refreshToken: string = ''
  static expires: Date | null = null

  static get isAuthenticated(): boolean {
    return !!BeatportAuth.accessToken
  }

  static createRedirectUri(userId: string): string {
    return AUTH_REDIRECT_URI + `?userId=${userId}`
  }

  static init() {
    const beatportAuthStr = localStorage.getItem(STORAGE_KEY_BEATPORT_AUTH)

    if (beatportAuthStr) {
      try {
        const beatportAuth = JSON.parse(beatportAuthStr)

        BeatportAuth.accessToken = beatportAuth.accessToken
        BeatportAuth.refreshToken = beatportAuth.refreshToken
        BeatportAuth.expires = new Date(beatportAuth.expires)
      } catch (error) {
        console.error(error)

        localStorage.removeItem(STORAGE_KEY_BEATPORT_AUTH)
      }
    }
  }

  static save() {
    localStorage.setItem(STORAGE_KEY_BEATPORT_AUTH, JSON.stringify({
      accessToken: BeatportAuth.accessToken,
      refreshToken: BeatportAuth.refreshToken,
      expires: BeatportAuth.expires
    }))
  }

  static logout() {
    BeatportAuth.refreshToken = ''
    BeatportAuth.accessToken = ''
    BeatportAuth.expires = null

    localStorage.removeItem(STORAGE_KEY_BEATPORT_AUTH)

    console.log('logged out of beatport')
  }

  static setToken({ accessToken, expiresInSeconds, refreshToken }: { accessToken: string, expiresInSeconds: number, refreshToken: string }) {
    BeatportAuth.refreshToken = refreshToken
    BeatportAuth.accessToken = accessToken
    BeatportAuth.expires = new Date((new Date().getTime() + expiresInSeconds * 1000))

    BeatportAuth.save()
  }

  static openLogin(userId: string) {
    BeatportAuth.userId = userId

    console.log('opening beatport authorize link')

    const params = new URLSearchParams()

    params.append('client_id', import.meta.env.VITE_BEATPORT_CLIENT_ID)
    params.append('response_type', 'code')
    params.append('redirect_uri', BeatportAuth.createRedirectUri(userId))

    const uri: string = `${BEATPORT_API_URL}/auth/o/authorize/?${params.toString()}`

    window.open(uri, '_blank')
  }

  static async authenticate() {
    const { data }: { data: IBeatportAuthResponse } = await Axios.post(ACCESS_TOKEN_URI, {
      redirectUri: BeatportAuth.createRedirectUri(BeatportAuth.userId)
    })

    if (data) {
      BeatportAuth.setToken({
        accessToken: data.access_token,
        expiresInSeconds: data.expires_in,
        refreshToken: data.refresh_token
      })

      console.log('succesfully authenticated beatport')
    }
  }

  static async tryRefreshAccessToken() {
    if (BeatportAuth.isAuthenticated && BeatportAuth.expires && BeatportAuth.expires.getTime() < new Date().getTime() + 60 * 60 * 1000) { // Refresh 60 minutes before it expires
      console.log('attempting to refresh beatport access token')

      try {
        const { data } = await Axios.post(REFRESH_TOKEN_URI, {
          accessToken: BeatportAuth.accessToken,
          refreshToken: BeatportAuth.refreshToken
        })

        if (data) {
          BeatportAuth.setToken({
            accessToken: data.access_token,
            expiresInSeconds: data.expires_in,
            refreshToken: data.refresh_token
          })

          console.log('refreshed beatport access token')
        }
      } catch (error) {
        console.error(error)

        BeatportAuth.logout()
      }
    }
  }
}
