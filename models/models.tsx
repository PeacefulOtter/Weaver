

export type TrackID = string;

export interface TrackModel {
    playTrack: (id: string) => () => void;
    added_at: string;
    name: string;
    id: string;
    image: string
    artists: string[];
    album: string;
    duration: number;
}