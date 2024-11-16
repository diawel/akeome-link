import * as styles from './index.css'

type DisableScrollProps = {
  children: React.ReactNode
}

const DisableSctoll = ({ children }: DisableScrollProps) => {
  return <div className={styles.fixedScreen}>{children}</div>
}

export default DisableSctoll
