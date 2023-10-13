import { defineStore } from "pinia";

import VideoService from "~/services/Videos/Videos";
import type { Club, Fields } from "~/typings/Field&Sport";
import type { VideoType } from "~/typings/VideoTypes";

const videoService = new VideoService();
interface RootState {
	clubs: Club[],
	videos: null | VideoType[]
}

const useClubStore = defineStore("useClubStore", {
	state: (): RootState => ({
		clubs: [
			{
				name: "complejo #1",
				image: "https://i.pinimg.com/736x/43/83/47/438347c76787a041cf4ce69f86790d5f.jpg",
				id: "complejo-1",
				sports: [
					{
						name: "padel",
						image: "https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg",
						id: "esto-es-un-id-1",
						fields: [
							{
								name: "Cancha 1",
								id: "Cancha-1",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "8pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 2",
								id: "Cancha-2",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 3",
								id: "Cancha-3",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 4",
								id: "Cancha-4",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
						],
					},
				],
			},
			{
				name: "Complejo 2",
				image: "https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg",
				id: "complejo-2",
				sports: [
					{
						name: "padel",
						image: "https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg",
						id: "esto-es-un-id-2",
						fields: [
							{
								name: "Cancha 1",
								id: "Cancha-1",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 2",
								id: "Cancha-2",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 3",
								id: "Cancha-3",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 4",
								id: "Cancha-4",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
						],
					},
				],
			},
			{
				name: "Complejo 3",
				image: "https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg",
				id: "Complejo-3",
				sports: [
					{
						name: "padel",
						image: "https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg",
						id: "esto-es-un-id-3",
						fields: [
							{
								name: "Cancha 1",
								id: "Cancha-1",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 2",
								id: "Cancha-2",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 3",
								id: "Cancha-3",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 4",
								id: "Cancha-4",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
						],
					},
				],
			},
			{
				name: "Complejo 4",
				image: "https://i.pinimg.com/736x/b1/c4/af/b1c4afe4e893582ffbda3c48ccca6c81.jpg",
				id: "Complejo-4",
				sports: [
					{
						name: "padel",
						image: "https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg",
						id: "esto-es-un-id-4",
						fields: [
							{
								name: "Cancha 1",
								id: "Cancha-1",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 2",
								id: "Cancha-2",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 3",
								id: "Cancha-3",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
							{
								name: "Cancha 4",
								id: "Cancha-4",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: 'lunes 1',
										month: 'Enero',
										startHour: "1pm",
										endHour: "3pm",
									},
								],
							},
						],
					},
				],
			},
		],
		videos: null
	}),
	actions: {
		async getVideos(): Promise<void> {
			try {
				const response = await videoService.getVideos();
				this.videos = response.data;
				console.log(this.videos);
			} catch (error) {
				console.log(error);
			}
		}
	}
});

export default useClubStore;
