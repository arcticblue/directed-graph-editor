const throttle = (fn, wait = 50) => {
  let time = Date.now()
  return (event) => {
    if (time + wait - Date.now() < 0) {
      fn(event)
      time = Date.now()
    }
  }
}

export { throttle }
