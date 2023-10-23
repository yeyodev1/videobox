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


export function filterVideosByField(videos: ParsedVideo[], selectedField: string): ParsedVideo[] {
  return videos.filter(video => video.field === selectedField);
}