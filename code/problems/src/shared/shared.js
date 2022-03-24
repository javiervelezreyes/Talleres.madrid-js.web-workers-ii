import Global from './share.global.js'
import Local  from './share.local.js'


let Shared = (
   self.window && Global ||
  !self.window && Local
)

export default Shared