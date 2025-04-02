package com.alkwaityalawalapp

import android.content.Intent
import android.net.Uri
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "AlkwaityAlawalApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  /**
   * Handle the deep link
   */
  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    if (Intent.ACTION_VIEW == intent.action) {
      val data: Uri? = intent.data
      // Handle the deep link (e.g., open the specific product page)
      data?.let {
        val productId = it.lastPathSegment
        // Navigate to the product details screen (implement this part based on your app navigation)
        // For example: ReactNavigation.navigate("ProductDetails", { id: productId })
      }
    }
  }
}
