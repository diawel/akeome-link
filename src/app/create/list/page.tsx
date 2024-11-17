import { Metadata } from 'next'
import List from '../../../layouts/List'

export const metadata: Metadata = {
  title: 'つくった年賀状一覧 - あけおめリンク',
}

const Page = () => {
  return <List tab="created" />
}

export default Page
