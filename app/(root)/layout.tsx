import React from 'react'
import Header from '@/components/Header'
import SideBar from '@/components/SideBar'
import MobileNavigation from '@/components/MobileNavigation'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'

const layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser()

    if (!currentUser) return redirect('/sign-in')

    return (
        <main className="flex h-screen">
            <SideBar {...currentUser} />
            <section className="flex h-full flex-1 flex-col">
                <MobileNavigation {...currentUser} />
                <Header />
                <div className="main-content">{children}</div>
            </section>
        </main>
    )
}

export default layout
