import { useNavigate } from "react-router";
import { BackgroundLayout } from "../../components/layouts/BackgroundLayout";
import { MapMaskLayout } from "../../components/layouts/MapMaskLayout";

export const QuestMap = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/levels/skills/quest/exercises");
  
  return (
    <BackgroundLayout theme="login" imgProps={{ className: "opacity-10" }} mask={<MapMaskLayout />}>
      <div className="w-full flex justify-center items-center flex-col gap-9">
        <h1 className="font-bold">Quest Map</h1>
        <div className="grid grid-cols-[repeat(4,minmax(200px,1fr))] gap-7">
          <button onClick={handleClick} className="bg-red-400">Quest 1</button>
          <button onClick={handleClick} className="bg-red-400">Quest 2</button>
          <button onClick={handleClick} className="bg-red-400">Quest 3</button>
          <button onClick={handleClick} className="bg-red-400">Quest 4</button>
          <button onClick={handleClick} className="bg-red-400">Quest 5</button>
          <button onClick={handleClick} className="bg-red-400">Quest 6</button>
          <button onClick={handleClick} className="bg-red-400">Quest 7</button>
          <button onClick={handleClick} className="bg-red-400">Quest 8</button>
          <button onClick={handleClick} className="bg-red-400">Quest 9</button>
          <button onClick={handleClick} className="bg-red-400">Quest 10</button>
          <button onClick={handleClick} className="bg-red-400">Quest 11</button>
          <button onClick={handleClick} className="bg-red-400">Quest 12</button>
          <button onClick={handleClick} className="bg-red-400">Quest 13</button>
          <button onClick={handleClick} className="bg-red-400">Quest 14</button>
          <button onClick={handleClick} className="bg-red-400">Quest 15</button>
          <button onClick={handleClick} className="bg-red-400">Quest 16</button>
        </div>
        <div>
          <button className="bg-gray-400 w-48" onClick={() => navigate('/levels/skills')}>
            Back
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
};
