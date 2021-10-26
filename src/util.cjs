function format(from, loadedAt, count) {
  return `from: ${from} loadedAt: ${loadedAt.toISOString()} count: ${count}`
}

exports.format = format
