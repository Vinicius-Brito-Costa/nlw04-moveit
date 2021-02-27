import { ProvedorDesafios } from '../contexts/desafios'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <ProvedorDesafios>
      <Component {...pageProps} />
    </ProvedorDesafios>
  )
}

export default MyApp
