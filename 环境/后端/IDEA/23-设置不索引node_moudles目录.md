# idea - 设置不索引node_moudles目录

鼠标右键不索引的目录 -> `Mark Directory as` -> `Excluded`

`File` -> `Settings...` -> `Editor` -> `File Types` 中 `Ingore files and folders` 中新增`node_modules` 和 `.deploy_git`

```
*.hprof;*.pyc;*.pyo;*.rbc;*.yarb;*~;.DS_Store;.git;.hg;.svn;CVS;__pycache__;_svn;vssver.scc;vssver2.scc;node_modules;.deploy_git;
```
