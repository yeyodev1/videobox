import { AxiosResponse } from 'axios';
import APIBase from '../Base';
import type { VideoType } from '~/typings/VideoTypes';
class VideoService extends APIBase {
  async getVideos(): Promise<AxiosResponse<VideoType[] | null>> {
    return this.get('/videos')
  }
}
export default VideoService;