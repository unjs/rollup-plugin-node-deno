import { dirname, resolve } from 'node:path'
import { builtinModules } from 'node:module'
import { fileURLToPath } from 'node:url'

import inject from '@rollup/plugin-inject'

const pluginDir = dirname(fileURLToPath(import.meta.url))

export default function rollupPluginNodeDeno () {
  const injectPlugin = inject({
    modules: {
      process: 'process',
      global: 'global',
      Buffer: ['buffer', 'Buffer'],
      setTimeout: ['timers', 'setTimeout'],
      clearTimeout: ['timers', 'clearTimeout'],
      setInterval: ['timers', 'setInterval'],
      clearInterval: ['timers', 'clearInterval'],
      setImmediate: ['timers', 'setImmediate'],
      clearImmediate: ['timers', 'clearImmediate']
    }
  })

  return {
    ...injectPlugin /* adds transform hook */,
    name: 'rollup-plugin-node-deno',
    resolveId (id) {
      id = id.replace('node:', '')
      if (builtinModules.includes(id) || denoExtras.includes(id)) {
        const denoId = resolveDeno(id)
        if (denoId) {
          return {
            id: denoId,
            moduleSideEffects: false,
            external: denoId.startsWith('http')
          }
        }
        return {
          id: resolve(pluginDir, 'deno/empty.mjs')
        }
      }
    }
  } as import('rollup').Plugin
}

function resolveDeno (id: string) {
  if (denoNodeStd.includes(id)) {
    return `https://deno.land/std/node/${id}.ts`
  }
  if (denoExtras.includes(id)) {
    return resolve(pluginDir, `extras/${id}.mjs`)
  }
}

// https://deno.land/std/node
const denoNodeStd = [
  'assert',
  'assert/strict',
  'buffer',
  'console',
  'constants',
  'crypto',
  'child_process',
  'dns',
  'events',
  'fs',
  'fs/promises',
  'http',
  'module',
  'net',
  'os',
  'path',
  'perf_hooks',
  'process',
  'querystring',
  'readline',
  'stream',
  'string_decoder',
  'sys',
  'timers',
  'timers/promises',
  'tty',
  'url',
  'util',
  'worker_threads'
]

// See ./deno/
const denoExtras = [
  'global',
  'node-fetch',
  'chalk'
]
