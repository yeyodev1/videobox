import { defineStore } from 'pinia';

import club from '@/assets/complejos/logo-club.jpeg';
import deporcentro from '@/assets/complejos/deporcentro.jpeg';

import VideoService from '~/services/Videos/Videos';
import type { Club, Sport, VideoField, VideoDate, VideoTimeSlot } from '~/typings/Field&Sport';
import { ParsedVideo } from '~/typings/VideoTypes';

const videoService = new VideoService();
interface RootState {
  clubs: Record<string, Club>;
  errorMessage: string | null;
  isLoading: boolean;
}

const useClubStore = defineStore("useClubStore", {
	state: (): RootState => ({
    errorMessage: null,
    isLoading: false,
    clubs: {} 
  }),

	actions: {
		async getVideos(): Promise<void> {
      this.isLoading = true;
			try {
        const response = await videoService.getVideos();
        console.log(response.data)
        if (response.data) {
          const parsedVideos: ParsedVideo[] = response.data
            .map(video => parseVideoName(video))
            .filter((video): video is ParsedVideo => video !== null);
          parsedVideos.forEach(video => {
            const { club, sport, field, date, time, cam, url, id } = video;
            if (!this.clubs[club]) {
              this.clubs[club] = {
                name: club, 
                id: club,
                sports: {}
              };
            }
            if (!this.clubs[club].sports[sport]) {
              this.clubs[club].sports[sport] = {
                name: sport, 
                id: sport,
                fields: {}
              };
            }
            if (!this.clubs[club].sports[sport].fields[field]) {
              this.clubs[club].sports[sport].fields[field] = {
                dates: {}
              };
            }
						if (!this.clubs[club].sports[sport].fields[field].dates[date]) {
              this.clubs[club].sports[sport].fields[field].dates[date] = {};
            }
            if (!(time in this.clubs[club].sports[sport].fields[field].dates[date])) {
              this.clubs[club].sports[sport].fields[field].dates[date][time] = [] as { cam: string; url: string; }[];
            }
            this.clubs[club].sports[sport].fields[field].dates[date][time].push({ cam, url, time, id});
          });
        }
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
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