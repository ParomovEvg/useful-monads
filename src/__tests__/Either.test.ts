import { Either } from "../Either";

describe("Either tests", () => {
  it("Should return 1", () => {
    expect(new Either().map()).toBe(1);
  });
});
