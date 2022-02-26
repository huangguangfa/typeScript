// ts没有循环的语法、但是支持递归、所以我们需要用递归去代替循环的操作

// 【案例1】：提取不确定层数的promise的结果
type p = Promise<Promise<Promise<1>>>
type DeepPromise<P extends Promise<unknown>> = 
    P extends Promise<infer ValueType>
        ? ValueType extends Promise<unknown>
            ? DeepPromise<ValueType>
            : ValueType
        : never;
type getDeepPromise = DeepPromise<p>;


// 【案例2】：数组反转
type arr = [1,2,3]
type ReverseArr<Arr extends unknown[]> = 
    Arr extends [ infer First , ...infer Rest]
        ? [...ReverseArr<Rest>, First]
        : Arr;
type GetReverseArrRes = ReverseArr<arr>