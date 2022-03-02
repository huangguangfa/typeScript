// add 计算两个数组的长度
type add<
    Length extends number,
    Ele = unknown,
    Arr extends unknown[] = []>
    = Arr['length'] extends Length
    ? Arr
    : add<Length, Ele, [...Arr, Ele]>

type GetArrLengthSum<Num1 extends number, Num2 extends number> = [...add<Num1>, ...add<Num2>]['length']
type GetArrLengthSumRes = GetArrLengthSum<9, 10> //19

// subtract
type subtract<Num1 extends number, Num2 extends number> =
    add<Num1> extends [...arr: add<Num2>, ...arr2: infer Rest]
    ? Rest['length']
    : never;
type GetsubtractArrRes = subtract<30, 10> //20

// Mutiply
type Mutiply<
    Num1 extends number, 
    Num2 extends number, 
    ResultArr extends unknown[] = []
    > = Num2 extends 0
        ? ResultArr['length']
        : Mutiply<Num1, subtract<Num2, 1>, [...add<Num1>, ...ResultArr]>;

type GetMutiplyRes = Mutiply<1, 5> //5

// Divide
type Divide<
    Num1 extends number, 
    Num2 extends number, 
    ResultArr extends unknown[] = []
    > = Num1 extends 0
        ? ResultArr['length']
        : Divide<subtract<Num1, Num2>, Num2, [unknown, ...ResultArr]>
type GetDivideRes = Divide<10,2> //5


// 求字符串长度
type StrLen<Str extends string, CountArr extends unknown[] = []> = Str extends `${string}${infer Rest}` ? StrLen<Rest, [...CountArr, unknown]> : CountArr['length'];
type getStrLenRes = StrLen<'guangfa'> //7

// Fibonacci 数列(斐波那契数列) 传入当前位数得到这个位数的值
// [1,1,2,3,5,8,13,21,34....]
type FibonacciLoop<
        PrevArr extends unknown[],
        CurentArr extends unknown[],
        IndextArr extends unknown[] = [],
        Num extends number = 1
    > = IndextArr['length'] extends Num
        ? CurentArr['length']
        : FibonacciLoop<CurentArr, [...PrevArr, ...CurentArr], [...IndextArr, unknown], Num>
type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;
type GetFibonacci = Fibonacci<10>




