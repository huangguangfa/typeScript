// Parameters 获取函数的参数类型
type Parameters_<T extends (...args: any) => any> 
    = T extends (...args: infer P) => any 
        ? P 
        : never;

// ReturnType 提取函数类型的返回值类型
type ReturnType_<T extends (...args: any) => any> 
    = T extends (...args: any) => infer R 
        ? R 
        : any;

// ConstructorParameters 用于提取构造器参数的类型
type ConstructorParameters_<
    T extends abstract new (...args: any) => any
> = T extends abstract new (...args: infer P) => any 
    ? P 
    : never;

// InstanceType 提取构造器返回值的类型
type InstanceType_<
    T extends abstract new (...args: any) => any
> = T extends abstract new (...args: any) => infer R 
    ? R 
    : any;

// ThisParameterType 提取this类型
type ThisParameterType_<T> = 
    T extends (this: infer U, ...args: any[]) => any 
        ? U 
        : unknown;

// Partial 把索引变为可选
type Partial_<T> = {
    [P in keyof T]?: T[P];
};


// Required 去掉把索引变为可选
type Required_<T> = {
    [P in keyof T]-?: T[P];
};

// Readonly 添加 readonly 的修饰
type Readonly_<T> = {
    readonly [P in keyof T]: T[P];
};

// Pick 映射类型的语法用于构造新的索引类型
type Pick_<T, K extends keyof T> = {
    [P in K]: T[P];
};

// Record 创建索引类型，传入 key 和值的类型
type Record_<K extends keyof any, T> = {
    [P in K]: T;
};

// Exclude 一个联合类型中去掉一部分类型
type Exclude_<T, U> = T extends U ? never : T;

// Extract 过滤出想要的联合类型
type Extract_<T, U> = T extends U ? T : never;

// Omit 去除索引类型的某一项
type Omit_<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// Awaited 获取嵌套promise的返回结果
type Awaited_<T> =
    T extends null | undefined
        ? T 
        : T extends object & { then(onfulfilled: infer F): any }
            ? F extends ((value: infer V, ...args: any) => any)
                ? Awaited<V>
                : never 
            : T;



// NonNullable 判断是否为非空类型
type NonNullable_<T> = T extends null | undefined ? never : T;

// Uppercase、Lowercase、Capitalize、Uncapitalize 分别实现大写、小写、首字母大写、去掉首字母大写的
type Uppercase_<S extends string> = intrinsic;

type Lowercase_<S extends string> = intrinsic;

type Capitalize_<S extends string> = intrinsic;

type Uncapitalize_<S extends string> = intrinsic;