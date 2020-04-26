import { combineReducers } from 'redux'
import productosReducer from './productosReducer'
import alertaReducer from './alertaReducer'
//el store solo puede manejar un reducer y combine reducer permite unir multiples reducer en 1.


export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer
})