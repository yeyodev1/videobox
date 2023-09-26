interface Sport {
  image: string,
  name: string,
  id: string,
  link: string,
}

interface Field {
  image: string,
  name: string,
  id: string,
  link: string,
  sports: Sport []
}

export type {
  Field,
}