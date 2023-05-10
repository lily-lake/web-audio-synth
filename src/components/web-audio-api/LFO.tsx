
type Envelope = {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
}

export default class LFO {
    actx: AudioContext;
    osc: OscillatorNode;
    gain: GainNode;
    easing: number;
    envelope: Envelope;
    constructor(actx: AudioContext, type: OscillatorType, gain: GainNode, frequency: number, detune: number, envelope: Envelope | null, connection: AudioNode) {
        this.actx = actx;
        this.envelope = envelope || {
            attack: 0.005,
            decay: 0.1,
            sustain: 0.6,
            release: 0.1
        };
        this.gain = gain;
        this.osc = actx.createOscillator();
        this.osc.frequency.value = frequency;
        this.osc.detune.value = detune;
        this.osc.type = type;
        // this.gateGain = actx.createGain();
        // this.gateGain.gain.value = 0;
        // this.osc.connect(this.gateGain);
        this.osc.connect(this.gain);
        this.osc.connect(connection);
        // this.gateGain.connect(connection);
        this.easing = 0.005;
        this.osc.start();
        this.start();
    }
    start() {
        // let { currentTime } = this.actx;
        // this.gateGain.gain.cancelScheduledValues(currentTime);
        // this.gateGain.gain.setValueAtTime(0, currentTime + this.easing);
        // this.gateGain.gain.linearRampToValueAtTime(1, currentTime + this.envelope.attack + this.easing);
        // this.gateGain.gain.linearRampToValueAtTime(this.envelope.sustain, currentTime + this.envelope.attack + this.envelope.decay + this.easing)
    }
    stop() {
        this.osc.disconnect();
        // let { currentTime } = this.actx;
        // this.gateGain.gain.cancelScheduledValues(currentTime);
        // const releaseTime = (this.envelope.release + this.easing)
        // // multiplier to approximate linear behaviour
        // // https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/setTargetAtTime
        // const releaseDecayTime = releaseTime / 4
        // this.gateGain.gain.setTargetAtTime(0, currentTime, releaseDecayTime);
        // this.gateGain.gain.setValueAtTime(0, currentTime + releaseTime);

        // setTimeout(() => {
        //     this.osc.disconnect();
        //     // }, 3000);
        // }, 10000);
    }
}