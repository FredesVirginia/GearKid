import { ring } from "ldrs";

ring.register();

export interface ILoadingProps {
  size?: string;
  stroke?: string;
  bgOpacity?: string;
  speed?: string;
  color?: string;
}

export const LoadingRing = ({ size = "16", stroke = "2", bgOpacity = "0", speed = "2", color = "black" }: ILoadingProps) => {
  return <l-ring size={size} stroke={stroke} bg-opacity={bgOpacity} speed={speed} color={color}></l-ring>;
};
