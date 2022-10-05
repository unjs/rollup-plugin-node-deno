import { resolve } from 'node:path'
import { builtinModules } from 'node:module'
import type { Plugin } from 'rollup'
import inject from '@rollup/plugin-inject'

const pluginDir = __dirname

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
          id: resolve(pluginDir, 'deno/empty.js')
        }
      }
    }
  } as Plugin
}

function resolveDeno (id: string) {
  if (denoNodeStd.includes(id)) {
    return `https://deno.land/std/node/${id}.ts`
  }
  if (denoExtras.includes(id)) {
    return resolve(pluginDir, `extras/${id}.t`)
  }
}

// https://deno.land/std/node
const denoNodeStd = [
  'assert',
  'buffer',
  'cli',
  'crypto',
  'events',
  'fs',
  'module',
  'os',
  'path',
  'process',
  'querystring',
  'stream',
  'timers',
  'tty',
  'url',
  'util'
]

// See ./deno/
const denoExtras = [
  'child_process',
  'readline',
  'global',
  'node-fetch',
  'chalk'
]
