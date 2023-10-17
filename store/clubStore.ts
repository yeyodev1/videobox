import { defineStore } from 'pinia';

import VideoService from '~/services/Videos/Videos';
import type { Club } from '~/typings/Field&Sport';

const videoService = new VideoService();
interface RootState {
  clubs: Club[];
}

const useClubStore = defineStore("useClubStore", {
  state: (): RootState => ({
    clubs: [
      {  
      image: 'https://i.pinimg.com/236x/c5/3d/53/c53d537f7e8698a52ead8b02bfaba095.jpg',
      name: 'Complejo 1',
      id: 'complejo-1',
      sports: [
          {
            name: 'padel',
            image: 'https://i.pinimg.com/236x/c5/3d/53/c53d537f7e8698a52ead8b02bfaba095.jpg',
            id: 'padel-1',
            videos: []
          }
        ],
      },
    ]
  }),

  actions: {
    async getVideos(): Promise<void> {
      try {
        const response = await videoService.getVideos();
        this.clubs[0].sports[0].videos = response.data?.map(video => parseVideoName(video)).filter(Boolean) as VideoType;
      } catch (error) {
        console.log(error);
      }
    }
  }
});

export default useClubStore;
