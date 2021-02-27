import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import desafios from '../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';
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
    completarDesafio: () => void;
    fecharModalLevelUp: () => void;
    resetarDesafio: () => void;
}

interface ProvedorDesafiosTipo{
    children: ReactNode
    level: number;
    experienciaAtual: number;
    desafiosCompletos: number;
}

export const ContextoDesafios = createContext({} as ContextoDesafiosDados)

export function ProvedorDesafios({ children, ...rest }:ProvedorDesafiosTipo){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [experienciaAtual, setExperienciaAtual] = useState(rest.experienciaAtual ?? 0);
    const [desafiosCompletos, setDesafiosCompletos] = useState(rest.desafiosCompletos ?? 0);

    const [desafioAtivo, setDesafioAtivo] = useState(null);
    const [passouDeLevel, setPassouDeLevel] = useState(false);
    const experienciaParaProximoLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('experienciaAtual', String(experienciaAtual));
        Cookies.set('desafiosCompletos', String(desafiosCompletos));
    }, [level, experienciaAtual, desafiosCompletos])

    function levelUp(){
        setLevel(level + 1);
        setPassouDeLevel(true);
    }
    function fecharModalLevelUp(){
        setPassouDeLevel(false);
    }
    function comecarNovoDesafio(){
        let numeroAleatorio = Math.floor(Math.random() * desafios.length);
        let desafioAleatorio = desafios[numeroAleatorio];
        setDesafioAtivo(desafioAleatorio);
        new Audio('./notification.mp3').play();
        if(Notification.permission === 'granted'){
            new Notification('Novo Desafio', {
                body: `Valendo ${desafioAleatorio.amount}xp!`
            })
        }
    }
    function resetarDesafio(){
        setDesafioAtivo(null);
    }
    function completarDesafio(){
        if(!desafioAtivo){
            return;
        }
        const { amount } = desafioAtivo;
        let experiencia = experienciaAtual + amount;
        if(experiencia >= experienciaParaProximoLevel){
            levelUp();
            experiencia = experiencia - experienciaParaProximoLevel;
        }
        setExperienciaAtual(experiencia);
        setDesafioAtivo(null);
        setDesafiosCompletos(desafiosCompletos + 1);

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
            completarDesafio,
            fecharModalLevelUp,
            resetarDesafio}}>
            {children}
            {passouDeLevel && <LevelUpModal/>}
        </ContextoDesafios.Provider>
    )
}