import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import FirebaseCore
import React

@main
class AppDelegate: RCTAppDelegate {
  
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "AlkwaityAlawalApp"
    self.dependencyProvider = RCTAppDependencyProvider()
    FirebaseApp.configure()

    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
  
  // For handling universal links
  override func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    // This method is called when the app is opened via Universal Link
    return RCTLinkingManager.application(application, continue: userActivity, restorationHandler: restorationHandler)
  }

  // For handling URL schemes and Deeplinks (i.e. for openURL method)
  override func application(_ application: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    // This method is called when the app is opened via a custom URL scheme or Deeplink
    return RCTLinkingManager.application(application, open: url, options: options)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
