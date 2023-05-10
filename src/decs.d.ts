declare module "./qwerty-hancock"
declare module "qwerty-hancock"
declare module './qwerty-hancock/dist/qwerty-hancock.js'
declare module "react-rotary-knob"

type AudioKeysOptions = {
    polyphony: number
    rows: 1 | 2
    priority: 'last' | 'first' | 'highest' | 'lowest'
    rootNote: number
    octaveControls: boolean
    velocityControls: boolean
  }
  
  interface AudioKeysNoteData {
    velocity: number // the velocity, between 0 and 127
    keyCode: number // the keyboard key pressed or released
    note: number
    frequency: number
    isActive: boolean
  }
  
  declare module 'audiokeys' {
    export default class AudioKeysDefault {
      constructor(options: Partial<AudioKeysOptions>)
      up(callback: (note: AudioKeysNoteData) => void): void
      down(callback: (note: AudioKeysNoteData) => void): void
      clear: () => void
    }
    export class AudioKeys extends AudioKeysDefault {}
  }