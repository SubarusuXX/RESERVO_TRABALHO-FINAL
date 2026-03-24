import { takeLatest, put,all, call, select, put} from 'redux-saga/effects';
import {updateCliente} from './actions';
import types from './types';
import api from '../../services/api';
import consts from '../../services/consts';
 
export function* allClientes(){
    const form = yield select(state => state.cliente);
    try{
         yield put(updateCliente({...form, filtering: true}));
        const {data: res } = yield call(api.get, '/clientes/salao/${consts.salaoId}');
        if( res.error){
            alert(error.message);
            return false;
        }
             yield put(updateCliente({...form, filtering: false}));
        
    }catch (error){
        alert(error.message);
             yield put(updateCliente({...form, filtering: false}));
    }
};

export function* filterClientes(){
    const {form, cliente} = yield select(state => state.cliente);
    try{
         yield put(updateCliente({...form, filtering: true}));
        const {data: res } = yield call(
            api.post, '/clientes/filter/',
            { filters: {
                email: cliente.email,
                status: 'A',
            }})

            yield put(updateCliente({...form, filtering: false}));

        if( res.error){
            alert(error.message);
            return false;
        }
        if (res.clientes.length > 0){           
            yield put(
                updateCliente(
                cliente = res.clientes[0],
                {...form, disabled: true}));
        }else{
            alert('Nenhum cliente encontrado com esse e-mail');
                yield put(updateCliente({...form, disabled: false}));
        }
            
        
    }catch (error){
        alert(error.message);
             yield put(updateCliente({...form, filtering: false}));
    }
};


export default all([
    takeLatest(types.ALL_CLIENTES, allClientes),
    takeLatest(types.FILTER_CLIENTES, filterClientes),
]);


