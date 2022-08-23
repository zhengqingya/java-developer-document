# JS 获取选中文本+光标位置

```
// 处理选中文本方法
handleAddDiscuss() {
  let selectText = window.getSelection().toString();
  if (selectText) {
    let selectTextRange = window.getSelection().getRangeAt(0);
    let text = this.noteForm.contentNew;
    // 开始文本
    let textStart = text.substring(0, selectTextRange.startOffset);
    // 对中间选中的文本进行处理 [注：这里背景色标签变动时需与后端确认]
    let selectTextNewSave = `@<span style="background-color: #FFFF00;" uuid="@` + uuid() + `">` + selectText + `@</span>@`;
    // TODO: 标签全局替换 [回显时使用]
    let selectTextNewShow = selectTextNewSave
      .replace(RegExp(`@<span style="background-color: #FFFF00;" uuid="@`, "g"), `<span style="background-color: #FFFF00;" uuid="`)
      .replace(RegExp(`@</span>@`, "g"), `</span>`);

    // 结束文本
    let textEnt = text.substring(selectTextRange.endOffset);
    // 最终需显示的文本内容
    let textFinalShow = textStart + selectTextNewShow + textEnt;
    // 最终需保存到服务器的文本内容
    let textFinalSave = textStart + selectTextNewSave + textEnt;
    this.noteForm.contentNew = textFinalShow;

    console.log("11", textFinalSave);
    console.log("112", textFinalShow);

    // 弹出创建文本框
    this.$refs.noteDiscussDialog.open("add", null, this.noteId, selectText, textFinalSave);
  }
}
```
