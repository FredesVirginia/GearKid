import { useState } from "react";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { getColor } from "../../../helpers/getColor";
import { DialogReturnHome } from "../../../components/dialogs/DialogReturnHome";

interface IOption {
  id: string;
  option: string;
}

interface IQuestion {
  id: string;
  question: string;
  options: IOption[];
}

const INITIAL_DATA: IQuestion = {
  id: "1",
  question: "Lorem ipsum dolor sit amet consectetu _",
  options: [
    {
      id: "1",
      option: "Lorem ipsum dolor sit amet",
    },
    {
      id: "2",
      option: "Lorem ipsum dolor sit",
    },
    {
      id: "3",
      option: "Lorem ipsum dolor",
    },
  ],
};

export const MultipleChoiceTextPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption>();

  // MODAL 
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setLoading(false);
    setOpen(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  };

  return (
    <ActivityLayout
      nextProps={{ form: "form-unscramble", type: "submit", disabled: loading, onClick: handleSubmit }}
      theme="multiple-choice"
      acitivityHeader={{
        acitivity: "Multiple Choice",
        quest: "GRAMAR A1 LEVEL 2",
        description: "PART1: COMMON AND PROPER NOUNS",
        instruction: "Select the best option matching with the sentence",
      }}
      primaryColor={getColor("my-blue-500")}
    >
      <DialogReturnHome open={open} handleClose={() => setOpen(false)} />
      <div className="w-10/12 m-auto mt-5 max-md:w-full">
        <p className="text-blue-900 font-bold text-sm">
          What could it be the best season to surf at the beach with warm water, perfect sun and a friendly enviroment
        </p>
        <div className="mt-5 flex flex-col gap-10">
          <div className="flex flex-col gap-1">
            <p className="text-blue-900 font-bold text-sm">{INITIAL_DATA.question}</p>
            <div className="flex gap-3 flex-col">
              {INITIAL_DATA.options.map((option, index) => (
                <div
                  key={option.id}
                  className={`flex gap-3 ring-1 border-0 ring-gray-200 items-center 
                    p-4 cursor-pointer rounded-xl max-sm: mx-1
                    hover:ring-blue-900 group transition-all ${
                      selectedOption?.id === option.id ? "ring-2 !ring-blue-900 selected" : ""
                    }`}
                  onClick={() => setSelectedOption(option)}
                >
                  <div
                    className={`w-6 h-6 rounded-md ring-1 border-0 ring-gray-200 
                      group-[.selected]:ring-blue-900 
                      group-[.selected]:ring-2 
                    flex justify-center items-center transition-all`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-sm">{option.option}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ActivityLayout>
  );
};
