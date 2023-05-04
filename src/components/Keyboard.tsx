import { useContext, useEffect } from 'react'
import { CTX } from '../Store'
// import * as QwertyHancock from 'qwerty-hancock';
// import * as QwertyHancock from '../qwerty-hancock/dist/qwerty-hancock';
import { Hancock } from '../qwerty-hancock/src/qwerty-hancock.js';
console.log("QwertyHancock: ", Hancock)
// console.log("QwertyHancock: ", QwertyHancock.exports)
// import { QwertyHancock } from 'qwerty-hancock';


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
        const keyboard = new Hancock()
        keyboard.initQwertyHancock({
            // const keyboard: QwertyHancock = QwertyHancock({
            // const keyboard = new QwertyHancock({
            id: "keyboard",
            width: "450",
            height: "200",
            octaves: 2,
            startNote: "C4",
            whiteKeyColour: 'rgb(28, 198, 186)',
            blackKeyColour: 'rgb(10, 70, 67)',
            activeColour: 'rgb(166, 49, 172)',
            borderColour: 'white',
        });
        console.log(window)
        console.log("keyboard: ", keyboard)
        keyboard.keyDown = (note: string, frequency: number) => {
            updateState({ type: "MAKE_OSC", payload: { note, frequency } })
        };
        keyboard.keyUp = (note: string, frequency: number) => {
            updateState({ type: "KILL_OSC", payload: { note, frequency } })
        }
    }, [])
    return (
        <div className="keyboard-container"><div id="keyboard"></div></div>
    )
}

export default Keyboard