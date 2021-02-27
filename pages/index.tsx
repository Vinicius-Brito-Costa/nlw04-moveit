import Head from 'next/head';
import { ExpBar } from './../components/ExperienceBar';
import { Perfil } from './../components/Perfil';
import { DesafiosCompletos } from './../components/DesafiosCompletos';
import { Contador } from './../components/Contador';
import styles from './../styles/pages/Home.module.css';
import { CaixaDesafios } from '../components/CaixaDesafios';
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | Move.it</title>
      </Head>
      <ExpBar />
      <section className={styles.leftContainer}>
        <div>
          <Perfil/>
          <DesafiosCompletos />
          <Contador />
        </div>
        <div>
          <CaixaDesafios />
        </div>
      </section>
    </div>
  )
}
