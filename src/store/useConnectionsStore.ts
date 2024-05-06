import { create } from "zustand";
import { IConnection } from "../components/partials/MatchColumns";

interface IConnections {
  connections: IConnection[];
  setConnections: (connections: IConnection[]) => void;
}

export const useConnectionsStore = create<IConnections>((set) => ({
  connections: [],
  setConnections: (connections: IConnection[]) => set(() => ({ connections })),
}));
