import WebView from "react-native-webview";
import { View, Text, ActivityIndicator } from "react-native";
import { useState, useRef, useEffect } from "react";
import { BackHandler } from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef(null);

  // Handle the back button press
  const handleBackButton = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // Return true to prevent the app from closing
    }
    return false; // Return false if there's no web history to go back to
  };

  // Add a back button listener when the component mounts
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);

    // Clean up the back button listener when the component unmounts
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);
  return (
    <>
      <WebView
        ref={webViewRef}
        source={{
          uri: "https://portuguese-umbundo-app.vercel.app?local=true/",
        }}
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
            transform: "scale(1.5)",
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color="#8e413d" size="large" />
            <Text
              style={{
                fontSize: 8,
                marginTop: 10,
              }}
            >
              Aguarde enquanto preparamos tudo!
            </Text>
          </View>
        </View>
      )}
    </>
  );
}
