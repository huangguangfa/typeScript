/*************数组*************/

// push
type tuple = [1,2,3];
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
type getPushResult = Push<tuple, 1>;// [1,2,3,1]

// 合并
type tuple1 = [1,2];
type tuple2 = ['guang', 'fa'];
//把它们合并成这样的元组：
type tuple3 = [[1, 'guang'], [2, 'fa']];
type Zip<One extends [unknown, unknown], Other extends [unknown, unknown]> = 
    One extends [infer OneFirst, infer OneSecond]
        ? Other extends [infer OtherFirst, infer OtherSecond]
            ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]] :[] 
                : [];
// 递归形式（支持任意个数）
type Zip2<One extends unknown[], Other extends unknown[]> = 
    One extends [infer OneFirst, ...infer OneRest]
        ? Other extends [infer OtherFirst, ...infer OtherRest]
            ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>]: []
                : [];


/*************字符串*************/

// 把字符串第一个变成大写
type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}` 
    ? `${Uppercase<First>}${Rest}` : Str;
type GetCapitalizeStr = CapitalizeStr<'huang'>

// 递归 把字符串guang_fa_huang => guangFaHuang
type CapitalizeLineStr<Str extends string> = Str extends `${infer Left}_${infer Right}${infer Rest}` 
    ? `${Left}${Uppercase<Right>}${CapitalizeLineStr<Rest>}`
    : Str
type GetCapitalizeLineStrResult = CapitalizeLineStr<"guang_fa_huang">

//递归 substr 删除里面某个字符串
type DropSubStr<Str extends string, Substr extends string> = Str extends `${infer First}${Substr}${infer Suffix}` ? DropSubStr<`${First}${Suffix}`,Substr> : Str;
type SubStrResult = DropSubStr<"abcabcabc","b"> // 删除所有的b => acacac


/*************函数*************/

type AppenArgument<Fun extends Function, Arg> = 
    Fun extends (...args: infer Args) => infer ReturnType ?
        (...args:[...Args, Arg]) => ReturnType : never;


/*************索引类型的重新构造*************/

// 把string的key换成大写
type obj = {
    name:"张三",
    age:18,
    getSex:() => '1',
    isMan:true,
    1:1
}

type UppercaseKey<Obj extends object> = { 
    // as重映射
    [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}
type getUppercaseKeyRes = UppercaseKey<obj>
    