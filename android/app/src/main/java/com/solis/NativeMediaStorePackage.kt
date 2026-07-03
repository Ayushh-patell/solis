package com.solis

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeMediaStorePackage : BaseReactPackage() {

    override fun getModule(
        name: String,
        reactContext: ReactApplicationContext
    ): NativeModule? =
        if (name == NativeMediaStoreModule.NAME) {
            NativeMediaStoreModule(reactContext)
        } else {
            null
        }

    override fun getReactModuleInfoProvider() =
        ReactModuleInfoProvider {
            mapOf(
                NativeMediaStoreModule.NAME to ReactModuleInfo(
                    name = NativeMediaStoreModule.NAME,
                    className = NativeMediaStoreModule::class.java.name,
                    canOverrideExistingModule = false,
                    needsEagerInit = false,
                    isCxxModule = false,
                    isTurboModule = true,
                )
            )
        }
}