function loader(source) {
  const str = 'document.body.appendChild(script);'
  if (source.includes(str)) {
    return source.replace(str, 'document.querySelector(attributes.ele).appendChild(script);')
  }

  return source
}

module.exports = loader
