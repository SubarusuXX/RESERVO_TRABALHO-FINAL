import {all} from 'redux-saga/effects';
import agendamento from './modules/sagas';
import clientes from './clientes/sagaz';



export default function* rootSaga() {
    return yield all([agendamento]);
} ;