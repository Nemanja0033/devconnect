import { mapDraftsToNumberArray } from "./lib";
import { DraftType } from "../types";

describe('mapDraftsToNumberArray',() => {
    it("Should return an array of numbers", () => {
        const result = mapDraftsToNumberArray([ { title: 'dasd', content: 'dadsa', images: [{ url: 'dasda', id: 'dasdsa' }], id: 'dsad', type: DraftType.CLASSIC }]);
        expect(result).toEqual([1]);
    })
})