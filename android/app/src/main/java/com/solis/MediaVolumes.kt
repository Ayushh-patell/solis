package com.solis

import android.content.Context
import android.provider.MediaStore

fun getVolumes(
    context: Context,
    includeAll: Boolean = false,
): Collection<String> {

    return if (includeAll) {
        MediaStore.getExternalVolumeNames(context)
    } else {
        listOf(MediaStore.VOLUME_EXTERNAL_PRIMARY)
    }
}