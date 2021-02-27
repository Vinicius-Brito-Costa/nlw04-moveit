import { useContext } from 'react';
import { ContextoDesafios } from '../contexts/desafios';
import styles from './../styles/Components/CaixaDesafios.module.css';

export function CaixaDesafios(){
    const {desafioAtivo, resetarDesafio} = useContext(ContextoDesafios);
    return (
        <div className={styles.caixaDesafiosContainer}>
            {desafioAtivo ? 
                <div className={styles.desafioAtivo}>
                    <header>Ganhe {desafioAtivo.amount}xp</header>
                    <main>
                        <img src={`icons/${desafioAtivo.type}.svg`} alt="" />
                        <strong>Novo desafio</strong>
                        <p>{desafioAtivo.description}</p>
                    </main>
                    <footer>
                        <button type='button' className={styles.botaoDesafioFalhou} onClick={resetarDesafio}>
                            Falhei
                        </button>
                        <button type='button' className={styles.botaoDesafioCompleto}>
                            Completei
                        </button>
                    </footer>
                </div>
                :
                <div className={styles.desafioDesativado}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src='icons/level-up.svg' alt='Level Up' />
                        Avance de level completando desafios
                    </p>
                </div>
            }
        </div>
    );
}