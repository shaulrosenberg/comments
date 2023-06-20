import { createStore, combineReducers } from 'redux'
import { commentReducer } from './comment.reducer.js'

const rootReducer = combineReducers({
    commentModule: commentReducer
    // add more reducers in the future
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



