import { Nunito } from 'next/font/google'

import Navbar from '@/app/components/navbar/Navbar'
import LoginModal from '@/app/components/modals/LoginModal'
import RegisterModal from '@/app/components/modals/RegisterModal'
import SearchModal from '@/app/components/modals/SearchModal'
import RentModal from '@/app/components/modals/RentModal'
import ProfileModal from './components/modals/ProfileModal'

import ToasterProvider from '@/app/providers/ToasterProvider'

import './globals.css'
import ClientOnly from './components/ClientOnly'
import getCurrentUser from './actions/getCurrentUser'
import AvatarModal from './components/modals/AvatarModal'

export const metadata = {
  title: 'Home Away',
  description: 'Home Away'
}

const font = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang='es'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <ProfileModal currentUser={currentUser} />
          <AvatarModal currentUser={currentUser} />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  )
}
