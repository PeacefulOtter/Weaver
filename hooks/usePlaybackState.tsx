import { useState } from "react"



const usePlaybackState = () => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [shuffle, setShuffle] = useState<boolean>(false)
	const [repeat, setRepeat] = useState<boolean>(false)


    return { isPlaying, shuffle, repeat, setIsPlaying, setShuffle, setRepeat }
}

export default usePlaybackState