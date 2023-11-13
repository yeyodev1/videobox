import { AxiosResponse } from 'axios';
import APIBase from '../Base';
import type { VideoType } from '~/typings/VideoTypes';
class VideoService extends APIBase {
  async getVideos(): Promise<AxiosResponse<VideoType[] | null>> {
    return this.get('videos')
  }

  async uploadVideo(file: File): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append('video', file);
    return this.postWithFormData<AxiosResponse>(`upload-video`, formData);
  }

  async releaseVideo(email: string, videoId: string): Promise<AxiosResponse> {
    return this.post(`release-video/${email}/${videoId}`);
  }

  async cutVideo(startTime: string, endTime: string, videoId: string) {
    return this.post('cut-video', { startTime, endTime, videoId });
  };

  async checkVideoStatus(taskId: string) {
    return this.get(`cut-video/${taskId}`)
  }
}
  export default VideoService;