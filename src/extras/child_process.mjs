import { exec as _exec } from 'https://deno.land/x/exec/mod.ts'

// https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
export function exec (cmd, _arg1, _arg2) {
  const callback = typeof _arg1 === 'function' ? _arg1 : _arg2
  _exec(cmd).then((r) => {
    let err
    if (!r.status.success) {
      err = new Error(r.output)
      Error.captureStackTrace(err)
    }
    callback(err, r.output, r.output)
  })
  return {}
}

// https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options
export function execSync (cmd) {
  let stdout, err

  exec(cmd, (_err, _stdout) => {
    err = _err
    stdout = _stdout
  })

  // eslint-disable-next-line no-unmodified-loop-condition
  while (err !== undefined && stdout !== undefined) {

  }
}
