package com.solis

import android.content.ContentResolver
import android.database.Cursor
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import com.facebook.react.bridge.ReadableMap

private val PROJECTION = arrayOf(
    MediaStore.Files.FileColumns._ID,
    MediaStore.Files.FileColumns.MEDIA_TYPE,

    MediaStore.MediaColumns.BUCKET_DISPLAY_NAME,
    MediaStore.MediaColumns.BUCKET_ID,

    MediaStore.MediaColumns.DISPLAY_NAME,
    MediaStore.MediaColumns.MIME_TYPE,

    MediaStore.MediaColumns.DATE_TAKEN,
    MediaStore.MediaColumns.DATE_MODIFIED,

    MediaStore.MediaColumns.WIDTH,
    MediaStore.MediaColumns.HEIGHT,

    MediaStore.MediaColumns.SIZE,

    MediaStore.Video.VideoColumns.DURATION,
)

fun queryMedia(
    contentResolver: ContentResolver,
    volumes: Collection<String>,
    options: ReadableMap,
): List<Cursor> {

    val selection = buildSelection(options)
    val selectionArgs = buildSelectionArgs(options)
    val sortOrder = buildSortOrder(options)

    val limit = getIntOption(options, "limit")
    val offset = getIntOption(options, "offset") ?: 0

    return volumes.mapNotNull { volume ->

        val uri = MediaStore.Files.getContentUri(volume)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {

            val queryArgs = Bundle().apply {

                selection?.let {
                    putString(
                        ContentResolver.QUERY_ARG_SQL_SELECTION,
                        it
                    )
                }

                selectionArgs?.let {
                    putStringArray(
                        ContentResolver.QUERY_ARG_SQL_SELECTION_ARGS,
                        it
                    )
                }

                putString(
                    ContentResolver.QUERY_ARG_SQL_SORT_ORDER,
                    sortOrder
                )

                limit?.let {
                    putInt(ContentResolver.QUERY_ARG_LIMIT, it)
                }

                putInt(
                    ContentResolver.QUERY_ARG_OFFSET,
                    offset
                )
            }

            contentResolver.query(
                uri,
                PROJECTION,
                queryArgs,
                null
            )

        } else {

            contentResolver.query(
                uri,
                PROJECTION,
                selection,
                selectionArgs,
                sortOrder
            )
        }
    }
}

private fun buildSelection(
    options: ReadableMap,
): String? {

    val conditions = mutableListOf<String>()

    if (options.hasKey("album") && !options.isNull("album")) {
        conditions += "${MediaStore.MediaColumns.BUCKET_ID} = ?"
    }

    if (options.hasKey("type") && !options.isNull("type")) {
        conditions += "${MediaStore.Files.FileColumns.MEDIA_TYPE} = ?"
    }

    return conditions
        .takeIf { it.isNotEmpty() }
        ?.joinToString(" AND ")
}

private fun buildSelectionArgs(
    options: ReadableMap,
): Array<String>? {

    val args = mutableListOf<String>()

    if (options.hasKey("album") && !options.isNull("album")) {
        args += options.getString("album")!!
    }

    if (options.hasKey("type") && !options.isNull("type")) {
        when (options.getString("type")) {
            "image" ->
                args += MediaStore.Files.FileColumns.MEDIA_TYPE_IMAGE.toString()

            "video" ->
                args += MediaStore.Files.FileColumns.MEDIA_TYPE_VIDEO.toString()
        }
    }

    return args
        .takeIf { it.isNotEmpty() }
        ?.toTypedArray()
}

private fun buildSortOrder(
    options: ReadableMap,
): String {

    val sortBy =
        if (options.hasKey("sortBy") && !options.isNull("sortBy"))
            options.getString("sortBy")
        else
            "dateTaken"

    val order =
        if (options.hasKey("order") && !options.isNull("order"))
            options.getString("order")
        else
            "desc"

    val column = when (sortBy) {
        "dateTaken" -> MediaStore.MediaColumns.DATE_TAKEN
        "dateModified" -> MediaStore.MediaColumns.DATE_MODIFIED
        "name" -> MediaStore.MediaColumns.DISPLAY_NAME
        "size" -> MediaStore.MediaColumns.SIZE
        "width" -> MediaStore.MediaColumns.WIDTH
        "height" -> MediaStore.MediaColumns.HEIGHT
        else -> MediaStore.MediaColumns.DATE_TAKEN
    }

    val direction = if (order == "asc") "ASC" else "DESC"

    return "$column $direction"
}

private fun getIntOption(
    options: ReadableMap,
    key: String,
): Int? {

    return if (options.hasKey(key) && !options.isNull(key))
        options.getInt(key)
    else
        null
}