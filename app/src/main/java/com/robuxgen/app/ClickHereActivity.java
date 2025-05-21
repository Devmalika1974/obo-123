package com.robuxgen.app;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;

import androidx.appcompat.app.AppCompatActivity;

import com.startapp.sdk.ads.nativead.NativeAdDetails;
import com.startapp.sdk.ads.nativead.NativeAdPreferences;
import com.startapp.sdk.ads.nativead.StartAppNativeAd;
import com.startapp.sdk.adsbase.StartAppAd;
import com.startapp.sdk.adsbase.StartAppSDK;
import com.startapp.sdk.adsbase.adlisteners.AdEventListener;

import java.util.ArrayList;

public class ClickHereActivity extends AppCompatActivity {

    private StartAppNativeAd startAppNativeAd;
    private FrameLayout nativeAdContainer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // تهيئة StartApp SDK
        StartAppSDK.init(this, "204722875", false);
        
        setContentView(R.layout.activity_click_here);

        nativeAdContainer = findViewById(R.id.startAppNativeAdContainer);
        
        // تحميل وعرض الإعلان الأصلي
        loadNativeAd();

        Button btnClickHere = findViewById(R.id.btnClickHere);
        btnClickHere.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // عرض إعلان عند النقر على الزر
                StartAppAd.showAd(ClickHereActivity.this);
                
                // الانتقال إلى صفحة WebView
                Intent intent = new Intent(ClickHereActivity.this, WebViewActivity.class);
                startActivity(intent);
            }
        });
    }
    
    private void loadNativeAd() {
        startAppNativeAd = new StartAppNativeAd(this);
        
        // تهيئة تفضيلات الإعلان الأصلي
        NativeAdPreferences preferences = new NativeAdPreferences()
                .setAdsNumber(1)                // عدد الإعلانات المطلوبة
                .setAutoBitmapDownload(true)    // تحميل الصور تلقائياً
                .setPrimaryImageSize(300, 150); // حجم الصورة الرئيسية
        
        // تحميل الإعلان الأصلي
        startAppNativeAd.loadAd(preferences, new AdEventListener() {
            @Override
            public void onReceiveAd(com.startapp.sdk.adsbase.Ad ad) {
                // تم استلام الإعلان بنجاح
                ArrayList<NativeAdDetails> nativeAdsList = startAppNativeAd.getNativeAds();
                if (nativeAdsList.size() > 0) {
                    // عرض الإعلان الأول
                    NativeAdDetails nativeAd = nativeAdsList.get(0);
                    
                    // إنشاء عنصر واجهة مستخدم للإعلان
                    View adView = nativeAd.getNativeAdView(ClickHereActivity.this);
                    
                    // إضافة الإعلان إلى الحاوية
                    nativeAdContainer.removeAllViews();
                    nativeAdContainer.addView(adView);
                    
                    // تسجيل مشاهدة الإعلان
                    nativeAd.registerViewForInteraction(adView);
                }
            }
            
            @Override
            public void onFailedToReceiveAd(com.startapp.sdk.adsbase.Ad ad) {
                // فشل في تحميل الإعلان
                nativeAdContainer.setVisibility(View.GONE);
            }
        });
    }
    
    @Override
    protected void onResume() {
        super.onResume();
        // إعادة تحميل الإعلان عند العودة للنشاط
        loadNativeAd();
    }
}
