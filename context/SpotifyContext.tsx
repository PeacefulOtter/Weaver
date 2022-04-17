
import axios from "axios";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { get } from "../assets/requests";
import { CurrentTrack, TrackID, TrackModel } from "../models/models";

interface ContextProps {
	isPlaying: boolean;
	setIsPlaying: Dispatch<SetStateAction<boolean>>;

	playlists: any[];

	currentTrack: CurrentTrack | undefined;
	playTrack: (track: TrackModel) => () => void;

	/** QUEUE **/
	queue: TrackID[];
	setQueue: Dispatch<SetStateAction<TrackID[]>>
	popQueue: () => void;
	pushQueue: (id: TrackID) => void
}

const SpotifyContext = createContext({} as ContextProps);

export const SpotifyProvider = ({ children }: any) => {

	const [isPlaying, setIsPlaying] = useState<boolean>(false)
  	const [playlists, setPlaylists] = useState<any[]>([]);
	const [currentTrack, setCurrentTrack] = useState<CurrentTrack>()
	const [queue, setQueue] = useState<TrackID[]>([])


	const playTrack = (track: TrackModel) => () => {
		get('/api/play', { id: track.id }, (data: any) => {
			setCurrentTrack( { ...track, is_playing: true, progress_ms: 0 } )
			setIsPlaying(true)
		})
	}

	const popQueue = () => {
		const temp = [...queue]
		temp.shift()
		setQueue(temp)
	}

	const pushQueue = (id: TrackID) => {
		setQueue([...queue, id])
	}

	useEffect( () => {
		console.log('fetching playlists and current track');

		get('/api/playlists', {}, (data: any) => {
			console.log(data);
			setPlaylists(data.items)
		})

		get('/api/currently-playing', {}, (data: any) => {
			console.log(data);
			const t = data.track
			const { is_playing, progress_ms } = t;
			const { name, id, duration_ms, album, artists } = t.item
			const image = album.images[Math.min(1, album.images.length - 1)].url
            const _artists = artists.map( artist => artist.name )
			const cur: CurrentTrack = {
				added_at: undefined,
				name, id, image, duration_ms,
				album: album.name, artists: _artists,
                is_playing, progress_ms 
			}
			setCurrentTrack(cur)
		})
	}, [])

	return (
		<SpotifyContext.Provider
			value={{
				isPlaying,
				setIsPlaying,
				playlists,
				currentTrack,
				playTrack,
				queue,
				setQueue,
				popQueue,
				pushQueue,
			}}
		>
			{children}
		</SpotifyContext.Provider>
	);
};

export const useSpotify = () => useContext(SpotifyContext);