import React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


export default function AboutScreen() {
    return (
        <WebView

            // source={{ uri: 'https://7al.net/currency-in-syrian-pounds/' }}
            source={{ uri: 'https://7al.net/al7alnet/' }}

        />
    )
}
