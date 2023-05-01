
const Osc1 = (props: { changeFreq: (e: any) => void, freq: number }) => {
    const { changeFreq } = props;
    return (
        <div>
            <input type="range" max="5000" id="frequency" onChange={changeFreq} />
        </div>
    )
}

export default Osc1