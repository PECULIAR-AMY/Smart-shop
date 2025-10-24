
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User, Menu, Search, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem asChild>
                        <Link href="/electronics">Electronics</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/fashion">High Fashion</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/premiumproduct">Gadget</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/" className="text-xl font-bold">
                SMART SHOP
            </Link>
        </div>
        <div className="flex-1 flex justify-center items-center space-x-2">
            <Input type="text" placeholder="Search products, brands and categories" className="w-150" />
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
                <Search className="h-4 w-4" />
            </Button>
        </div>
        <div className="flex items-center space-x-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">BNPL</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Option 1</DropdownMenuItem>
                    <DropdownMenuItem>Option 2</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/signup">Sign Up</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </nav>
  )
}

export default Navbar
