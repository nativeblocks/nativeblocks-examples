import org.jetbrains.kotlin.konan.properties.Properties
import java.io.FileInputStream

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.devtools.ksp")
    id("io.nativeblocks.nativeblocks-gradle-plugin").version("1.1.0")
}

android {
    namespace = "io.nativeblocks.sampleapp"
    compileSdk = 34
    defaultConfig {
        applicationId = "io.nativeblocks.sampleapp"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.9"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

ksp {
    arg("basePackageName", "io.nativeblocks.sampleapp")
    arg("moduleName", "Sample")
}

val nativeblocksProps = Properties().apply {
    load(FileInputStream(File(rootProject.rootDir, "nativeblocks.properties")))
}

nativeblocks {
    endpoint = nativeblocksProps["endpoint"] as String
    authToken = nativeblocksProps["authToken"] as String
    organizationId = nativeblocksProps["organizationId"] as String
    basePackageName = "io.nativeblocks.sampleapp"
    moduleName = "Sample"
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.activity:activity-compose:1.9.1")
    implementation("androidx.compose.material:material:1.6.8")
    implementation("androidx.compose.animation:animation:1.6.8")
    implementation("androidx.compose.ui:ui-tooling:1.6.8")
    implementation("io.coil-kt:coil-compose:2.6.0")
    implementation("io.nativeblocks:nativeblocks-android:1.2.1")
    implementation("io.nativeblocks:nativeblocks-wandkit-android:1.0.1")
    implementation("io.nativeblocks:nativeblocks-compiler-android:1.1.0")
    implementation("io.nativeblocks:nativeblocks-foundation-android:1.0.0")
    ksp("io.nativeblocks:nativeblocks-compiler-android:1.1.0")
}