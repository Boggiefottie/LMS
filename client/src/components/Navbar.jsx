import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import DarkMode from '@/DarkMode'
import { Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger, } from './ui/sheet'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

function Navbar() {
    const {user} = useSelector(store=>store.auth)
    const [logout,{data, isSuccess}] = useLogoutUserMutation()
    const navigate = useNavigate()

    const logoutHandler = async() => {
     await logout()
    }

    useEffect(() => {
     if(isSuccess) {
          toast.success(data?.message ||  "Logout successfully") 
          navigate("/login") 
      }
    }, [isSuccess])


    const role = "instructor"
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
        <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
        <div className='flex items-center gap-2'>
        <School size={"30"}/>
        <h1 className="hidden md:block font-extrabold text-2xl">E-Learning</h1>
        </div>
        {/**User icon and dark mode icons */}
        <div className="flex items-center gap-4">
        {user ? (<DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar>
      <AvatarImage src={user?.photoUrl  ||"https://github.com/shadcn.png"} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          
          <DropdownMenuItem>
            <Link to="/my-learning"> My Learning</Link>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/profile">Profile</Link>
            
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logoutHandler}>
           Log out
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        
        {
          user.role === "instructor" &&  (
            <>
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </>
            
          )
        }
        
      </DropdownMenuContent>
    </DropdownMenu>): (
        <div className="flex items-center gap-2">
        <Button variant="outline" onClick={()=>navigate("/login")}>Login</Button>
        <Button onClick={()=>navigate("/login")}>Signup</Button>
        </div>
    )}
    <DarkMode/>

        </div>
       
        </div>
        {/**Mobile view */}

        <div className="flex md:hidden justify-between items-center px-4 h-full">
          <h1 className="font-extrabold text-2xl">E-Learning</h1>
        <MobileNavbar/>
        </div>
        
    </div>
  )
}

export default Navbar

const MobileNavbar = () => { 
  const role = "instructor"
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline">
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>E-Learning</SheetTitle>
         <DarkMode/>
        </SheetHeader>
        <Separator className='mr-2'/>
        <nav className='flex flex-col space-y-4'>
          <span>My Learning</span>
          <span>Edit Profile</span>
          <p>Logout</p>
        </nav>
        {
          role === "instructor" && (
            <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">DashBoard</Button>
            </SheetClose>
          </SheetFooter>
          )
        }
       
      </SheetContent>
    </Sheet>
  )
}
