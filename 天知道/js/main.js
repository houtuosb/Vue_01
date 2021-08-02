var app = new Vue ({
    el:'#app',
    data:{
        city:'',
        weatherList:[]
    },
    methods:{
        searchWeather:function(){
            // console.log('查询天气')
            // console.log(this.city)
            var that = this
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city="+this.city)
            .then(function(res){
                // console.log(res.data.data.forecast)
                that.weatherList = res.data.data.forecast
            },function(err){})
            that.city = ''
        },
        changeCity:function(city){
            this.city =city
            this.searchWeather()
        },
        search:function(){
            this.searchWeather()
        }
    }
})