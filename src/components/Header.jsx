import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import alpha from '../assets/sifralogo.jpg'

export default function Header() {
  return (
    <header className="bg-gray-900 shadow-md p-3 md:p-5 font-montserrat">
        <div className="flex justify-between items-center  mx-auto">
        <h1 className="font-bold text-3xl md:text-5xl flex flex-wrap">
            <span className="text-purple-700  p-1 md:p-2 font-montserrat">Sifra AI</span>
        </h1>
  
        <div className='flex justify-around gap-5 md:gap-12'>
        <form className="bg-slate-100 p-1.5 rounded-lg flex items-center">
            <input className="bg-transparent focus:outline-none w-24 sm:w-64" type="text" placeholder="Search..."></input>
            <FaSearch className="text-blue-600"/>
        </form>
        <ul className='flex flex-row justify-between gap-8'>
          <li className='hidden sm:inline text-white hover:bg-purple-700 rounded-2xl p-3'><Link to='/'>Home</Link></li>
          <li className='hidden sm:inline text-white hover:bg-purple-700 rounded-2xl p-3'><Link to='/models'>Models</Link></li>
          <li className='hidden sm:inline text-white hover:bg-purple-700 rounded-2xl p-3'><Link to='/about'>About</Link></li>
          <li className='inline text-white hover:bg-purple-700 rounded-2xl p-3'><Link to='/signin'>Sign In</Link></li>
          <li className='hidden sm:inline text-white hover:bg-purple-700 rounded-2xl p-3 animate-underline'><Link to='/signin'>Pricing</Link></li> 
        </ul>
        </div>
        </div>
    </header>
  )
}
