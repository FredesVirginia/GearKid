import { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router";


export const LevelMap = () => {
    const navigate = useNavigate();


    const [rotation, setRotation] = useState(0);
    const handleClick = () => {
        navigate("/levels/skills/");
       
      };

      const handleClick2 = () => {
        navigate("/levels/stayTuned/");
       
      };
    const rotateRight = () => {
        setRotation(prevRotation => prevRotation + 45);
    };

    const rotateLeft = () => {
        setRotation(prevRotation => prevRotation - 45);
    };
    return (
        <div className="fondo overflow-hidden" >
            <div className="flex  " >
                <div className="flex space-x-7 ml-20 mt-20 mr-10">
                    <img onClick={handleClick} src="../../../img/Frame 10251.png" alt="Imagen" className="w-[50px] h-[50px]" />
                    <img src="../../../img/Frame 10250.png" alt="Imagen" className="w-[50px] h-[50px]" />
                </div>
                <div className="ml-[400px]">
                    <img src="../../../img/Group.png " alt="Imagen" className=" w-[250px]" />
                </div>

                <div className="ml-[370px] mr-10">
                    <img src="../../../img/100.png " alt="Imagen" className=" mt-20 w-[200px]" />
                </div>

            </div>
            <div className="  h-[500px] overflow-hidden flex justify-center">

                <div className="container flex justify-center">


                    <div className="image-container" style={{ transform: `rotate(${rotation}deg)` }}>
                        <img src="../../../img/Capa 1.png " alt="Imagen" className="w-[1000px]" />
                    </div>

                    <div onClick={handleClick2} className="image-container2" >
                        <img onClick={handleClick2} src="../../../img/homeTonw.png" alt="Imagen" className="w-[390px]" />
                    </div>

                    <div className="  image-container3 buttons  flex justify-center space-x-[400px] ">
                        <button style={{ padding: "0px 0px" }} onClick={rotateLeft}> <img src="../../../img/left.png" alt="Imagen" className="w-[100px] h-[100px]" /> </button>
                        <button style={{ padding: "0px 0px" }} onClick={rotateRight}> <img src="../../../img/right.png" alt="Imagen" className="w-[100px] h-[100px]" /> </button>
                    </div>
                </div>

            </div>
        </div>
    )
}


