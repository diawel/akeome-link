import Link, { LinkProps } from 'next/link'
import { IconType } from 'react-icons'
import { FaChevronLeft } from 'react-icons/fa6'
import * as styles from './index.css'

type ReturnButtonProps = {
  href: LinkProps['href']
  color?: React.ComponentProps<IconType>['color']
}

const ReturnButton = ({ href, color }: ReturnButtonProps) => {
  return (
    <Link href={href} className={styles.returnButtonContainer}>
      <FaChevronLeft color={color} size={24} />
    </Link>
  )
}

export default ReturnButton
