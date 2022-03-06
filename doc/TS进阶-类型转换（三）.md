> 类型编程的目的就是对各种类型进行转换生成需要的类型结果、首先我们要先学习下如何声明类型变量、
> TS类型系统中支持三种声明类型的变量：**type、infer、类型参数**

<a name="ALl6p"></a>
### Type
> **type叫类型别名、声明一个变量存储某个类型**

```typescript
type g = Promise<number>; //g是一个promise、并且resolve的结果是一个number类型的值
```
> **type类型参数、定义接受一个P参数、使用extends判断P是否等于 字符串'a'、如果是则返回true 否者 false**

```typescript
 type g<P> = P extends 'a' ? true : false;
 type res = g<'a'> // true

```
> **infer用于类型的提取、后面跟着类型提取出来后储存的变量名称、相当于局部变量**

```typescript
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
```
> **​**<br />
> **在提一句、TS里面不允许类型修改、如果想对类型做各种变换产生新的类型就需要重新构造**

<a name="sUAe5"></a>
### 元组
```typescript
// 给tuple 添加一个类型
type tuple = [1,2,3]; // 元组的重新构造
type Push<Arr extends number[], Ele> = [...Arr, Ele]

type PushRes = Push<tuple, 4> // type PushRes = [1, 2, 3, 4]


// 合并两个元组 
type tuple1 = [1,2];
type tuple2 = ['guang', 'fa'];
// 得到 type tuple = [[1, 'guang'], [2, 'dong']];
type mergeTule<One extends unknown[], Other extends unknown[]> = 
  One extends [infer OneFirst, infer OneSecond]
    ? Other extends [infer OtherFirst, infer OtherSecond]
      ? [ [OneFirst, OtherFirst], [ OneSecond, OtherSecond]] : []
    : [];

type mergeResult = mergeTule<tuple1, tuple2> // [[1, "guang"], [2, "fa"]]

/*
  现在是按个数进行写死的部分、如果动态个数的操作需要怎么写呢？答案是：递归
*/
// 递归写法
type recursionMerge<One extends unknown[], Other extends unknown[], Arr extends unknown[] = []> = 
  One extends [infer OneFirst, ...infer OneRest]
    ? Other extends [ infer OtherFirst, ...infer OtherRest]
        ? recursionMerge<OneRest, OtherRest, [...Arr, [OneFirst, OtherFirst]]> : Arr
     : Arr;
type mergeResult = recursionMerge<tuple1, tuple2> 

```
<a name="xhRJa"></a>
### 字符串
```typescript
// 把传入的'huang'第一个字符串变成大写
type CapitalizeStr<Str extends string> = 
  Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}` : Str;

type res = CapitalizeStr<'huang'> // "Huang"

// 我们完成一个guang_fa_huang => huangguangfa的修改

type SubStr<Str extends string> = 
  Str extends `${ infer Prefix}_${ infer content}_${infer Suffix}`
    ? `${Suffix}${Prefix}${content}` : Str;
type res = SubStr<'guang_fa_huang'> // huangguangfa
```
<a name="jxwD5"></a>
### 函数
```typescript
// 添加一个函数参数
type AppendArgumnet<Func extends Function, Arg> = 
  Func extends (...args: infer Args) => infer ReturnType
    ?	(...args:[...Args, Arg]) => ReturnType : never;
//  (args_0: string, args_1: "age") => void
type res = AppendArgumnet<(name:string) => void, 'age'>
```
<a name="t40cb"></a>
### 索引类型
```typescript
type obj = {
  name:'1',
  age:2,
  gender:true
}
type Mapping<Obj extends object> = { 
    [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]]
}
type res = Mapping<obj>

// 除了对value做修改 也可以做Key做修改、通过 “as” 重映射的操作
type UppercaseKey<Obj extends object> = { 
    [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key] //把string的key都变成大写
}
```
<a name="J2Odj"></a>
### 总结
**在TS不存在直接修改某个变量、都是通过重新构造的方式去创建新的类型、索引类型可以通过 as 重新映射类型**
