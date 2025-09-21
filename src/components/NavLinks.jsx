export default 
function NavLink({icon,linktext}){
return(
  <li className=' width-full h-14 rounded-lg flex items-center   gap-2 md:justify-center px-6 md:px-0'> 
  <span className='inline-block'>{icon}</span>
<a href='#' className='text-white md:hidden xl:block'> {linktext}</a>
</li>

);
}
