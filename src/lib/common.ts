export function getImgUrl(name: String) {
  var images = require.context('../assets/', false, /\.png$/)
  return images(`./${name}`)
}