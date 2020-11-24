# android

# Add www files to project

Add the following to ./android/app/build.gradle

```
android {
    ...

    //Added by JLC
    sourceSets { main { assets.srcDirs = ['www', '../../www'] } }
}
```
