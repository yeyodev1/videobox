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
    console.log(email, videoId)
    return this.post(`release-video/${email}/${videoId}`);
  }
}
export default VideoService;