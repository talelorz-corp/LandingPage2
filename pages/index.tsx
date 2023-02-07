import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  function test() {
    fetch('http://localhost:3000/api/hello')
    .then(res => res.json)
    .then(data => console.log(data));
  }

  return (
    <>
      <Head>
        <title>Talelorz</title>
      </Head>
      <main className={styles.main}>
          <p>
            you should receive hi!&nbsp;
          </p>
          <button onClick={test}>
            test
          </button>
      </main>
    </>
  )
}
