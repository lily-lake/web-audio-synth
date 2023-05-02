import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Store from './store'
// import QwertyHancock from 'qwerty-hancock';

// const keyboard = new QwertyHancock({
//   id: "keyboard",
//   width: "450",
//   height: "700",
//   octaves: 2,
//   startNote: "C4",
// });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
)
