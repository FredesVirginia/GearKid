import {  useState } from "react";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { DivContainer } from "../../../helpers/DrangAndDrop/DrangOneWord/DivContainer";
import { DraggableDiv } from "../../../helpers/DrangAndDrop/DrangOneWord/DraggableDiv";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { getColor } from "../../../helpers/getColor";
import React from "react";

type Word = {
    id: string;
    word: string;
};



const INITIAL_DATA = {
    questionId: "913",
   
    arrayQuestion: [
        { p: " 1ededre _  ijni" },
        { p: " 2ededre _  nini " },
        { p: " _ 3sewde" },

    ],
    words: [
        { id: "1", word: "primero" },
        { id: "2", word: "segundo" },
        { id: "3", word: "tercero" },

    ] as Word[]
};



const DrangAWordPage = () => {
    // Estado para almacenar los elementos soltados junto con su contenedor
    const [droppedItems, setDroppedItems] = useState<{ idWord: string; indContainer: number }[]>([]);

    //ESTADO PARA MANEJAR EL BOTON DE NEXT HABILITADO / DESABILITADO
    const [nextDisabled, setNextDisabled] = useState(true);
    //ESTADO DONDE SE GUARDA LA INFORMACION PARA ENVIAR AL SERVIDOR
    const [requestPOST, setRequestPOST] = useState<{
        questionId: string;
        response: { idWord: string; indContainer: number }[];
    }>({
        questionId: INITIAL_DATA.questionId,
        response: [],
    });


    const handleSave = () => {
        setNextDisabled(false);
        setRequestPOST({
            questionId: INITIAL_DATA.questionId,
            response: droppedItems,
        });
    };

    const handleDrop = (wordId: string, containerId: number) => {
        // Actualiza el estado para agregar el elemento soltado junto con su contenedor
        setDroppedItems(prevState => [
            ...prevState,
            { idWord: wordId, indContainer: containerId }
        ]);
    };

    //FUNCION PARA NOS VOLVER A MOSTRAR ELEMENTOS QUE YA SE SOLTARON

    const getAvailableDraggableDivs = () => {
        const droppedDivs = droppedItems.map((item) => item.idWord.toString());
        return INITIAL_DATA.words.filter((img) => !droppedDivs.includes(img.id));
    };

    const handleNext = () => {
        toast.success(" Muy Bien .A por el siguiente")
    }


    console.log("El requestPOST ES " , requestPOST);

    return (
        <ActivityLayout
            saveProps={{
                className: `font-semibold py-4 w-[220px] text-center `,
                onClick: handleSave,

            }}
            nextProps={{
                className: `font-semibold py-4 w-[220px] text-center ${nextDisabled ? "bg-pink-300" : "bg-my-pink-500"}`,
                disabled: nextDisabled,
                onClick: handleNext,
            }}
            theme="drang-and-drop"
            acitivityHeader={{
                acitivity: "TOPIC NAME ",
                quest: "A1 GRAMMAR , Quest 2",
                description: "Tak 1: Drang and Drop",
                instruction: "Drang the word to the correct place",
                info: "Drag the image to the blank spaces",
            }}
            primaryColor={getColor("my-blue-200")}
        >


            <DndProvider backend={HTML5Backend}>


                <div className="border border-gray-800 rounded-xl p-4">
                {INITIAL_DATA.arrayQuestion.map((item, index2) => (
                    <div key={index2} className=" ">
                        {item.p.split('_').map((text, index) => (
                            <React.Fragment key={index} >
                                <div style={{ display: 'inline-block', marginTop: "18px" }} className=" text-2xl" >
                                    {text}
                                </div>
                                {index !== item.p.split('_').length - 1 && (
                                    <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                                        <DivContainer
                                            words={droppedItems.filter(item => item.indContainer === index2).map(item => item.idWord)}
                                            onDrop={(wordId) => handleDrop(wordId, index2)}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
                </div>
                <center className="flex justify-center mt-10">
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>


                        {getAvailableDraggableDivs().map((wordObj) => (
                            <DraggableDiv key={wordObj.id} word={wordObj.word} id={wordObj.id} />
                        ))}
                    </div>
                </center>
            </DndProvider>

        </ActivityLayout>
    )

}

export default DrangAWordPage;