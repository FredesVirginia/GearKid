import { useState } from "react";

import { DialogReturnHome } from "../../../components/dialogs/DialogReturnHome";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { getColor } from "../../../helpers/getColor";
import { handlerError } from "../../../helpers/handlerError";
import { useMutationTrueFalseText, useTrueFalseText } from "../../../hooks/TrueOrFalse/hooksTrueFalse";
import { useActivityStore } from "../../../store/useActivityStore";

export const TrueOrFalsePage = () => {
  //? STATES
  // MODAL
  const [open, setOpen] = useState(false);

  //? HOOKS
  const { ability, level, question_type } = useActivityStore();
  const { queryTrueFalseText, data, handleChange } = useTrueFalseText({ ability, level, question_type });
  const { mutPostTrueFalseText } = useMutationTrueFalseText();

  const handleNext = () => {
    if (!queryTrueFalseText.data) return;

    const answers = data.map((q) => ({ id: q.id, answer: q.checked }));

    const response = {
      question_id: queryTrueFalseText.data?.question_id,
      answers,
    };

    mutPostTrueFalseText.mutate(response, {
      onSuccess: () => {
        setOpen(true);
      },
      onError: (error) => {
        handlerError({ error });
      },
    });
  };

  return (
    <ActivityLayout
      saveProps={{
        className: "",
      }}
      nextProps={{
        className: "",
        onClick: handleNext,
      }}
      theme="true-false"
      acitivityHeader={{
        acitivity: "True or False",
        quest: "GRAMAR A1 LEVEL 2",
        description: "PART1: COMMON AND PROPER NOUNS",
        instruction: queryTrueFalseText.data?.universal_instructions ?? "",
        info: queryTrueFalseText.data?.custom_instructions ?? "",
      }}
      primaryColor={getColor("my-pink-500")}
      loading={queryTrueFalseText.isPending}
    >
      <DialogReturnHome open={open} handleClose={() => setOpen(false)} />
      {data.map((q) => (
        <div className="">
          <h2 className="text-center text-base mb-5 font-semibold text-my-purple-900">{q.question}</h2>
          <center>
            <div
              className={`m-4 rounded-xl h[90px]  py-5 cursor-pointer border border-my-pink-500 ${
                q.checked ? "bg-my-pink-500 " : "bg-white"
              }`}
              onClick={() => handleChange(q.id, true)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={` rounded-xl font-semibold text-black px-5 py-4 border border-my-pink-500 ml-5 ${
                    q.checked ? "bg-pink-100" : "bg-white"
                  }`}
                >
                  1
                </div>
                <p className={`font-semibold ${q.checked ? "text-white" : "text-black"}`}>True</p>
              </div>
            </div>
            <div
              className={`m-4 rounded-xl h-[90px] py-5 cursor-pointer border border-my-pink-500 ${
                !q.checked ? "bg-my-pink-500 " : "bg-white"
              }`}
              onClick={() => handleChange(q.id, false)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={` rounded-xl font-semibold text-black px-5 py-4 border border-my-pink-500 ml-5 ${
                    !q.checked ? "bg-pink-100" : "bg-white"
                  }`}
                >
                  2
                </div>
                <p className={`font-semibold ${!q.checked ? "text-white" : "text-black"}`}>False</p>
              </div>
            </div>
          </center>
        </div>
      ))}
    </ActivityLayout>
  );
};
