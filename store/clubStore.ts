import { defineStore } from "pinia";

import VideoService from "~/services/Videos/Videos";
import type { Club, Fields } from "~/typings/Field&Sport";
import type { VideoType } from "~/typings/VideoTypes";

const videoService = new VideoService();
interface RootState {
  club: {
		name: string;
		image: string
	},
  videos: null | VideoType[]
}

const useClubStore = defineStore("useClubStore", {
  state: (): RootState => ({
    club: {
      name: 'el club Diego, hazlo y que lo lea',
      image: 'https://i.pinimg.com/236x/c5/3d/53/c53d537f7e8698a52ead8b02bfaba095.jpg'
    },
    videos: null
  }),

  actions: {
    async getVideos(): Promise<void> {
      try {
        const response = await videoService.getVideos();
        this.videos = response.data?.map(video => parseVideoName(video)).filter(Boolean) as VideoType;
        console.log(this.videos);
      } catch (error) {
        console.log(error);
      }
    }
  }
});

export default useClubStore;
