import { PostDraftType, ProjectDraftType } from "../types";

export function mapDraftsToNumberArray(drafts: PostDraftType[] | ProjectDraftType[]) : number[]{
    if (drafts.length === 0 || !drafts) return [];
    console.log(drafts);
    const numbersArray = drafts.map((draft, i) => (i + 1));
    console.log(numbersArray);
    return numbersArray;
}