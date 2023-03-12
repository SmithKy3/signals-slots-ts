# signals-slots-ts

A simple example of the signals/slots observability pattern, written in TypeScript.

# Usage

- Both CommonJS and ESM entry files are provided.

```
// CommonJS
const { createSignal } = require('signals-slots-ts');

const myComplexData = myComplextDataFactory();
const mySignal = createSignal(myComplexData);

// ESM
import { createSignal } from 'signals-slots-ts';

const myComplexData = myComplextDataFactory();
const mySignal = createSignal(myComplexData);
```

- Connecting disconnecting callbacks

```
import { createSignal } from 'signals-slots-ts';

const myComplexData = myComplextDataFactory();
const mySignal = createSignal(myComplexData);

const onMyComplexDataChange = (newComplexData) => {
    console.log(newComplexData);
};
mySingal.connect(onMyComplexDataChange);
mySignal.value.someNumberFieldOfMyComplexData += 1;
// Updated data logged to console;
```
