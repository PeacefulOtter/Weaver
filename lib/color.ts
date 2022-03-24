

import Vibrant from 'node-vibrant'

const vibrant = {
    getColor: async (image: string) => {
        const palette = await Vibrant.from(image).getPalette()
        return palette['DarkMuted'].getHex()
    }
}

export default vibrant;