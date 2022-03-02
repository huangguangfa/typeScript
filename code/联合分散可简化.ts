// 传入 'A' | 'B' 的时候，能够返回所有的组合： 'A' | 'B' | 'BA' | 'AB'

type Combination<A extends string, B extends string> =
    | A
    | B
    | `${A}${B}`
    | `${B}${A}`;


type AllCombinations<A extends string, B extends string = A> = 
    A extends A
        ? Combination<A, AllCombinations<Exclude<B, A>>>
        : never;
type res = AllCombinations<'A'| 'B' | 'C'>



