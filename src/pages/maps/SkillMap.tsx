import { useNavigate } from "react-router";
import { BackgroundLayout } from "../../components/layouts/BackgroundLayout";
import { MapMaskLayout } from "../../components/layouts/MapMaskLayout";
import { TSkill } from "../../types/TAbility";
import { useActivityStore } from "../../store/useActivityStore";

export const SkillMap = () => {
  const navigate = useNavigate();
  const setAbility = useActivityStore((state) => state.setAbility);

  const handleClick = (skill: TSkill) => {
    navigate("/levels/skills/quest");
    setAbility(skill);
  };
  return (
    <BackgroundLayout theme="login" imgProps={{ className: "opacity-10" }} mask={<MapMaskLayout />}>
      <div className="w-full flex justify-center items-center flex-col gap-9">
        <h1 className="font-bold">Skills Map</h1>
        <div className="grid grid-cols-[repeat(2,minmax(200px,1fr))] gap-7">
          <button className="bg-orange-500" onClick={() => handleClick("use_of_english")}>
            Use of English
          </button>
          <button className="bg-orange-500" onClick={() => handleClick("listening")}>
            Listening
          </button>
          <button className="bg-orange-500" onClick={() => handleClick("reading")}>
            Reading
          </button>
          <button className="bg-orange-500" onClick={() => handleClick("writing")}>
            Writing
          </button>
          <button className="bg-orange-500" onClick={() => handleClick("speaking")}>
            Speaking
          </button>
          {/* <button className="bg-cyan-800" onClick={() => handleClick("castle")}>
            Castle
          </button> */}
        </div>
        <div>
          <button className="bg-gray-400 w-48" onClick={() => navigate("/levels")}>
            Back
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
};
