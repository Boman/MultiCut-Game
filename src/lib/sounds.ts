import {get} from 'svelte/store'

import tap from '$lib/assets/sounds/tap.wav'
import plopp from '$lib/assets/sounds/plopp.mp3'
import finish from '$lib/assets/sounds/finish.mp3'
import {soundEffects} from '$lib/store'

function load(sound) {
    // The server doesn't have an Audio object
    if (typeof Audio != 'undefined') {
        class CustomAudio extends Audio {
            play() {
                if (get(soundEffects)) return super.play()
            }
        }

        return new CustomAudio(sound)
    }
}

export const tapSound = load(tap)
export const ploppSound = load(plopp)
export const finishSound = load(finish)
