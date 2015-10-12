/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var fbcall= function(){
	//FBDeviceReady();
	 window.plugins.DropboxChooser.launchDropboxChooser(function(results){
		 var firstResult = results[0];
		 console.log(firstResult.link+" : "+firstResult.name+" : "+firstResult.iconURL);   
		 /*$('#fileLink').val(firstResult.link);
		    $('#fileName').val(firstResult.name);
		    $('#fileIconURL').val(firstResult.iconURL);*/
		 
	 },function(){},"false");
	
}
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
 
    	
    		
    	fileDownloal();
    	
    	 //window.plugins.DropboxChooser.init("dx0mubnicc5mq0y");
    	 
    	 
    	//window . addEventListener ( " BatteryStatus " , onBatteryStatus ,  false ); 

    	
    	
    	//window.plugin.notification.badge.clear();
    	
    	//window.plugin.notification.badge.set(50);
    	
    	/* var ref = window.open('https://www.facebook.com/messages/Ajay', '_blank', 'location=yes');
         ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
         ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
         ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
         ref.addEventListener('exit', function(event) { alert(event.type); });*/
    	
   
    	
    	/*app.addBanner();
        
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/
        
        
        console.log('Received Event: ' + id);
    },
    addBanner: function() {
    	
        var successCreateBannerView = function() { console.log("addBanner Success"); admob.requestAd({'isTesting': true},success,error); };
        var success = function() { console.log("requestAd Success"); };
        var error = function(message) { console.log("Oopsie! " + message); };
        
        var options = {
            'publisherId': 'a15281f81877a0d',
            'adSize': admob.AD_SIZE.BANNER
        }
        admob.createBannerView(options,successCreateBannerView,error);
    },
    
    addInterstitial: function() {
        var successCreateBannerView = function() { console.log("addInterstitial Success"); admob.requestAd({'isTesting': true},success,error); };
        var success = function() { console.log("requestAd Success"); };
        var error = function(message) { console.log("Oopsie! " + message); };
        
        var options = {
            'publisherId': 'a15281f81877a0d'
        }
        admob.createInterstitialView(options,successCreateBannerView,error);
    },
    
    killAd: function() {
        var success = function() { console.log("killAd Success"); };
        var error = function(message) { console.log("Oopsie! " + message); };
        admob.killAd(success,error);
    }
   
};


function onBatteryStatus ( info )  { 
    //Handle the Online Event 
   console.log( "Level:"  + info . Level +"isPlugged:"+ info . isPlugged); 
   alert( "Level:"  + info . Level +"isPlugged:"+ info . isPlugged);
}


var fileDownloal = function() {
	
	
	var uri = encodeURI("http://www.youtube.com/watch?feature=player_detailpage&v=kShTN0Jz6Jg");

	window.requestFileSystem(
			LocalFileSystem.PERSISTENT, 0, function onFileSystemSuccess(fileSystem) {
				
				fileSystem.root.getFile("dummy.html", {create: true, exclusive: false}, function gotFileEntry(fileEntry){
					
                         var sPath = fileEntry.fullPath.replace("dummy.html","");
                         
                         var fileTransfer = new FileTransfer();
                         
                         fileEntry.remove();
                        	
                         fileTransfer.download(
                        		   
                        		 uri,
                                   
                        		   sPath,
                                   
                                   function(entry) {
                        			   
                        			   //toast("download complete Please wait")
                        			 	console.log("download complete: " + entry.fullPath);
                        			   
                        			  
                                   
                                   },
                                   function(error) {
                                	   
                                	   //toast("download Fail Try Again");
                                	   
                                	   console.log("download error source " + error.source);
                                	   console.log("download error target " + error.target);
                                	   console.log("upload error code: " + error.code);
                                   }
                                   );
                         }, 
                         fail);
             }, 
             fail);
	
}
function fail(evt) {
	 // toast("download Fail Try Again");
	console.log(evt.target.error.code);
	
}
