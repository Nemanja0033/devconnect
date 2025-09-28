import { mapImagesToObject } from "./lib"

describe("mapImageToObject", () => {
    it("Should return array with images object", () => {
        const result = mapImagesToObject(['dasdsa']);
        expect(result).toEqual([{ url: 'dasdsa'}]);
    })
})