import calender from "../assets/calender.svg";
import rotate from "../assets/rotate.svg";


export default 
//top bar in medium and large screens
function TopBar() {
  return (
    <header className="w-full bg-white  container hidden   md:h-16 xl:h-20 md:flex justify-between items-center ">
      <h1 className="  md:text-xl xl:text-2xl font-semibold">Irrigation controller - Sudan A1</h1>
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center text-text-labels">
          <img className="text-gray w-4 h-4" src={calender} alt="calendar" />
       <p className='text-gray '>last updated on August 12, 2021</p>
       </div>


        <div className=" p-1 rounded-full border border-[#dddddd] cursor-pointer">
  <img className='w-4 h-4 text-gray' src={rotate} alt="rotate" />
</div>
      </div>
    </header>
  );
}