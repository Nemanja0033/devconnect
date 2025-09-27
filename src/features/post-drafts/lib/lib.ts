import { PostDraftType, ProjectDraftType } from "../types";

export function mapDraftsToNumberArray(drafts: PostDraftType[] | ProjectDraftType[]) : number[]{
    if (drafts.length === 0 || !drafts) return [];
    const numbersArray = drafts.map((draft, i) => (i + 1));
    return numbersArray;
}