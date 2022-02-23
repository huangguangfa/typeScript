// promise提取value类型
type p = Promise<'guangFa'>;
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
type GetValueResult = GetValueType<p>
// 数组类型想提取第一个元素的类型
type arr = [1,2,3];
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never;
type GetFirstResult = GetFirst<arr>
// 数组类型想提取最后一个元素的类型
type arr1 = [1,2,3];
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never;
type GetLastResult = GetFirst<arr>
// 取数组剩下的
type arr2=[1,2,3];
type GetMore<Arr extends unknown[]> = Arr extends [...infer Rest, unknown] ? Rest : never;
type GetMoreResult = GetMore<arr2>