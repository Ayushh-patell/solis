package com.solis

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

class NativeMediaStoreModule(
    reactContext: ReactApplicationContext
) : NativeMediaStoreSpec(reactContext) {

    companion object {
        const val NAME = NativeMediaStoreSpec.NAME
    }

    override fun getMedia(options: ReadableMap, promise: Promise) {
        val media = Arguments.createArray()

        val item = Arguments.createMap()

        item.putString("id", "1")
        item.putString("uri", "hello")
        item.putString("thumbnailUri", "hello")

        item.putString("type", "image")

        item.putString("album", "Camera")
        item.putString("albumId", "camera")

        item.putString("name", "Hello.jpg")
        item.putString("mimeType", "image/jpeg")

        item.putString("dateTaken", "2026-01-01T00:00:00")
        item.putString("dateModified", "2026-01-01T00:00:00")

        item.putInt("width", 100)
        item.putInt("height", 100)
        item.putDouble("size", 1000.0)

        item.putNull("duration")

        item.putBoolean("favorite", false)

        media.pushMap(item)

        promise.resolve(media)
    }

    override fun getAlbums(promise: Promise) {
        promise.resolve(Arguments.createArray())
    }

    override fun getMediaByAlbum(album: String, promise: Promise) {
        promise.resolve(Arguments.createArray())
    }

    override fun deleteMedia(ids: ReadableArray, promise: Promise) {
        promise.resolve(null)
    }

    override fun moveMedia(
        ids: ReadableArray,
        destinationAlbum: String,
        promise: Promise
    ) {
        promise.resolve(null)
    }

    override fun copyMedia(
        ids: ReadableArray,
        destinationAlbum: String,
        promise: Promise
    ) {
        promise.resolve(null)
    }
}