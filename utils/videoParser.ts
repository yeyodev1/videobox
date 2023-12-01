import { ParsedVideo, VideoInput } from "~/typings/VideoTypes";

export function parseVideoName({name, fileId, _id, url}: VideoInput) : ParsedVideo | null {
  const match = name.match(/(\d{4}-\d{2}-\d{2}) (\d{2}-\d{2}-\d{2}) CAM (\d+).mp4/);

  if (match) {
    const [ , date, time, cam] = match;
    const formattedTime = time.replace(/-/g, ":");

    return {
      date: date,
      time: formattedTime,
      field: `Cancha ${cam}`,
      fileId: fileId,
      id: _id,
      url: url
    };
  } else {
    return null
  }
}

// export function parseVideoName({name, fileId, _id, url}: VideoInput) : ParsedVideo | null {
//   const match = name.match(/Cancha (\d+) CAM (\d+) (\w+) (\w+) (\d{4}-\d{2}-\d{2}) (\d{2}-\d{2}-\d{2}).mp4/);

//   if (match) {
//     const [ , cancha, cam, clubName, sportName, date, time] = match;
//     const formattedTime = time.replace(/-/g, ":");

//     return {
//       date: date,
//       time: formattedTime,
//       field: `Cancha ${cancha}`, 
//       clubName: clubName,       
//       sportName: sportName,     
//       fileId: fileId,
//       id: _id,
//       url: url
//     };
//   } else {
//     return null;
//   }
// }


export function filterVideosByField(videos: ParsedVideo[], selectedField: string): ParsedVideo[] {
  return videos.filter(video => video.field === selectedField);
}