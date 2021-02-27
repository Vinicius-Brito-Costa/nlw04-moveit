import { useContext } from 'react';
import { ContextoDesafios } from '../contexts/desafios';
import styles from './../styles/Components/DesafiosCompletos.module.css';
export function DesafiosCompletos(){
    const { desafiosCompletos } = useContext(ContextoDesafios);
    return(
        <div className={styles.desafiosCompletos}>
            <span>Desafios completos</span>
            <span>{desafiosCompletos}</span>
        </div>
    )
}