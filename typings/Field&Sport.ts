import { ParsedVideo } from "./VideoTypes";

interface VideoTimeSlot {
  [time: string]: {
    cam: string;
    url: string;
    time: string;
    id: string;
  }[];
}

interface VideoDate {
  [date: string]: VideoTimeSlot;
}

interface VideoField {
  [fieldId: string]: VideoDate;
}

interface Sport {
  name: string;
  id: string;
  fields: VideoField;
}

interface Club {
  name: string;
  id: string;
  sports: Record<string, Sport>;
}

export type { Club, Sport, VideoField, VideoDate, VideoTimeSlot };
