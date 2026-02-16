'use client'

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logo from '@/public/assets/icons/logo-full-brand.svg'
import logoMobile from '@/public/assets/icons/logo-brand.svg'
import { avatarPlaceholderUrl, navItems } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import files from '@/public/assets/images/files-2.png'
import avatar from '@/public/assets/images/avatar.png'

interface Props {
    fullName: string
    email: string
    avatar: string
}

const SideBar = ({ fullName, email, avatar }: Props) => {
    const pathname = usePathname()

    return (
        <aside className="sidebar">
            <Link href="/">
                <Image
                    src={logo}
                    alt="Logo"
                    width={160}
                    height={50}
                    className="hidden h-auto lg:block"
                />

                <Image
                    src={logoMobile}
                    alt="Logo"
                    width={52}
                    height={52}
                    className="lg:hidden"
                />
            </Link>

            <nav className="sidebar-nav">
                <ul className="flex flex-1 flex-col gap-6">
                    {navItems.map(({ url, name, icon }) => (
                        <Link key={name} href={url} className="lg:2-full ">
                            <li
                                className={cn(
                                    'sidebar-nav-item',
                                    pathname === url && 'shad-active'
                                )}
                            >
                                <Image
                                    src={icon}
                                    alt={name}
                                    width={24}
                                    height={24}
                                    className={cn(
                                        'nav-icon',
                                        pathname === url && 'nav-icon-active'
                                    )}
                                />
                                <p className="hidden lg:block">{name}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>

            <Image
                src={files}
                alt="Files"
                width={506}
                height={418}
                className="w-full"
            />

            <div className="sidebar-user-info">
                <Image
                    src={avatar}
                    alt="Avatar"
                    width={44}
                    height={44}
                    className="sidebar-user-avatar"
                />
                <div className="hidden lg:block">
                    <p className="subtitle-2 capitalize">{fullName}</p>
                    <p className="caption">{email}</p>
                </div>
            </div>
        </aside>
    )
}

export default SideBar
