import './App.scss'
import Osc1 from './components/Osc1';
import Filter from './components/Filter';
// import Context from './components/Context';
import Keyboard from './components/Keyboard';
import ADSR from './components/ADSR';
import LogarithmicRange, { LogValues } from './components/logarithmic-inputs/LogarithmicRange';
import LogarithmicSlider, { SliderChangeValues } from './components/logarithmic-inputs/LogarithmicSlider';
import LogarithmicKnob from './components/logarithmic-inputs/LogarithmicKnob';
function App() {
  const handleChange = (newValues: LogValues) => {
    console.log(newValues)
  }
  const handleSliderChange = (newValues: SliderChangeValues) => {
    console.log(newValues)
  }

  return (
    <>
      <h1>Oscillator</h1>
      {/* <Context /> */}
      <div className="sliders">
        <LogarithmicRange onChange={handleChange} />
        <LogarithmicSlider onChange={handleSliderChange} />
        <LogarithmicKnob />
      </div>
      <div className="controls">
        <Osc1 />
        <ADSR />
        <Filter />
      </div>
      <Keyboard />
    </>
  )
}

export default App
