// 判断一个类型是 any 类型
type IsAny<T> = "guang" extends ('fa' & T) ? true : false;

// isEqual
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true : false;

// isUnion
type IsUnion<A, B = A> =
    A extends A
        ? [B] extends [A]
            ? false
            : true
        : never

// isNever
type IsNever<T> = [T] extends [never] ? true : false;

// isTuple
type NotEqual<A, B> = 
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? false : true;
type IsTuple<T> = 
    T extends readonly [...params: infer Eles] 
        ? NotEqual<Eles['length'], number> 
        : false


// 获取可选属性
/* 
    Record<key,value> 定义对象约束
    interface PageInfo {
        title: string;
    }
    type Page = "home" | "about" | "contact";
    const nav: Record<Page, PageInfo> = {
        about: { title: "about" },
        contact: { title: "contact" },
        home: { title: "home" },
    };
*/
type GetOptional<Obj extends Record<string, any>> = {
    [
        Key in keyof Obj 
            as {} extends Pick<Obj, Key> ? Key : never
    ] : Obj[Key];
}

// 获取不是可选属性
type isRequired<Key extends keyof Obj, Obj> = 
    {} extends Pick<Obj, Key> ? never : Key;
type GetRequired<Obj extends Record<string, any>> = { 
    [Key in keyof Obj as isRequired<Key, Obj>]: Obj[Key] 
}


// 过滤出 class 的 public 的属性
class Dong {
    public name: string;
    protected age: number;
    private hobbies: string[];
  
    constructor() {
      this.name = 'dong';
      this.age = 20;
      this.hobbies = ['sleep', 'eat'];
    }
}

type ClassPublicProps<Obj extends Record<string, any>> = {
    [Key in keyof Obj]: Obj[Key]    
}
type ClassPublicRes = ClassPublicProps<Dong>


// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any，可以用这个特性判断 any 类型。
// 联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并。
// never 作为类型参数出现在条件类型左侧时，会直接返回 never。
// any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。
// 元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number。可以用来判断元组类型。
// 函数参数处会发生逆变，也就是类型缩小，可以用来实现联合类型转交叉类型。
// 可选索引的值为 undefined 和值类型的联合类型。可以用来过滤可选索引，反过来也可以过滤非可选索引。
// 索引类型的索引一般为 string 类型，而可索引签名不是，可以用这个特性过滤掉可索引签名。
// keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性。


// 练习parseQueryString
type str = 'a=1&b=2&c=3'; //a=1&b=2&c=3 => { a:1, b:2, c:3}
// a=1 => {a:1}
type ParseParam<Param extends string> = Param extends `${infer Key}=${infer Value}`
    ?{
        [K in Key]:Value
    }:{}

type MergeValues<One, Other> = 
    One extends Other 
        ? One
        : Other extends unknown[]
            ? [One, ...Other]
            : [One, Other];

type MergeParams<
    OneParam extends Record<string, any>,
    OtherParam extends Record<string, any>
> = {
  [Key in keyof OneParam | keyof OtherParam]: 
    Key extends keyof OneParam
        ? Key extends keyof OtherParam
            ? MergeValues<OneParam[Key], OtherParam[Key]>
            : OneParam[Key]
        : Key extends keyof OtherParam 
            ? OtherParam[Key] 
            : never
}
// a=1&b=2&c=3 => a=1 b=2 c=3
type ParseQueryString<Str extends string> = 
    Str extends `${infer Param}&${infer Rest}`
        ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
        : ParseParam<Str>;
