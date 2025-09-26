import { Images } from "@/features/post/types";

export enum DraftType {
    PROJECT = "PROJECT",
    CLASSIC = "CLASSIC"
}

export type PostDraftType = {
    title: string,
    content: string,
    images: Images[],
    id: string
    type: DraftType.CLASSIC | undefined;
}
  
  export type ProjectDraftType = {
    title: string,
    description: string,
    images: Images[],
    sourceUrl?: string,
    liveUrl?: string,
    issues?: string,
    id: string
    type: DraftType.PROJECT | undefined;
}