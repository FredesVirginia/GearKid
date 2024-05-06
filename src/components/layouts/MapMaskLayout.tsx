import GEAR_ORIGINAL from "../../assets/logos/GEAR_ORIGINAL.svg";

export const MapMaskLayout = () => {
  return (
    <div className="w-full h-full absolute">
      <div className="w-32 h-32 m-auto mt-10">
        <img src={GEAR_ORIGINAL} alt="level-map" className="w-full h-full bg-cover" />
      </div>
    </div>
  );
};
