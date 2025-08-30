/**
 * 消息通知类
 */
class MotyfClass {
    /**
     * 构造函数
     */
    constructor() {
        this.initContainer();
    }

    /**
     * 初始化容器
     */
    initContainer() {
        if (!document.querySelector('.motym')) {
            const container = document.createElement('div');
            container.className = 'motym';
            document.body.appendChild(container);
        }
    }

    /**
     * 显示通知消息
     * @param {string|Object} str 消息内容或配置对象
     * @param {string} [type='success'] 消息类型 (success/danger/warning/info)
     * @param {number} [time=3000] 显示时间(毫秒)
     * @param {string} [id] 消息ID(用于更新已有消息)
     * @returns {HTMLElement} 消息元素
     */
    show(str, type, time, id) {
        // 处理参数重载情况
        let content, messageType, displayTime, messageId;
        
        if (typeof str === 'object' && str !== null) {
            // 配置对象形式: motyf({content: "内容", type: "success", time: 3000, id: "msg1"})
            content = str.content || str.str || '';
            messageType = str.type || 'success';
            displayTime = str.time !== undefined ? str.time : 3000;
            messageId = str.id || id;
        } else {
            // 参数形式: motyf("内容", "success", 3000, "msg1")
            content = str || '';
            messageType = type || 'success';
            displayTime = time !== undefined ? time : 3000;
            messageId = id;
        }

        this.initContainer();

        let html;
        let isCloseable = !messageId;

        // 更新已有消息或添加新消息
        if (messageId && document.getElementById(messageId)) {
            html = document.getElementById(messageId);
            const motyfElement = html.querySelector('.motyf');
            if (motyfElement) {
                motyfElement.className = 'motyf ' + messageType;

                // 更新内容时保持图标和文本结构
                const iconHtml = this.getIconHtml(messageType);
                motyfElement.innerHTML = `${iconHtml}<span class="motyf-text">${content}</span>`;
                isCloseable = true;
                
                // 重新移除 motym-out 类以确保动画重新触发
                html.classList.remove('motym-out');
            }
        } else {
            html = document.createElement('div');
            html.className = 'moty1';
            if (messageId) {
                html.id = messageId;
            }

            // 根据不同类型添加相应的SVG图标
            const iconHtml = this.getIconHtml(messageType);
            html.innerHTML = `<div class="motyf ${messageType}">${iconHtml}<span class="motyf-text">${content}</span></div>`;
            document.querySelector('.motym').appendChild(html);
        }

        // 自动关闭
        if (isCloseable && displayTime > 0) {
            setTimeout(() => {
                this.close(html);
            }, displayTime);
        }

        return html; // 返回元素引用，便于后续操作
    }

    /**
     * 显示成功消息
     * @param {string|Object} str 消息内容或配置对象
     * @param {number} [time=3000] 显示时间(毫秒)
     * @param {string} [id] 消息ID
     * @returns {HTMLElement} 消息元素
     */
    success(str, time, id) {
        const config = typeof str === 'object' ? str : { str, time, id };
        config.type = 'success';
        return this.show(config);
    }

    /**
     * 显示错误消息
     * @param {string|Object} str 消息内容或配置对象
     * @param {number} [time=3000] 显示时间(毫秒)
     * @param {string} [id] 消息ID
     * @returns {HTMLElement} 消息元素
     */
    error(str, time, id) {
        const config = typeof str === 'object' ? str : { str, time, id };
        config.type = 'error';
        return this.show(config);
    }

    /**
     * 显示警告消息
     * @param {string|Object} str 消息内容或配置对象
     * @param {number} [time=3000] 显示时间(毫秒)
     * @param {string} [id] 消息ID
     * @returns {HTMLElement} 消息元素
     */
    warning(str, time, id) {
        const config = typeof str === 'object' ? str : { str, time, id };
        config.type = 'warning';
        return this.show(config);
    }

    /**
     * 显示信息消息
     * @param {string|Object} str 消息内容或配置对象
     * @param {number} [time=3000] 显示时间(毫秒)
     * @param {string} [id] 消息ID
     * @returns {HTMLElement} 消息元素
     */
    info(str, time, id) {
        const config = typeof str === 'object' ? str : { str, time, id };
        config.type = 'info';
        return this.show(config);
    }

    /**
     * 获取不同类型消息的SVG图标HTML
     * @param {string} type 消息类型
     * @returns {string} SVG图标HTML
     */
    getIconHtml(type) {
        switch (type) {
            case 'success':
                return '<svg class="motyf-icon" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
            case 'error':
            case 'danger':
                return '<svg class="motyf-icon" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
            case 'warning':
                return '<svg class="motyf-icon" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';
            case 'info':
                return '<svg class="motyf-icon" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>';
            default:
                return '';
        }
    }

    /**
     * 关闭通知消息
     * @param {HTMLElement} element 消息元素
     */
    close(element) {
        if (element) {
            element.classList.add('motym-out');
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 300);
        }
    }

    /**
     * 关闭所有通知消息
     */
    closeAll() {
        const messages = document.querySelectorAll('.moty1');
        messages.forEach(msg => {
            this.close(msg);
        });
    }
}

// 创建全局实例
const motyfInstance = new MotyfClass();

// 兼容旧的全局函数调用方式
window.motyf = function(str, type, time, id) {
    return motyfInstance.show(str, type, time, id);
};

// 添加便捷方法到全局函数
window.motyf.success = (str, time, id) => motyfInstance.success(str, time, id);
window.motyf.error = (str, time, id) => motyfInstance.error(str, time, id);
window.motyf.warning = (str, time, id) => motyfInstance.warning(str, time, id);
window.motyf.info = (str, time, id) => motyfInstance.info(str, time, id);
window.motyf_close = (element) => motyfInstance.close(element);

// 点击关闭事件
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('moty1') || e.target.closest('.moty1')) {
        const motyElement = e.target.classList.contains('moty1') ? e.target : e.target.closest('.moty1');
        motyfInstance.close(motyElement);
    }
});

// 也暴露类本身（如果需要直接实例化）
window.MotyfClass = MotyfClass;
