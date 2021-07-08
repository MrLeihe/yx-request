module.exports = function mergeConfig(configPre, configNext) {
  return {
    ...configPre,
    ...configNext,
  }
}
