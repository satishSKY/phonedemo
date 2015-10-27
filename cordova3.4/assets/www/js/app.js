/***** Global variable Declaration starts *****/
var isDevice;
var deviceType;
/***** Global variable Declaration end *****/

function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;
    head.appendChild(script);
  }

var jsArr = ['js/util/iscroll.js','https://maps.googleapis.com/maps/api/js?sensor=true'];


var app = {
        PUSH_ID: null,
        db: null,

        // Application Constructor
        initialize: function() {
            this.bindEvents();
            
            loadScript(jsArr[0],function(){
                /*myScroll = new IScroll('.wrapper-home',{
                    scrollbars: true,
                    disableTouch: false,
                    bounceEasing: 'elastic',
                    shrinkScrollbars: 'scale',
                });*/
             
            });
        },

        bindEvents: function() {
            app.userAgent();
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        onDeviceReady: function() {
            
            console.log("!!!!!!!!!!!!!!!!!!!!!deviceready!!!!!!!!!!!!!!!!!");
            // Register Back button the event listener
            document.addEventListener("backbutton", app.onBackKeyDown, false);
            // This is an event that fires when a Cordova application is online
            document.addEventListener("online", app.onOnline, false);
            document.addEventListener("pause", app.onPause, false);
            document.addEventListener("resume", app.onResume, false);

            app.receivedEvent();

        },
        receivedEvent: function() {
            try{
                //createDatabase;
                app.createDatabase();

            }catch(e){
                console.log("error"+e);
            }    


        },
        getCurrentTime: function(format){
            /***********************************************************************

                        Function Name : getCurrentTime (to get the current Time and date)

                        Parmeters     : none

                        return        : var MYTIME='';              //formate hh:mm:ss  (1)

                        var MYCURRENTTIME='';       //yy:dd:mm hh:mm:ss  (2)

                        var TIMEFORMATE_DMY='';         //dd:mm:yy   (3)

                        var TIMEFORMATE_Check='';   //ddmmyy    (4)

                        var TIMEFORMATE_YMD='';     //format yy-mm-dd   (5)

                        var date_str_month="";           //formate dd-January-2013  (6)


             ************************************************************************/

            var MYTIME='', MYCURRENTTIME='', TIMEFORMATE_DMY='',TIMEFORMATE_Check='',TIMEFORMATE_YMD='',TIMEFORMATE_YMD='';

            var today = new Date();

            var dd = today.getDate();

            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();

            if(dd<10){dd='0'+dd} 

            if(mm<10){mm='0'+mm}

            TIMEFORMATE_YMD = yyyy+'-'+mm+'-'+dd;

            if(format == 5) return TIMEFORMATE_YMD;

            TIMEFORMATE_DMY=dd+''+mm+''+yyyy;

            if(format == 3) return TIMEFORMATE_DMY;

            TIMEFORMATE_Check=dd+''+mm+''+yyyy;

            if(format == 4) return TIMEFORMATE_Check;

            console.log("TIMEFORMATE_Check:"+TIMEFORMATE_Check+"Date TIMEFORMATE_DMY:!!!!:"+TIMEFORMATE_DMY);

            MYCURRENTTIME=TIMEFORMATE_YMD+' ';

            var H=today.getHours();
            var Minutes=today.getMinutes();
            var Second =today.getSeconds();

            var Hours = H % 12 || 12;

            if(Hours <= 9){Hours='0'+Hours;}
            if(Minutes <= 9){Minutes='0'+Minutes}
            if(Second <= 9){Second='0'+Second;}

            MYCURRENTTIME+= Hours+':'+ Minutes+ ':'+Second;

            if(format == 2) return MYCURRENTTIME;

            console.log("TIMEFORMATE_Check"+TIMEFORMATE_Check);

            MYTIME= Hours+':'+ Minutes+ ':'+Second;

            if(format == 1) return MYTIME;

            console.log(MYCURRENTTIME+"Date Formate:!!!!:"+TIMEFORMATE_YMD+":"+MYTIME);         

            var month=new Array();
            month[0]="January";
            month[1]="February";
            month[2]="March";
            month[3]="April";
            month[4]="May";
            month[5]="June";
            month[6]="July";
            month[7]="August";
            month[8]="September";
            month[9]="October";
            month[10]="November";
            month[11]="December";

            date_str_month = dd+' '+month[today.getMonth()]+' '+yyyy;   

            if(format == 6) return date_str_month ;

            console.log(date_str_month);
        },

        getlatitudelongitude: function(callBack){
            /***********************************************************************

                            Function Name : getlatitudelongitude (to get the current latitude and longitude of user)

                            Parmeters     : none

                            return        : latitude and longitude when user share his location, error otherwise


             ************************************************************************/

            var USER_LATITUDE = 0.0;
            var USER_LONGITUDE = 0.0;
            
            if (navigator.geolocation){
                    console.log("getlatitudelongitude");
                    
                navigator.geolocation.getCurrentPosition(function(position){
                    // on success of getting current position of user 
                   
                    USER_LATITUDE = position.coords.latitude;
                    USER_LONGITUDE = position.coords.longitude;

                    console.log("USER_LATITUDE==>"+USER_LATITUDE+"USER_LONGITUDE==>"+USER_LONGITUDE);
                    
                    callBack(true,USER_LATITUDE,USER_LONGITUDE);
                
                }, function(error){
                    // on error
                    
                    console.log('Unable to get your current location'+JSON.stringify(error));
                    console.log('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
                    callBack(false,USER_LATITUDE,USER_LONGITUDE);
                    navigator.notification.alert(
                            'Unable to get your current location',  // message
                            function(){
                                return false;                                 
                            }, // callback
                            '',   // title
                            'Ok' // buttonName
                    );

                    
                }/*,{maximumAge:3000,enableHighAccuracy:true}*/);
            }else{
                callBack(false,USER_LATITUDE,USER_LONGITUDE);
                navigator.notification.alert(
                        'Unable to get your current location',  // message
                        function(){
                            return false;                                 
                        }, // callback
                        '',   // title
                        'Ok' // buttonName
                );
                console.log('Geolocation is not supported by this browser. Please upgrade with the latest broswer.');
            }

        },

        checkNetwork: function(){
            /***********************************************************************

                        Function Name : checkNetwork (to check the network is available on device or not)

                        Parmeters     : none

                        return        : true for network is available or false for not available


             ************************************************************************/

            if(isDevice == false){
                return false;
            }   

            var networkState = navigator.connection.type;

            var states = {};    

            states[Connection.UNKNOWN]  = 'Unknown connection';

            states[Connection.ETHERNET] = 'Ethernet connection';

            states[Connection.WIFI]     = 'WiFi connection';

            states[Connection.CELL_2G]  = 'Cell 2G connection';

            states[Connection.CELL_3G]  = 'Cell 3G connection';

            states[Connection.CELL_4G]  = 'Cell 4G connection';

            states[Connection.NONE]     = 'No network connection';

            var statusValue = (networkState + '').toLowerCase();

            console.log(statusValue);

            if(statusValue == 'none' || statusValue == 'null'){
                // give a alert to user that connection is lost.

                app.Toast.show("Please check network connection");
                return false;

            }else{

                return true;
            }
        },    

        validEmail:  function(emailid){
            /***********************************************************************

                    Function Name : validEmail (to check provided email is valid or not)

                    Parmeters     : email (email address)

                    return        : true for valid email or false for invalid email


             ************************************************************************/
            console.log("emailid==>"+emailid);
            var email = emailid;
            var matcharray = email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z]+)*\.[A-Za-z]+$/) ;
            
            //var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i ;
            //return ck_email.test(email);
            
            if(matcharray==null)
            {   
                app.Toast.show("Please enter valid email address");
                return false;
            }
            else
            {
                return true;
            }
        },
        /*******************************************************************************
        
                validatePassword (lower = /[a-z]/,) lower.test(password) &&

        ******************************************************************************/   
        validatePassword: function(password) {
            var minMaxLength = /^[\s\S]{8,32}$/,
            upper = /[A-Z]/,
            number = /[0-9]/,
            special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
            
            if (minMaxLength.test(password) &&
                upper.test(password) &&
                number.test(password) &&
                special.test(password)
               ){
                return true;
            }
            
            return false;
        },
        
        wip: function(){
            /***********************************************************************

                        Function Name : wip (function for showing working status)

                        Parmeters     : none


             ************************************************************************/


            //showToastMessage('Work in progress.', false, 'middle-center', 'warning', '');
            navigator.notification.beep(2);
            //app.Toast('Work in progress.');

            return false;

        },
        /***********************************************************************

                                Function Name : changePage (to change the page)

                                Parmeters     : divId (which div we want to go when change the page)

                                Parmeters     : pageTransition (this param is to set the page transition

                                                default "slide")

                                Parmeters     : reverseTransition (reverse transition is allowed or not

                                                true for reverse transition

                                                false for forward transition

                                                default false)

                                Parmeters     : changeHash (change hash allowed or not

                                                true for changing the hash value

                                                false for no changing the hash value

                                                default true)


         ************************************************************************/



        changePage: function(divId, pageTransition, reverseTransition, changeHash){

            console.log(divId+"changePage called");

            var pageTransition1 = typeof(pageTransition) != 'undefined' ? pageTransition : 'none';  
            var reverseTransition1 = typeof(reverseTransition) != 'undefined' ? reverseTransition : false;
            var changeHash1 = typeof(changeHash) != 'undefined' ? changeHash : true;

            $.mobile.changePage( '#'+divId, {
                transition: pageTransition1,
                reverse: reverseTransition1,
                changeHash: changeHash1
            });

        },
        /***********************************************************************

                        Function Name : loaderStart (function will display wating loader to user)

                        Parmeters     : message


         ************************************************************************/

        loaderStart: function(message_title, message_text,outTime){
            var checkNetConnection = app.checkNetwork();
            
            if(isDevice == false) //Run this function, if is being executed on device. 

            {
                console.log("activityStart divice false");

                $.mobile.showPageLoadingMsg();      

                return true;

            }
            
            if(deviceType == 'android' && checkNetConnection == true)

            {
                console.log("activityStart Android");

                // if(typeof(outTime) =='undefined')outTime=80000;

                if(typeof(message_title)=='undefined')message_title = 'Loading';

                if(typeof(message_text)=='undefined')message_text = 'Please wait...';


                navigator.notification.activityStart("", "");  
          
            }

            else if(deviceType == 'Windows Phone' && checkNetConnection == true)

            {
                console.log("activityStart");

                navigator.notification.activityStart();     

                return true;

            }

        },

        /***********************************************************************

                        Function Name : loaderStart (function will hide wating loader to user)

                        Parmeters     : none


         ************************************************************************/

        loaderStop: function(){

            if(isDevice == false)//Run this function, if is being executed on device. 

            {

                $.mobile.hidePageLoadingMsg();

                return true;

            }

            if(deviceType == 'android' || deviceType == 'Windows Phone')

            {

                navigator.notification.activityStop();

            }

        },
        /***********************************************************************

                                    Function Name : goBack (to go back to history(javascript) page)

                                    Parmeters     : none


         ************************************************************************/

        goBack: function(){
            history.back();

        },
        /***********************************************************************

                            Function Name : createDatabase (to create database)

                            Parmeters     : none


         ************************************************************************/
        createDatabase : function()
        {
            console.log("call db open==>"+isDevice);
            if(isDevice == true)

            {       
                try{
                    app.db = window.sqlitePlugin.openDatabase("Database", "1.0", "Ass", 2000000);    

                    app.db.transaction(app.createTable, function(e){
                        console.log("errorDB call ????????????????"+e);
                    }, function(){
                        console.log("success DB created!!!!!!!!!!!!!!!!!!!!!!!");
                        app.db.transaction(function(tx){
                            tx.executeSql('SELECT * FROM LOGIN WHERE KEEPLOGINSTATUS=1',  [], function(tx,results){
                                console.log("results.rows.length!!!!!!!!!!!!!!!!!!!!!!!"+results.rows.length);
                                if(results.rows.length > 0){
                                    $( "#keep_me_login_rdo" ).prop( "checked", true ).checkboxradio( "refresh" );
                                    LOGIN.localVar.password = results.rows.item(0).PASSWORD;
                                    LOGIN.localVar.userId = results.rows.item(0).PDAID;
                                    LOGIN.localVar.userName = results.rows.item(0).FIRSTNAME;
                                    LOGIN.localVar.lastName = results.rows.item(0).LASTNAME;
                                    LOGIN.localVar.authId = results.rows.item(0).AITHID;
                                    console.log("LOGIN.localVar.password == >"+LOGIN.localVar.password);
                                    $( ":mobile-pagecontainer" ).pagecontainer( "change", "index.html#home", { role: "page",transition: "slide"  } );
                                    LOGIN.keepLogin();
    
                                }
                            })
                        })
                    }
                    );
                }catch(e){console.log("ERROR"+e.toString());}

            }

        },
        /**************************************************************************

                                        Genarate Random Number

                                        4 digit

         **************************************************************************/

        randomNumber: function(){
            var chars = "123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnpqrstuvwxyz";
            var min = 10000;
            var max = 99999;
            /*var num = Math.floor(Math.random() * (max - min + 1)) + min+'@'+Math.floor(Math.random()*1000);*/
            var string_length = 5;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
             }
            var str =Math.floor(Math.random() * (max - min + 1)) + min+''+randomstring;
            var res = str.charAt(Math.floor(Math.random()*10));
            var num= str.replace(res,'@');
            
            console.log("random no :"+num);
            return num;
        },
        /**************************************************************************

                                        Get Device Information

         **************************************************************************/

        deviceInfo: function(){ 
            var Device_Name = device.name;
            var Device_Cordova = device.cordova;
            var Device_Platform = device.platform;
            var Device_UUID = device.uuid;
            var Device_Version = device.version;
            console.log("Device_Name"+Device_Name+"Device_Platform"+Device_Platform+"Device_UUID"+Device_UUID);
            return Device_UUID;
        },

        userAgent: function() {

            var userAgent = navigator.userAgent + ''

            if( (userAgent.indexOf('iPhone') > -1) || (userAgent.indexOf('iPad') > -1) ){ deviceType = 'ios'; isDevice = true;}

            else if(userAgent.indexOf('Android') > -1){ deviceType = 'android'; isDevice = true;}
            else if(navigator.userAgent.match(/Windows Phone/i)){ isDevice = true; }
            else{// device is web browser

                deviceType = 'web_browser';

                // isDevice
                isDevice = false;

            }
            console.log(isDevice+"<==userAgent=="+navigator.userAgent.match(/Windows Phone/i)+"userAgent=="+userAgent);

            $(document).bind("mobileinit", function () {
                
                $.mobile.touchOverflowEnabled = true;
                $.mobile.support.cors = true;
                $.mobile.allowCrossDomainPages = true;
                $.mobile.defaultPageTransition = 'none';
                $.mobile.defaultDialogTransition = "none";
                $.mobile.ajaxEnabled = false;


            });
            
            //return isDevice;
        },

        /***********************************************************************

                        Function Name : fires when a Cordova application is online 

                        Parmeters     : none

                        return        : none


         ************************************************************************/

        onOnline: function(){
            console.log("onOnline");
            //app.addBanner();
        },
        onPause:  function(){
            console.log("onPause");
        },

        onResume: function(){
            console.log("onResume");
        },
        /***********************************************************************

                                Function Name : onBackKeyDown (for back button handler)

                                Parmeters     : none

                                return        : none


         ************************************************************************/

        onBackKeyDown: function(){
            var activPage=$.mobile.activePage.attr('id');
            console.log("activPage==>"+activPage);
            if($.mobile.activePage.is("#home") || $.mobile.activePage.is("#login")){
                navigator.app.exitApp();
                /*navigator.notification.confirm(
                        'Are you sure want to exit',  // message
                        function(button){
                            if(button == 1)
                                navigator.app.exitApp();
                        },              // callback to invoke with index of button pressed
                        '',            // title
                        'Yes,No'          // buttonLabels
                );*/
            }else{
                window.history.back();
            } 
        },
        /***********************************************************************

                                    Function Name : createTable (to create table)

                                    Parmeters     : none


         ************************************************************************/



        createTable: function(tx){ 
            console.log("create All Table start");
            
            //tx.executeSql('DROP TABLE IF EXISTS LOGIN ');
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGIN(PDAID TEXT,FIRSTNAME TEXT, LASTNAME TEXT, PASSWORD TEXT, AITHID TEXT ,KEEPLOGINSTATUS TEXT)');

            //tx.executeSql('DROP TABLE IF EXISTS USERPARTY ');
           // tx.executeSql('CREATE TABLE IF NOT EXISTS WISHLIST(WISH_ID INTEGER  PRIMARY KEY AUTOINCREMENT, USER_ID TEXT, PRODUCT_ID TEXT, STATUS TEXT)');

            //tx.executeSql('DROP TABLE IF EXISTS USERFAVRET ');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS USERFAVRET(Table_ID INTEGER  PRIMARY KEY AUTOINCREMENT, FRECIPY_ID TEXT, FCATEGORY_ID TEXT)');

            //tx.executeSql('DROP TABLE IF EXISTS afas_Login ');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS afas_Login(loginTable_ID INTEGER  PRIMARY KEY AUTOINCREMENT, USERNAME TEXT, PASSWORD TEXT, USERTYPE TEXT)');

            //tx.executeSql('DROP TABLE IF EXISTS afas_jobdetails');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS afas_jobdetails (JobTable_ID INTEGER PRIMARY KEY AUTOINCREMENT, JobID TEXT, JobType TEXT, Job_SiteName_EN TEXT, Job_SiteName_AR TEXT, Job_SiteAddress_EN TEXT, Job_SiteAddress_AR TEXT, Job_Suburb_EN TEXT, Job_Suburb_AR TEXT, Job_PostCode_EN TEXT, Job_PostCode_AR TEXT, Job_StateId TEXT, Job_CountryId TEXT, Job_SiteStreet_EN TEXT, Job_SiteStreet_AR TEXT, Job_BuildName_EN TEXT, Job_BuildName_AR TEXT, Job_BuildDesc_EN TEXT, Job_BuildDesc_AR TEXT, Job_SyteTypeId TEXT, Job_SiteContactName_EN TEXT, Job_SiteContactName_AR TEXT, Job_SitePhone_EN TEXT,Job_SitePhone_AR TEXT,Job_SiteEmail_EN TEXT,Job_SiteEmail_AR TEXT,Job_StratPlan_EN TEXT,Job_StratPlan_AR TEXT,Job_OwnerAgentName_EN TEXT,Job_OwnerAgentName_AR TEXT,AFSS_Signatory_EN TEXT,AFSS_Signatory_AR TEXT,Job_InsptMonth TEXT,Job_AFSSDate TEXT,Commencement_Year TEXT,Job_Lattitudes TEXT,Job_Longitudes TEXT)');


            //tx.executeSql('DROP TABLE IF EXISTS afas_equipment');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS afas_equipment(EquipTable_ID INTEGER PRIMARY KEY AUTOINCREMENT, EqTypesId INTEGER, EqJobID INTEGER, EqTypes_Name_EN TEXT, EqTypes_Name_AR TEXT)');


            //tx.executeSql('DROP TABLE IF EXISTS afas_certificates');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS afas_certificates(CertTable_ID INTEGER PRIMARY KEY AUTOINCREMENT, CertificateId INTEGER,Cert_CertificateType TEXT,Status TEXT,Cert_JobId INTEGER,Cert_ContractorName_AR TEXT,Cert_ContractorName_EN TEXT,Cert_EquipmentName_AR TEXT,Cert_EquipmentName_EN TEXT,Cert_Date_EN TEXT,Cert_Date_AR TEXT,Cert_File_EN TEXT,Cert_File_AR TEXT,Cert_Desc_EN TEXT,Cert_Desc_AR TEXT,Update_Date TEXT)');




            //tx.executeSql('DROP TABLE IF EXISTS afas_drawings ');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS afas_drawings(DrqwingTable_ID INTEGER  PRIMARY KEY AUTOINCREMENT, DrawingID INTEGER, DrawingJobID INTEGER, DrawingFile_EN TEXT, DrawingFile_AR TEXT)');


        },

        /**************************************************************************

                                                local storage

         **************************************************************************/

        myStorage:  {
            save: function(index, data) {
                //var sData = JSON.stringify(data);
                window.localStorage.setItem(index, data);
            },
            getParseData: function(d) {
                if (window.localStorage.getItem(d) != null ) {
                    var sData = window.localStorage.getItem(d);
                    return JSON.parse(sData);
                }
                else
                {
                    return false;
                }
            },
            get: function name(d) {
                if (window.localStorage.getItem(d) != null ) {
                    var sData = window.localStorage.getItem(d);
                    return sData;
                }
                else
                {
                    return false;
                }
            },
            del :function(key){
                if (window.localStorage.getItem(key) != null) {
                    window.localStorage.removeItem(key);
                    return true;
                }
                else{
                    return false;
                }
            },
            clr :function(){

                window.localStorage.clear();
            }

        },

        /***********************************************************************************************************
         * 
         *                                  XML HTTP REQUEST JavaScript
         * 
         * *********************************************************************************************************/


        XMLHTTP: {
            HTTPRequest: null,
            http: function() {
                try{
                    if (window.XMLHttpRequest)
                        app.XMLHTTP.HTTPRequest = new XMLHttpRequest();
                    else
                        app.XMLHTTP.HTTPRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }catch (e) {
                    console.log("error"+e);
                }
            },
            httpPost: function(PostData,callback) {
                try{
                    var checkNetConnection = app.checkNetwork();

                    if(checkNetConnection == true){ 
                        
                        var httpRequest=null;
                        console.log("URL ==> "+PostData);
                        httpRequest = app.XMLHTTP.HTTPRequest; 
                        httpRequest.open("POST",PostData,true);
                        try{
                            httpRequest.send();
                            httpRequest.onreadystatechange=function(){
                                if(httpRequest.readyState==4 && (httpRequest.status==200||httpRequest.status==0)){
                                    //eval('var data = ' + httpRequest.responseText + ';');
                                    console.log("ajax.responseText"+httpRequest.responseText);
                                    console.log(httpRequest.getAllResponseHeaders()+"Result"+httpRequest.responseText.length);
                                    var data = JSON.parse(httpRequest.responseText);
                                    //processDilog.stop();
                                    app.loaderStop();
                                    callback(data); 

                                }
                            }
                        }catch (e) {
                            console.log("Error"+e.toString());
                        }
                    }//connection

                }catch (e) {
                    console.log("error"+e.toString());
                }
            },
            httpPostAjax: function(data,Method,PostData,callback) {
                var checkNetConnection = app.checkNetwork();
                if(checkNetConnection == true){ 
                    console.log("Method==>"+Method+"<==data==>"+JSON.stringify(data)+"<==URL ==> "+PostData);
                    try{
                        $.ajax({
                            type: Method,
                            url: PostData,
                            data: JSON.stringify(data),
                            contentType: "application/json; charset=utf-8",
                            mimeType: 'application/json',
                            dataType: "json",
                            processData: true,
                            beforeSend: function (xhr) {
                                if($.mobile.activePage.is("#location") || $.mobile.activePage.is("#addlocation") || $.mobile.activePage.is("#preferences") || $.mobile.activePage.is("#autoPreferences") || $.mobile.activePage.is("#addAutoPreferences")){
                                    console.log("!!!!!!!!!!!!!Add header!!!!!!!!!!!!!!!!!!!");
                                    //xhr.setRequestHeader (LOCATION.localVar.locationHeader[0], LOCATION.localVar.locationHeader[1]);
                                    xhr.setRequestHeader("pdas_user_id",LOGIN.localVar.userId);
                                 }
                                setTimeout(function(){ app.loaderStop(); }, 30000);
                            },
                            success: function (data, status, jqXHR) {
                                app.loaderStop();
                                console.log(jqXHR.getAllResponseHeaders()+"ajax.responseText==>" + jqXHR.responseText);
                                var jdata = JSON.parse(jqXHR.responseText) 
                                callback(jdata);
                            },
                            error: function (xhr) {
                                app.loaderStop();
                                
                                try{
                                    console.log(JSON.stringify(xhr)+"Error==>"+xhr.responseText+"<==getAllResponseHeaders==>"+xhr.getAllResponseHeaders());
                                    var ErrorData;
                                    var msg="";
                                    //var xhrSuccess = JSON.parse(xhr);
                                    app.loaderStop();
                                    if(xhr.status == 200 && xhr.readyState == 4){
                                        app.loaderStop();
                                        console.log("responseText status code 200");
                                        callback(xhr);
                                    }else{
                                        app.loaderStop();
                                        ErrorData =JSON.parse(xhr.responseText);
                                        msg = ErrorData.Message;
                                        console.log("msg"+msg);
                                       
                                        if(msg == "" || msg == null)
                                            app.Toast.show("Server Error");
                                        else
                                            app.Toast.show(msg);
                                    }
                                
                                }catch (e) {
                                    app.loaderStop();
                                    console.log("Error"+e);
                                }
                            }
                        });
                    }catch (e) {
                        app.loaderStop();
                        console.log("error"+e.toString());  
                    }
                }
              
            },

        },
       /*******************************************************************************

                                    Get device Height & Width 

         ******************************************************************************/   

        getDeviceHeight: function() {
            var Device_height=window.innerHeight;
            console.log("Device_height"+Device_height);
            return Device_height;

        },
        getDeviceWidth: function() {
            var Device_width=window.innerWidth;
            console.log("Device_width"+Device_width);
            return Device_width;

        },
        /*******************************************************************************

                        show(message, duration, position)
                        duration: 'short', 'long'
                        position: 'top', 'center', 'bottom'

                        //window.plugins.toast.showShortTop('Hello there!', function(a){}, function(b){});
                        //window.plugins.toast.showLongBottom('Hello there!', function(a){}, function(b){});

         ******************************************************************************/   


        Toast:  {
            show: function(msg,duration,position) {

                if(typeof(duration) == "undefined" || duration == "" || typeof(duration) == undefined) duration = "long";

                if(typeof(position) == "undefined" || position == "" || typeof(position) == undefined) position = "bottom";

                console.log("duration: "+duration +"\n position: "+position)
                window.plugins.toast.show(msg, duration, position, function(a){}, function(b){console.log('toast error: ' + b)})
            }
        },
        
        
}//end App

 







/***********************************************************************

    Function Name : dummy (how to define a ajax call - copy this code to fire ajax and do code yourself whatever you want in success method)
    
    Parmeters     : none
    
    return        : none


 ************************************************************************/



var dummy = function()

{

    // check network connection before fireing ajax every time

    var checkNetConnection = checkNetwork();

    if(checkNetConnection == true)

    {           
        var httpRequest;

        if (window.XMLHttpRequest)
            httpRequest = new XMLHttpRequest();
        else
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    
    
        httpRequest.open("POST",PostData,true);
    
        httpRequest.send();
    
        httpRequest.onreadystatechange=function(s){
    
            if(httpRequest.readyState==4 && (httpRequest.status==200||httpRequest.status==0)){
    
                //eval('var data = ' + httpRequest.responseText + ';');
    
                var data = JSON.parse(httpRequest.responseText);
    
                console.log("ajax.responseText"+ajax.responseText);
    
                console.log("Result"+ajax.responseText.length);
    
            }
        }

    }
}



