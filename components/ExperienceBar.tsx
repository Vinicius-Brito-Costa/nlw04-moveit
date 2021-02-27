import { useContext } from 'react';
import { ContextoDesafios } from '../contexts/desafios';
import styles from '../styles/Components/ExperienceBar.module.css';
export function ExpBar(){
    const { experienciaAtual, experienciaParaProximoLevel } = useContext(ContextoDesafios);
    const porcentagemProximo = Math.round((experienciaAtual * 100) / experienciaParaProximoLevel); 
    return(
        <header className={styles.barraExperiencia}>
            <span>0</span>
            <div>
                <div style={{width: `${porcentagemProximo}%`}} />
                <span className={styles.experienciaAtual} style={{left: `${porcentagemProximo}%`}}>{experienciaAtual}xp</span>
            </div>
            <span>{experienciaParaProximoLevel}xp</span>
        </header>
    )
}