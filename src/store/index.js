import { createStore } from 'vuex'
import AutoPianoModule from './modules/autopiano'

const store = createStore({
  modules: {
    AutoPianoModule
  }
})

export default store