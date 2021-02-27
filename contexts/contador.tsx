import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { ContextoDesafios } from '../contexts/desafios';
interface DadosContextoContador{
    minutos: number;
    segundos: number;
    estaTerminado: boolean;
    estaAtivo: boolean;
    iniciarContador: () => void;
    resetarContador: () => void;
}
interface ProvedorTipoContador{
    children: ReactNode
}
export const ContextoContador = createContext({} as DadosContextoContador);

let contadorTimeout: NodeJS.Timeout;
export function ProvedorContador({children}: ProvedorTipoContador){
    const { comecarNovoDesafio } = useContext(ContextoDesafios);

    const [estaAtivo, setEstaAtivo] = useState(false);
    const [estaTerminado, setTerminado] = useState(false);
    const [tempo, setTempo] = useState(.1 * 60)
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    function iniciarContador(){
        setEstaAtivo(true);
    }
    function resetarContador(){
        clearTimeout(contadorTimeout);
        setTerminado(false);
        setTempo(.1 * 60);
    }
    useEffect(() => {
        if(estaAtivo && tempo > 0){
            contadorTimeout = setTimeout(() => {
                setTempo(tempo - 1);
            }, 1000)
        }
        else if(estaAtivo && tempo == 0){
            setEstaAtivo(false);
            setTerminado(true);
            comecarNovoDesafio();
        }
    }, [estaAtivo, tempo])
    return(
        <ContextoContador.Provider value={{
            minutos,
            segundos,
            estaTerminado,
            estaAtivo,
            iniciarContador,
            resetarContador
        }}>
            {children}
        </ContextoContador.Provider>
    );
}