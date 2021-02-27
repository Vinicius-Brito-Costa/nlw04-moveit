import styles from './../styles/Components/Contador.module.css';
import {useState, useEffect, useContext } from 'react'
import { ContextoDesafios } from '../contexts/desafios';

let contadorTimeout: NodeJS.Timeout;
export function Contador(){
    const { comecarNovoDesafio } = useContext(ContextoDesafios);

    const [estaAtivo, setEstaAtivo] = useState(false);
    const [estaTerminado, setTerminado] = useState(false);
    const [tempo, setTempo] = useState(.1 * 60)
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    const [minDireito, minEsquerdo] = String(minutos).padStart(2, '0').split('');
    const [segDireito, segEsquerdo] = String(segundos).padStart(2, '0').split('');

    function iniciarContador(){
        setEstaAtivo(true);
    }
    function resetarContador(){
        clearTimeout(contadorTimeout);
        setTempo(25 * 60);
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
       <div>
            <div className={styles.contadorContainer}>
                <div>
                    <span>{minDireito}</span>
                    <span>{minEsquerdo}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{segDireito}</span>
                    <span>{segEsquerdo}</span>
                </div>
            </div>
            {estaTerminado ? (
                <button disabled className={styles.contadorBotao + ' ' + styles.contadorBotao} onClick={resetarContador}>
                    Ciclo encerrado
                </button>
                ):estaAtivo ?
                <button type='button' className={styles.contadorBotaoAtivo + ' ' + styles.contadorBotao} onClick={resetarContador}>
                    Abandonar ciclo
                </button>
                :
                <button type='button' className={styles.contadorBotao} onClick={iniciarContador}>
                    Iniciar um ciclo
                </button>
                
            }
       </div>
    );
}