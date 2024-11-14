import * as styles from './index.css'
import Image from 'next/image'
import akeomeLinkLogo from './akeome-link-logo.svg'

const LogoPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={akeomeLinkLogo} alt='akeomeLInkSmartPhone' />
      </div>
    </div>
  )
}

export default LogoPage