interface Schedule {
  startHour: string,
  endHour: string 
}

interface Sport {
  image: string,
  name: string,
  id: string,
  schedule: Schedule[]
}


interface Field {
  image: string,
  name: string,
  id: string,
  sports: Sport[]
}

export type {
  Field,
  Sport
}