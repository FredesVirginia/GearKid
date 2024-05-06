import React, { useState } from "react";
import toast from "react-hot-toast";
import { FormContainer } from "../../../components/containers/FormContainer";
import { DialogReturnHome } from "../../../components/dialogs/DialogReturnHome";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { getColor } from "../../../helpers/getColor";
import { useFillBlanksWord, useMutationFillBlanksWord } from "../../../hooks/FillTheBlanks/hooksFillBlanks";
import { useActivityStore } from "../../../store/useActivityStore";
import { handlerError } from "../../../helpers/handlerError";

export const FB_byWordPage = () => {
  //? STATES
  // Modal
  const [open, setOpen] = useState(false);

  //? HOOKS
  const { ability, level, question_type } = useActivityStore();
  const { queryFillBlanksWord, questions, setQuestions } = useFillBlanksWord({ ability, level, question_type });
  const { mutCreateWord } = useMutationFillBlanksWord();

  function handleChange({ questionId, text, textId }: { questionId: string; text: string; textId: string }) {
    if (text.includes(" ")) return;

    const currentQuestion = questions.find((q) => q.id === questionId);
    if (currentQuestion) {
      const indexCurrentQuestion = questions.indexOf(currentQuestion);
      const currentText = currentQuestion.texts.find((w) => w.textId === textId);
      if (currentText) {
        const indexCurrentText = currentQuestion.texts.indexOf(currentText);
        currentText.text = text;
        setQuestions((prev) => {
          const newQuestions = [...prev];
          newQuestions[indexCurrentQuestion].texts[indexCurrentText].text = text;
          return newQuestions;
        });
      }
    }
  }

  function handleSubmit() {
    if (!queryFillBlanksWord.data) return;

    const response = questions
      .map((q) => q.texts)
      .flat()
      .map((t) => t.text)
      .filter((t) => t.trim() !== "");

    if (response.length !== questions.length) {
      toast.error("Please fill all the blanks");
      return;
    }

    mutCreateWord.mutate(
      { question_id: queryFillBlanksWord.data?.question_id, response },
      {
        onSuccess: () => {
          setOpen(true);
        },
        onError: (error) => {
          handlerError({ error });
        },
      }
    );
  }

  return (
    <ActivityLayout
      theme="fill-the-blanks"
      acitivityHeader={{
        acitivity: "Fill in the blanks",
        quest: "GRAMAR A1 LEVEL 2",
        description: "PART1: COMMON AND PROPER NOUNS",
        instruction: queryFillBlanksWord.data?.universal_instructions ?? "",
        info: queryFillBlanksWord.data?.custom_instructions ?? "",
      }}
      primaryColor={getColor("my-yellow-400")}
      nextProps={{ onClick: handleSubmit }}
      loading={queryFillBlanksWord.isPending}
    >
      <DialogReturnHome open={open} handleClose={() => setOpen(false)} />
      <div className="flex m-auto w-10/12 mt-5 border p-4 rounded-2xl border-gray-400">
        <FormContainer className="gap-5">
          {questions.map((question) => {
            return (
              <div key={question.id} className="flex gap-3 justify-start items-center flex-wrap">
                {question.question.split(" ").map((word, index) => (
                  <React.Fragment key={index}>
                    {word.startsWith("_") ? (
                      <input
                        type="text"
                        className="w-40"
                        value={question.texts.find((w) => w.textId === word.slice(1))!.text ?? "kk"}
                        onChange={({ target }) =>
                          handleChange({ questionId: question.id, text: target.value, textId: word.slice(1) })
                        }
                      />
                    ) : (
                      <p className="text-black">{word}</p>
                    )}
                  </React.Fragment>
                ))}
              </div>
            );
          })}
        </FormContainer>
      </div>
    </ActivityLayout>
  );
};

// const notify = () => toast("Here is your toast.");
