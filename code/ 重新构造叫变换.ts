/*************数组*************/

// push
type tuple = [1,2,3];
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
type getPushResult = Push<tuple, 1>;// [1,2,3,1]

// 合并
type tuple1 = [1,2];
type tuple2 = ['guang', 'dong'];
//把它们合并成这样的元组：
type tuple3 = [[1, 'guang'], [2, 'dong']];
type Zip<One extends [unknown, unknown], Other extends [unknown, unknown]> = 
    One extends [infer OneFirst, infer OneSecond]
        ? Other extends [infer OtherFirst, infer OtherSecond]
            ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]] :[] 
                : [];
// 递归形式（支持任意）
type Zip2<One extends unknown[], Other extends unknown[]> = 
    One extends [infer OneFirst, ...infer OneRest]
        ? Other extends [infer OtherFirst, ...infer OtherRest]
            ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>]: []
                : [];


/*************字符串*************/