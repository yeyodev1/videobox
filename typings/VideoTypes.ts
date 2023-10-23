export interface ParsedVideo {
  date: string;
  time: string;
  field: string;
  fileId: string;
  id: string;
  url: string
}

export interface VideoInput {
  name: string;
  _id: string;
  url: string;
  fileId: string;
}