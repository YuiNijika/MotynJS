# MotynJS
> 基于Notyf修改的轻量级消息提示组件
``` javascript
// 在右下角显示（默认）
motyf("默认位置消息", "success", 2000);

// 在右上角显示
motyf({
    content: "右上角消息",
    type: "success",
    time: 2000,
    position: "top-right"
});

// 在左下角显示
motyf({
    content: "左下角消息",
    type: "warning",
    time: 3000,
    position: "bottom-left"
});

// 在左上角显示
motyf({
    content: "左上角消息",
    type: "info",
    time: 3000,
    position: "top-left"
});

// 也可以直接设置位置
motyfInstance.setPosition("top-left");
motyf("这条消息会显示在左上角", "success", 2000);
```
