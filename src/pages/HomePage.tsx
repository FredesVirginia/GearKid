import {
  FormControl,
  InputLabel,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/butons/Button";
import { CollapseList } from "../components/lists/CollapseList";
import { useActivityStore } from "../store/useActivityStore";
import { TSkill } from "../types/TAbility";
import { TLevel } from "../types/TLevel";
import toast from "react-hot-toast";

export const HomePage = () => {
  const [openFillInTheBlanks, setOpenFillInTheBlanks] = useState(false);
  const [openMultipleChoice, setOpenMultipleChoice] = useState(false);
  const [openMatchTheColumns, setOpenMatchTheColumns] = useState(false);
  const [openDragAndDrop, setOpenDragAndDrop] = useState(false);
  const [openPickList, setOpenPickList] = useState(false);
  const [openUnscramble, setOpenUnscramble] = useState(false);
  const [openTrueOrFalse, setOpenTrueOrFalse] = useState(false);
  const [openOpen, setOpenOpen] = useState(false);
  const [openSortable, setOpenSortable] = useState(false);

  const navigation = useNavigate();

  const { setLevel, setAbility: setAbility, setQuestionType, ability: ability, level, question_type: questionType } = useActivityStore();

  const handleChangeAbility = (event: SelectChangeEvent) => {
    setAbility(event.target.value as TSkill);
  };

  const handleChangeLevel = (event: SelectChangeEvent) => {
    setLevel(event.target.value as TLevel);
  };

  const handleClickNavigate = (route: string) => {
    if (ability === "none" || level === "none") {
      toast.error("Please select an ability and level");
      return;
    }
    navigation(route);
  };

  useEffect(() => {
    if (ability === "none" || level === "none" || !questionType) {
      return;
    }

    localStorage.setItem("ability", ability);
    localStorage.setItem("level", level);
    localStorage.setItem("questionType", questionType);
  }, [ability, level, questionType]);

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,100px))] gap-2 p-2">
        <Button
          className="bg-red-400"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Log out
        </Button>
        {/* ABILITY */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Ability</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ability}
            label="Ability"
            onChange={handleChangeAbility}
          >
            <MenuItem value={"speaking"}>Speaking</MenuItem>
            <MenuItem value={"reading"}>Reading</MenuItem>
            <MenuItem value={"listening"}>Listening</MenuItem>
            <MenuItem value={"writing"}>Writing</MenuItem>
          </Select>
        </FormControl>

        {/* LEVEL */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Level</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            label="Level"
            onChange={handleChangeLevel}
          >
            <MenuItem value={"a1"}>A1</MenuItem>
            <MenuItem value={"a2"}>A2</MenuItem>
            <MenuItem value={"b1"}>B1</MenuItem>
            <MenuItem value={"b2"}>B2</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex gap-10 flex-wrap mb-10 mx-2"></div>
      <div className="flex gap-10 flex-wrap">
        {/* TRUE OR FALSE */}
        <CollapseList open={openTrueOrFalse} setOpen={setOpenTrueOrFalse} title="True or False">
          <ListItemButton onClick={() => handleClickNavigate("/levels/activities/true-or-false/by-text")}>
            <ListItemText primary="True or False" />
          </ListItemButton>
        </CollapseList>

        {/* UNSCRAMBLE */}
        <CollapseList open={openUnscramble} setOpen={setOpenUnscramble} title="Unscramble">
          <ListItemButton onClick={() => handleClickNavigate("/levels/activities/unscramble/sentences")}>
            <ListItemText primary="Unscramble" />
          </ListItemButton>
        </CollapseList>

        {/* DRAG AND DROP  */}
        <CollapseList open={openDragAndDrop} setOpen={setOpenDragAndDrop} title="Drag and drop">
          <ListItemButton onClick={() => handleClickNavigate("/levels/activities/drag-and-drop/image")}>
            <ListItemText primary="Text or image from top to bottom / left to right" />
          </ListItemButton>
        </CollapseList>

        {/* PICK LIST */}
        <CollapseList open={openPickList} setOpen={setOpenPickList} title="Pick List">
          <ListItemButton onClick={() => handleClickNavigate("/levels/activities/picklist/text")}>
            <ListItemText primary="Sentence with posible answers" />
          </ListItemButton>
        </CollapseList>

        {/* MATCH THE COLUMNS */}
        <CollapseList open={openMatchTheColumns} setOpen={setOpenMatchTheColumns} title="Match the columns">
          <ListItemButton onClick={() => handleClickNavigate("/levels/activities/match-the-columns/text-text")}>
            <ListItemText primary="Text to Text" />
          </ListItemButton>
          <ListItemButton onClick={() => handleClickNavigate("/levels/activities/match-the-columns/image-text")}>
            <ListItemText primary="Image to Text" />
          </ListItemButton>
          <ListItemButton onClick={() => handleClickNavigate("/levels/activities/match-the-columns/text-image-text")}>
            <ListItemText primary="Text and image to Text" />
          </ListItemButton>
        </CollapseList>

        {/* FILL IN THE BLANKS */}
        <CollapseList open={openFillInTheBlanks} setOpen={setOpenFillInTheBlanks} title="Fill in the blanks">
          <ListItemButton
            onClick={() => {
              setQuestionType("ONE_WORD");
              handleClickNavigate("/levels/activities/fill-in-the-blanks/word");
            }}
          >
            <ListItemText primary="Just one word" />
          </ListItemButton>
          <ListItemButton onClick={() => handleClickNavigate("/levels/activities/fill-in-the-blanks/words")}>
            <ListItemText primary="Multiple words" />
          </ListItemButton>
        </CollapseList>

        {/* MULTIPLE CHOICE */}
        <CollapseList open={openMultipleChoice} setOpen={setOpenMultipleChoice} title="Multiple Choice">
          <ListItemButton onClick={() => handleClickNavigate("/levels/activities/multiple-choice/text")}>
            <ListItemText primary="Only text answer" />
          </ListItemButton>
        </CollapseList>

        {/* OPEN */}
        <CollapseList open={openOpen} setOpen={setOpenOpen} title="Open">
          <ListItemButton onClick={() => handleClickNavigate("/levels/activities/open/text")}>
            <ListItemText primary="Text withou image" />
          </ListItemButton>
        </CollapseList>

        {/* SORTABLE */}
        <CollapseList open={openSortable} setOpen={setOpenSortable} title="Sortable">
          <ListItemButton onClick={() => handleClickNavigate("/levels/activities/sortable/image")}>
            <ListItemText primary="Order images" />
          </ListItemButton>
        </CollapseList>
      </div>
      <hr />

      <div>
        {/* TRUE OR FALSE */}
        {/* <ActivityButton
          text="True or False"
          onClick={() => setOpenTrueOrFalse(!openTrueOrFalse)}
          open={openTrueOrFalse}
        >
          <ActivityButton text="By text" onClick={() => navigation("/levels/activities/true-or-false/by-text")} />
        </ActivityButton> */}

        {/* UNSCRAMBLE */}
        {/* <ActivityButton text="Unscramble" onClick={() => setOpenUnscramble(!openUnscramble)} open={openUnscramble}>
          <ActivityButton text="Sentences" onClick={() => navigation("/levels/activities/unscramble/sentences")} />
        </ActivityButton> */}

        {/* DRAG AND DROP  */}
        <CollapseList open={openDragAndDrop} setOpen={setOpenDragAndDrop} title="Drag and drop">
          <ListItemButton onClick={() => navigation("/levels/activities/drag-and-drop/image")}>
            <ListItemText primary="Text or image from top to bottom / left to right" />
          </ListItemButton>
        </CollapseList>

        {/* PICK LIST */}
        <CollapseList open={openPickList} setOpen={setOpenPickList} title="Pick List">
          <ListItemButton onClick={() => navigation("/levels/activities/picklist/text")}>
            <ListItemText primary="Sentence with posible answers" />
          </ListItemButton>
        </CollapseList>

        {/* MATCH THE COLUMNS */}
        <CollapseList open={openMatchTheColumns} setOpen={setOpenMatchTheColumns} title="Match the columns">
          <ListItemButton onClick={() => navigation("/levels/activities/match-the-columns/text-text")}>
            <ListItemText primary="Text to Text" />
          </ListItemButton>
          <ListItemButton onClick={() => navigation("/levels/activities/match-the-columns/image-text")}>
            <ListItemText primary="Image to Text" />
          </ListItemButton>
          <ListItemButton onClick={() => navigation("/levels/activities/match-the-columns/text-image-text")}>
            <ListItemText primary="Text and image to Text" />
          </ListItemButton>
        </CollapseList>

        {/* FILL IN THE BLANKS */}
        <CollapseList open={openFillInTheBlanks} setOpen={setOpenFillInTheBlanks} title="Fill in the blanks">
          <ListItemButton onClick={() => navigation("/levels/activities/fill-in-the-blanks/word")}>
            <ListItemText primary="Just one word" />
          </ListItemButton>
          <ListItemButton onClick={() => navigation("/levels/activities/fill-in-the-blanks/words")}>
            <ListItemText primary="Multiple words" />
          </ListItemButton>
        </CollapseList>

        {/* MULTIPLE CHOICE */}
        <CollapseList open={openMultipleChoice} setOpen={setOpenMultipleChoice} title="Multiple Choice">
          <ListItemButton onClick={() => navigation("/levels/activities/multiple-choice/text")}>
            <ListItemText primary="Only text answer" />
          </ListItemButton>
        </CollapseList>

        {/* OPEN */}
        <CollapseList open={openOpen} setOpen={setOpenOpen} title="Open">
          <ListItemButton onClick={() => navigation("/levels/activities/open/text")}>
            <ListItemText primary="Text withou image" />
          </ListItemButton>
        </CollapseList>

        {/* SORTABLE */}
        <CollapseList open={openSortable} setOpen={setOpenSortable} title="Sortable">
          <ListItemButton onClick={() => navigation("/levels/activities/sortable/image")}>
            <ListItemText primary="Order images" />
          </ListItemButton>
        </CollapseList>
      </div>
    </div>
  );
};

// interface IProps {
//   open?: boolean;
//   text: string;
//   onClick: () => void;
//   children?: React.ReactNode;
//   className?: string;
// }
// const ActivityButton = ({ text, onClick, children, open = false, className }: IProps) => (
//   <div>
//     <DialogActivity open={open} handleClose={onClick}>
//       {children}
//     </DialogActivity>
//     <button onClick={onClick} className={`w-40 ${className}`}>
//       {text}
//     </button>
//   </div>
// );
