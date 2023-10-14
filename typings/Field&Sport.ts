import { ParsedVideo } from "./VideoTypes"


interface Sport {
  image: string,
  name: string,
  id: string,
  videos: [],
}
interface Club {
  image: string,
  name: string,
  id: string,
  sports: Sport[]
}

export type {
  Club,
}