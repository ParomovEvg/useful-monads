import { EitherAsync } from "./EitherAsync";

const enum EitherType {
  Left = "Left",
  Right = "Right",
}

class EitherConstructor<
  L,
  R,
  C = undefined,
  T extends EitherType = EitherType
> {
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

  static right<L, T, C = undefined>(v: T, context?: C): Either<L, T, C> {
    return new EitherConstructor<L, T, C, EitherType.Right>(
      EitherType.Right,
      v,
      context as C
    );
  }
  static left<T, R, C = undefined>(v: T): Either<T, R, C> {
    return new EitherConstructor<T, R, C, EitherType.Left>(
      EitherType.Left,
      v,
      undefined
    );
  }

  private constructor(
    private readonly type: T,
    public readonly value: T extends EitherType.Left ? L : R,
    private readonly context: T extends EitherType.Left ? undefined : C
  ) {}

  isLeft(): this is EitherConstructor<L, R, C, EitherType.Left> {
    return this.type === EitherType.Left;
  }

  isRight(): this is EitherConstructor<L, R, C, EitherType.Right> {
    return this.type === EitherType.Right;
  }

  mapLeft<T>(f: (l: L) => T): Either<T, R, C> {
    if (this.isLeft()) {
      return EitherConstructor.left<T, R, C>(f(this.value as L));
    }
    return EitherConstructor.right<T, R, C>(this.value as R, this.context);
  }

  map<T>(f: (r: R, context: C) => T): Either<L, T, C> {
    if (this.isLeft()) {
      return EitherConstructor.left<L, T, C>(this.value as L);
    }
    return EitherConstructor.right<L, T, C>(
      f(this.value as R, this.context as C)
    );
  }

  mapContext<T>(f: (r: R, context: C) => T): Either<L, R, T> {
    if (this.isLeft()) {
      return EitherConstructor.left<L, R, T>(this.value as L);
    }
    return EitherConstructor.right<L, R, T>(
      this.value as R,
      f(this.value as R, this.context as C)
    );
  }

  asyncMap<T>(f: (r: R, c: C) => Promise<T>): EitherAsync<L, T, C> {
    if (this.isLeft()) {
      return EitherAsync.from(
        Promise.resolve(EitherConstructor.left<L, T, C>(this.value as L))
      );
    }
    return EitherAsync.from(
      f(this.value as R, this.context as C).then((v) =>
        EitherConstructor.right<L, T, C>(v, this.context)
      )
    );
  }

  chain<A, B, NC>(f: (r: R, c: C) => Either<A, B, NC>): Either<A | L, B, C> {
    if (this.isLeft()) {
      return EitherConstructor.left<L, B, C>(this.value as L);
    }
    const either = f(this.value as R, this.context as C);
    return either.mapContext(() => this.context as C);
  }

  asyncChain<A, B, NC>(
    f: (r: R, c: C) => Promise<Either<A, B, NC>>
  ): EitherAsync<A | L, B, C> {
    if (this.isLeft()) {
      return EitherAsync.from(
        Promise.resolve(EitherConstructor.left<L, B, C>(this.value))
      );
    }
    return EitherAsync.from(
      f(this.value as R, this.context as C).then((e) =>
        e.mapContext(() => this.context as C)
      )
    );
  }

  saveInContext(): Either<L, R, R> {
    if (this.isLeft()) {
      return EitherConstructor.left<L, R, R>(this.value);
    }
    return EitherConstructor.right<L, R, C>(
      this.value as R,
      this.context as C
    ).mapContext((r) => r);
  }

  caseOf<A, B>(obj: { left: (e: L) => A; right: (r: R, c: C) => B }): A | B {
    if (this.isLeft()) {
      return obj.left(this.value);
    }
    return obj.right(this.value as R, this.context as C);
  }

  orDefault<T>(def: T): T | R {
    if (this.isLeft()) {
      return def;
    }
    return this.value as R;
  }

  extract():
    | { left: L; right: null; context: undefined }
    | { right: R; context: C; left: null } {
    if (this.isLeft()) {
      return { left: this.value, right: null, context: undefined };
    }
    return { right: this.value as R, left: null, context: this.context as C };
  }
}

export const isEither = <L, R, C = undefined>(
  value: unknown
): value is Either<L, R, C> => {
  return value instanceof EitherConstructor;
};

export type Either<L, R, C = undefined> =
  | EitherConstructor<L, R, C, EitherType.Right>
  | EitherConstructor<L, R, C, EitherType.Left>;

export const { mergeInOne, left, right } = EitherConstructor;
