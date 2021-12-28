function format(from, loadedAt, count) {
  return `${from}: loadedAt: ${loadedAt.toISOString()} count: ${count}`
}

exports.format = format
