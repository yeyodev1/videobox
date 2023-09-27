interface Sport {
  image: string,
  name: string,
  id: string,
}

interface Field {
  image: string,
  name: string,
  id: string,
  sports: Sport []
}

export type {
  Field,
}