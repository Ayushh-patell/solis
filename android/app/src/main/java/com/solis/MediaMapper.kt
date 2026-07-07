package com.solis

import android.database.Cursor
import android.provider.MediaStore
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap


data class MediaColumns(
    val id: Int,
    val mediaType: Int,

    val bucketName: Int,
    val bucketId: Int,

    val displayName: Int,
    val mimeType: Int,

    val dateTaken: Int,
    val dateModified: Int,

    val width: Int,
    val height: Int,

    val size: Int,
    val duration: Int,
)

fun getMediaColumns(cursor: Cursor): MediaColumns {

    return  MediaColumns(
        id = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns._ID),
        mediaType = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns.MEDIA_TYPE),

        bucketName = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.BUCKET_DISPLAY_NAME),
        bucketId = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.BUCKET_ID),

        displayName = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DISPLAY_NAME),
        mimeType = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.MIME_TYPE),

        dateTaken = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DATE_TAKEN),
        dateModified = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.DATE_MODIFIED),

        width = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.WIDTH),
        height = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.HEIGHT),

        size = cursor.getColumnIndexOrThrow(MediaStore.MediaColumns.SIZE),
        duration = cursor.getColumnIndexOrThrow(MediaStore.Video.VideoColumns.DURATION)
    )        
}

fun cursorToMedia(
    cursor: Cursor,
    columns: MediaColumns
): WritableMap {

    val media = Arguments.createMap()
    val mediaType = cursor.getInt(columns.mediaType)
    val id = cursor.getLong(columns.id)

    
    // Read values from current row
    val uri = getMediaUri(
        id,
        mediaType
        )

    val thumbnailUri = getThumbnailUri(
        id,
        mediaType
    )
    media.putString("id", id.toString())
    media.putString("uri", uri.toString())
    media.putString("thumbnailUri", thumbnailUri.toString())
    val type =
    when(mediaType) {

        MediaStore.Files.FileColumns.MEDIA_TYPE_IMAGE ->
            "image"

        MediaStore.Files.FileColumns.MEDIA_TYPE_VIDEO ->
            "video"

        else ->
            "unknown"
    }

    media.putString("type", type)
    media.putString("album", cursor.getString(columns.bucketName) ?: "Unknown")
    media.putString("albumId", cursor.getString(columns.bucketId))
    media.putString("name", cursor.getString(columns.displayName))
    media.putString("mimeType", cursor.getString(columns.mimeType))
    media.putLong("dateTaken", cursor.getLong(columns.dateTaken))
    media.putLong("dateModified", cursor.getLong(columns.dateModified) * 1000)
    media.putInt("width", cursor.getInt(columns.width))
    media.putInt("height", cursor.getInt(columns.height))
    media.putLong("size", cursor.getLong(columns.size))
    if (type == "video") {
        media.putLong("duration", cursor.getLong(columns.duration))
    } else {
        media.putNull("duration")
    }
    media.putBoolean("favorite", false)
    

    return media
}