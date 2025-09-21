import NavLink from "./NavLinks";

export default function AsideLinks({navLinks}){


  return (
    <ul className=' mt-8'>
      {navLinks.map((link,index)=><NavLink key={index} icon={link.icon} linktext={link.linktext}/>)}
   
  </ul>
  );
}
