import { Either, left, mergeInOne, right } from "../Either";
import { EitherAsync, mergeInOneAsync } from "../EitherAsync";

describe("EitherAsync tests", () => {
  const createEither = (
    type: "left" | "right"
  ): EitherAsync<"error", "success"> =>
    type === "left"
      ? EitherAsync.from(Promise.resolve(left("error" as const)))
      : EitherAsync.from(Promise.resolve(right("success" as const)));

  test("run", async () => {
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(await eitherLeft.run().then((e) => e.value)).toBe("error");
    expect(await eitherRight.run().then((e) => e.value)).toBe("success");
  });

  test("isLeft", async () => {
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(await eitherLeft.isLeft()).toBe(true);
    expect(await eitherRight.isLeft()).toBe(false);
  });

  test("isRight", async () => {
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(await eitherLeft.isRight()).toBe(false);
    expect(await eitherRight.isRight()).toBe(true);
  });

  test("map", async () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(
      await eitherRight
        .map(() => "newSuccess")
        .run()
        .then((e) => e.value)
    ).toBe("newSuccess");
    expect(
      await eitherLeft
        .map(() => "newSuccess")
        .run()
        .then((e) => e.value)
    ).toBe("error");

    eitherLeft.map(mapFn);
    expect(mapFn).not.toHaveBeenCalled();
  });

  it("mapLeft", async () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(
      await eitherLeft
        .mapLeft(() => "newError")
        .run()
        .then((e) => e.value)
    ).toBe("newError");
    expect(
      await eitherRight
        .mapLeft(() => "newError")
        .run()
        .then((e) => e.value)
    ).toBe("success");

    eitherRight.mapLeft(mapFn);
    expect(mapFn).not.toHaveBeenCalled();
  });

  it("asyncMap", async () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(
      await eitherRight
        .asyncMap(() => Promise.resolve("newSuccess"))
        .run()
        .then((e) => e.value)
    ).toBe("newSuccess");

    expect(
      await eitherLeft
        .asyncMap(() => Promise.resolve("newSuccess"))
        .run()
        .then((e) => e.value)
    ).toBe("error");

    eitherLeft.asyncMap((r) => Promise.resolve(mapFn()));
    expect(mapFn).not.toHaveBeenCalled();
  });

  it("chain", async () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(
      await eitherRight
        .chain(() => right("newSuccess"))
        .run()
        .then((e) => e.value)
    ).toBe("newSuccess");
    expect(
      await eitherRight
        .chain(() => left("newError"))
        .run()
        .then((e) => e.value)
    ).toBe("newError");
    expect(
      await eitherLeft
        .chain(() => right("newSuccess"))
        .run()
        .then((e) => e.value)
    ).toBe("error");
    expect(
      await eitherLeft
        .chain(() => left("newSuccess"))
        .run()
        .then((e) => e.value)
    ).toBe("error");

    eitherLeft.chain(() => {
      mapFn();
      return left("");
    });
    expect(mapFn).not.toHaveBeenCalled();
  });
  it("asyncChain", async () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherRightPromise = Promise.resolve(right("newSuccess"));
    const eitherLeft = createEither("left");
    const eitherLeftPromise = Promise.resolve(left("newError"));

    expect(
      await eitherRight
        .asyncChain(() => eitherRightPromise)
        .run()
        .then((e) => e.value)
    ).toBe("newSuccess");
    expect(
      await eitherRight
        .asyncChain(() => eitherLeftPromise)
        .run()
        .then((e) => e.value)
    ).toBe("newError");
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

  test("caseOf", async () => {
    const mapFn = jest.fn();
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(
      await eitherRight.caseOf({
        left: (e) => e,
        right: (r) => r,
      })
    ).toBe("success");
    expect(
      await eitherLeft.caseOf({
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

  test("orDefault", async () => {
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(await eitherRight.orDefault("default")).toBe("success");
    expect(await eitherLeft.orDefault("default")).toBe("default");
  });

  test("extract", async () => {
    const eitherRight = createEither("right");
    const eitherLeft = createEither("left");

    expect(await eitherRight.extract()).toEqual({
      right: "success",
      left: null,
    });
    expect(await eitherLeft.extract()).toEqual({ right: null, left: "error" });
  });

  test("mergeInOne", async () => {
    const eitherRight = createEither("right");
    const eitherRight2 = EitherAsync.from(Promise.resolve(right("success2")));
    const eitherLeft = createEither("left");
    const eitherLeft2 = EitherAsync.from(Promise.resolve(left("error2")));

    expect(
      await mergeInOneAsync([eitherRight, eitherRight2])
        .run()
        .then((e) => e.value)
    ).toEqual(["success", "success2"]);
    expect(
      await mergeInOneAsync([eitherRight, eitherLeft])
        .run()
        .then((e) => e.value)
    ).toBe("error");
    expect(
      await mergeInOneAsync([eitherLeft, eitherLeft2])
        .run()
        .then((e) => e.value)
    ).toBe("error2");
  });
});
