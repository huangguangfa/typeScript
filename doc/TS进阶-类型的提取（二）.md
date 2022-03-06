> TS能够通过一些逻辑语法去提取我们想要的类型和结果、在此之前我们需要先了解 infer(局部变量）和 extends ? : 类似JS的三元算符后面的案例中我们讲大量使用它！

<a name="rcAPx"></a>
### Promsie
```typescript
type p = Promise<'gf'>
type getValueType = p extends Promise<infer Value> ? Value : never;
/* 
  通过 infer 声明一个局部变量 Value 来保存，如果匹配，就返回匹配到的 Value，
  否则就返回 never 代表没匹配到
*/
```
<a name="Yk7FC"></a>
### Array
```typescript
type arr = [1,2,3]
// 提取arr第一个元素的类型
type GetFirst<Arr extends number[]> = Arr extends [infer First, ...number[]] ? First : never;
type res = GetFirst<arr> // [1]

// 提取最后一个
type GetLast<Arr extends number[]> = Arr extends [ ...number[], infer Last] ? Last : never;
type res1 = GetLast<arr> // [3]

// 提取剩下的
type PopArr <Arr extends number[]> = Arr extends [ ...infer Rest, number] ? Rest : never;
type res2 = PopArr<arr> // [1,2]
```
<a name="Kmvah"></a>
### String
```typescript
type str = 'guang2222fa';

// 匹配字符串是不是以xxx开头
type StartWith<Str extends string, Prefix extends string> = 
  Str extends `${Prefix}${string}` ? true : false;
type res = StartWith<str, 'g'> // true
type res1 = StartWith<str, 'h'> // false

/* 
  解释： 
    接收两个参数 Str强制匹配为string类型、Prefix前缀，${string}是指任意的string、
*/

// 字符串替换

type ReplaceStr<Str extends string, Substr extends string, Replacement extends string> = 
     Str extends `${infer Prefix}${Substr}${infer Suffix}` 
       ? `${Prefix}${Replacement}${Suffix}` : Str;
type res2 = ReplaceStr<str, '2222', '&&&'>  //"guang&&&fa"

// Trim去除空格(利用递归一个一个去找）
type TrimLeft<Str extends string> = 
  Str extends `${' ' | '\n' | '\t'}${infer Rest}`
  ? TrimLeft<Rest>
  : Str;
type res3 = TrimLeft<" gf"> //gf
// right
type TrimStrRight<Str extends string> = 
    Str extends `${infer Rest}${' ' | '\n' | '\t'}` 
        ? TrimStrRight<Rest> : Str;
type res4 = TrimStrRight<'gf '>
// 组合Trim
type TrimStr<Str extends string> =TrimStrRight<TrimStrLeft<Str>>;
type res5 = TrimStr<' gf '> // gf
```
<a name="U6w6q"></a>
### Function
```typescript
// 提取参数
type GetParams<Func extends Function> = 
  Func extends (...args:infer Params) => unknown
    ? Params : never;
type ParamsResult = GetParams<(name:string, age:number) => string> // [name: string, age: number]

// 返回类型
type GetReturnType<Func extends Function> = 
  Func extends (...args: unknown[]) => infer ReturnType 
    ? ReturnType : never;
type ReturnTypeResult = GetReturnType<() => 'gf'> // gf
```
<a name="B89DQ"></a>
### Class
```typescript
class Gf {
    name: string;

    constructor() {
        this.name = "gf";
    }

    hello() {
        return 'hello, I\'m ' + this.name;
    }
}

const gf = new Gf();
gf.hello();

// 方法也可以使用call 或者bind 、apply
gf.hello.call({name:'111'}) // 但这里却没有被检查出来 this 指向的错误。


// 修改
class Gf {
    name: string;
    constructor() {
        this.name = "gf";
    }
    // 需注意，这里的 this 经过 ts 编译后会消失
    hello(this: Gf) {
        return 'hello, I\'m ' + this.name;
    }
}
// 这样就能检测出有问题的this、这里的this还能够提取出来
type GetThisParameterType<T> = 
  T extends (this: infer ThisType, ...args:any[]) => any
    ? ThisType
    : unknown;

```
<a name="oy1SC"></a>
### 总结
类型的提取是TS类型计算的一个基础、学习不同类型的提取套路、在结合后面的学习、我们就能更加灵活的编写TS的逻辑类型计算！
