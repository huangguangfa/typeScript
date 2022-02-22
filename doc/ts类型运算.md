### 类型运算逻辑都是用来做一些动态的类型的运算
> ```条件：extends ? : ```
```ts
type isTwo<T> = T extends 2 ? true: false;

type res = isTwo<1>;
type res2 = isTwo<2>;
```
> ``` 推导：infer```

```ts
// 注意，第一个 extends 不是条件，条件类型是 extends ? :，这里的 extends 是约束的意思，也就是约束类型参数只能是数组类型。
type First<Tuple extends unknown[]> = Tuple extends [infer T,...infer R] ? T : never;

type res = First<[1,2,3]>;
```

> ```联合：｜```
```ts
// 联合类型（Union）类似 js 里的或运算符 |，但是作用于类型，代表类型可以是几个类型之一。
type Union = 1 | 2 | 3;
```

> ```交叉：&```

```ts
// 交叉类型（Intersection）类似 js 中的与运算符 &，但是作用于类型，代表对类型做合并。
type ObjType = {a: number } & {c: boolean};
```

> ```映射类型```
```ts
// keyof T 是查询索引类型中所有的索引，叫做索引查询。
// T[Key] 是取索引类型某个索引的值，叫做索引访问。
// in 是用于遍历联合类型的运算符。
type MapType<T> = {
  [Key in keyof T]?: T[Key]
}
// T[Key]是取值
type MapType<T> = {
    [Key in keyof T]: [T[Key], T[Key], T[Key]]
}

type res = MapType<{a: 1, b: 2}>;
// 最终得到
type res = {
    a:[1,2,3]
    b:[1,2,3]
}

// 除了值可以变化，索引也可以做变化，用 as 运算符，叫做重映射。
type MapType<T> = {
    [
        Key in keyof T 
            as `${Key & string}${Key & string}${Key & string}`
    ]: [T[Key], T[Key], T[Key]]
}
```
