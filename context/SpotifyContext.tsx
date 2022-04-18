
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { play, next, prev, resume, pause, currentlyPlaying, getPlaylists } from "../assets/queries";
import useProgress from "../hooks/useProgress";
import { CurrentTrack, Playlist, TrackID, TrackModel } from "../models/models";

interface ContextProps {
	isPlaying: boolean;
	setIsPlaying: Dispatch<SetStateAction<boolean>>;

	playlists: any[];

	position_ms: number;
	setPosition: Dispatch<SetStateAction<number>>;
	currentTrack: CurrentTrack | undefined;
	playTrack: (track: TrackModel) => () => void;
	pauseTrack: () => void;
	resumeTrack: () => void;

	/** QUEUE **/
	queue: TrackModel[];
	setQueue: Dispatch<SetStateAction<TrackModel[]>>
	prevTrack: () => void;
	nextTrack: () => void;
	pushQueue: (track: TrackModel) => void
}

const SpotifyContext = createContext({} as ContextProps);

export const SpotifyProvider = ({ children }: any) => {

	const [isPlaying, setIsPlaying] = useState<boolean>(false)
  	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [currentTrack, setCurrentTrack] = useState<CurrentTrack>()
	const [queue, setQueue] = useState<TrackModel[]>([])

	const resumeTrack = () => resume( currentTrack.id, position_ms, () => setIsPlaying(true) )
	const pauseTrack = () => pause( () => setIsPlaying(false) )
	const prevTrack = () => prev( getCurrentlyPlaying )
	const nextTrack = () => next( getCurrentlyPlaying )

	const [position_ms, setPosition] = useProgress(currentTrack, isPlaying, nextTrack )

	const playTrack = (track: TrackModel) => () => {
		play( track, (data: any) => {
			setCurrentTrack( { ...track, position_ms: 0 } )
			setIsPlaying(true)
		})
	}

	const pushQueue = (track: TrackModel) => {
		setQueue( q => [...q, track] )
	}

	const getCurrentlyPlaying = () => {
		currentlyPlaying( (cur: CurrentTrack, isPlaying: boolean) => {
			console.log(cur);
			setCurrentTrack(cur)
			setIsPlaying(isPlaying)
		} )
	}

	useEffect( () => {
		getPlaylists(setPlaylists)
		getCurrentlyPlaying()
	}, [])

	return (
		<SpotifyContext.Provider
			value={{
				isPlaying,
				setIsPlaying,
				playlists,
				position_ms,
				setPosition,
				currentTrack,
				playTrack,
				pauseTrack,
				resumeTrack,
				queue,
				setQueue,
				prevTrack,
				nextTrack,
				pushQueue,
			}}
		>
			{children}
		</SpotifyContext.Provider>
	);
};

export const useSpotify = () => useContext(SpotifyContext);