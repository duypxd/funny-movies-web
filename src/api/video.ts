import http from "./http";

export interface IVote { isVote: boolean; videoId: string }

export type TItemVideo = {
  _id?: string;
  url: string;
  title: string;
  desc: string;
  videoId: string;
  authorShare: string;
  likes?: number;
  unLikes?: number;
  isLike?: boolean;
  isUnLikes?: boolean;
  updatedAt?: string;
  createdAt?: string;
};

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

export async function putVoteVideo(data: IVote) {
  try {
    return await http.put(`api/video/${data.videoId}`, { isVote: data.isVote });
  } catch (err: any) {
    throw err?.response?.data;
  }
}
