import React, { Component } from "react";

import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";

import { Platform } from "react-native";

export class BannerAd extends Component {
  render() {
    return (
      <>
        <AdMobBanner
          bannerSize="fullBanner"
          servePersonalizedAds={true}
          adUnitID={
            Platform.OS == "ios"
              ? "ca-app-pub-3940256099942544/6300978111"
              : "ca-app-pub-6699725424289089/7153832335"
          }
        />
      </>
    );
  }
}

export async function InterstitialAd() {
  Platform.OS == "android"
    ? AdMobInterstitial.setAdUnitID("ca-app-pub-6699725424289089/7920312616")
    : AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712");
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  await AdMobInterstitial.showAdAsync();
}
