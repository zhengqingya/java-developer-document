```
task A {
    doLast {
        println "****** task A"
    }
}

// 没有属性`hi`时执行
// 通过`gradle A -Phi`添加属性hi后 则 不执行
A.onlyIf { !project.hasProperty('hi') }
```

![gradle-task-onlyIf.png](images/gradle-task-onlyIf.png)