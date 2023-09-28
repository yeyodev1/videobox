import { defineStore } from "pinia";
import { Club, Fields } from "~/typings/Field&Sport";

interface RootState {
	clubs: Club[];
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
						name: "tenis",
						image: "https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg",
						id: "esto-es-un-id-1",
						fields: [
							{
								name: "Cancha 1",
								id: "Cancha-1",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "8pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
						name: "tenis",
						image: "https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg",
						id: "esto-es-un-id-2",
						fields: [
							{
								name: "Cancha 1",
								id: "Cancha-1",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
						name: "tenis",
						image: "https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg",
						id: "esto-es-un-id-3",
						fields: [
							{
								name: "Cancha 1",
								id: "Cancha-1",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
						name: "tenis",
						image: "https://i.pinimg.com/736x/f6/52/12/f65212658964e531f7d6f4a4a2331712.jpg",
						id: "esto-es-un-id-4",
						fields: [
							{
								name: "Cancha 1",
								id: "Cancha-1",
								schedule: [
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
										startHour: "1pm",
										endHour: "3pm",
									},
									{
										id: 'aqui-veras-el-horario',
										day: '1',
										month: '3',
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
	}),
});

export default useClubStore;
