import React, { useContext, useEffect } from 'react'
import { CTX } from '../store'
// import * as QwertyHancock from '../qwerty-hancock/dist/qwerty-hancock.js';
import * as QwertyHancock from 'qwerty-hancock';
console.log("QwertyHancock: ", QwertyHancock)
// import { QwertyHancock } from 'qwerty-hancock';
// import QwertyHancock from 'qwerty-hancock';
// console.log("QwertyHancock: ", QwertyHancock.QwertyHancock)
// let user_settings;
// const keyboard = new QwertyHancock({
//     id: "keyboard",
//     width: "450",
//     height: "700",
//     octaves: 2,
//     startNote: "C4",
// });

const Keyboard = () => {
    const [appState, updateState] = useContext(CTX);

    useEffect(() => {
        const keyboard = window.QwertyHancock({
            // const keyboard = new QwertyHancock.QwertyHancock({
            id: "keyboard",
            width: "450",
            height: "700",
            octaves: 2,
            startNote: "C4",
        });
    }, [])
    return (
        <div><div id="keyboard"></div></div>
    )
}

export default Keyboard