import { Metadata } from 'next'
import Post from '../../../layouts/Post'

export const metadata: Metadata = {
  title: '配達待ち年賀状 - あけおめリンク',
}

const Page = () => {
  return <Post tab="undelivered" />
}

export default Page
