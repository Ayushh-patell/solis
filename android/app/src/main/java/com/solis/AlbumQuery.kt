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

        val selection = """
                        (
                        ${MediaStore.Files.FileColumns.MEDIA_TYPE} = ?
                        OR
                        ${MediaStore.Files.FileColumns.MEDIA_TYPE} = ?
                        )
                        """.trimIndent()

        val selectionArgs = arrayOf(
            MediaStore.Files.FileColumns.MEDIA_TYPE_IMAGE.toString(),
            MediaStore.Files.FileColumns.MEDIA_TYPE_VIDEO.toString(),
        )

        contentResolver.query(
            uri,
            ALBUM_PROJECTION,
            selection,
            selectionArgs,
            "${MediaStore.MediaColumns.DATE_TAKEN} DESC"
        )
    }
}