import { defineStore } from 'pinia';
import { Field } from '~/typings/Field&Sport';


interface RootState {
  fields: Field[],
}

const useFieldStore = defineStore('useFieldStore', {
  state: (): RootState => ({
    fields: [
      {
        name: 'complejo #1',
        image: 'https://i.pinimg.com/736x/43/83/47/438347c76787a041cf4ce69f86790d5f.jpg',
        id: 'complejo-1',
        sports: [
          {
            name: 'tenis',
            image: 'https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg',
            id: 'tenis',
          },
        ]
      },
      {
        name: 'Complejo 2',
        image: 'https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg',
        id: 'complejo-2',
        sports: [
          {
            name: 'tenis',
            image: 'https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg',
            id: 'tenis-2',
          },
        ]
      },
      {
        name: 'Complejo 3',
        image: 'https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg',
        id: 'Complejo-3',
        sports: [
          {
            name: 'tenis',
            image: 'https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg',
            id: 'tenis-3',
          },
        ]
      },
      {
        name: 'Complejo 4',
        image: 'https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg',
        id: 'Complejo-4',
        sports: [
          {
            name: 'tenis',
            image: 'https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg',
            id: 'tenis-4',
          },
        ]
      },
    ]
  }),
})

export default useFieldStore;