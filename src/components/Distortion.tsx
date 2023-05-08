import { ChangeEvent, MouseEvent, useContext } from 'react'
import { CTX } from '../Store';

const Distortion = () => {
    const { appState, updateState } = useContext(CTX);
    const { distortion } = appState;
    const { oversample, curve } = distortion;

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;
        updateState({ type: 'CHANGE_DISTORTION_CURVE', payload: { value: makeDistortionCurve(parseFloat(value)) } })
    };


    const changeOversample = (e: MouseEvent<HTMLButtonElement>) => {
        let { id } = e.target as HTMLElement;
        updateState({ type: 'CHANGE_DISTORTION_OVERSAMPLE', payload: { value: id as OverSampleType } })
    }
    return (
        <div className="control">
            <h2>Distortion</h2>
            <div className="param">
                <h3>curve</h3>
                {/* <input value={curve} type="range" onChange={change} min={1} max={100} step={0.01} /> */}
                <input type="range" onChange={change} min={1} max={1000} step={0.01} />
            </div>
            <div className="param">
                <h3>Oversample</h3>
                <button onClick={changeOversample} id="none" className={`${oversample === "none" && "active"}`}>none</button>
                <button onClick={changeOversample} id="2x" className={`${oversample === "2x" && "active"}`}>2x</button>
                <button onClick={changeOversample} id="4x" className={`${oversample === "4x" && "active"}`}>4x</button>
            </div>
        </div>
    )
}

export default Distortion


// function makeDistortionCurve(amount: number) {
//     const n_samples = 44100;
//     const curve = new Float32Array(n_samples);
//     const deg = Math.PI / 180;

//     for (let i = 0; i < n_samples; i++) {

//         // parts of frequency curve? time domain to frequency domain?
//         const x = (i * 2) / n_samples - 1;

//         curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
//     }
//     console.log('curve: ', curve)
//     return curve;
// }



function makeDistortionCurve(amount: number) {
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < n_samples; i++) {

        // parts of frequency curve? time domain to frequency domain?
        const x = (i * 2) / n_samples - 1;

        // unmodified value
        let value = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
        const rand = Math.random()

        if (rand < 0.9) {
            value += rand
            value = Math.min(value, .1)
        }

        curve[i] = value
    }
    console.log('curve: ', curve.filter(element => element > 1))
    return curve;
}
