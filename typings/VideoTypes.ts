export interface ParsedVideo {
  club: string;
  sport: string;
  field: string;
  cam: string;
  date: string;
  time: string;
  fileId: string; 
  id: string; 
  url: string; 
}
// export interface ParsedVideo {
//   date: string;
//   time: string;
//   field: string;
//   fileId: string;
//   sportName: string;
//   clubName: string;
//   id: string;
//   url: string
// }

export interface VideoInput {
  name: string;
  _id: string;
  url: string;
  fileId: string;
}