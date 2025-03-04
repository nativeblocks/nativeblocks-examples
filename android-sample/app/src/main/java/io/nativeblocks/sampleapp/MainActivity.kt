package io.nativeblocks.sampleapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import io.nativeblocks.core.api.NativeblocksEdition
import io.nativeblocks.core.api.NativeblocksError
import io.nativeblocks.core.api.NativeblocksFrame
import io.nativeblocks.core.api.NativeblocksLoading
import io.nativeblocks.core.api.NativeblocksManager
import io.nativeblocks.foundation.FoundationProvider
import io.nativeblocks.sampleapp.integration.consumer.block.SampleBlockProvider
import io.nativeblocks.wandkit.LiveKit

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        NativeblocksManager.initialize(
            applicationContext = this,
            edition = NativeblocksEdition.Cloud(
                endpoint = "https://edge.api.nativeblocks.io/gateway",
                apiKey = "",
                developmentMode = true
            )
        )

        NativeblocksManager.getInstance().setLocalization("EN")

        FoundationProvider.provide()
        SampleBlockProvider.provideBlocks()

        NativeblocksManager.getInstance().wandKit(
            LiveKit(
                screenSharing = true,
                keepScreenOn = true,
                autoConnect = false
            )
        )

        setContent {
            NativeblocksFrame(
                frameRoute = "/",
                routeArguments = hashMapOf(),
                loading = {
                    NativeblocksLoading()
                },
                error = { message ->
                    NativeblocksError(message)
                },
            )
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        NativeblocksManager.getInstance().destroy()
    }
}