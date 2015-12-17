package com.github.warp.cordova.firmata;

import java.io.*;
import java.lang.*;

import android.util.*;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.shokai.firmata.ArduinoFirmata;
import org.shokai.firmata.ArduinoFirmataEventHandler;

public class Firmata extends CordovaPlugin {
    private String TAG = "CordovaFirmata";
    private static ArduinoFirmata arduino;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (arduino == null) {
            arduino = new ArduinoFirmata(this.cordova.getActivity());
            arduino.setEventHandler(new ArduinoFirmataEventHandler() {
                public void onError(String errorMessage) {
                    Log.e(TAG, errorMessage);
                }
                public void onClose() {
                    Log.v(TAG, "connection closed");
                }
            });
        }

        if (action.equals("getBoardVersion")) {
            this.getBoardVersion(callbackContext);
            return true;
        }
        else if (action.equals("connect")) {
            this.connect(callbackContext);
            return true;
        }
        else if (action.equals("isOpen")) {
            this.isOpen(callbackContext);
            return true;
        }
        else if (action.equals("close")) {
            this.close(callbackContext);
            return true;
        }
        else if (action.equals("reset")) {
            this.reset(callbackContext);
            return true;
        }
        else if (action.equals("digitalRead")) {
            int pin = args.getInt(0);
            this.digitalRead(pin, callbackContext);
            return true;
        }
        else if (action.equals("analogRead")) {
            int pin = args.getInt(0);
            this.analogRead(pin, callbackContext);
            return true;
        }
        else if (action.equals("pinMode")) {
            int pin = args.getInt(0);
            byte mode = (byte)args.getInt(1);
            this.pinMode(pin, mode, callbackContext);
            return true;
        }
        else if (action.equals("digitalWrite")) {
            int pin = args.getInt(0);
            boolean value = args.getBoolean(1);
            this.digitalWrite(pin, value, callbackContext);
            return true;
        }
        else if (action.equals("analogWrite")) {
            int pin = args.getInt(0);
            int value = args.getInt(1);
            this.analogWrite(pin, value, callbackContext);
            return true;
        }
        else if (action.equals("servoWrite")) {
            int pin = args.getInt(0);
            int angle = args.getInt(1);
            this.servoWrite(pin, angle, callbackContext);
            return true;
        }
        return false;
    }

    private void getBoardVersion(final CallbackContext callbackContext) {
        String version = arduino.getBoardVersion();
        callbackContext.success(version);
    }

    private void connect(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try{
                    arduino.connect();
                    callbackContext.success();
                }
                catch(IOException e){
                    callbackContext.error(e.getMessage());
                }
                catch(InterruptedException e){
                    callbackContext.error(e.getMessage());
                }
            }
        });
    }

    private void isOpen(final CallbackContext callbackContext) {
        boolean value = arduino.isOpen();
        callbackContext.success(boolToInt(value));
    }

    private void close(final CallbackContext callbackContext) {
        boolean value = arduino.close();
        callbackContext.success(boolToInt(value));
    }

    private void reset(final CallbackContext callbackContext) {
        arduino.reset();
        callbackContext.success();
    }

    private void digitalRead(final int pin, final CallbackContext callbackContext) {
        boolean value = arduino.digitalRead(pin);
        callbackContext.success(boolToInt(value));
    }

    private void analogRead(final int pin, final CallbackContext callbackContext) {
        int value = arduino.analogRead(pin);
        callbackContext.success(value);
    }

    private void pinMode(final int pin, final byte mode, final CallbackContext callbackContext) {
        arduino.pinMode(pin, mode);
        callbackContext.success();
    }

    private void digitalWrite(final int pin, final boolean value, final CallbackContext callbackContext) {
        arduino.digitalWrite(pin, value);
        callbackContext.success();
    }

    private void analogWrite(final int pin, final int value, final CallbackContext callbackContext) {
        arduino.analogWrite(pin, value);
        callbackContext.success();
    }

    private void servoWrite(final int pin, final int angle, final CallbackContext callbackContext) {
        arduino.servoWrite(pin, angle);
        callbackContext.success();
    }

    private int boolToInt(boolean b) {
        return b ? 1 : 0;
    }
}
