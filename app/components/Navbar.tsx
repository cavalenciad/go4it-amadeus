import { Link } from "@remix-run/react";

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="container flex items-center justify-start py-6 pl-14">
                {/* Logo */}
                <div className="flex items-center">
                    <img src="amadeus-logo.png" alt="Logo Amadeus" className="h-4 w-auto" />
                </div>
                {/* Navigation Links */}
                <ul className="flex space-x-16 text-gray-700 font-medium ml-12">
                    <li><Link to="/" className="hover:text-blue-500">Inicio</Link></li>
                    <li><Link to="/ListUser" className="hover:text-blue-500 cursor-pointer">Reporte</Link></li>
                    <li><a href="https://amadeus.com/es" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Amadeus</a></li>
                </ul>
            </div>
        </nav>
    );
}