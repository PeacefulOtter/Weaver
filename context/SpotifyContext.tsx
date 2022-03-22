
import axios from "axios";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { TrackID, TrackModel } from "../models/models";

interface ContextProps {
	isPlaying: boolean;
	setIsPlaying: Dispatch<SetStateAction<boolean>>;

	playlists: any[];
	fetchPlaylists: () => Promise<void>;

	currentTrack: TrackModel | undefined;
	playTrack: (track: TrackModel) => () => void;

	/** QUEUE **/
	queue: TrackID[];
	setQueue: Dispatch<SetStateAction<TrackID[]>>
	popQueue: () => void;
	pushQueue: (id: TrackID) => void
}

const SpotifyContext = createContext({} as ContextProps);

const get = async (path: string, cb?: (data: any) => void, options?: object) => {
	console.log(path, options);
	try {
		const resp = await axios.get(path, { params: options } );
		if ( cb ) cb(resp.data);
	} catch (err) {
		console.log(err);
	}
}

export const SpotifyProvider = ({ children }: any) => {

	const [isPlaying, setIsPlaying] = useState<boolean>(false)
  	const [playlists, setPlaylists] = useState<any[]>([]);
	const [currentTrack, setCurrentTrack] = useState<TrackModel | undefined>(undefined)
	const [queue, setQueue] = useState<TrackID[]>([])

  	const fetchPlaylists = async () => {
		await get('/api/playlists', (data: any) => {
			console.log(data);
			setPlaylists(data.items)
		})
  	};

	const playTrack = (track: TrackModel) => () => {
		get('/api/play', (data: any) => {
			setCurrentTrack(track)
			setIsPlaying(true)
		}, { id: track.id } )
	}

	const popQueue = () => {
		const temp = [...queue]
		temp.shift()
		setQueue(temp)
	}

	const pushQueue = (id: TrackID) => {
		setQueue([...queue, id])
	}

	return (
		<SpotifyContext.Provider
			value={{
				isPlaying,
				setIsPlaying,
				playlists,
				fetchPlaylists,
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