import { defineStore } from 'pinia';

import onepadelImage from '@/assets/complejos/onepadel.jpeg';
import deporcentroImage from '@/assets/complejos/deporcentro.jpeg';

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
		async getVideos(isAdmin?: boolean): Promise<void> {
      this.isLoading = true;
      try {   
        const response = await videoService.getVideos(isAdmin);
        if (response.data) {
          const parsedVideos: ParsedVideo[] = response.data
            .map(video => parseVideoName(video))
            .filter((video): video is ParsedVideo => video !== null);
          parsedVideos.forEach(video => {
            const { club, sport, field, date, time, cam, url, id } = video;
            const clubImage = club == 'OnePadel' ? onepadelImage : club === 'Deporcentro' ? deporcentroImage : onepadelImage;
            if (!this.clubs[club]) {
              this.clubs[club] = {
                name: club, 
                id: club,
                sports: {},
                image: clubImage,
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
            this.clubs[club].sports[sport].fields[field].dates[date][time].push({ cam, url, time, id, date});
          });
        }
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    getRelatedVideos(videoId: any) {
      let relatedVideos = [];
      for (const clubKey in this.clubs) {
        for (const sportKey in this.clubs[clubKey].sports) {
          for (const fieldKey in this.clubs[clubKey].sports[sportKey].fields) {
            for (const dateKey in this.clubs[clubKey].sports[sportKey].fields[fieldKey].dates) {
              for (const timeKey in this.clubs[clubKey].sports[sportKey].fields[fieldKey].dates[dateKey]) {
                const videos = this.clubs[clubKey].sports[sportKey].fields[fieldKey].dates[dateKey][timeKey];
                if (Array.isArray(videos)) {
                  const foundVideo = videos.find(v => v.id === videoId);
                  if (foundVideo) {
                    return videos; 
                  }
                }
              }
              if (relatedVideos.length > 0) break; 
            }
            if (relatedVideos.length > 0) break;
          }
          if (relatedVideos.length > 0) break;
        }
        if (relatedVideos.length > 0) break;
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