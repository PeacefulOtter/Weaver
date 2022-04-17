

export type TrackID = string;

export interface TrackModel {
    added_at: string;
    name: string;
    id: TrackID;
    image: string
    artists: string[];
    album: string;
    duration_ms: number;
}

export interface CurrentTrack extends TrackModel {
    is_playing: boolean;
    progress_ms: number
}