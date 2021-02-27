import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ExpBar } from './../components/ExperienceBar';
import { Perfil } from './../components/Perfil';
import { DesafiosCompletos } from './../components/DesafiosCompletos';
import { Contador } from './../components/Contador';
import styles from './../styles/pages/Home.module.css';
import { CaixaDesafios } from '../components/CaixaDesafios';
import { ProvedorContador } from '../contexts/contador';
import { ProvedorDesafios } from '../contexts/desafios';
interface HomeProps{
  level: number;
  experienciaAtual: number;
  desafiosCompletos: number;
}

export default function Home(props:HomeProps) {
  return (
    <ProvedorDesafios level={props.level} experienciaAtual={props.experienciaAtual} desafiosCompletos={props.desafiosCompletos}>
      <div className={styles.container}>
      <Head>
        <title>Inicio | Move.it</title>
      </Head>
      <ExpBar />
      <section className={styles.leftContainer}>
        <ProvedorContador>
          <div>
            <Perfil/>
            <DesafiosCompletos />
            <Contador />
          </div>
          <div>
            <CaixaDesafios />
          </div>
        </ProvedorContador>
      </section>
    </div>
    </ProvedorDesafios>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>{
  const { level , experienciaAtual, desafiosCompletos } = ctx.req.cookies;
  return{
    props: {
      level: Number(level),
      experienciaAtual: Number(experienciaAtual),
      desafiosCompletos: Number(desafiosCompletos)
    }
  }
}