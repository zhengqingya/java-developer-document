# Java判断List中是否有重复元素

```
// 1.将List转为Set，通过2个集合的size大小是否相等来判断有无重复元素
public static void main(String[] args) {
    List<String> stringList=new ArrayList<>(Arrays.asList("a","a","b","c"));
    Set<String> stringSet=new HashSet<>(stringList);
    if (stringList.size() == stringSet.size()) {
        System.out.println("没有重复元素");
    } else {
        System.out.println("有重复元素");
    }
}

// 2.使用jdk8的Stream来判断
public static void main(String[] args) {
    List<String> stringList=new ArrayList<>(Arrays.asList("a","a","b","c"));
    long count = stringList.stream().distinct().count();
    if (stringList.size() == count) {
    System.out.println("没有重复元素");
    } else {
    System.out.println("有重复元素");
    }
}

// 3.实际开发场景中,需要判断重复的元素可能在对象集合中每个对象的某个成员变量中，可以用jdk8的Stream很方便的获得想要的成员变量的集合，再判断是否有重复元素。
public static void main(String[] args) {
    List<Person> personList = new ArrayList<Person>(){{
        add(new Person("张三"));
        add(new Person("李四"));
        add(new Person("张三"));
    }};
    List<String> stringList = personList.stream().map(Person::getName)
        .collect(Collectors.toList());
    long count = stringList.stream().distinct().count();
    if (stringList.size() == count) {
        System.out.println("没有重复元素");
    } else {
        System.out.println("有重复元素");
    }
}

// 4.个人实战举例
if (this.list.size() != this.list.stream()
    .map(User::getName).collect(Collectors.toList()).stream().distinct()
    .count()) {
    throw new ParameterException("名称重复!");
}
```
