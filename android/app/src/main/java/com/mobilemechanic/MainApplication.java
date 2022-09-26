package com.mobilemechanic;

import android.app.Application;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.google.firebase.crashlytics.FirebaseCrashlytics;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativegooglesignin.RNGoogleSigninPackage;

import java.lang.reflect.InvocationTargetException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    FirebaseCrashlytics crashlytics;
    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }
//  @Override
//       protected List<ReactPackage> getPackages() {
//           return Arrays.<ReactPackage>asList(
//               new MainReactPackage(),
//               new ReactNativePushNotificationPackage() // <---- Add the Package
//           );
//     }
                @Override
                protected List<ReactPackage> getPackages() {

                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                   // new ReactNativePushNotificationPackage();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // packages.add(new MyReactNativePackage());
                    return packages;
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }


    @Override
    public void onCreate() {
        super.onCreate();
        try {
            PackageInfo info = getPackageManager().getPackageInfo(
                    "com.mobilemechanic",
                    PackageManager.GET_SIGNATURES);
            for (Signature signature : info.signatures) {
                MessageDigest md = MessageDigest.getInstance("SHA");
                md.update(signature.toByteArray());
                Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT));
            }
        } catch (PackageManager.NameNotFoundException e) {
    e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
e.printStackTrace();
        }
        SoLoader.init(this, /* nativ

    e exopackage */ false);


        try {
            FirebaseCrashlytics.getInstance().setCrashlyticsCollectionEnabled(true);
            crashlytics = FirebaseCrashlytics.getInstance();
            crashlytics.log("Start logging!");
            crashlytics.setCustomKey("DeviceName", "" );
            crashlytics.setCustomKey("Email", "baljit.kaur@bainslabs.com");
        }catch (Exception e) {
            Log.e("MainActivity", "getMessage3 "+e.getMessage());
        }

        initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    }

    /**
     * Loads Flipper in React Native templates. Call this in the onCreate method with something like
     * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
     *
     * @param context
     * @param reactInstanceManager
     */
    private static void initializeFlipper(
            Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
                Class<?> aClass = Class.forName("com.mobilemechanic.ReactNativeFlipper");
                aClass
                        .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                        .invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }



    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),

                new FBSDKPackage()




        );
    }
}
