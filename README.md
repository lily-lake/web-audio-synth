# break-sequencer

In order to use this, you need to link the local qwerty-hancock module. There's some weirdness going on with the actual repo which results in the window object being undefined. This fix is extra hacky.

```[bash]
cd qwerty-hancock && npm link
cd ..
npm link qwerty-hancock
```

<https://github.com/Tonejs/Midi>
