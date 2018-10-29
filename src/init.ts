import { init } from './main'
const canvasId = 'canvas'
import('./Main.elm').then(({ Elm }) => Elm.Main.init({
  node: document.getElementById('app'),
  flags: {
    canvasId
  }
})
).then(_ => init(canvasId))
