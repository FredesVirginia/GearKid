import { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router";


export const StayTuned = () => {
    const navigate = useNavigate();

    
   
    const handleClick = () => {
        navigate("/levels/skills/");
       
      };
   
    return (
        <div className="fondo overflow-hidden" >
            <div className="flex justify-center " >
                <div className="flex space-x-7 ml-20 mt-10 mr-10">
                    <img onClick={handleClick} src="../../../img/Frame 10251.png" alt="Imagen" className="w-[50px] h-[50px]" />
                    <img src="../../../img/Frame 10250.png" alt="Imagen" className="w-[50px] h-[50px]" />
                </div>
                <div className= "imagen-pop ml-[200px] mr-[200px] flex justify-center">
            <img src="../../../img/stay tuned.svg " alt="Imagen" className=" w-[550px] " />
            </div>

                <div className=" mr-10">
                    <img src="../../../img/100.png " alt="Imagen" className=" mt-10 w-[100px]" />
                </div>

            </div>

           
            
        </div>
    )
}