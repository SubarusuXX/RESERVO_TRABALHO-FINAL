import {combineReducers} from 'redux';
import agendamento from './agendamento/reducer';
import cliente from './clientes/reducer';
export default combineReducers({
    agendamento,
    cliente,
});
