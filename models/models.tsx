

export type TrackID = string;

export interface Owner {
    display_name: string;
    id: string;
    type: string;
}

export interface Playlist {
    id: string;
    name: string;
    owner: Owner;
    totalTracks: number;
    image: string;
    color: string;
}

export interface Track {
    added_at: string;
    name: string;
    id: TrackID;
    image: string
    artists: string[];
    album: string;
    duration_ms: number;
}

export interface CurrentTrack extends Track {
    position_ms: number
}

export interface PlaybackState {
    is_playing: boolean;
    repeat_state: boolean;
    shuffle_state: boolean;
}