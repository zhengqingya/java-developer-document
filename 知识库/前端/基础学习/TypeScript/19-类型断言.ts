function fn(value: number | string) {
    let result: number
    // 强转转换类型
    result = (<string>value).length

    // 类型断言
    result = (value as string).length

}

