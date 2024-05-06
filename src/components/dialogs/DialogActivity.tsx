import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Close } from "../../assets/icons/Close";
import HAPPY_VAMPIRE from "../../assets/logos/happy_vampire.png";

interface Props {
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

export const DialogActivity = ({ handleClose, open, children }: Props) => {

  const handleClick = () => {
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px", // Ajusta este valor según sea necesario para hacer los bordes más redondos
          width: "350px",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <div className="w-1/2 m-auto">
          <img src={HAPPY_VAMPIRE} alt="happy_vampire" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex gap-8 flex-col justify-center items-center py-2 ">{children}</div>
      </DialogContent>
      <DialogActions>
        <center className="w-full pb-5">
          <button onClick={handleClick} className="bg-red-500">
            <Close fill="white" />
          </button>
        </center>
      </DialogActions>
    </Dialog>
  );
};
