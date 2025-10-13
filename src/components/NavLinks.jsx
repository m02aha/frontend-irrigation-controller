export default 
function NavLink({icon,linktext ,clicked}){
return(
  <li className=' width-full h-14 rounded-lg flex items-center md:justify-center xl:justify-normal  xl:ml-[25%] gap-2  px-6 md:px-0'
  
  style={clicked?{backgroundColor:'var(--color-nav-cliked-link)',borderRadius:'8px'}:{}}
  > 
  <span className='w-6 flex justify-center'>{icon}</span>
<a href='#' className='text-white md:hidden xl:block ml-2 text-center'> {linktext}</a>
</li>

);
}
