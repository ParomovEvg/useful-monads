import { Either, left, right, mergeInOne, isEither } from "..";
import objectContaining = jasmine.objectContaining;

describe("Either tests", () => {
  test("right", () => {
    const either = right("success");
    expect(either.isRight()).toBe(true);
    expect(either.isLeft()).toBe(false);
    expect(either.value).toBe("success");
  });
  test("left", () => {
    const either = left("error");
    expect(either.isRight()).toBe(false);
    expect(either.isLeft()).toBe(true);
    expect(either.value).toBe("error");
  });

  const createEither = (type: "left" | "right"): Either<"error", "success"> =>
    type === "left" ? left("error" as const) : right("success");
  const createEither2 = (
    type: "left" | "right"
  ): Either<"error2", "success2"> =>
    type === "left" ? left("error2" as const) : right("success2");

  test("map", () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(eitherRight.map(() => "newSuccess").value).toBe("newSuccess");
    expect(eitherLeft.map(() => "newSuccess").value).toBe("error");

    eitherLeft.map(mapFn);
    expect(mapFn).not.toHaveBeenCalled();
  });

  it("mapLeft", () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(eitherRight.mapLeft(() => "newError").value).toBe("success");
    expect(eitherLeft.mapLeft(() => "newError").value).toBe("newError");

    eitherRight.mapLeft(mapFn);
    expect(mapFn).not.toHaveBeenCalled();
  });

  it("asyncMap", async () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    const rightResult = await eitherRight
      .asyncMap(() => Promise.resolve("newSuccess"))
      .run()
      .then((e) => e.value);
    expect(rightResult).toBe("newSuccess");

    const leftResult = await eitherLeft
      .asyncMap(() => Promise.resolve("newSuccess"))
      .run()
      .then((e) => e.value);
    expect(leftResult).toBe("error");

    eitherLeft.asyncMap((r) => Promise.resolve(mapFn()));
    expect(mapFn).not.toHaveBeenCalled();
  });

  it("chain", async () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherRight2 = createEither2("right");
    const eitherLeft = createEither("left");
    const eitherLeft2 = createEither2("left");

    expect(eitherRight.chain(() => eitherRight2).value).toBe("success2");
    expect(eitherRight.chain(() => eitherLeft2).value).toBe("error2");
    expect(eitherLeft.chain(() => eitherRight2).value).toBe("error");
    expect(eitherLeft.chain(() => eitherLeft2).value).toBe("error");

    eitherLeft.chain(() => {
      mapFn();
      return eitherRight2;
    });
    expect(mapFn).not.toHaveBeenCalled();
  });
  it("asyncChain", async () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherRightPromise = Promise.resolve(createEither2("right"));
    const eitherLeft = createEither("left");
    const eitherLeftPromise = Promise.resolve(createEither2("left"));

    expect(
      await eitherRight
        .asyncChain(() => eitherRightPromise)
        .run()
        .then((e) => e.value)
    ).toBe("success2");
    expect(
      await eitherRight
        .asyncChain(() => eitherLeftPromise)
        .run()
        .then((e) => e.value)
    ).toBe("error2");
    expect(
      await eitherLeft
        .asyncChain(() => eitherRightPromise)
        .run()
        .then((e) => e.value)
    ).toBe("error");
    expect(
      await eitherLeft
        .asyncChain(() => eitherLeftPromise)
        .run()
        .then((e) => e.value)
    ).toBe("error");

    eitherLeft.asyncChain(() => {
      mapFn();
      return eitherRightPromise;
    });
    expect(mapFn).not.toHaveBeenCalled();
  });

  test("caseOf", () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(
      eitherRight.caseOf({
        left: (e) => e,
        right: (r) => r,
      })
    ).toBe("success");
    expect(
      eitherLeft.caseOf({
        left: (e) => e,
        right: (r) => r,
      })
    ).toBe("error");

    eitherLeft.caseOf({
      right: mapFn,
      left: (e) => e,
    });
    expect(mapFn).not.toHaveBeenCalled();
  });

  test("orDefault", () => {
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(eitherRight.orDefault("default")).toBe("success");
    expect(eitherLeft.orDefault("default")).toBe("default");
  });

  test("extract", () => {
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(eitherRight.extract()).toEqual({
      right: "success",
      left: null,
    });
    expect(eitherLeft.extract()).toEqual({ right: null, left: "error" });
  });

  test("mergeInOne", () => {
    const eitherRight = createEither("right");
    const eitherRight2 = createEither2("right");
    const eitherLeft = createEither("left");
    const eitherLeft2 = createEither2("left");

    expect(mergeInOne([eitherRight, eitherRight2]).value).toEqual([
      "success",
      "success2",
    ]);
    expect(mergeInOne([eitherRight, eitherLeft]).value).toBe("error");
    expect(mergeInOne([eitherLeft, eitherLeft2]).value).toBe("error2");
  });

  test("isEither", () => {
    expect(isEither(createEither("left"))).toBe(true);
    expect(isEither(createEither("right"))).toBe(true);
    expect(isEither({})).toBe(false);
  });

  describe("context tests", () => {
    test("Save Context", () => {
      const eitherRight = createEither("right");
      const eitherRight2 = createEither2("right");
      const eitherLeft = createEither("left");
      expect(
        eitherRight
          .saveInContext()
          .map((r, c) => c + r)
          .orDefault("")
      ).toBe("successsuccess");

      expect(
        eitherRight
          .mapContext(() => "context" as const)
          .chain(() => eitherRight2)
          .mapContext((r, context) => r + context)
          .extract().context
      ).toBe("success2context");

      expect(
        eitherLeft
          .saveInContext()
          .chain(() => eitherRight)
          .extract().context
      ).toBe(undefined);
    });
  });
});
