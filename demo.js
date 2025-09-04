// 测试自动关闭功能
function testAutoClose() {
    const msgId = "auto-close-test";
    motyf({
        content: "这条消息3秒后会更新",
        id: msgId,
        time: 3000
    });

    setTimeout(() => {
        motyf({
            content: "消息已更新！",
            type: "success",
            id: msgId,
            time: 3000
        });
    }, 1000);
}

// 测试可更新消息
function testUpdatableMessage() {
    const progressId = "upload-progress";
    let progress = 0;

    motyf({
        content: `上传进度: ${progress}%`,
        id: progressId,
        autoClose: false
    });

    const interval = setInterval(() => {
        progress += 10;
        motyf({
            content: `上传进度: ${progress}%`,
            id: progressId,
            type: progress === 100 ? "success" : "info"
        });

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => motyfInstance.close(document.getElementById(progressId)), 2000);
        }
    }, 500);
}

// 测试交互式消息
function testInteractiveMessage() {
    const interactiveMsg = motyf({
        content: `
                    <div style="padding: 5px;">
                        <p>确定要删除这个文件吗？</p>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            <button class="confirm-btn" style="padding: 5px 10px; background: #e74c3c;">确认删除</button>
                            <button class="cancel-btn" style="padding: 5px 10px; background: #95a5a6;">取消</button>
                        </div>
                    </div>
                `,
        type: "warning",
        autoClose: false
    });

    // 使用事件委托处理按钮点击
    interactiveMsg.addEventListener('click', (e) => {
        if (e.target.classList.contains('confirm-btn')) {
            motyf.success("文件已删除");
            motyfInstance.close(interactiveMsg);
        } else if (e.target.classList.contains('cancel-btn')) {
            motyf.info("操作已取消");
            motyfInstance.close(interactiveMsg);
        }
    });
}

// 测试自定义样式
function testCustomStyle() {
    motyf({
        content: "自定义样式消息",
        type: "custom-style"
    });
}

// 测试HTML内容
function testHTMLContent() {
    motyf({
        content: `
                    <div>
                        <h3 style="margin: 0 0 5px 0;">HTML内容</h3>
                        <p style="margin: 0;">支持<strong>加粗</strong>、<em>斜体</em>等格式</p>
                        <ul style="margin: 5px 0 0 0; padding-left: 20px;">
                            <li>列表项1</li>
                            <li>列表项2</li>
                        </ul>
                    </div>
                `,
        time: 5000
    });
}

// 测试自定义实例
function testCustomInstance() {
    const customMotyf = new MotyfJS({
        defaultAutoClose: false,
        defaultPosition: "top-center",
        defaultDuration: 5000
    });

    customMotyf.success("这是自定义实例的消息");
    customMotyf.error("不会自动关闭", 0);
}
