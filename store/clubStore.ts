import { defineStore } from 'pinia';

import club from '@/assets/complejos/logo-club.jpeg';
import deporcentro from '@/assets/complejos/deporcentro.jpeg';

import VideoService from '~/services/Videos/Videos';
import type { Club } from '~/typings/Field&Sport';

const videoService = new VideoService();
interface RootState {
  clubs: Club[];
  errorMessage: string | null,
  isLoading: boolean,
}

const useClubStore = defineStore("useClubStore", {
	state: (): RootState => ({
		errorMessage: null,
		isLoading: false,
		clubs: [
			{
				image: club,
				name: "One Padel",
				id: "one-padel",
				sports: [
					{
						name: "padeleate",
						image: "https://i.pinimg.com/236x/c5/3d/53/c53d537f7e8698a52ead8b02bfaba095.jpg",
						id: "padel",
						videos: [],
					},
				],
			},
			{
				image: deporcentro,
				name: "Deporcentro",
				id: "deporcentro",
				sports: [
					{
						name: "soccer",
						image: "https://i.pinimg.com/236x/a6/4c/9c/a64c9c65e86b2a0d24359b610a110710.jpg",
						id: "futbol",
						videos: [],
					},
				],
			},
		],
	}),

	actions: {
		async getVideos(): Promise<void> {
			try {
				const response = await videoService.getVideos();
				const parsedVideos = response.data?.map(video => parseVideoName(video)).filter(Boolean);

				this.clubs.forEach(club => {
					club.sports.forEach(sport => {
						sport.videos = (parsedVideos ?? []).filter(Boolean) as VideoType[];
					});
				});
			} catch (error) {
				console.log(error);
			}
		},
		async releaseVideo(email: string, videoId: string): Promise<void> {
			this.isLoading = true;
			try {
				await videoService.releaseVideo(email, videoId);
			} catch (error: any) {
				this.errorMessage = error.message;
				console.log(this.errorMessage);
			} finally {
				this.isLoading = false;
			}
		},
	},
});

export default useClubStore;