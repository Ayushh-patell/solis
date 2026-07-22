package com.solis

import android.content.ContentUris
import android.provider.MediaStore

private const val THUMBNAIL_SIZE = 350

fun getMediaUri(
    id: Long,
    mediaType: Int,
): String {

    val collection = when (mediaType) {
        MediaStore.Files.FileColumns.MEDIA_TYPE_IMAGE ->
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI

        MediaStore.Files.FileColumns.MEDIA_TYPE_VIDEO ->
            MediaStore.Video.Media.EXTERNAL_CONTENT_URI

        else ->
            MediaStore.Files.getContentUri("external")
    }

    return ContentUris.withAppendedId(collection, id).toString()
}

fun getThumbnailUri(
    id: Long,
    mediaType: Int,
): String {
    // For now, thumbnails use the same content URI.
    // A thumbnail can be generated later by the image loader
    // or ContentResolver.loadThumbnail() if needed.

    return getMediaUri(
        id = id,
        mediaType = mediaType,
    )

   // val bitmap = contentResolver.loadThumbnail(
   //     uri,
   //     Size(THUMBNAIL_SIZE, THUMBNAIL_SIZE),
   //     null
   // )
}