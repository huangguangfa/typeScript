// promise提取value类型
type p = Promise<'guangFa'>;
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
type GetValueResult = GetValueType<p>

/* 数组 */

// 数组提取第一个元素的类型
type arr = [1,2,3];
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never;
type GetFirstResult = GetFirst<arr>
// 数组提取最后一个元素的类型
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never;
type GetLastResult = GetFirst<[1,2,3]>
// 取数组剩下的
type GetMore<Arr extends unknown[]> = Arr extends [...infer Rest, unknown] ? Rest : never;
type GetMoreResult = GetMore<[1,2,3]>

/* 字符串 */

// 判断字符串是否以某个前缀开头
type StartWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false;
type startWithResult = StartWith<'guanga fa','guang'>
// 判断字符串是否以某个字符串结尾
type EndWith<Str extends string, EndFix extends string> = Str extends `${string}${EndFix}` ? true : false;
type EndWithResult = EndWith<'guang fa','fa'>
// 字符串的替换
