# iOS

## Install on BigSur

`pod install` failed with message _SDK “iphoneos” cannot be located_. The solution is available at https://www.ryadel.com/en/xcode-sdk-iphoneos-cannot-be-located-mac-osx-error-fix/ (the XCode GUI method works with XCode v12.2)

## Add www files to project

Open `./ios/<ProjectName>.xcodeproj` in Xcode.

Right-click the top-level directory of your project and select ‘Add Files to “<ProjectName>”’.
In the base of your project directory, select the assets/www/ directory.
