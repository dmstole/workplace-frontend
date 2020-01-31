#!/bin/sh

## You need generate a keysotre file. If you dont have, type:
#
#  keytool -genkey -v -keystore youvip.keystore -alias youvip -keyalg RSA -keysize 2048 -validity 10000
#

APK_FILE_UNSIGNED=./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
APK_FILE=./platforms/android/app/build/outputs/apk/release/embraer-adi.apk

rm $APK_FILE_UNSIGNED > /dev/null 2>&1
rm $APK_FILE > /dev/null 2>&1

echo "Building initial APK"
ionic cordova build --prod --release android

echo "Assigning the APK"
jarsigner -verbose -sigalg SHA1withRSA -storepass embraer@123 -digestalg SHA1 -keystore ./certificates/embraer.keystore $APK_FILE_UNSIGNED embraer

echo "Zipping the APK and generate definitive APK"
zipalign -v 4 $APK_FILE_UNSIGNED $APK_FILE

echo "APK generated."
