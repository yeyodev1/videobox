import { ParsedVideo, VideoInput } from "~/typings/VideoTypes";

export function parseVideoName({ name, fileId, _id, url }: VideoInput): ParsedVideo | null {
  const match = name.match(/Cancha (\d+) CAM (\d+) (\w+) (\w+) (\d{4}-\d{2}-\d{2}) (\d{2}-\d{2}-\d{2})\.mp4/);

  if (match) {
    const [ , fieldNumber, camNumber, clubName, sportName, date, time] = match;
    const formattedDate = date.replace(/-/g, '/');
    const formattedTime = time.replace(/-/g, ':');

    return {
      field: `Cancha ${fieldNumber}`,
      cam: `CAM ${camNumber}`,
      club: clubName,
      sport: sportName,
      date: formattedDate,
      time: formattedTime,
      fileId: fileId, 
      id: _id, 
      url: url 
    };
  } else {
    return null;
  }
}

export function filterVideosByField(videos: ParsedVideo[], selectedField: string): ParsedVideo[] {
  return videos.filter(video => video.field === selectedField);
}