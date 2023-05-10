import { ChangeEvent, useState } from 'react'

type CompressorSettings = {
    attack: string;
    knee: string;
    ratio: string;
    release: string;
    threshold: string;
}

type CompressorSetting = "attack" | "knee" | "ratio" | "release" | "threshold"


const Compressor = (props: { compressor: DynamicsCompressorNode, audioContext: AudioContext }) => {
    const { compressor, audioContext } = props;
    const [params, setParams] = useState<CompressorSettings>({
        attack: compressor.attack.toString(),
        knee: compressor.knee.toString(),
        ratio: compressor.ratio.toString(),
        release: compressor.release.toString(),
        threshold: compressor.threshold.toString(),
    })
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        let { id, value } = e.target;
        // console.log("id, value: ", id, value)
        compressor[id as CompressorSetting].setValueAtTime(parseFloat(value), audioContext.currentTime);
        setParams({ ...params, [`${id}`]: parseFloat(value) })

    }


    return (
        <div className="control"><h2>Compressor</h2>
            <div className="param">
                <h3>attack</h3>
                <input type="range" id="attack" onChange={change} min="0.001" max="1" step="0.02" value={params.attack?.toString()} />

            </div>
            <div className="param">
                <h3>ratio</h3>
                <input type="range" id="ratio" onChange={change} max="20" min="1" step="0.1" value={params.ratio?.toString()} />
            </div>
            <div className="param">
                <h3>knee</h3>
                <input type="range" id="knee" onChange={change} min="0" max="40" step="0.01" value={params.knee?.toString()} />
            </div>
            <div className="param">
                <h3>release</h3>
                <input type="range" id="release" onChange={change} min="0.05" max="1" step="0.001" value={params.release?.toString()} />
            </div>
            <div className="param">
                <h3>threshold</h3>
                <input type="range" id="threshold" onChange={change} min="-100" max="0" step="0.5" value={params.threshold?.toString()} />
            </div>
        </div>)
}

export default Compressor