import { useContext, useEffect } from 'react'
import { CTX } from '../Store.js'
import AudioKeys from 'audiokeys'

export type QwertyHancockInput = {
    id?: string,
    width?: string,
    height?: string,
    octaves?: number,
    startNote?: string,
    whiteKeyColour?: string,
    blackKeyColour?: string,
    activeColour?: string,
    borderColour?: string,
}

export interface QwertyHancock {
    version: string;

    keyDown: (note: string, frequency: number) => void;

    keyUp: (note: string, frequency: number) => void;

    setKeyOctave: (octave: number) => void;

    getKeyOctave: () => void;
    keyOctaveUp: () => void;
    keyOctaveDown: () => void;

    getKeyMap: () => void;
    setKeyMap: () => void;
}

type QwertyHancockFunction = (input: QwertyHancockInput) => QwertyHancock;

declare global {
    interface Window {
        QwertyHancock: QwertyHancockFunction;
    }
}



const Keyboard = () => {
    const { updateState } = useContext(CTX);

    useEffect(() => {
        // const keyboard = window.QwertyHancock({
        const keyboard = new AudioKeys({})

        keyboard.down((note: AudioKeysNoteData) => {
            updateState({ type: "MAKE_OSC", payload: { frequency: note.frequency } })
        });
        keyboard.up((note: AudioKeysNoteData) => {
            updateState({ type: "KILL_OSC", payload: { frequency: note.frequency } })
        })
    }, [])
    return (
        <div className="keyboard-container"><div id="keyboard"></div></div>
    )
}

export default Keyboard