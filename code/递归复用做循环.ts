// ts没有循环的语法、但是支持递归、所以我们需要用递归去代替循环的操作

/****************** Promise *******************************************************/

// 【案例1】：提取不确定层数的promise的结果
type p1 = Promise<Promise<Promise<1>>>
type DeepPromise<P extends Promise<unknown>> = 
    P extends Promise<infer ValueType>
        ? ValueType extends Promise<unknown>
            ? DeepPromise<ValueType>
            : ValueType
        : never;
type getDeepPromise = DeepPromise<p1>;

/****************** 数组 *******************************************************/

// 【案例1】：数组反转
type arr1 = [1,2,3]
type ReverseArr<Arr extends unknown[]> = 
    Arr extends [ infer First, ...infer Rest]
        ? [...ReverseArr<Rest>, First]
        : Arr;
type GetReverseArrRes = ReverseArr<arr1>

// 【案例2】：Includes
   // 查找
type Includes<Arr extends unknown[], FineItem> = 
    Arr extends [infer First, ...infer Rest]
        ? First extends FineItem
            ? true
            : Includes<Rest, FineItem>
        : false;
// 【案例3】：Includes
    // 删除
type Removes<Arr extends unknown[], Item> = 
    Arr extends [infer First, ...infer Rest]
        ? First extends Item 
            ? Removes<Rest, Item>
            : [First, ...Removes<Rest, Item>]
        : Arr    
// 【案例4】：Includes
    // 指定生成长度为n的数组并把value填充进去
type BuildArray<
    Length extends number, 
    Item = unknown,
    Arr extends unknown[] = []> =  Arr["length"] extends Length ? Arr : BuildArray<Length, Item, [...Arr, Item]>

