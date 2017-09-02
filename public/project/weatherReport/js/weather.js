var vm = new Vue({
	el: '#main',
	data: {
		weather: {}
	},
	mounted: function() {
		this.getWeatherInfo();
	},
	filters: {
		getDay: function(day) {
			if(typeof(day) === 'string') {
				var year = day.slice(0, 4);
				var month = day.slice(4, 6);
				var d = day.slice(6, 8);
				return year + '-' + month + '-' +d;
			}
		}
	},
	methods: {
		getWeatherInfo: function() {
			var src = 'http://v.juhe.cn/weather/index?format=2&cityname=' + encodeURI('闽侯')+'&key=0c4cdfd5469bdb7be0068b3e53bfcc95';
			this.$http.jsonp(src).then(function(res) {
				this.weather = res.body.result;
			})
		}
	}
})