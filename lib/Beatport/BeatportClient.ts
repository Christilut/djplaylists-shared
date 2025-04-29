import Axios from 'axios'
import { BeatportAuth } from './BeatportAuth'
import { BEATPORT_API_URL, IBeatportPlaylist } from './interface'
import { DJPlaylist } from '../../interfaces/supabase'

interface IApiCallArgs {
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  query?: any
  noRetry?: boolean
}

export class BeatportClient {
  private async apiCall<T>(args: IApiCallArgs): Promise<T> {
    await BeatportAuth.tryRefreshAccessToken()

    if (!BeatportAuth.isAuthorized) throw new Error('Beatport not authenticated')

    args.body = args.body ?? {}
    args.query = args.query ?? {}

    const url: string = args.endpoint.includes('http') ? args.endpoint : `${BEATPORT_API_URL}${args.endpoint}`

    const searchParams = new URLSearchParams()

    for (const key in args.query) {
      searchParams.set(key, args.query[key])
    }

    try {
      const axiosClient = Axios.create({
        baseURL: '/',
        headers: null
      })

      const response = await axiosClient({
        method: args.method,
        url,
        params: searchParams,
        data: args.body, // Can be object or string from cover art
        headers: {
          authorization: 'Bearer ' + BeatportAuth.accessToken
        },
      })

      return response.data
    } catch (error) {
      if (error.request?.status === 401) {
        BeatportAuth.logout()
      } else {
        console.error(`request to beatport failed: ${error.message}`, {
          data: error.response?.data
        })
      }

      if (error.message === 'Network Error') {
        throw new Error('Unable to reach Beatport. Please check your internet connection.')
      }

      throw error
    }
  }

  async createPlaylist(djPlaylist: DJPlaylist) {
    const beatportPlaylist = await this.apiCall<IBeatportPlaylist>({
      endpoint: `/my/playlists/`,
      method: 'POST',
      body: {
        name: djPlaylist.title,
        is_public: false,
      }
    })

    const beatportTrackIds = djPlaylist._items
      .filter(item => item.beatport_id)
      .map(item => item.beatport_id)

    await this.apiCall<any>({
      endpoint: `/my/playlists/${beatportPlaylist.id}/tracks/bulk/`,
      method: 'POST',
      body: {
        track_ids: beatportTrackIds
      }
    })

    return beatportPlaylist.id
  }
}
