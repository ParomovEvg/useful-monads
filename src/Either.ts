import { EitherAsync } from "./EitherAsync";

const enum EitherType {
  Left = "Left",
  Right = "Right",
}

class EitherConstructor<L, R, T extends EitherType = EitherType> {
  static mergeInOne<L1, R1>(values: [Either<L1, R1>]): Either<L1, [R1]>;
  static mergeInOne<L1, R1, L2, R2>(
    values: [Either<L1, R1>, Either<L2, R2>]
  ): Either<L1 | L2, [R1, R2]>;
  static mergeInOne<L1, R1, L2, R2, L3, R3>(
    values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>]
  ): Either<L1 | L2 | L3, [R1, R2, R3]>;
  static mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4>(
    values: [Either<L1, R1>, Either<L2, R2>, Either<L3, R3>, Either<L4, R4>]
  ): Either<L1 | L2 | L3 | L4, [R1, R2, R3, R4]>;
  static mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5>(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>
    ]
  ): Either<L1 | L2 | L3 | L4 | L5, [R1, R2, R3, R4, R5]>;
  static mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6>(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>
    ]
  ): Either<L1 | L2 | L3 | L4 | L5 | L6, [R1, R2, R3, R4, R5, R6]>;
  static mergeInOne<L1, R1, L2, R2, L3, R3, L4, R4, L5, R5, L6, R6, L7, R7>(
    values: [
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>
    ]
  ): Either<L1 | L2 | L3 | L4 | L5 | L6 | L7, [R1, R2, R3, R4, R5, R6, R7]>;
  static mergeInOne<
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
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>,
      Either<L8, R8>
    ]
  ): Either<
    L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8,
    [R1, R2, R3, R4, R5, R6, R7, R8]
  >;
  static mergeInOne<
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
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>,
      Either<L8, R8>,
      Either<L9, R9>
    ]
  ): Either<
    L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9,
    [R1, R2, R3, R4, R5, R6, R7, R8, R9]
  >;
  static mergeInOne<
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
      Either<L1, R1>,
      Either<L2, R2>,
      Either<L3, R3>,
      Either<L4, R4>,
      Either<L5, R5>,
      Either<L6, R6>,
      Either<L7, R7>,
      Either<L8, R8>,
      Either<L9, R9>,
      Either<L10, R10>
    ]
  ): Either<
    L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10,
    [R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]
  >;
  static mergeInOne<L, R>(either: Array<Either<L, R>>): Either<L, R[]>;
  static mergeInOne(eithers: Array<Either<unknown, unknown>>) {
    return eithers.reduce(
      (res: Either<unknown, Array<unknown>>, v) =>
        v.chain((v) => res.map((res) => res.concat([v]))),
      EitherConstructor.right<unknown, Array<unknown>>([])
    );
  }

  static right<L, T>(v: T): Either<L, T> {
    return new EitherConstructor<L, T, EitherType.Right>(EitherType.Right, v);
  }

  static left<T, R>(v: T): Either<T, R> {
    return new EitherConstructor<T, R, EitherType.Left>(EitherType.Left, v);
  }

  private constructor(
    private readonly type: T,
    public readonly value: T extends EitherType.Left ? L : R
  ) {}

  isLeft(): this is EitherConstructor<L, R, EitherType.Left> {
    return this.type === EitherType.Left;
  }

  isRight(): this is EitherConstructor<L, R, EitherType.Right> {
    return this.type === EitherType.Right;
  }

  mapLeft<T>(f: (l: L) => T): Either<T, R> {
    if (this.isLeft()) {
      return EitherConstructor.left<T, R>(f(this.value as L));
    }
    return EitherConstructor.right<T, R>(this.value as R);
  }

  map<T>(f: (r: R) => T): Either<L, T> {
    if (this.isLeft()) {
      return EitherConstructor.left<L, T>(this.value as L);
    }
    return EitherConstructor.right<L, T>(f(this.value as R));
  }

  asyncMap<T>(f: (r: R) => Promise<T>): EitherAsync<L, T> {
    if (this.isLeft()) {
      return EitherAsync.from(
        Promise.resolve(EitherConstructor.left<L, T>(this.value as L))
      );
    }
    return EitherAsync.from(
      f(this.value as R).then((v) => EitherConstructor.right<L, T>(v))
    );
  }

  chain<A, B>(f: (r: R) => Either<A, B>): Either<A | L, B> {
    if (this.isLeft()) {
      return EitherConstructor.left<L, B>(this.value as L);
    }
    return f(this.value as R);
  }

  asyncChain<A, B>(f: (r: R) => Promise<Either<A, B>>): EitherAsync<A | L, B> {
    if (this.isLeft()) {
      return EitherAsync.from(
        Promise.resolve(EitherConstructor.left<L, B>(this.value))
      );
    }
    return EitherAsync.from(f(this.value as R));
  }

  caseOf<A, B>(obj: { left: (e: L) => A; right: (r: R) => B }): A | B {
    if (this.isLeft()) {
      return obj.left(this.value);
    }
    return obj.right(this.value as R);
  }

  orDefault<T>(def: T): T | R {
    if (this.isLeft()) {
      return def;
    }
    return this.value as R;
  }
}

export const isEither = <L, R>(value: unknown): value is Either<L, R> => {
  return value instanceof EitherConstructor;
};

export type Either<L, R> =
  | EitherConstructor<L, R, EitherType.Right>
  | EitherConstructor<L, R, EitherType.Left>;

export const { mergeInOne, left, right } = EitherConstructor;
