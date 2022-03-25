import React from 'react';

import { Text, View } from 'react-native';

import { WebView } from 'react-native-webview';

import analytics from '@react-native-firebase/analytics';


export default function CurrencyScreen() {

    analytics().logScreenView(
        {
            screen_name: 'Currency',
            screen_class: 'CurrencyScreen',
        }
    )

    return (
        <WebView

            source={{ uri: 'https://7al.net/currency-in-syrian-pounds/' }}

        />
    )
}
