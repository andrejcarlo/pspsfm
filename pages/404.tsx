// 404.js
import Link from 'next/link'
import styles from '../styles/404.module.css'


export default function FourOhFour() {
  return (
    <div className={styles.App_disabled}>
        <div className={styles.description}>
            404 - Page Not Found
        </div>

        <div className={styles.description}>
            What are you doing here?
        </div>

        <Link href="/" passHref={true}>
            <div className={styles.button}>
            Go back home
            </div>
        </Link>
    </div>

  )
}
