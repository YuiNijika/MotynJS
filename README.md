# MotynJS
> 基于Notyf修改的轻量级消息提示组件

## 1. 快速开始
``` javascript
// 简单消息 (自动3秒后关闭)
motyf("操作成功！", "success");

// 对象参数形式
motyf({
  content: "文件保存成功",
  type: "success",
  time: 2000
});
```

## 2. 消息类型
``` javascript
// 成功消息
motyf.success("保存成功！");

// 错误消息
motyf.error("保存失败！");

// 警告消息
motyf.warning("磁盘空间不足");

// 普通信息
motyf.info("您有3条未读消息");
```

## 3. 控制自动关闭
``` javascript
// 默认自动关闭 (3秒)
motyf("这条消息3秒后自动关闭");

// 手动关闭
motyf({
  content: "请手动关闭我",
  autoClose: false
});

// 自定义显示时间 (5秒)
motyf("这条消息显示5秒", "success", 5000);
```

## 4. 消息位置控制
``` javascript
// 设置全局位置
motyfInstance.setPosition("top-center");

// 单独消息指定位置
motyf({
  content: "顶部居中消息",
  position: "top-center"
});

// 可用位置选项：
// top-left, top-right, top-center
// bottom-left, bottom-right, bottom-center
// left-center, right-center
```

## 5. 可更新消息 (使用ID)
``` javascript
// 创建可更新消息
const progressId = "file-upload";
motyf({
  content: "上传进度: 0%",
  id: progressId,
  time: 0, // 不自动关闭
  autoClose: false
});

// 更新消息内容
function updateProgress(percent) {
  motyf({
    content: `上传进度: ${percent}%`,
    id: progressId,
    type: percent === 100 ? "success" : "info"
  });
}

// 模拟进度更新
let progress = 0;
const interval = setInterval(() => {
  progress += 10;
  updateProgress(progress);
  if (progress >= 100) clearInterval(interval);
}, 500);
```

## 6. 手动关闭消息
``` javascript
// 创建消息并获取引用
const msg = motyf({
  content: "这条消息需要手动关闭",
  autoClose: false
});

// 3秒后手动关闭
setTimeout(() => {
  motyf_close(msg); // 使用全局函数
  // 或者: motyfInstance.close(msg);
}, 3000);
```

## 7. 关闭所有消息
``` javascript
// 关闭所有当前显示的消息
motyfInstance.closeAll();
```

# 高级用法
## 1. 自定义默认设置
``` javascript
// 创建自定义实例
const myMotyf = new MotyfJS({
  defaultAutoClose: false, // 默认不自动关闭
  defaultPosition: "top-center", // 默认顶部居中
  defaultDuration: 5000 // 默认显示5秒
});

// 使用自定义实例
myMotyf.success("自定义设置的消息");
```

## 2. 响应式消息
``` javascript
// 创建可交互消息
const interactiveMsg = motyf({
  content: `
    <div>
      确定要删除吗？
      <button class="confirm-btn">确定</button>
      <button class="cancel-btn">取消</button>
    </div>
  `,
  type: "warning",
  autoClose: false
});

// 添加按钮事件
interactiveMsg.querySelector('.confirm-btn').addEventListener('click', () => {
  motyf.success("已删除");
  motyfInstance.close(interactiveMsg);
});

interactiveMsg.querySelector('.cancel-btn').addEventListener('click', () => {
  motyf.info("已取消");
  motyfInstance.close(interactiveMsg);
});
```

## 3. 自定义样式
``` css
/* 自定义消息样式 */
.motyf.custom-style {
  background: linear-gradient(90deg, #8e44ad, #9b59b6);
}

.motyf.custom-style .motyf-icon {
  color: #f1c40f;
}
```

``` javascript
// 使用自定义样式
motyf({
  content: "自定义样式消息",
  type: "custom-style"
});
```

# API

| 方法 | 参数 | 描述 |
| :--- | :--- | :--- |
| show() | content, type, time, id, autoClose | 显示消息 |
| success() | content, time, id, autoClose | 显示成功消息 |
| error() | content, time, id, autoClose | 显示错误消息 |
| warning() | content, time, id, autoClose | 显示警告消息 |
| info() | content, time, id, autoClose | 显示信息消息 |
| close() | element | 关闭指定消息 |
| closeAll() | - | 关闭所有消息 |
| setPosition() | position | 设置消息位置 |

## 全局函数

| 函数 | 描述 |
| :--- | :--- |
| motyf() | 显示消息 |
| motyf.success() | 显示成功消息 |
| motyf.error() | 显示错误消息 |
| motyf.warning() | 显示警告消息 |
| motyf.info() | 显示信息消息 |
| motyf_close() | 关闭指定消息 |

# 注意事项

1.确保在DOM加载完成后使用
2.重复使用相同ID会更新现有消息
3.自动关闭时间设为0或autoClose=false时需要手动关闭
4.支持HTML内容，但要注意XSS防护
