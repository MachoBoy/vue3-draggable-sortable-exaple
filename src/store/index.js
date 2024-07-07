import { createStore } from 'vuex'
import columns from './modules/columns'

export default createStore({
    modules: {
        columns
    }
})
