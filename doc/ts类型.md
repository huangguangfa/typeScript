```js的基础类型: ``
 > number、boolean、string、object、biginit、symbol、undefined、null 

``` 包装类型```
 > Number、Boolean、String、Object、Symbol

```元组（Tuple）就是元素个数和类型固定的数组类型 ```

``` ts
type Tuple = [number, string]
```

``` 接口（Interface）可以描述函数、对象、构造器的结构：```

``` ts
// 对象：
interface IPerson {
    name: string;
    age: number;
}

class Person implements IPerson {
    name: string;
    age: number;
}
const obj: IPerson = {
    name: 'guang',
    age: 18
}

/*********************************************************/

interface IPersons {
    [prop: string]: string | number;
}
const obj:IPersons = {};
obj.name = 'guang';
obj.age = 18;

// 函数：
interface SayHello {
    (name: string): string;
}

const func: SayHello = (name: string) => {
    return 'hello,' + name
}

//构造器：
interface PersonConstructor {
    new (name: string, age: number): IPerson;
}

function createPerson(ctor: PersonConstructor):IPerson {
    return new ctor('guang', 18);
}

``` 

``` 枚举（Enum）是一系列值的复合：```

``` ts
enum Transpiler {
    Babel = 'babel',
    Postcss = 'postcss',
    Terser = 'terser',
    Prettier = 'prettier',
    TypeScriptCompiler = 'tsc'
}
const transpiler = Transpiler.TypeScriptCompiler;
```

 > ``` 四种特殊的类型：void、never、any、unknown：```
 - void 代表空，可以是 null 或者 undefined，一般是用于函数返回值。
    ```ts
    function warnUser(): void {
        console.log("This is my warning message");
    }
    ```
 - any 是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型。
    ``` ts
    function test(name:any):any{
        
    }
    ```
 - unknown 是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型。
    ``` ts
    function infiniteLoop(): never {
        while (true) {

        }
    }
    ```
    
 - never 代表不可达，比如函数抛异常的时候，返回值就是 never
    ``` ts
    function error(message: string): never {
        throw new Error(message);
    }
    ```

> 类型的装饰：```除了描述类型的结构外，TypeScript 的类型系统还支持描述类型的属性，比如是否可选，是否只读等：```

```ts
interface IPerson {
    readonly name: string;  //只读
    age?: number;   // 可选
}

type tuple = [string, number?]; 
```
