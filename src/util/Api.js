//全局Api接口

//本地测试
const http = "http://127.0.0.1:8090";

//生产环境
// const http = "http://58.87.73.16:8090"

const globalAPI = {

    /**
     * RestFul Api
     * 用户
     */
    // 登录(POST)(finish)
    LoginApi: http + '/user',

    // 注册(POST)(finish)
    RegisterApi: http + '/user/account',

    //获取用户信息(GET)(finish)
    RetrieUserInformationApi: http + '/user/information',

    //获取其他用户信息(GET)(finish)
    RetrieOtherUserInformationApi: http + '/user/information/others',

    //修改用户信息(PUT)(finish)
    UpdateUserInformationApi: http + '/user/information',

    //上传头像(POST)(finish)
    UpdateUserApi: http + '/avatar',

    //关注用户(POST)(finish)
    CreateUserCollectionApi: http + '/userCollection',

    //取消关注(DELETE)(finish)
    DeleteUserCollectionApi: http + '/userCollection',

    //找回密码(PUT)(finish)
    UpdatePasswordByEmailApi: http + '/user/password',

    //修改密码(PUT)(finish)
    UpdatePasswordApi: http + '/user/information/password',


    /**
     * Restful Api
     * 博客
     */
    //发表博客(POST)(finish)
    CreateBlogApi: http + '/blog',

    //删除博客(DELETE)(finish)
    DeleteBlogApi: http + '/blog',

    //修改博客(PUT)(finish)
    UpdateBlogApi: http + '/blog',

    //获取指定博客(GET)(finish)
    RetrieBlogApi: http + '/blog',

    //获取博客集合(GET)(finish)
    RetrieveBlogListApi: http + '/blog/user',

    //收藏博客(POST)(finish)
    CreateBlogCollectionApi: http + '/blogCollection',

    //取消收藏(DELETE)(finish)
    DeleteBlogCollectionApi: http + '/blogCollection',

    //上传图片(POST)(finish)
    CreateBlogImageApi: http + '/blog/image',


    /**
     * Restful Api
     * 评论
     * 2019年4月4日16:15:20
     */
    //发表评论(POST)(finish)
    CreateRemarkApi: http + '/remark',

    //删除评论(DELETE)(finish)
    DeleteRemarkApi: http + '/remark',


    /**
     * Restful Api
     * 消息
     * 2019年4月12日11:33:46
     */
    RetrieMessageApi: http + '/message'
}

export default globalAPI