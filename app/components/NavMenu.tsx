import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const items = [
    {
        'Title': 'Home',
        'Link': '/home',
    },
    {
        'Title': 'About',
        'Link': '/about',
    },
    {
        'Title': 'Contact',
        'Link': '/contact'
    }
]



export default function NavMenu() {
  return (
    <NavigationMenu>
    <NavigationMenuList>
        {items.map((value, index)=>
        <Button key={`${index}`} variant='link' className='cursor-pointer text-xl '>{value.Title}</Button>
        )}
    </NavigationMenuList>
  </NavigationMenu>
  )
}
