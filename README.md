# rollup-plugin-node-deno

Convert NodeJS to Deno compatible code with rollup.

- Converts builtin imports to deno node compat
- Injects polyfills for global built-ins like `timers` by usage

**🧪 Note:** This is an experimental plugin.

## Install

```sh
# npm
npm install rollup-plugin-node-deno

# yarn
yarn add rollup-plugin-node-deno
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

Deno Node compatibility (https://deno.land/std@0.160.0/node/README.md):

- `assert`
- `assert/strict` _partly_
- `async_hooks` _partly_
- `buffer`
- `child_process` _partly_
- `cluster` _partly_
- `console` _partly_
- `constants` _partly_
- `crypto` _partly_
- `dgram` _partly_
- `diagnostics_channel`
- `dns` _partly_
- `events`
- `fs` _partly_
- `fs/promises` _partly_
- `http` _partly_
- `http2`
- `https` _partly_
- `inspector` _partly_
- `module`
- `net`
- `os` _partly_
- `path`
- `path/posix`
- `path/win32`
- `perf_hooks`
- `process` _partly_
- `punycode`
- `querystring`
- `readline`
- `repl` _partly_
- `stream`
- `stream/promises`
- `stream/web` _partly_
- `string_decoder`
- `sys`
- `timers`
- `timers/promises`
- `tls`
- `trace_events`
- `tty` _partly_
- `url`
- `util` _partly_
- `util/types` _partly_
- `v8`
- `vm` _partly_
- `wasi`
- `webcrypto`
- `worker_threads`
- `zlib`

Extras: (see [./lib/extras](./lib/extras))

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
