// Copyright (c) 2014 CV-Library Ltd.
// Licensed under the MIT License - see LICENSE file.

package uk.co.cv_library.plugins;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.dropbox.chooser.android.DbxChooser;

/**
    * This class echoes a string called from JavaScript.
*/
public class DropboxChooser extends CordovaPlugin {

    static final int DBX_CHOOSER_REQUEST = 1;
    private DbxChooser mChooser;
    private CallbackContext context;
    private String dropboxAppId = "";
    private String linkType = "";
    private Boolean previewLink;

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {

        if (action.equals("init")) {
                dropboxAppId = args.getString(0);
        }
        else if (action.equals("launchDropboxChooser")) {
            context = callbackContext;
            cordova.setActivityResultCallback(DropboxChooser.this);
            mChooser = new DbxChooser(dropboxAppId);

            linkType = args.getString(0);
            previewLink = Boolean.valueOf(linkType);

            if (previewLink) {
                mChooser.forResultType(DbxChooser.ResultType.PREVIEW_LINK)
                                .launch(cordova.getActivity(), DBX_CHOOSER_REQUEST);
            }
            else {
                    mChooser.forResultType(DbxChooser.ResultType.DIRECT_LINK)
                                .launch(cordova.getActivity(), DBX_CHOOSER_REQUEST);
            }
            return true;
        }
        return false;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == DBX_CHOOSER_REQUEST) {
            if (resultCode == Activity.RESULT_OK) {
                DbxChooser.Result result = new DbxChooser.Result(data);
                JSONArray results = new JSONArray();
                JSONObject fileObj = new JSONObject();
                try {
                    fileObj.put("name", result.getName());
                    fileObj.put("link", result.getLink().toString());
                    fileObj.put("icon", result.getIcon().toString());
                }
                catch (JSONException e) {
                    Log.d("main", "Failed to stack file info onto obj: " + e.getCause());
                }
                results.put(fileObj);
                context.success(results);
            }
            else {
                context.error("Failed to select a Dropbox upload.");
            }
        }
        else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }
}

