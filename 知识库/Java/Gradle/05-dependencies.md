```
dependencies {
    // 项目依赖
    implementation project(':child-01')
    
    // 本地jar依赖
    implementation files('libs/app.jar')
    
    // 配置某文件夹作为依赖项
    implementation fileTree(dir: 'libs', include: ['*.jar'], excludes: [''])
    
    // 直接依赖
    // 简写
    implementation 'org.springframework.boot:spring-boot-starter-web:2.7.2'
    // 全写
    implementation group: 'org.springframework.boot', name: 'spring-boot-starter-web', version: '2.7.2'
}
```