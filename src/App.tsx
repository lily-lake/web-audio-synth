import './App.scss'
import Osc1 from './components/Osc1';
import Filter from './components/Filter';
// import Context from './components/Context';
import Keyboard from './components/Keyboard';

function App() {


  return (
    <>
      <h1>Oscillator</h1>
      {/* <Context /> */}
      <Osc1 />
      <Filter />
      <Keyboard />
    </>
  )
}

export default App
