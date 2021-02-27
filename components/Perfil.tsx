import { useContext } from 'react';
import { ContextoDesafios } from '../contexts/desafios';
import styles from './../styles/Components/Perfil.module.css';
export function Perfil(){
    const { level } = useContext(ContextoDesafios);
    return(
        <div className={styles.perfilContainer}>
            <img src='https://github.com/Vinicius-Brito-Costa.png' alt='Vinicius Brito Costa' />
            <div>
                <strong>Vinicius Brito Costa</strong>
                <p>
                    <img src='icons/level.svg' alt=''/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}