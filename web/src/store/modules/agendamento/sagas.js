import {all,takeLatest, call, put} from 'redux-saga/effects';
import api from '../../../services/api';
import consts from '../../../consts';
import {updateAgendamento} from './actions';
import types from './types';
import { updateAgendamento } from './actions';

export function* filterAgendamento({start, end}) {
    try{
        const {data: res} = yield call(api.post, '/agendamento/filter', {
            salaoId: consts.salaoId,
            periodo:{
                start,
                end,
            }
        });
        if(res.error) {
            alert(res.message);
        } return false;
        yield put(updateAgendamento(res.agendamentos));

    }catch(err) {
        alert('Erro ao buscar agendamento');
    }
};

export default all([takeLatest( types.FILTER_AGENDAMENTOS, filterAgendamento )]);
