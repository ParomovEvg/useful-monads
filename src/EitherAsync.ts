import { Either, mergeInOne } from "./Either";

export class EitherAsync<L, R, C = undefined> {
  constructor(public eitherPromise: Promise<Either<L, R, C>>) {}

  static from<A, B, C>(e: Promise<Either<A, B, C>>): EitherAsync<A, B, C> {
    return new EitherAsync<A, B, C>(e);
  }

  static mergeInOneAsync<L1, R1>(
    values: [Promise<Either<L1, R1>>]
  ): EitherAsync<L1, [R1]>;
  static mergeInOneAsync<L1, R1, L2, R2>(
    values: [Promise<Either<L1, R1>>, Promise<Either<L2, R2>>]
  ): EitherAsync<L1 | L2, [R1, R2]>;
  static mergeInOneAsync<L1, R1, L2, R2, L3, R3>(
    values: [
      Promise<Either<L1, R1>>,
      Promise<Either<L2, R2>>,
      Promise<Either<L3, R3>>
    ]
  ): EitherAsync<L1 | L2 | L3, [R1, R2, R3]>;
  static mergeInOneAsync<L1, R1, L2, R2, L3, R3, L4, R4>(
    values: [
      Promise<Either<L1, R1>>,
      Promise<Either<L2, R2>>,
      Promise<Either<L3, R3>>,
      Promise<Either<L4, R4>>
    ]
  ): EitherAsync<L1 | L2 | L3 | L4, [R1, R2, R3, R4]>;
  static mergeInOneAsync<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5>(
    values: [
      Promise<Either<L1, R1>>,
      Promise<Either<L2, R2>>,
      Promise<Either<L3, R3>>,
      Promise<Either<L4, R4>>,
      Promise<Either<L5, R5>>
    ]
  ): EitherAsync<L1 | L2 | L3 | L4 | L5, [R1, R2, R3, R4, R5]>;
  static mergeInOneAsync<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6>(
    values: [
      Promise<Either<L1, R1>>,
      Promise<Either<L2, R2>>,
      Promise<Either<L3, R3>>,
      Promise<Either<L4, R4>>,
      Promise<Either<L5, R5>>,
      Promise<Either<L6, R6>>
    ]
  ): EitherAsync<L1 | L2 | L3 | L4 | L5 | L6, [R1, R2, R3, R4, R5, R6]>;
  static mergeInOneAsync<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7
  >(
    values: [
      Promise<Either<L1, R1>>,
      Promise<Either<L2, R2>>,
      Promise<Either<L3, R3>>,
      Promise<Either<L4, R4>>,
      Promise<Either<L5, R5>>,
      Promise<Either<L6, R6>>,
      Promise<Either<L7, R7>>
    ]
  ): EitherAsync<
    L1 | L2 | L3 | L4 | L5 | L6 | L7,
    [R1, R2, R3, R4, R5, R6, R7]
  >;
  static mergeInOneAsync<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7,
    L8,
    R8
  >(
    values: [
      Promise<Either<L1, R1>>,
      Promise<Either<L2, R2>>,
      Promise<Either<L3, R3>>,
      Promise<Either<L4, R4>>,
      Promise<Either<L5, R5>>,
      Promise<Either<L6, R6>>,
      Promise<Either<L7, R7>>,
      Promise<Either<L8, R8>>
    ]
  ): EitherAsync<
    L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8,
    [R1, R2, R3, R4, R5, R6, R7, R8]
  >;
  static mergeInOneAsync<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7,
    L8,
    R8,
    L9,
    R9
  >(
    values: [
      Promise<Either<L1, R1>>,
      Promise<Either<L2, R2>>,
      Promise<Either<L3, R3>>,
      Promise<Either<L4, R4>>,
      Promise<Either<L5, R5>>,
      Promise<Either<L6, R6>>,
      Promise<Either<L7, R7>>,
      Promise<Either<L8, R8>>,
      Promise<Either<L9, R9>>
    ]
  ): EitherAsync<
    L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9,
    [R1, R2, R3, R4, R5, R6, R7, R8, R9]
  >;
  static mergeInOneAsync<
    L1,
    R1,
    L2,
    R2,
    L3,
    R3,
    L4,
    R4,
    L5,
    R5,
    L6,
    R6,
    L7,
    R7,
    L8,
    R8,
    L9,
    R9,
    L10,
    R10
  >(
    values: [
      Promise<Either<L1, R1>>,
      Promise<Either<L2, R2>>,
      Promise<Either<L3, R3>>,
      Promise<Either<L4, R4>>,
      Promise<Either<L5, R5>>,
      Promise<Either<L6, R6>>,
      Promise<Either<L7, R7>>,
      Promise<Either<L8, R8>>,
      Promise<Either<L9, R9>>,
      Promise<Either<L10, R10>>
    ]
  ): EitherAsync<
    L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10,
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]
  >;
  static mergeInOneAsync<L, R>(
    either: Array<Promise<Either<unknown, unknown>>>
  ): EitherAsync<L, R[]>;
  static mergeInOneAsync(
    asyncEithers: Array<Promise<Either<unknown, unknown>>>
  ) {
    return EitherAsync.from(
      Promise.all(asyncEithers).then((eithers) => mergeInOne(eithers))
    );
  }

  chain<A, B, NC>(
    f: (r: R, c: C) => Either<A, B, NC>
  ): EitherAsync<A | L, B, C> {
    return EitherAsync.from(this.eitherPromise.then((e) => e.chain(f)));
  }
  asyncChain<A, B, NC>(
    f: (r: R, c: C) => Promise<Either<A, B, NC>>
  ): EitherAsync<A | L, B, C> {
    return EitherAsync.from(
      this.eitherPromise.then((e) => e.asyncChain(f).run())
    );
  }
  isLeft(): Promise<boolean> {
    return this.eitherPromise.then((e) => e.isLeft());
  }

  isRight(): Promise<boolean> {
    return this.eitherPromise.then((e) => e.isRight());
  }

  mapLeft<T>(f: (l: L) => T): EitherAsync<T, R, C> {
    return EitherAsync.from(this.eitherPromise.then((e) => e.mapLeft(f)));
  }

  map<T>(f: (r: R, c: C) => T): EitherAsync<L, T, C> {
    return EitherAsync.from(this.eitherPromise.then((e) => e.map(f)));
  }

  mapContext<T>(f: (r: R, context: C) => T): EitherAsync<L, R, T> {
    return EitherAsync.from(this.eitherPromise.then((e) => e.mapContext(f)));
  }

  asyncMap<T>(f: (r: R, c: C) => Promise<T>): EitherAsync<L, T, C> {
    return EitherAsync.from(
      this.eitherPromise.then((e) => e.asyncMap(f).run())
    );
  }

  saveInContext(): EitherAsync<L, R, R> {
    return EitherAsync.from(this.eitherPromise.then((e) => e.saveInContext()));
  }

  caseOf<A, B>(obj: {
    left: (e: L) => A;
    right: (r: R, c: C) => B;
  }): Promise<A | B> {
    return this.eitherPromise.then((e) => e.caseOf(obj));
  }
  orDefault<T>(def: T): Promise<R | T> {
    return this.eitherPromise.then((e) => e.orDefault(def));
  }
  extract(): Promise<
    | { left: L; right: null; context: undefined }
    | { right: R; left: null; context: C }
  > {
    return this.eitherPromise.then((e) => e.extract());
  }
  run(): Promise<Either<L, R, C>> {
    return this.eitherPromise;
  }
}

export const mergeInOneAsync = EitherAsync.mergeInOneAsync;
