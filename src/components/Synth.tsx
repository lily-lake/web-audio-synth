import React from 'react'
import * as Tone from 'tone'

const Synth = () => {
    const synth = new Tone.Synth().toDestination();
    return (
        <div>Synth
            <button onClick={() => synth.triggerAttack("C3", "8n")}>Play</button>
        </div>
    )
}

export default Synth