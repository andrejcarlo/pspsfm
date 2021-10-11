export interface Song {
    title: string,
    artist: string,
  }
  
export interface RadioStation {
    song : Song,
    isPlaying: boolean,
    url: string,
}

export interface AzuraData {
    cache: string,
    is_online: boolean
    listeners: Listeners
    live: Live,
    now_playing: NowPlaying,
    playing_next: any[],
    song_history: any[],
    station: Station,
}

export interface Listeners {
    total?: number,
    unique?: number,
    current?: number,
}

export interface Live {
    is_live?: boolean,
    streamer_name? : string,
    broadcast_start? : string | null,
}

export interface Song {
    album: string,
    art: string,
    artist: string,
    custom_fields: any[],
    genre: string,
    id: string,
    lyrics: string,
    text: string,
    title: string,
}

export interface NowPlaying {
    duration?: number,
    elapsed?: number,
    is_request?: boolean,
    played_at?: number,
    playlist?: string,
    remaining?: number,
    sh_id?: number,
    song?: Song,
    streamer?: string,
}

export interface Station {
    backend: string
    description: string
    frontend: string,
    id: number
    is_public: boolean
    listen_url: string,
    mounts: any[]
    name: string
    playlist_m3u_url: string
    playlist_pls_url: string
    public_player_url: string
    remotes: any[]
    shortcode: string
    url: string
}