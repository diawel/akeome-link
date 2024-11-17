import { Metadata } from 'next'
import Post from '../../../layouts/Post'

export const metadata: Metadata = {
  title: '届いた年賀状 - あけおめリンク',
}

const Page = () => {
  return <Post tab="delivered" />
}

export default Page
