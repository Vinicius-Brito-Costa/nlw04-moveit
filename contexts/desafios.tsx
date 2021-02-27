import { createContext, ReactNode, useState } from 'react';
import desafios from '../challenges.json'
interface desafio{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}
interface ContextoDesafiosDados{
    level: number;
    experienciaAtual: number;
    experienciaParaProximoLevel: number;
    desafiosCompletos: number;
    desafioAtivo: desafio;
    levelUp: () => void;
    comecarNovoDesafio: () => void;
    resetarDesafio: () => void;
}

interface ProvedorDesafiosTipo{
    children: ReactNode
}

export const ContextoDesafios = createContext({} as ContextoDesafiosDados)

export function ProvedorDesafios({ children }:ProvedorDesafiosTipo){
    const [level, setLevel] = useState(1);
    const [experienciaAtual, setExperienciaAtual] = useState(0);
    const [desafiosCompletos, setDesafiosCompletos] = useState(0);
    const [desafioAtivo, setDesafioAtivo] = useState(null);

    const experienciaParaProximoLevel = Math.pow((level + 1) * 4, 2);

    function levelUp(){
        setLevel(level + 1);
    }
    function comecarNovoDesafio(){
        let numeroAleatorio = Math.floor(Math.random() * desafios.length);
        let desafioAleatorio = desafios[numeroAleatorio];
        setDesafioAtivo(desafioAleatorio);

    }
    function resetarDesafio(){
        setDesafioAtivo(null);
    }
    return(
        <ContextoDesafios.Provider value={{
            level, 
            experienciaAtual, 
            experienciaParaProximoLevel,
            desafiosCompletos, 
            levelUp, 
            comecarNovoDesafio, 
            desafioAtivo,
            resetarDesafio}}>
            {children}
        </ContextoDesafios.Provider>
    )
}