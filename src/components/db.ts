import axios from "axios";
import type { dblist, dbdetail } from "@/types";

// const index = async () => {
//   const response = await axios.get('/data/index.json');
//   return response.data;
// };

export async function getList(): Promise<dblist[]> {
  const response = await axios.get("/data/index.json");
  return response.data.list;
}

export async function getPath(id:number|string): Promise<string|null> {
  const res = await axios.get("/data/index.json")
  const list: dblist[] = res.data.list
  const item = list.find((item) => item.id === id)
  if (item) {
    return item.config
  }
  return null

}

export async function getDetail(config: string): Promise<dbdetail> {
  const res = await axios.get(config);
  return res.data;
}

// let db = await index();

// export default db;
