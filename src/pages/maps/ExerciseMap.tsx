import { useNavigate } from "react-router";
import { BackgroundLayout } from "../../components/layouts/BackgroundLayout";
import { useState } from "react";
import { MapMaskLayout } from "../../components/layouts/MapMaskLayout";
import { DialogActivity } from "../../components/dialogs/DialogActivity";
import { useActivityStore } from "../../store/useActivityStore";

const CURRENT_ROUTE = "/levels/skills/quest/exercises/activity";

export const ExerciseMap = () => {
  const navigate = useNavigate();
  const setQuestionType = useActivityStore((state) => state.setQuestionType);

  const handleNavigate = (route: string) => navigate(CURRENT_ROUTE + route);

  const [openFillInTheBlanks, setOpenFillInTheBlanks] = useState(false);
  const [openMultipleChoice, setOpenMultipleChoice] = useState(false);
  const [openMatchTheColumns, setOpenMatchTheColumns] = useState(false);
  const [openDragAndDrop, setOpenDragAndDrop] = useState(false);
  const [openPickList, setOpenPickList] = useState(false);
  const [openUnscramble, setOpenUnscramble] = useState(false);
  const [openTrueOrFalse, setOpenTrueOrFalse] = useState(false);
  const [openOpen, setOpenOpen] = useState(false);
  const [openSortable, setOpenSortable] = useState(false);
  const [openRecording, setOpenRecording] = useState(false);
  const [openListening, setOpenListening] = useState(false);
  const [openReading, setOpenReading] = useState(false);

  return (
    <BackgroundLayout theme="login" imgProps={{ className: "opacity-10" }} mask={<MapMaskLayout />}>
      <div className="w-full flex justify-center items-center flex-col gap-9">
        <h1 className="font-bold">Exercise Map</h1>
        <div className="grid grid-cols-[repeat(4,minmax(200px,1fr))] gap-7">
          {/* TRUE OR FALSE */}
          <ActivityButton
            text="True or False"
            onClick={() => setOpenTrueOrFalse(!openTrueOrFalse)}
            open={openTrueOrFalse}
          >
            <ActivityButton
              text="Just text"
              onClick={() => {
                setQuestionType("TRUE_OR_FALSE_TEXT");
                handleNavigate("/true-or-false/by-text");
              }}
            />
          </ActivityButton>

          {/* UNSCRAMBLE */}
          <ActivityButton text="Unscramble" onClick={() => setOpenUnscramble(!openUnscramble)} open={openUnscramble}>
            <ActivityButton text="Sentences" onClick={() => handleNavigate("/unscramble/sentences")} />
          </ActivityButton>

          {/* DRAG AND DROP  */}
          <ActivityButton
            text="Drag and Drop"
            onClick={() => setOpenDragAndDrop(!openDragAndDrop)}
            open={openDragAndDrop}
          >
            <ActivityButton
              text="Text or image from top to bottom / left to right"
              onClick={() => handleNavigate("/drag-and-drop/image")}
            />


             <ActivityButton
              text="Drang a Word"
              onClick={() => handleNavigate("/drag-and-drop/a-word")}
            />


           <ActivityButton
              text="Drang a Word"
              onClick={() => handleNavigate("/drag-and-drop/many-words")}
            />



          </ActivityButton>

          {/* PICK LIST */}
          <ActivityButton text="Pick List" onClick={() => setOpenPickList(!openPickList)} open={openPickList}>
            <ActivityButton text="Sentence with posible answers" onClick={() => handleNavigate("/picklist/text")} />
          </ActivityButton>

          {/* MATCH THE COLUMNS */}
          <ActivityButton
            text="Match The Columns"
            onClick={() => setOpenMatchTheColumns(!openMatchTheColumns)}
            open={openMatchTheColumns}
          >
            <ActivityButton text="Text to Text" onClick={() => handleNavigate("/match-the-columns/text-text")} />
            <ActivityButton text="Image to Text" onClick={() => handleNavigate("/match-the-columns/image-text")} />
            <ActivityButton
              text="Text and image to Text"
              onClick={() => handleNavigate("/match-the-columns/text-image-text")}
            />
          </ActivityButton>

          {/* FILL IN THE BLANKS */}
          <ActivityButton
            text="Fill In The Blanks"
            onClick={() => setOpenFillInTheBlanks(!openFillInTheBlanks)}
            open={openFillInTheBlanks}
          >
            <ActivityButton
              text="Just one word"
              onClick={() => {
                setQuestionType("ONE_WORD");
                handleNavigate("/fill-in-the-blanks/word");
              }}
            />
            <ActivityButton
              text="Multiple words"
              onClick={() => {
                setQuestionType("MULTIPLE_WORDS");
                handleNavigate("/fill-in-the-blanks/words");
              }}
            />
          </ActivityButton>

          {/* MULTIPLE CHOICE */}
          <ActivityButton
            text="Multiple Choice"
            onClick={() => setOpenMultipleChoice(!openMultipleChoice)}
            open={openMultipleChoice}
          >
            <ActivityButton text="Only text answer" onClick={() => handleNavigate("/multiple-choice/text")} />
            <ActivityButton text="Image and Text" onClick={() => handleNavigate("/multiple-choice/imagen-text")} />
            <ActivityButton text="Only Image" onClick={() => handleNavigate("/multiple-choice/only-imagen")} />
          </ActivityButton>

          {/* OPEN */}
          <ActivityButton text="Open" onClick={() => setOpenOpen(!openOpen)} open={openOpen}>
            <ActivityButton text="Text without image" onClick={() => handleNavigate("/open/text")} />
            <ActivityButton text="Text with image" onClick={() => handleNavigate("/open/text-img")} />
          </ActivityButton>

          {/* SORTABLE */}
          <ActivityButton text="Sortable" onClick={() => setOpenSortable(!openSortable)} open={openSortable}>
            <ActivityButton text="Order images" onClick={() => handleNavigate("/sortable/image")} />
            <ActivityButton text="Order words" onClick={() => handleNavigate("/sortable/word")} />
            <ActivityButton text="Order text" onClick={() => handleNavigate("/sortable/text")} />
          </ActivityButton>

          {/* RECORDING */}
          <ActivityButton text="Recording" onClick={() => setOpenRecording(!openRecording)} open={openRecording}>
          <ActivityButton text="Speaking without Image" onClick={() => handleNavigate("/speaking/by-text")} />
          <ActivityButton text="Speaking with Image" onClick={() => handleNavigate("/speaking/img")} />
          </ActivityButton>

          {/* LISTENING */}
          <ActivityButton text="Listening" onClick={() => setOpenListening(!openListening)} open={openListening}>
            <p className="text-red-500 font-bold">Not implemented yet</p>
          </ActivityButton>

          {/* READING */}
          <ActivityButton text="Reading" onClick={() => setOpenReading(!openReading)} open={openReading}>
            <p className="text-red-500 font-bold">Not implemented yet</p>
          </ActivityButton>
        </div>
        <div>
          <button className="bg-gray-400 w-48" onClick={() => navigate("/levels/skills/quest")}>
            Back
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
};

interface IProps {
  open?: boolean;
  text: string;
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}
const ActivityButton = ({ text, onClick, children, open = false, className }: IProps) => (
  <div>
    <DialogActivity open={open} handleClose={onClick}>
      {children}
    </DialogActivity>
    <button onClick={onClick} className={`min-w-48 bg-cyan-700 ${className}`}>
      {text}
    </button>
  </div>
);
