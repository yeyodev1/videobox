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
        id: 'complejo 1',
        link: 'complejo-1'
      },
      {
        name: 'Complejo 2',
        image: 'https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg',
        id: 'complejo-2',
        link: 'complejo-2'
      },
      {
        name: 'Complejo 3',
        image: 'https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg',
        id: 'Complejo-3',
        link: 'Complejo-3',
      },
      {
        name: 'Complejo 4',
        image: 'https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg',
        id: 'Complejo-4',
        link: 'Complejo-4',
      },
    ]
  }),
})

export default useFieldStore;