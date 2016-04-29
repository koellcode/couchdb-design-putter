'use strict'

module.exports = {
  designDocReducer: (prev, current) => {
    const designName = `_design/${current.design}`
    prev[designName] || (prev[designName] = {views: {}})

    const views = prev[designName].views
    views[current.view] = {}

    if (current.map) views[current.view].map = current.map.toString()
    if (current.reduce) views[current.view].reduce = current.reduce.toString()

    return prev
  }
}
