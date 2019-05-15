// 配置文件
wx.config = {
  base:"https://minibizhi.313515.com/",//基本域名
  shareTitle:'配置文件里设置分享标题',//分享默认标题
  statistic: false,//是否开启微信统计 统计场景值1020,1035,1043,1037  及统计跳转到其它小程序, 开启后需要后台配置统计事件
  PID: 100,//1壁纸精选 2 哎喔壁纸  3高清壁纸
  Ver:7,//头部的ver 
  interfaces:{//接口
    login:'StarSign/login',//登陆接口
    sendUserInfo:'list/UserInfo',//提交用户信息接口
    setting:"list/Init",//配置接口
    pushreport:"list/pushreport",//提交formid接口
    AdInfoList:"List/AdInfoList",//广告
    SelectionList:"List/SelectionList",   //首页 - 上半部分
    hotDynamic:"List/HotTrends",          //首页 - 热门动态换一换
    authorColumn: "List/AuthorWallpaper", //首页 - 作者专栏换一换
    dynamicWallpaper: "List/RandomDynamicPicList", //首页 - 动态壁纸换一换
    WallpaperList: 'List/WallpaperList',  //首页 - 壁纸列表 最新页 最新
    Categorys: 'List/Categorys',          //分类页
    OriginalList: 'List/OriginalList',    //最新页 原创
    AlbumList: 'List/AlbumList',          //最新页 专辑
    UserUplaod: 'List/UserUplaod',          //上传页面
    CollectionList: 'list/CollectionList',//多列表通用页 - 收藏页-壁纸 userID
    AlbumCollectList: 'list/AlbumCollectList',//多列表通用页 -收藏-专辑
    networkpiccollectionlist: 'list/networkpiccollectionlist',//多列表通用页 - 收藏页-头像表情 userID  type(1表情 3头像)
    CategoryNavigationList: 'list/CategoryNavigationList',//多列表通用页 头像表情页 cateID(2表情 1头像)
    CategoryMoreList: 'list/CategoryMoreList',   //多列表通用页 头像表情页-cateID(2表情 1头像) sort(2最新1最热3总榜) subCateID分类id
    ContractAuthorList: 'list/ContractAuthorList',   //多列表通用页 作者专栏作者列表-cateID(2表情 1头像) sort(2最新1最热3总榜) subCateID分类id
    JoinAuthorInfos: 'list/JoinAuthorInfos',   //多列表通用页 头像表情页-cateID(2表情 1头像) sort(2最新1最热3总榜) subCateID分类id
    CategoryContent: 'list/CategoryContent',      //多列表通用页 分类内页
    DynamicPicList: 'list/DynamicPicList',        //多列表通用页 动态壁纸列表
    UserUploadList: 'list/UserUploadList',        //单列表通用页 上传壁纸列表
    CancelUplaod: 'list/CancelUplaod',            //单列表通用页 删除上传壁纸
    myoriginallist: 'list/myoriginallist',        //单列表通用页 - 原创专栏 userID  
    RecommendModular: 'list/RecommendModular',    //单列表通用页 - 限免专区
    background: 'list/background',                //单列表通用页 - 聊天背景  
    UserPraise: 'list/UserPraise',                //单列表通用页 - 赞我的 userID
    CommentOnMyList: 'list/CommentOnMyList',      //单列表通用页 - 评论我的 userID
    AttentionOnMeList: 'list/AttentionOnMeList',  //单列表通用页 - 关注我的 或者 粉丝 或者已关注  userID userAttention（0粉丝1已关注）
    InformationCenter: 'list/InformationCenter',  //我的页面 用户信息接口 userID
    AddAttention: 'list/AddAttention',            //关注 userID  attentionUserID（关注的用户id）
    CancelAttention: 'list/CancelAttention',      //取消关注 userID attentionUserID （取消关注的用户id）
    AddStatistics: 'List/AddStatistics',          //上报 adID（广告id） userID dataType（1点击 2 曝光） （取消关注的用户id）
    WallpaperReport: 'List/WallpaperReport',      //大图页 壁纸举报
    WallpaperRelate: 'list/WallpaperRelate',      //大图页 相关推荐接口
    collect: 'list/collect',                      //大图页 壁纸收藏接口 其中type 0壁纸 1用户上传 2视频
    cancelcollect: 'list/cancelcollect',          //大图页 壁纸取消收藏接口
    networkpiccollect: 'list/networkpiccollect',  //大图页 头像表情收藏 取消收藏接口 type 1表情 3头像  isCollection 1收藏 0 取消收藏
    WallpaperInfo: 'list/WallpaperInfo',          //大图页 获取单张壁纸 picID  isPay是否付费 isUserUpload是否用户上传
    EmojiPortraitInfo: 'list/EmojiPortraitInfo',  //大图页 获取单张头像表情 ID
    SharingUnlockPic: 'list/SharingUnlockPic',    //大图页  解锁  unlockType 1 分享解锁 2分享奖励解锁
    SharingRewardsPic: 'list/SharingRewardsPic',  //大图页 分享奖励
    SearchList: 'list/SearchList',                //搜索页（大图标签也用到） 搜索关键字接口
    AlbumContent: 'list/AlbumContent',            //专辑详情页
    AlbumCollection: 'list/AlbumCollection',      //专辑详情页收藏 isCollection 0 取消 1 收藏

    // CommentList: 'list/CommentList',              //专辑评论列表接口 
    // Comment: 'list/Comment',                      //专辑评论评论接口 
    // CommentPraise: 'list/CommentPraise',          //专辑评论点赞接口 
    // ReplyComments: 'list/ReplyComments',          //回复评论 
    ClosePush: 'list/ClosePush',                  //关闭推送 
    SearchWord: 'list/SearchWord',                //搜索壁纸热门关键词 
    EmojiSearchWord: 'list/EmojiSearchWord',      //搜索头像表情 热门关键词 
    SearchList: 'list/SearchList',                //搜索壁纸列表
    EmojiSearchList: 'list/EmojiSearchList',      //搜索头像表情列表
    BzCategoryList: 'list/BzCategoryList',      //搜索头像表情列表
  }
}