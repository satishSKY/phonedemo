package com.ideal.test;




import org.apache.cordova.*;
import android.os.Bundle;

public class MyPhoneGapActivity extends CordovaActivity {
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		 super.init();
	        // Set by <content src="index.html" /> in config.xml
	     super.loadUrl(Config.getStartUrl());
	       //super.loadUrl("file:///android_asset/www/index.html")
	}
}
