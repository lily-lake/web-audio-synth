
const Osc1 = (props: { changeFreq: (e: any) => void, freq: number }) => {
    const { changeFreq, freq } = props;
    return (
        <div>
            <input type="range" max="5000" value={freq} id="frequency" onChange={changeFreq} />
        </div>
    )
}

export default Osc1