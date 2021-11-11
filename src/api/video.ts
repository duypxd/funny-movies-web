import http from "./http";
import { TItemVideo } from "../views/Videos";

export async function getAllVideos() {
  try {
    return await http.get('api/video');
  } catch (err: any) {
    throw err?.response?.data;
  }
}

export async function postVideo(data: TItemVideo) {
  try {
    return await http.post('api/video', data);
  } catch (err: any) {
    throw err?.response?.data;
  }
}
