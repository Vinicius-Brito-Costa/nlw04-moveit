import { useContext } from 'react';
import { ContextoDesafios } from '../contexts/desafios';
import styles from './../styles/Components/LevelUpModal.module.css';

export function LevelUpModal(){
const { level, fecharModalLevelUp } = useContext(ContextoDesafios);

    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button type='button' onClick={fecharModalLevelUp}>
                    <img src='/icons/close.svg' alt='Fechar modal'/>
                </button>
            </div>
        </div>
    );
}