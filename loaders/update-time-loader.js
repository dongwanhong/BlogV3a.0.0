const chalk = require('chalk')
const execSync = require('child_process').execSync
const platform = process.platform
// eslint-disable-next-line no-console
const log = console.log

const getBirthTime = filename => {
  const onError = err => {
    log(chalk.yellow(`${filename}：${err}`))
  }
  const date = new Date()
  let commitIds = []
  let commitId = ''
  let createTime = `${date.getFullYear()}-${date
    .getMonth()
    .toString()
    .padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`
  if (platform === 'win32') {
    try {
      commitIds = execSync(`git log --oneline -- ${filename}`)
        .toString()
        .split('\n')
    } catch (err) {
      onError(err)
    }
  } else {
    try {
      commitId = execSync(`git log --oneline -- ${filename} | tail -n 1`).toString()
    } catch (err) {
      onError(err)
    }
  }

  if (commitIds.length) {
    commitId = commitIds.slice(-2, -1)[0]
  }

  try {
    createTime = execSync(`git log -1 --date=short --format="%cd" ${commitId}`)
  } catch (err) {
    onError(err)
  }

  return createTime.toString().trim()
}

function loader(source) {
  if (this.resourcePath.includes('src/router/modules/article')) {
    return source.replace(/\s(component:.+\)\),)\n/g, ($0, $1) => {
      const filename = `src/views${$1.match(/articles.+'/g)[0].slice(0, -1)}.tsx`
      const birthTime = getBirthTime(filename)
      return ` ${$1}\n    birthTime:'${birthTime}',\n`
    })
  }
  return source
}

module.exports = loader
