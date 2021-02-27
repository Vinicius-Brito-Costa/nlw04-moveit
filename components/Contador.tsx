import styles from './../styles/Components/Contador.module.css';
import {useState, useEffect, useContext } from 'react'
import { ContextoContador } from './../contexts/contador';

export function Contador(){
    const { 
        minutos, 
        segundos, 
        estaAtivo, 
        estaTerminado, 
        iniciarContador, 
        resetarContador
    } = useContext(ContextoContador)
    const [minDireito, minEsquerdo] = String(minutos).padStart(2, '0').split('');
    const [segDireito, segEsquerdo] = String(segundos).padStart(2, '0').split('');

    
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