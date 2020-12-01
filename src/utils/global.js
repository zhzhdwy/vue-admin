import { MessageBox } from 'element-ui';
export default {
    install (Vue) {
        // 注册全避方法
        Vue.prototype.confirm = (params) => {
            MessageBox.confirm(params.content,  params.tip || "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: params.type || "warning",
                center: true
            }).then(() => {
                params.fn && params.fn(params.object || '')
            }).catch(() => {
                params.catchFn && params.catchFn()
            });
        }
    }
}