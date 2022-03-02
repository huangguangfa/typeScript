


// add 计算两个数组的长度
type CreateArray<
    Length extends number, 
    Ele=unknown, 
    Arr extends unknown[] = []> 
        = Arr['length'] extends Length 
            ? Arr 
            : CreateArray<Length, Ele, [...Arr, Ele]>

type GetArrLengthSum<Num1 extends number, Num2 extends number> = [...CreateArray<Num1>, ...CreateArray<Num2>]['length']
type GetArrLengthSumRes = GetArrLengthSum<9,10> //19