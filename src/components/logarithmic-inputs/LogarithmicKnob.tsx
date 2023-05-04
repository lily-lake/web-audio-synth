import { Component } from 'react'
import { Knob } from 'react-rotary-knob'

class LogarithmicKnob extends Component {

    state = {
        value: 50
    }

    changeValue(val: number) {
        this.setState({ value: val })
    }
    render() {
        return <Knob defaultValue={0} min={0} max={100} onChange={this.changeValue.bind(this)} value={this.state.value} />
    }
}

export default LogarithmicKnob