// JavaScript Document



function FBDeviceReady(){
			try {
				//alert('Device is ready!	Make sure you set your app_id below this alert.');
				FB.init({
					appId : "1453397304884091",
					nativeInterface : CDV.FB,
					useCachedDialogs : false
				});
				//document.getElementById('data').innerHTML = "FB init executed";
				console.log("FB init executed");
				facebook_api.FB_login();
				
				
				
			} catch (e) {
				console.log(e);
			}
}


/*<-----------------------------------------FACEBOOK Object----------------------------------------------->*/		

var facebook_api = {
	
	logout_value:0,
	
	FB_login: function(){
		FB.login(function(response) {
				if (response.authResponse) {
					FB.api('/me', function(response) {
         
					//http://developers.facebook.com/docs/reference/fql/user/
					console.log(response.id);

					var query =FB.Data.query('select name, profile_url, sex, pic_small from user where uid={0}',response.id);
						query.wait(function(rows) {
							console.log("name:"+rows[0].name+ " sex: "+rows[0].sex+"profile_url"+rows[0].profile_url+"rows[0].pic_small"+rows[0].pic_small);
							  //document.getElementById("newpic").src =rows[0].pic_small;
							 // document.getElementById("pname").innerHTML = rows[0].name;
						});
					});	
					console.log('logged in');
				    	facebook_api.logout_value = 1;
				   /* $.mobile.changePage( "#profile", { transition: "slide"} );*/
					
					
				} else {
					alert('not logged in');
				}
			}, {
				scope: "email,user_about_me,user_activities,user_birthday,user_hometown,user_interests,user_likes,user_location,friends_interests" 
			});
		},
		
		FB_logout: function(){
			FB.logout(function(response) {
  				console.log("Logout");
  					facebook_api.logout_value = 0;
  				$.mobile.changePage( "#login", { transition: "slide",reverse:true} );
			});
		},
		
		FB_me: function(){
			if(	facebook_api.check_FB_logout() == 1){	
				FB.api('/me/friends', {
					fields : 'id, name, picture'
				}, function(response) {
					if (response.error) {
						alert(JSON.stringify(response.error));
					} else {
						var data = document.getElementById('data');
						fdata = response.data;
						console.log("fdata: " +fdata+"response"+response);
						
						response.data.forEach(function(item) {
							var d = document.createElement('div');
							d.innerHTML = "<img src="+item.picture+"/>" + item.name;
							data.appendChild(d);
						});
					}
					var friendIDs= new Array();
					var friendsInfo=new Array();
					var friends = response.data;
					console.log(friends.length);
					for ( var k = 0; k < friends.length && k < 200; k++) {
						var friend = friends[k];
						var index = 1;

						friendIDs[k] = friend.id;
						friendsInfo[k] = friend;
					}
					console.log("friendId's: " + friendIDs);
				});
			}else alert("Please login again");
			
		},
		
		FB_getfbInfo:function(){
			if(	facebook_api.check_FB_logout() == 1){	
				FB.api('/me', function(response) {
         
					//http://developers.facebook.com/docs/reference/fql/user/
					console.log(response.id);
				
					var query =FB.Data.query('select name, profile_url, sex, pic_small from user where uid={0}',response.id);
					query.wait(function(rows) {
						console.log("name:"+rows[0].name+ " sex: "+rows[0].sex+"profile_url"+rows[0].profile_url);
						document.getElementById("newpic").src =rows[0].pic_small;
						document.getElementById('status1').innerHTML =
							'FQL Information: '+  "<br />" +
							'Your name: '      +  rows[0].name                                                            + "<br />" +
							'Your Sex: '       +  (rows[0].sex!= undefined ? rows[0].sex : "")                            + "<br />" +
							'Your Profile: '   +  "<a href='" + rows[0].profile_url + "'>" + rows[0].profile_url + "</a>" + "<br />" +
							'<img src="'       +  rows[0].pic_small + '" alt="" />' + "<br />";
					});
				});
			}else alert("Please login again");
		},
		
		check_FB_logout: function(){
				return facebook_api.logout_value;
			},
	
	}
			
		

