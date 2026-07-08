package com.solis

import android.content.ContentResolver
import android.database.Cursor
import android.provider.MediaStore

private val ALBUM_PROJECTION = arrayOf(
    MediaStore.MediaColumns.BUCKET_ID,
    MediaStore.MediaColumns.BUCKET_DISPLAY_NAME,
    MediaStore.Files.FileColumns._ID,
    MediaStore.Files.FileColumns.MEDIA_TYPE,
)

fun queryAlbums(
    contentResolver: ContentResolver,
    volumes: Collection<String>,
): List<Cursor> {

    return volumes.mapNotNull { volume ->

        val uri = MediaStore.Files.getContentUri(volume)

        contentResolver.query(
            uri,
            ALBUM_PROJECTION,
            null,
            null,
            "${MediaStore.MediaColumns.DATE_TAKEN} DESC"
        )
    }
}