import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";

const AppOffline = () => {
  const [htmlFileUri, setHtmlFileUri] = useState(null);

  useEffect(() => {
    const saveHtmlFile = async () => {
      // Read the content of the HTML file
      const htmlFileContent = await FileSystem.readAsStringAsync(
        "./assets/dist/index.html"
      );
      console.log(htmlFileContent.length);
      // Save the HTML file to the local file system
      const fileUri = FileSystem.documentDirectory + "index.html";
      await FileSystem.writeAsStringAsync(fileUri, htmlFileContent);

      // Set the state with the URI of the saved HTML file
      setHtmlFileUri(fileUri);
    };

    saveHtmlFile();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {htmlFileUri && (
        <WebView
          source={{ uri: `file://${htmlFileUri}` }}
          javaScriptEnabled={true}
          allowFileAccessFromFileURLs={true}
        />
      )}
    </View>
  );
};

export default AppOffline;
