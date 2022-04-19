
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { play, next, prev, resume, pause, getPlaylists, getPbState } from "../assets/queries";
import usePlaybackState from "../hooks/usePlaybackState";
import useProgress from "../hooks/useProgress";
import useQueue from "../hooks/useQueue";
import { CurrentTrack, Playlist, Track } from "../models/models";

interface ContextProps {
	isPlaying: boolean;
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	shuffle: boolean;
	setShuffle: Dispatch<SetStateAction<boolean>>
	repeat: boolean;
	setRepeat: Dispatch<SetStateAction<boolean>>

	playlists: any[];
	curTracks: Track[];
	setCurTracks: Dispatch<SetStateAction<Track[]>>
	queueTracks: Track[];

	position_ms: number;
	setPosition: Dispatch<SetStateAction<number>>;
	currentTrack: CurrentTrack | undefined;
	playTrack: (i: number) => () => void;
	pauseTrack: () => void;
	resumeTrack: () => void;

	/** QUEUE **/
	queue: number[];
	setQueue: Dispatch<SetStateAction<number[]>>
	prevTrack: () => void;
	nextTrack: () => void;
	pushQueue: (index: number) => void
}

const SpotifyContext = createContext({} as ContextProps);

export const SpotifyProvider = ({ children }: any) => {
	
  	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [curTracks, setCurTracks] = useState<Track[]>([])
	
	const { 
		isPlaying, shuffle, repeat, 
		setIsPlaying, setShuffle, setRepeat 
	} = usePlaybackState()

	const { 
		queue, queueTracks, setQueue, currentTrack, 
		movePointer, prevTrack, nextTrack, pushQueue 
	} = useQueue(setIsPlaying, shuffle, repeat)


	const resumeTrack = () => resume( currentTrack.id, position_ms, () => setIsPlaying(true) )
	const pauseTrack = () => pause( () => setIsPlaying(false) )

	const [position_ms, setPosition] = useProgress(currentTrack, isPlaying, nextTrack )

	const playTrack = (i: number) => () => movePointer(curTracks, i)

	const getPlaybackState = () => {
		// getPbState( (cur: CurrentTrack, state: PlaybackState) => {
		// 	console.log(cur);
		// 	setCurrentTrack(cur)
		// 	setPbState(state)
		// } )
	}

	useEffect( () => {
		getPlaylists(setPlaylists)
		getPlaybackState()
	}, [])

	return (
		<SpotifyContext.Provider
			value={{
				isPlaying,
				setIsPlaying,
				shuffle,
				setShuffle,
				repeat,
				setRepeat,

				playlists,

				curTracks,
				setCurTracks,
				queueTracks,
				
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