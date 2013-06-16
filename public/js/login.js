define(function(require, exports, module) {
	
	var $ = require('jquery'),
		Backbone = require('backbone');

	var LoginView = Backbone.View.extend({

		el: "#app-login",

		initialize: function() {

			var me = this;

			// 页面中常用的jQuery对象集合
			me.$collection = {
				$username : me.$('#login-name'),
				$loginPass : me.$('#login-pass')
			}
		},

		events : {
			"click #login-btn" : "doLogin"
		},

		/**
		 * @method doLogin
		 * 登录操作
		 */
		doLogin: function() {
			var me = this;

			$.ajax({
				url: '/api/loginIn',
				type: 'POST',
				data: {
					username: me.$collection.$username.val(),
					password: me.$collection.$loginPass.val()
				},
				dataType: 'json',
				timeout: 30000,
				success: function(data, textStatus, jqXHR) {
					if(data.resultCode === 0) {
						window.location.replace('/todos');
					} else {
						switch(data.resultCode) {
							case 1000:
								alert(data.description);
								break;
							default:
								break;
						}
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {

				}
			});

			// 阻止a标签默认行为
			return false;
		}



	});

	var appLogin = window.appLogin = new LoginView;

});