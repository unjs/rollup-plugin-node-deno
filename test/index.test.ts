import { rollup } from 'rollup'
import { describe, expect, it } from 'vitest'
import deno from '../src'

describe('plugin', () => {
  it('works', async () => {
    const buildRes = await rollup({
      input: require.resolve('./fixture/index'),
      output: {
        file: 'dist/index.mjs',
        format: 'esm'
      },
      plugins: [
        deno()
      ]
    })
    const { code } = (await buildRes.generate({})).output[0]
    expect(code).toMatch('import path from \'https://deno.land/std@0.160.0/node/path.ts\'')
  })
})
