# Dracula Flow Generator

This is an ES Module conversion of the [dracula flow generator](https://bonnicula.neocities.org/draculaflow) by [Bonnicula Tepes](https://bonnicula.neocities.org/).

## Usage

```js
import dracula_flow from 'https://sugoidogo.github.io/dracula_flow/dracula_flow.mjs'
// use any positive interger to generate more lines of dracula flow at once
let generated_text=await dracula_flow(1) 
```

The data used to generate dracula flow is in [gen_data.json](gen_data.json).
You can fork this repository to modify the json yourself,
or you can use the getter/setter functions `get_gen_data` and `set_gen_data`.