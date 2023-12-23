import { ParsedVideo, VideoInput } from "~/typings/VideoTypes";

export function parseVideoName({ name, fileId, _id, url }: VideoInput): ParsedVideo | null {
  // Actualiza la expresión regular para coincidir con el nuevo formato
  const match = name.match(/Cancha (\d+) CAM (\d+) (\w+) (\w+) (\d{2}-\d{2}) (\d{2}-\d{2}-\d{2})\.mp4/);

  if (match) {
    const [ , fieldNumber, camNumber, clubAcronym, sportAcronym, date, time] = match;
    const formattedDate = `${date.replace(/-/g, '/').split('/').reverse().join('/')}`; // Asume que el año es 20xx
    const formattedTime = time.replace(/-/g, ':');

    const getClubName = clubAcronym === 'DC' ? 'Deporcentro' : 'One Padel';
    const getSportName = sportAcronym === 'FUT' ? 'Futbol' : 'Padel';

    return {
      field: `Cancha ${fieldNumber}`,
      cam: `CAM ${camNumber}`,
      club: getClubName,
      sport: getSportName,
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