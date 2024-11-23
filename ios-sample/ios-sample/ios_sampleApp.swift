import SwiftUI
import Nativeblocks
import NativeblocksFoundation

@main
struct ios_sampleApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    let NATIVEBLOCKS_API_ENDPOINT = "https://edge.api.nativeblocks.io/gateway"
    let NATIVEBLOCKS_API_KEY = ""

    init () {
        NativeblocksManager.initialize(
            edition: .cloud(
                endpoint: NATIVEBLOCKS_API_ENDPOINT,
                apiKey: NATIVEBLOCKS_API_KEY,
                developmentMode: true
            )
        )

        NativeblocksFoundationBlockProvider.provideBlocks()
        NativeblocksFoundationActionProvider.provideActions(
            nativeChangeBlockProperty: NativeChangeBlockProperty(),
            nativeChangeVariable: NativeChangeVariable()
        )
        NativeblocksManager.getInstance().provideEventLogger(loggerType: "LOGGER", logger: AppLogger())

        Task {
            await NativeblocksManager.getInstance().getScaffold(
                onSuccess: { scaffold in
                    // register frames in graph for owning navigation
                },
                onFailure: { _ in
                    // there is no frame to register
                }
            )
        }
    }

    var body: some Scene {
        WindowGroup {
            NativeblocksFrame(
                route: "/",  // route/{id}
                routeArguments: [:],  // [id:10]
                loading: { AnyView(NativeblocksLoading()) },
                error: { message in AnyView(NativeblocksError(message: message)) }
            )
        }
    }
}


class AppDelegate: NSObject, UIApplicationDelegate {
    func applicationWillTerminate(_ application: UIApplication) {
        NativeblocksManager.getInstance().destroy()
    }
}

class AppLogger: INativeLogger {
    func log(eventName: String, parameters: [String: String]) {
        print("eventName \(eventName)", parameters)
    }
}
