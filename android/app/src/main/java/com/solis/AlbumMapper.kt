package com.solis

import android.database.Cursor
import android.provider.MediaStore
import android.util.Log

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray


data class AlbumAccumulator(
    val id: String,
    val name: String,
    var count: Int = 0,
    var coverUri: String = "",
)

fun cursorToAlbums(
    cursor: Cursor,
): List<AlbumAccumulator> {

    val albums = LinkedHashMap<String, AlbumAccumulator>()

    val bucketIdIndex =
        cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.BUCKET_ID)

    val bucketNameIndex =
        cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.BUCKET_DISPLAY_NAME)

    val idIndex =
        cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns._ID)

    val mediaTypeIndex =
        cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns.MEDIA_TYPE)
    while (cursor.moveToNext()) {

        val bucketId = cursor.getLong(bucketIdIndex).toString()
        val bucketName = cursor.getString(bucketNameIndex) ?: "Unknown"

        val id = cursor.getLong(idIndex)
        val mediaType = cursor.getInt(mediaTypeIndex)

        val uri = getMediaUri(
            id,
            mediaType,
        )

        val album = albums.getOrPut(bucketId) {
            AlbumAccumulator(
                id = bucketId,
                name = bucketName,
                coverUri = uri,
            )
        }

    Log.e("SOLIS", album.toString())
        album.count++
    }

    return albums.values.toList()
}


fun mapAlbums(
    albums: List<AlbumAccumulator>,
): WritableArray {

    val array = Arguments.createArray()

    albums.forEach { album ->
        val map = Arguments.createMap()

        map.putString("id", album.id)
        map.putString("name", album.name)
        map.putInt("count", album.count)
        map.putString("coverUri", album.coverUri)

        array.pushMap(map)
    }

    return array
}