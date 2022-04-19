
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { play } from "../assets/queries"
import { CurrentTrack, Track } from "../models/models"


const range = (len: number) => {
    return Array(len).fill(1).map((x, y) => x + y - 1)
} 

const useQueue = ( setIsPlaying: Dispatch<SetStateAction<boolean>>, shuffle: boolean, repeat: boolean ) => {
    const [queueTracks, setQueueTracks] = useState<Track[]>()
    const [queue, setQueue] = useState<number[]>([])
	const [pointer, setPointer] = useState<number>(0)
	const [currentTrack, setCurrentTrack] = useState<CurrentTrack>()

    const playNewTrack = (tracks: Track[], p: number) => {
        const _p = queue.length > 0 ? queue[p] : p
        console.log(tracks, _p, p);
        const track = tracks[_p]
        console.log(track);
        play(track, () => {
            setIsPlaying(true)
            setCurrentTrack( { ...track, position_ms: 0 } )
            setPointer( p )
        })
    }

    const prevTrack = React.useCallback( () => {
        if ( queueTracks === undefined ) return;

        const _pointer = Math.max( 0, pointer - 1 )
		playNewTrack(queueTracks, _pointer)

	}, [queueTracks, pointer, repeat, shuffle] )

	const nextTrack = React.useCallback( () => {
        if ( queueTracks === undefined ) return;

        const _pointer = newTrackIndex()
        playNewTrack(queueTracks, _pointer)	

    }, [queueTracks, pointer, repeat, shuffle])


    const pushQueue = (index: number) => {
		setQueue( q => [...q, index] )
	}

    const newTrackIndex = () => repeat 
        ? pointer
        : queue.length > 0 
            ? pointer + 1
            : shuffle
                ? Math.floor(Math.random() * queueTracks.length) 
                : Math.min( queueTracks.length - 1, pointer + 1 )

    const movePointer = (tracks: Track[], i: number) => {
        // reset queue
        setQueue([])
        // Update queueTracks
        setQueueTracks(tracks)
        // Play the track
        playNewTrack(tracks, i)
    }

    return { queue, queueTracks, setQueue, movePointer, currentTrack, prevTrack, nextTrack, pushQueue }
}

export default useQueue