import { Either, mergeInOne } from "./Either";

export class EitherAsync<L, R> {
  constructor(public eitherPromise: Promise<Either<L, R>>) {}

  static from<A, B>(e: Promise<Either<A, B>>): EitherAsync<A, B> {
    return new EitherAsync<A, B>(e);
  }

  static mergeInOneAsync<L1, R1>(
    values: [EitherAsync<L1, R1>]
  ): EitherAsync<L1, [R1]>;
  static mergeInOneAsync<L1, R1, L2, R2>(
    values: [EitherAsync<L1, R1>, EitherAsync<L2, R2>]
  ): EitherAsync<L1 | L2, [R1, R2]>;
  static mergeInOneAsync<L1, R1, L2, R2, L3, R3>(
    values: [EitherAsync<L1, R1>, EitherAsync<L2, R2>, EitherAsync<L3, R3>]
  ): EitherAsync<L1 | L2 | L3, [R1, R2, R3]>;
  static mergeInOneAsync<L1, R1, L2, R2, L3, R3, L4, R4>(
    values: [
      EitherAsync<L1, R1>,
      EitherAsync<L2, R2>,
      EitherAsync<L3, R3>,
      EitherAsync<L4, R4>
    ]
  ): EitherAsync<L1 | L2 | L3 | L4, [R1, R2, R3, R4]>;
  static mergeInOneAsync<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5>(
    values: [
      EitherAsync<L1, R1>,
      EitherAsync<L2, R2>,
      EitherAsync<L3, R3>,
      EitherAsync<L4, R4>,
      EitherAsync<L5, R5>
    ]
  ): EitherAsync<L1 | L2 | L3 | L4 | L5, [R1, R2, R3, R4, R5]>;
  static mergeInOneAsync<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6>(
    values: [
      EitherAsync<L1, R1>,
      EitherAsync<L2, R2>,
      EitherAsync<L3, R3>,
      EitherAsync<L4, R4>,
      EitherAsync<L5, R5>,
      EitherAsync<L6, R6>
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
      EitherAsync<L1, R1>,
      EitherAsync<L2, R2>,
      EitherAsync<L3, R3>,
      EitherAsync<L4, R4>,
      EitherAsync<L5, R5>,
      EitherAsync<L6, R6>,
      EitherAsync<L7, R7>
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
      EitherAsync<L1, R1>,
      EitherAsync<L2, R2>,
      EitherAsync<L3, R3>,
      EitherAsync<L4, R4>,
      EitherAsync<L5, R5>,
      EitherAsync<L6, R6>,
      EitherAsync<L7, R7>,
      EitherAsync<L8, R8>
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
      EitherAsync<L1, R1>,
      EitherAsync<L2, R2>,
      EitherAsync<L3, R3>,
      EitherAsync<L4, R4>,
      EitherAsync<L5, R5>,
      EitherAsync<L6, R6>,
      EitherAsync<L7, R7>,
      EitherAsync<L8, R8>,
      EitherAsync<L9, R9>
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
      EitherAsync<L1, R1>,
      EitherAsync<L2, R2>,
      EitherAsync<L3, R3>,
      EitherAsync<L4, R4>,
      EitherAsync<L5, R5>,
      EitherAsync<L6, R6>,
      EitherAsync<L7, R7>,
      EitherAsync<L8, R8>,
      EitherAsync<L9, R9>,
      EitherAsync<L10, R10>
    ]
  ): EitherAsync<
    L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10,
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]
  >;
  static mergeInOneAsync<L, R>(
    either: Array<EitherAsync<L, R>>
  ): EitherAsync<L, R[]>;
  static mergeInOneAsync(asyncEithers: Array<EitherAsync<unknown, unknown>>) {
    return EitherAsync.from(
      Promise.all(asyncEithers.map((e) => e.run())).then((eithers) =>
        mergeInOne(eithers)
      )
    );
  }

  chain<A, B>(f: (r: R) => Either<A, B>): EitherAsync<A | L, B> {
    return EitherAsync.from(this.eitherPromise.then((e) => e.chain(f)));
  }
  asyncChain<A, B>(f: (r: R) => Promise<Either<A, B>>): EitherAsync<A | L, B> {
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

  mapLeft<T>(f: (l: L) => T): EitherAsync<T, R> {
    return EitherAsync.from(this.eitherPromise.then((e) => e.mapLeft(f)));
  }

  map<T>(f: (r: R) => T): EitherAsync<L, T> {
    return EitherAsync.from(this.eitherPromise.then((e) => e.map(f)));
  }
  asyncMap<T>(f: (r: R) => Promise<T>): EitherAsync<L, T> {
    return EitherAsync.from(
      this.eitherPromise.then((e) => e.asyncMap(f).run())
    );
  }
  caseOf<A, B>(obj: { left: (e: L) => A; right: (r: R) => B }): Promise<A | B> {
    return this.eitherPromise.then((e) => e.caseOf(obj));
  }
  orDefault<T>(def: T): Promise<R | T> {
    return this.eitherPromise.then((e) => e.orDefault(def));
  }
  extract(): Promise<{ left: L; right: null } | { right: R; left: null }> {
    return this.eitherPromise.then((e) => e.extract());
  }
  run(): Promise<Either<L, R>> {
    return this.eitherPromise;
  }
}

export const mergeInOneAsync = EitherAsync.mergeInOneAsync;
