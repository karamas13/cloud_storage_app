'use client'

import React from 'react'
import Image from 'next/image'
import logo from '@/public/assets/icons/logo-full-brand.svg'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import menu from '@/public/assets/icons/menu.svg'
import logout from '@/public/assets/icons/logout.svg'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@radix-ui/react-separator'
import { navItems } from '@/constants'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import FileUploader from './FileUploader'
import { Button } from './ui/button'

interface props {
    ownerId: string
    accountId: string
    fullName: string
    avatar: string
    email: string
}

const MobileNavigation = ({
    ownerId,
    accountId,
    fullName,
    avatar,
    email,
}: props) => {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="mobile-header">
            <Image
                src={logo}
                alt="logo"
                width={120}
                height={52}
                className="h-auto"
            />
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Image src={menu} alt="menu" width={30} height={30} />
                </SheetTrigger>
                <SheetContent className="shad-sheet h-screen px-3">
                    <SheetHeader>
                        <SheetTitle>
                            <div className="header-user">
                                <Image
                                    src={avatar}
                                    alt="Avatar"
                                    width={44}
                                    height={44}
                                    className="header-user-avatar"
                                />
                                <div className="sm:hidden lg:block">
                                    <p className="subtitle-2 capitalize">
                                        {fullName}
                                    </p>
                                    <p className="caption">{email}</p>
                                </div>
                            </div>
                            <Separator className="mb-4 bg-light-200/20" />
                        </SheetTitle>
                        <nav className="mobile-nav">
                            <ul className="mobile-nav-list">
                                {navItems.map(({ url, name, icon }) => (
                                    <Link
                                        key={name}
                                        href={url}
                                        className="lg:2-full "
                                    >
                                        <li
                                            className={cn(
                                                'mobile-nav-item',
                                                pathname === url &&
                                                    'shad-active'
                                            )}
                                        >
                                            <Image
                                                src={icon}
                                                alt={name}
                                                width={24}
                                                height={24}
                                                className={cn(
                                                    'nav-icon',
                                                    pathname === url &&
                                                        'nav-icon-active'
                                                )}
                                            />
                                            <p className="">{name}</p>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </nav>
                        <Separator className="my-5 bg-light-200/20" />

                        <div className="flex flex-col justify-between gap-5 pb-5">
                            <FileUploader />
                            <Button
                                type="submit"
                                className="mobile-sign-out-button"
                                onClick={() => {}}
                            >
                                <Image
                                    src={logout}
                                    alt="sign out"
                                    width={24}
                                    height={24}
                                    className="w-6"
                                />
                                <p className="ml-2">Sign Out</p>
                            </Button>
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </header>
    )
}

export default MobileNavigation
