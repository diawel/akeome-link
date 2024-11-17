import { Metadata } from 'next'
import List from '../../../layouts/List'

export const metadata: Metadata = {
  title: 'もらった年賀状一覧 - あけおめリンク',
}

const Page = () => {
  return <List tab="received" />
}

export default Page
