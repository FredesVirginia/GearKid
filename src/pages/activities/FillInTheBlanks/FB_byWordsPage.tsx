import React, { useState } from "react";
import toast from "react-hot-toast";
import { FormContainer } from "../../../components/containers/FormContainer";
import { DialogReturnHome } from "../../../components/dialogs/DialogReturnHome";
import { ActivityLayout } from "../../../components/layouts/ActivityLayout";
import { getColor } from "../../../helpers/getColor";
import { handlerError } from "../../../helpers/handlerError";
import { useFillBlanksWords, useMutationFillBlanksWords } from "../../../hooks/FillTheBlanks/hooksFillBlanks";
import { useActivityStore } from "../../../store/useActivityStore";

export const FB_byWordsPage = () => {
  //? STATES
  // Modal
  const [open, setOpen] = useState(false);

  const { ability, level, question_type } = useActivityStore();
  const { queryFillBlanksWords, questions, setQuestions } = useFillBlanksWords({ ability, level, question_type });
  const { mutCreateWords } = useMutationFillBlanksWords();

  const handleChange = ({ questionId, text, textId }: { questionId: string; text: string; textId: string }) => {
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
  };

  function handleSubmit() {
    if (!queryFillBlanksWords.data) return;

    const data = questions.map((q) => ({
      id: parseInt(q.id),
      response: q.texts.map((t) => t.text),
    }));

    if (data.some((r) => r.response.some((t) => t.trim() === ""))) {
      toast.error("Please fill all the blanks");
      return;
    }

    // remove repetitions
    const uniqueData = data.map((d) => {
      const set = new Set(d.response);
      return {
        ...d,
        response: Array.from(set),
      };
    });

    const response = {
      question_id: queryFillBlanksWords.data?.question_id,
      response: uniqueData,
    };

    mutCreateWords.mutate(response, {
      onSuccess: () => {
        setOpen(true);
      },
      onError: (error) => {
        handlerError({ error });
      },
    });
  }

  return (
    <ActivityLayout
      theme="fill-the-blanks"
      acitivityHeader={{
        acitivity: "Fill in the blanks",
        quest: "GRAMAR A1 LEVEL 2",
        description: "PART1: COMMON AND PROPER NOUNS",
        instruction: queryFillBlanksWords.data?.universal_instructions ?? "",
        info: queryFillBlanksWords.data?.custom_instructions ?? "",
      }}
      primaryColor={getColor("my-yellow-400")}
      nextProps={{ onClick: handleSubmit }}
      loading={queryFillBlanksWords.isPending}
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
