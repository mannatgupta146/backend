import { sum } from "../utils.js"

describe("sum fuction", () => {
    test("adds 1 + 2 to equal 3", () => {
        expect(sum(1, 2)).toBe(3)
    })
})