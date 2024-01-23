import { BoardDataT, CardGroupT } from "../types/data";

export const sortDataFn = (data: BoardDataT | CardGroupT) => (a: string, b: string) => {
  return data[a].position - data[b].position;
};