import WebView from "react-native-webview";
import { View, Text, ActivityIndicator } from "react-native";
import { useState } from "react";
// WebView Online -> before all

// Show loading and after loaded hide it.

// WHen back the app is closed

export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <WebView
        source={{ uri: "https://portuguese-umbundo-app.vercel.app/" }}
        style={{ flex: 1 }}
        allowsBackForwardNavigationGestures
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />

      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            transform: "scale(2)",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
}
