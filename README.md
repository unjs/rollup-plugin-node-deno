# rollup-plugin-deno2

Convert NodeJS to Deno compatible code with rollup.

- Converts builtin imports to deno node compat
- Injects polyfills for global built-ins like `timers` by usage

**🧪 Note:** This is an experimental plugin.

## Install

```sh
# npm
npm install rollup-plugin-node-deno

# yarn
yarn add rollup-plugin-node-deno2
```

## Usage

Example `rollup.config` file:

**Note:** Config below needs installing `@rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-json`.

```js
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import deno from 'rollup-plugin-node-deno'

export default {
  input: 'src/index.mjs',
  output: {
    file: 'dist/index.mjs',
    format: 'esm'
  },
  plugins: [
    deno(),
    resolve(),
    json(),
    commonjs()
  ]
}
```

## Support

Deno Node compatibility (https://deno.land/std@0.90.0/node/README.md):

- `assert`
- `buffer`
- `cli`
- `crypto`
- `events`
- `fs`
- `module`
- `os`
- `path`
- `process`
- `querystring`
- `stream`
- `timers
- `tty`
- `url`
- `util`

Extras: (see [./lib/extras](./lib/extras))

- `child_process` (basic `exec` from [deno.land/x/exec](https://deno.land/x/exec))
- `readline` (exports: `createInterface` without implementation)
- `node-fetch` (using native `fetch`)
- `chalk` (using [deno.land/x/chalk_deno](https://deno.land/x/chalk_deno))

Globals:

- `process`
- `global` (~> `globalThis`)
- `Buffer`
- Timers (`setTimeout, clearTimeout, setInterval, clearInterval, setImmediate, clearImmediate`)

## Related

- https://github.com/egoist/rollup-plugin-deno

## License

MIT
