
import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4">
        <div>
            <Link href="/">
           My App
            </Link>
        </div>
        <div className="flex space-x-4">
            <Link href={"/"}>Home</Link>
            <Link href={"/product"}>Product</Link>
             <Link href={"/checkout"}>Checkout</Link>
             <Link href={"/bnlp"}>Bnlp</Link>
        </div>
        <div className="flex space-x-2">
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
        </div>
    </nav>
  )
}

export default Navbar
