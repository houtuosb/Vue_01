var app = new Vue({
    el:'#player',
    data:{
        // 输入歌曲名字
        query:'',
        // 歌曲列表
        musicList:[],
        // 歌曲播放地址
        musicurl:'',
        // 歌曲专辑封面
        musicCover:'',
        // 热门评论
        hotComments:[],
        // 播放动画
        isPlay:false,
        // mv战术
        isShow:false,
        // mv地址
        mvUrl:''
    },
    methods:{
        // 定义搜索歌曲函数
        searchMusic:function(){
            var that = this  // 使用回调函数，将that 定义给 this
            // 获取歌曲名字
            axios.get("https://autumnfish.cn/search?keywords="+this.query) 
            .then(function(res){
                // 将获取得歌曲名字存到列表中
                that.musicList = res.data.result.songs
                // console.log(that.musicList)
            },function(err){})
        },

        // 定义播放歌曲函数
        playMusic:function(musicId){
            // console.log(musicId)
            var that = this
            // 获取歌曲得id 用了识别搜索得歌曲以便于得到歌曲得url进行播放
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(res){
                // console.log(res.data.data[0].url)
                that.musicurl = res.data.data[0].url
            },function(err){})

            // 获取歌曲得专辑封面
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(res){
                that.musicCover = res.data.songs[0].al.picUrl;
            })

            // 获取歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(res){
                console.log(res);
                that.hotComments = res.data.hotComments
            },function(err){})
        },

        // 定义动画播放函数
        play:function(){
            this.isPlay = true
        },
        // 定义动画停止播放函数
        pause:function() {
            this.isPlay = false
        },

        // 定义播放mv函数
        playMV:function(mvid){
            var that = this
            // 获取播放mv的地址
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function(res){
                console.log(res.data.data.url)
                that.isShow = true;
                that.mvUrl = res.data.data.url
            },function(err){

            })
        },
        //停止播放MV函数
        hide:function(){
            this.isShow = false;
            this.mvUrl=''; //
        }
    }
})