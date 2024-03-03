// import Cards from '../components/cards'
import Advcards from "../components/advcards"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"


function Models() {
  return (
    <>
   <NavBar/>
    <div className='bg-[#100820] flex flex-col justify-center items-center'>
     
      {/* <div className='text-5xl font-semibold flex justify-center items-center text-white p-5 pt-4 md:pt-10'>
        AI Models
        </div> */}
      <div className="flex flex-row flex-wrap justify-center items-center gap-20 w-3/5 md:w-4/5">
      <Advcards linkto={"sifra"}/>
      <Advcards linkto={"nitin"}/>
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default Models
