import { Calendar, momentLocalizer } from "react-big-calendar";
import { use, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import util from "../../util";

import{filterAgendamento} from '../../store/modules/agendamento/actions';
import {useDispatch, useSelector } from 'react-redux';
import agedamento from "../../store/modules/agendamento/reducer";
const localizer = momentLocalizer(moment);

const formatRange = (periodo) => {
    let= finalRange = {};
    if(Array.isArray(periodo)) {
        finalRange = {
            start: moment(periodo[0]).format('YYYY-MM-DD'),
            end: moment(periodo[periodo.length-1]).format('YYYY-MM-DD'),
        };
        
    }else {
            finalRange = {
                start: moment(periodo.start).format('YYYY-MM-DD'),
                end: moment(periodo.end).format('YYYY-MM-DD'),
            };
        };
    return finalRange;
};


 
    useEffect(() => {
        Dispatch(filterAgendamento({start:moment().weekday(0).format('YYYY-MM-DD'),end:moment().weekday(6).format('YYYY-MM-DD')}
        ));
    }, []);


const Agendamentos = () => {
    const useDispatch = useDispatch();
    const { agendamentos   } = useSelector(state => state.agendamento);
    const formatEvents = agendamentos.map(agendamento => ({
        title: '${agendamento.servicoId.titulo} - ${agendamento.clienteId.nome} - ${agendamento.colaboradorId.nome}',
        start: moment(agendamento.data).toDate(),
        end: moment(agendamento.data).add(util.hourToMinutes(moment(agendamento.servicoId.duracao).format('HH:mm')),'minutes').toDate()
    }));



    return (
        <div className='col p-5 h-100 overflow-auto '>
            <div className="col-12"></div>
                <h2 className="mb-4 mt-0">Agendamentos</h2>
                <Calendar
                    localizer={localizer}
                    onRangeChange={(periodo) =>{ 
                        const {start, end} = formatRange(periodo); 
                        Dispatch(filterAgendamento({start,end}
        ));
                        
           
                    }}
                    events={formatEvents}
                    defaultView="week"
                    selectable=
                    popup=
                    style={{ height: 600 }}
                ></Calendar>
        </div>
    );
}
