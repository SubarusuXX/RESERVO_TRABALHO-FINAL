import producer from 'immer';
import types from './types';
import { Drawer, } from 'rsuite';

const INITIAL_STATE = {
    behavior: "create",
    components:{
        drawer:false,
        confirmDelete: false
    },
    form: {
        filtering: false,
        disabled:true,  
        saving: false,
    },

    clientes: [],
    cliente: {
        email: '',
        nome: '',
        telefone: '',
        dataNascimento: '',
        sexo: 'M',
        documento: {
            tipo: 'CPF',
            numero: '',
        },
        endereco: {
            cidade: '',
            uf: '',
            cep:'',
            logradouro: '',
            numero: '',
            pais: '',
        },
    }
};
function cliente(state = INITIAL_STATE, action){
    switch(action.type){
        case types.UPDATE_CLIENTE:
            return producer(state, (draft) => {
                draft = {...draft, ...action.payload};
                return draft;
            });
        default:
            return state;
    }
}

export default cliente;