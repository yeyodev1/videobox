interface Schedule {
  id: string,
  day: string,
  month: string
  startHour: string,
  endHour: string 
}


interface Fields {
  name: string,
  id: string,
  schedule: Schedule[]
}

interface Sport {
  image: string,
  name: string,
  id: string,
  fields: Fields[]
}


interface Club {
  image: string,
  name: string,
  id: string,
  sports: Sport[]
}

export type {
  Club,
  Sport,
  Fields,
  Schedule,
}