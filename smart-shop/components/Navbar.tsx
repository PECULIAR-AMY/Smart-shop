"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User, Menu, Search, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';

const categories = [
  'Electronics',
  'High-End Fashion',
  'Smart Home Devices',
  'Gadgets',
  'Gaming & Entertainment',
  'Home & Living',
  'Luxury Accessories',
  'Beauty & Personal Care',
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { items } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/product?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/product`);
    }
  };

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
            {categories.map((category) => (
              <DropdownMenuItem key={category} asChild>
                <Link href={`/product?q=&category=${encodeURIComponent(category)}`}>
                  {category}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/" className="text-xl font-bold">
          SMART SHOP
        </Link>
      </div>
      <div className="flex-1 flex justify-center items-center space-x-2">
        <Input
          type="text"
          placeholder="Search products, brands and categories"
          className="w-150"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSearch}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-4">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">BNPL</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/bnlp">option 1</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Option 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="relative" asChild>
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
