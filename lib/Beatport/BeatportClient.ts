import Axios from 'axios'
import { BeatportAuth } from './BeatportAuth'
import { BEATPORT_API_URL, IBeatportPlaylist, IBeatportTrack, IBeatportPlaylistPosition, IBeatportResponse } from './interface'
import { DJPlaylist, DJTrack } from '../../interfaces/supabase'
import { KeyConverter } from '../../helpers/KeyConverter'
import _ from 'lodash'

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

  // (AI) Get all playlists from Beatport
  async getPlaylists(): Promise<IBeatportPlaylist[]> {
    const response = await this.apiCall<IBeatportResponse<IBeatportPlaylist>>({
      endpoint: '/my/playlists/',
      method: 'GET',
      query: {
        per_page: 100
      }
    })

    return response.results
  }

  // (AI) Get tracks from a specific playlist, fetching all pages
  async getPlaylistTracks(playlistId: string): Promise<IBeatportPlaylistPosition[]> {
    // (AI) This function fetches all tracks from a Beatport playlist, handling paging by following the 'next' field in the API response
    let allResults: IBeatportPlaylistPosition[] = []
    let page = 1

    while (page < 100) {
      // If nextUrl is a full URL, use it as endpoint, otherwise use the relative path
      const response = await this.apiCall<IBeatportResponse<IBeatportPlaylistPosition>>({
        endpoint: `/my/playlists/${playlistId}/tracks/`,
        method: 'GET',
        query: {
          per_page: 100,
          page
        },
      })

      if (response.results) {
        allResults = _.concat(allResults, response.results)
      }

      if (!response.next) {
        break
      }

      page += 1
    }

    return allResults
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

  static trackToDJTrack(track: IBeatportTrack): DJTrack {
    let title = track.name

    if (track.mix_name !== 'Original Mix') {
      title = `${title} (${track.mix_name})`
    }

    return {
      title,
      artist: track.artists[0].name,
      album: track.release?.name,
      imageurl: track.release?.image?.uri,
      created_at: new Date(),
      beatport_id: track.id.toString(),
      beatport_link: `https://www.beatport.com/track/-/${track.id}`,
      beatport_preview: track.sample_url,
      bpm: track.bpm,
      key: KeyConverter.toOpenKey(`${track.key.camelot_number}${track.key.camelot_letter}`),
      isrc: track.isrc,
      duration: track.length_ms / 1000,
      releasedate: new Date(track.publish_date)
    }
  }
}
