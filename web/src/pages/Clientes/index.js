import {DrawerBody, Table} from 'rsuite';
import { Component, useEffect } from 'react';  

import 'rsuite/dist/styles/rsuitre-default.css';
import moment from 'moment';
import Table from '../../components/table';
import {Button, Drawer} from 'rsuite';
import {allClientes, 
        updateCliente, 
        filterClientes}
        from '././store/modules/clientes/actions';
import {useSelector, useDispatch} from 'react-redux';


const Clientes = () => {
    
    const dispatch = useDispatch();
    const {clientes, form} = useSelector((state) => state.clientes);

    const setComponent = (component, state) => {
        dispatch(updateCliente({...components,  [component]: state}));
    }

    const setCliente = (key, value) => {
        dispatch(
            updateCliente(
                {cliente: {...cliente, [key]: value}}));
    };

    useEffect(() => {
        allClientes();
    }, []);
    return (
        <div className='col p-5 h-100 overflow-auto '>
            <Drawer show ={components.drawer} size="sm" onHide={() => setComponent('drawer', false)}>
                <DrawerBody>
                    <h3>{behavior   === 'create' ? 'Criar Cliente' : 'Atualizar Cliente'}
                        <div className='row mt-3'></div>
                        <div className='form-group col-12'></div>
                        <div className='form-goup mb-3'>
                        <div className='form-group col-6'>
                            <b>Nome</b>
                            <imput
                                type="text"
                                className="form-control"
                                placeholder="Nome do Cliente"
                                disabled={form.disabled}
                                value={cliente.nome}
                                onChange={(e) =>
                                        setCliente('nome', e.target.value)}
                            />
                        </div>
                        <div className='form-group col-6'></div>    
                            <b>E-mail</b>
                                <imput type="email" 
                                className="form-control" 
                                placeholder="E-mail do Cliente" 
                                value={cliente.email}> 
                                onChange={(e) => 
                                    dispatch(
                                        setCliente('email', e.target.value))}
                                </imput>
                                <div className='form-group col-6'></div>    
                            <b>Telefone</b>
                                <imput type="telefone" 
                                className="form-control" 
                                placeholder="Telefone do Cliente" 
                                value={cliente.telefone}> 
                                onChange={(e) => 
                                    dispatch(
                                        setCliente('telefone', e.target.value))}
                                </imput>
                                <div className='form-group col-6'></div>    
                            <b>Data de Nascimento</b>
                                <imput type="dataNascimento" 
                                className="form-control" 
                                placeholder="Data de Nascimento do Cliente" 
                                value={cliente.dataNascimento}> 
                                onChange={(e) => 
                                    dispatch(
                                        setCliente('dataNascimento', e.target.value))}
                                </imput>
                                <div className='form-group col-6'></div>    
                            <b>Sexo</b>
                                <select
                                    disabled={form.disabled}
                                    className="form-control"
                                    value={cliente.sexo}
                                    onChange={(e) => setCliente('sexo', e.target.value)}
                                    >
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                </select>
                            <div className='imput-group append'>
                                <Button appearance="primary" 
                                loading={form.filtering} 
                                disabled={form.filtering} 
                                onClick={() => {
                                    dispatch(filterClientes());
                                }}>
                                    Pesquisar
                                </Button>
                            </div>
                        </div>
                    </h3>
                </DrawerBody>
            </Drawer>
            <div className="row">
            <div className="col-12"></div>
                <div className="w-100 d-flex justify-content-between"> 
                    <h2 className="mb-4 mt-0">Clientes</h2>
                <div>
                    <button className="btn btn-primary btn-lg"
                    onClick={() => {
                    dispatch(updateCliente({
                        behavior: 'create'})
                    );
                    setComponent('drawer', true);
                }}
                >
                        <span className="mdi mdi-plus"Novo Cliente></span>
                    </button>
                </div>
            </div>
        <Table  
            loading={form.filtering}
            data={clientes}
            config={[
                {key: 'firstName', label: 'Nome', width: 200, fixced: true},
                {key: 'email', label: 'Email'},
                {key: 'telefone', label: 'Telefone'},
                {key: 'sexo', content: (cliente) => cliente.sexo === "M" ? 'Masculino' : 'Feminino', label: 'Sexo'},
                {key: 'dataCadastro', content:(cliente) => moment(cliente.dataCadastro).format('DD/MM/YYYY'), label: 'Data de Cadastro'},

            ]}
            actions={(cliente) =>(
            <Button color="blue" size="xs">
              Ver Informações
              </Button>
            )}
            onRowClick={ (cliente) => {alert(cliente.firstName)

            }}>
            </Table>
            </div>
        </div>
    );
};

export default Clientes;