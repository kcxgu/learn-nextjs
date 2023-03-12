import CreatePostLink from '@/components/Posts/CreatePostLink'
import Posts from '@/components/Posts/Posts'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <CreatePostLink />
      <Posts />
    </>
  )
}
