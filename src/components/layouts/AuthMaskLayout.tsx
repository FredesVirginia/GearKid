// import fox from "../../assets/logos/fox.svg";
// import rabbit from "../../assets/logos/rabbit.png";
import foxy from "../../assets/characters/foxy.svg";

export const AuthMaskLayout = () => {
  return (
    <div className=" w-full h-screen top-0 absolute  max-sm:hidden">
      {/* <div className="rabbit  w-56 h-56 absolute right-0 -translate-x-32 translate-y-20">
        <img src={rabbit} alt="rabbit" className="h-full w-full object-contain" />
      </div> */}
      <div className="g_happy  w-[20rem] h-[20rem] absolute bottom-0 translate-x-32 -translate-y-20 max-lg:hidden">
        <img src={foxy} alt="g_happy" className="h-full w-full object-contain" />
      </div>
    </div>
  );
};
