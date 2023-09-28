interface Schedule {
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


interface Field {
  image: string,
  name: string,
  id: string,
  sports: Sport[]
}

export type {
  Field,
  Sport,
  Fields,
  Schedule,
}