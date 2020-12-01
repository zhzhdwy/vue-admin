import service from '@/utils/request'

//获取验证码
export function GetVerifyCode(data){
    return service.request({
        method: "post",
        url: "/user/verify_code",
        data: data,
    })
}

export function Login(data) {
    return service.request({
        method: 'post',
        url: '/user/login',
        data: data
    })
}