package com.solis

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import android.provider.MediaStore
import android.util.Log

class NativeMediaStoreModule(
    reactContext: ReactApplicationContext
) : NativeMediaStoreSpec(reactContext) {

    companion object {
        const val NAME = NativeMediaStoreSpec.NAME
    }

    override fun getMedia(options: ReadableMap, promise: Promise) {
        Log.e(
    "SOLIS",
    "limit=${if (options.hasKey("limit")) options.getInt("limit") else "missing"} " +
    "offset=${if (options.hasKey("offset")) options.getInt("offset") else "missing"}"
)
        try {
            val media = Arguments.createArray()
            val queryStart = System.currentTimeMillis()

            val cursors = queryMedia(
                reactApplicationContext.contentResolver,
                getVolumes(reactApplicationContext),
                options
            )
            Log.e("SOLIS", "Query setup: ${System.currentTimeMillis() - queryStart} ms")
            val mapStart = System.currentTimeMillis()

            cursors.forEach { cursor ->
                cursor.use {
                    val columns = getMediaColumns(it)

                    while (it.moveToNext()) {
                        media.pushMap(cursorToMedia(it, columns))
                    }
                }
            }
            Log.e("SOLIS", "Cursor mapping: ${System.currentTimeMillis() - mapStart} ms")
            Log.e("SOLIS", "Total media = ${media.size()}")
            promise.resolve(media)


        } catch (e: Exception) {
            promise.reject("MEDIA_QUERY_FAILED", e)
        }
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