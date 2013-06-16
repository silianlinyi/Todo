
/**
 * 注册页面
 */
define(function(require, exports, module) {
	
	var $ = require('jquery'),
		Backbone = require('backbone');

	var SignupView = Backbone.View.extend({

		el: "#app-signup",

		initialize: function() {

			var me = this;

			// 页面中常用的jQuery对象集合
			me.$collection = {
				$signupName : me.$("#signup-name"),
				$signupPass : me.$("#signup-pass"),
				$signupRepeatPass : me.$("#signup-repeat-pass")
			};
		},

		events : {
			"click #signup-btn" : "doSignup"
		},

		/**
		 * @method doSignup
		 * 注册操作
		 */
		doSignup: function() {
			var me = this,
				$collection = me.$collection,
				username = $collection.$signupName.val(),
				password = $collection.$signupPass.val(),
				repeatPass = $collection.$signupRepeatPass.val();

			$.ajax({
				url: '/api/signup',
				type: 'POST',
				data: {
					username: username,
					password: password,
					repeatPass: repeatPass
				},
				dataType: 'json',
				timeout: 30000,
				success: function(data, textStatus, jqXHR) {
					switch(data.resultCode) {
						case 0:
							alert(data.description);
							window.location.replace('/userInfo')
							break;
						default:
							alert(data.description);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {

				}
			});

			// 阻止a标签默认行为
			return false;
		}



	});

	var appSignup = window.appSignup = new SignupView();

});