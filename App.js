import React, { Component, useEffect } from 'react';

import analytics from '@react-native-firebase/analytics';


import { Image, TouchableOpacity, Platform, StyleSheet, Text, View, Alert, Linking, YellowBox } from "react-native";

//Pages
import PostView from './src/views/PostViews/PostView';
import PostDetail from './src/views/PostDetail/PostDetail';
import SearchView from './src/views/Search/Search';
import CategoryList from './src/views/Category/CategoryList/CategoryList';
import CategoryView from './src/views/Category/CategoryView/CategoryView';
//React Navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VideoScreen from './src/views/VideoScreen/VideoScreen';
import FreeScreen from './src/views/FreeScreen/FreeScreen';
import SyriaScreen from './src/views/SyriaScreen/SyriaScreen';
import IraqScreen from './src/views/IraqScreen/IraqScreen';
import LastNewsScreen from './src/views/LastNewsScreen/LastNewsScreen';
import AboutScreen from './src/views/AboutScreen';
import CurrencyScreen from './src/views/CurrencyScreen';
import WorldScreen from './src/views/WorldScreen/WorldScreen';
import LebanonScreen from './src/views/LebanonScreen/LebanonScreen';
import EconomyReportsScreen from './src/views/EconomyReportsScreen/EconomyReportsScreen';
import EconomicScreen from './src/views/EconomicScreen/EconomicScreen';
import ReportsScreen from './src/views/ReportsScreen/ReportsScreen';
import WomanScreen from './src/views/WomanScreen/WomanScreen';
import CultureScreen from './src/views/CultureScreen/CultureScreen';
import InternationalPressScreen from './src/views/InternationalPressScreen/InternationalPressScreen';
import VariousScreen from './src/views/VariousScreen/VariousScreen';
import * as RootNavigation from './RootNavigation';
import OneSignal from 'react-native-onesignal';
import { ArticleAdviceList, CategoryName, Author, Comments } from './src/components/index'

//Mobx
import { Provider, observer, inject } from 'mobx-react';
import store from './src/store/index';
//Color Package
import color from './src/config/color';



const Tab = createBottomTabNavigator();
const LastNewsStack = createStackNavigator();
const AboutStack = createStackNavigator();
const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const SearchStack = createStackNavigator();
const FreeStack = createStackNavigator();
const SyriaStack = createStackNavigator();
const IraqStack = createStackNavigator();
const VideoStack = createStackNavigator();
const WorldStack = createStackNavigator();
const LebanonStack = createStackNavigator();
const EconomyReportsStack = createStackNavigator();
const EconomicStack = createStackNavigator();
const ReportsStack = createStackNavigator();
const WomanStack = createStackNavigator();
const CultureStack = createStackNavigator();
const InternationalPressStack = createStackNavigator();
const VariousStack = createStackNavigator();
const CurrencyStack = createStackNavigator();


var bell;

const createAlert = () =>
  Alert.alert(
    "",
    "التنبيهات",
    [
      {
        text: " إلغاء التنبيهات",
        onPress: () => { bell = false; },
        style: "cancel"
      },
      { text: "نفعيل التبيهات", onPress: () => { bell = true; } }
    ]
  );


function HomeStackScreen({ navigation }) {

  return (
    <HomeStack.Navigator>

      <HomeStack.Screen name="PostView"
        options={{
          title: "", headerTitleAlign: 'center',
          headerTitle: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>)

          ,
          headerRight: () => (<TouchableOpacity onPress={createAlert} ><Image style={{ width: 30, height: 30, margin: 20 }} source={require("./src/img/icons/bell.png")} /></TouchableOpacity>),

        }}
        component={PostView} />

      <HomeStack.Screen name="Details"
        options={{ title: "", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }} component={PostDetail} />
      <Tab.Screen name="Search" component={SearchStackScreen} options={{ title: 'البحث ', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="World" component={WorldStackScreen} options={{ title: 'العالم ', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="Iraq" component={IraqStackScreen} options={{ title: 'العراق', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="Lebanon" component={LebanonStackScreen} options={{ title: 'لبنان', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="EconomyReports" component={EconomyReportsStackScreen} options={{ title: 'تقارير اقتصادية', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="Economic" component={EconomicStackScreen} options={{ title: 'اقتصاد', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="Reports" component={ReportsStackScreen} options={{ title: 'تقارير', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="Woman" component={WomanStackScreen} options={{ title: 'المرأة', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="Culture" component={CultureStackScreen} options={{ title: 'ثقافة', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="InternationalPress" component={InternationalPressStackScreen} options={{ title: 'صحافة غربية', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="Various" component={VariousStackScreen} options={{ title: 'منوعات', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />
      <Tab.Screen name="About" component={AboutStackScreen} options={{ title: 'هوية الحل نت', headerTitleAlign: 'center', headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate('About')}><Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} /></TouchableOpacity>) }} />


    </HomeStack.Navigator >
  );
};


function SearchStackScreen({ navigation }) {
  navigation.setOptions({ tabBarVisible: false });
  return (

    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="Search"
        options={{
          title: "البحث", headerTitleAlign: 'center'
          , headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={SearchView} />
      <SearchStack.Screen name="Search Detail" options={{ title: "النتائج", headerTitleAlign: 'center' }} component={PostDetail} />
    </SearchStack.Navigator>
  );
};


function CurrencyStackScreen({ navigation }) {
  return (
    <CurrencyStack.Navigator>

      <CurrencyStack.Screen name="Currency"
        options={{
          title: "العملات و المعادن", headerTitleAlign: 'center'
          , headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={CurrencyScreen} />
      <CurrencyStack.Screen name="Currency Detail"
        options={{ title: "العملات و المعادن", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </CurrencyStack.Navigator>
  );
};


function AboutStackScreen({ navigation }) {
  return (
    <AboutStack.Navigator screenOptions={{ headerShown: false }}>

      <AboutStack.Screen name="About"
        options={{
          title: "هوية الحل نت", headerTitleAlign: 'center'
          , headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={AboutScreen} />
      <AboutStack.Screen name="About Detail"
        options={{ title: "هوية الحل نت", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </AboutStack.Navigator>
  );
};



function FreeStackScreen({ navigation }) {
  return (
    <FreeStack.Navigator>

      <FreeStack.Screen name="Free"
        options={{
          title: "مساحة حرة", headerTitleAlign: 'center'
          , headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={FreeScreen} />
      <FreeStack.Screen name="Free Detail"
        options={{ title: "", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </FreeStack.Navigator>
  );
};

function SyriaStackScreen({ navigation }) {
  return (
    <SyriaStack.Navigator>

      <SyriaStack.Screen name="Syria"
        options={{
          title: "سوريا", headerTitleAlign: 'center'
          , headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={SyriaScreen} />
      <SyriaStack.Screen name="Syria Detail"
        options={{ title: "", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </SyriaStack.Navigator>
  );
};

function LastNewsStackScreen({ navigation }) {
  return (
    <LastNewsStack.Navigator>

      <LastNewsStack.Screen name="LastNews"
        options={{

          title: "آخر الأخبار", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>)
        }}
        component={LastNewsScreen} />
      <LastNewsStack.Screen name="LastNews Detail"
        options={{ title: "", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </LastNewsStack.Navigator>
  );
};

function IraqStackScreen({ navigation }) {
  return (
    <IraqStack.Navigator screenOptions={{ headerShown: false }}>

      <IraqStack.Screen name="Iraq"
        options={{
          title: "أخبار العراق", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={IraqScreen} />
      <IraqStack.Screen name="Iraq Detail"
        options={{ title: "العراق", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </IraqStack.Navigator>
  );
};

function VideoStackScreen({ navigation }) {
  return (
    <VideoStack.Navigator>

      <VideoStack.Screen name="Video"
        options={{

          title: "فديو الحل", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={VideoScreen} />
      <VideoStack.Screen name="Video Detail"
        options={{
          title: "", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
        }}
        component={PostDetail} />
    </VideoStack.Navigator>
  );
};

function CategoryStackScreen({ navigation }) {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen name="Category"
        options={{

          title: "الأقسام", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={CategoryList} />
      <CategoryStack.Screen name="Category View"
        options={{ title: "", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}

        component={CategoryView} />
      <CategoryStack.Screen name="Category Detail"
        options={{ title: "", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </CategoryStack.Navigator>
  );
};

function LebanonStackScreen({ navigation }) {
  return (
    <LebanonStack.Navigator screenOptions={{ headerShown: false }}>

      <LebanonStack.Screen name="Lebanon"
        options={{
          title: "لبنان", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={LebanonScreen} />
      <LebanonStack.Screen name="Lebanon Detail"
        options={{ title: "لبنان", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </LebanonStack.Navigator>
  );
};

function EconomyReportsStackScreen({ navigation }) {
  return (
    <EconomyReportsStack.Navigator screenOptions={{ headerShown: false }}>

      <EconomyReportsStack.Screen name="EconomyReports"
        options={{
          title: "تقارير اقتصادية", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={EconomyReportsScreen} />
      <EconomyReportsStack.Screen name="EconomyReports Detail"
        options={{ title: "تقارير اقتصادية", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </EconomyReportsStack.Navigator>
  );
};
function EconomicStackScreen({ navigation }) {
  return (
    <EconomicStack.Navigator screenOptions={{ headerShown: false }}>

      <EconomicStack.Screen name="Economic"
        options={{
          title: "اقتصاد", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={EconomicScreen} />
      <EconomicStack.Screen name="Economic Detail"
        options={{ title: "اقتصاد", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </EconomicStack.Navigator>
  );
};
function ReportsStackScreen({ navigation }) {
  return (
    <ReportsStack.Navigator screenOptions={{ headerShown: false }}>

      <ReportsStack.Screen name="Reports"
        options={{
          title: "تقارير", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={ReportsScreen} />
      <ReportsStack.Screen name="Reports Detail"
        options={{ title: "تقارير", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </ReportsStack.Navigator>
  );
};
function WomanStackScreen({ navigation }) {
  return (
    <WomanStack.Navigator screenOptions={{ headerShown: false }}>

      <WomanStack.Screen name="Woman"
        options={{
          title: "المرأة", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={WomanScreen} />
      <WomanStack.Screen name="Woman Detail"
        options={{ title: "المرأة", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </WomanStack.Navigator>
  );
};
function CultureStackScreen({ navigation }) {
  return (
    <CultureStack.Navigator screenOptions={{ headerShown: false }}>

      <CultureStack.Screen name="Culture"
        options={{
          title: "ثقافة", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={CultureScreen} />
      <CultureStack.Screen name="Culture Detail"
        options={{ title: "ثقافة", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </CultureStack.Navigator>
  );
};
function InternationalPressStackScreen({ navigation }) {
  return (
    <InternationalPressStack.Navigator screenOptions={{ headerShown: false }}>

      <InternationalPressStack.Screen name="InternationalPress"
        options={{
          title: "صحافة غربية", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={InternationalPressScreen} />
      <InternationalPressStack.Screen name="InternationalPress Detail"
        options={{ title: "صحافة غربية", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </InternationalPressStack.Navigator>
  );
};
function VariousStackScreen({ navigation }) {
  return (
    <VariousStack.Navigator screenOptions={{ headerShown: false }}>

      <VariousStack.Screen name="Various"
        options={{
          title: "منوعات", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={VariousScreen} />
      <VariousStack.Screen name="Various Detail"
        options={{ title: "منوعات", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </VariousStack.Navigator>
  );
};

function WorldStackScreen({ navigation }) {
  return (

    <WorldStack.Navigator screenOptions={{ headerShown: false, tabBarVisible: false }}>

      <WorldStack.Screen name="World"
        options={{
          title: " العالم", headerShown: false, headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />)
          , headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Search')} ><Image style={{ width: 20, height: 20, margin: 20 }} source={require("./src/img/icons/search.png")} /></TouchableOpacity>),
        }}
        component={WorldScreen} />
      <WorldStack.Screen name="World Detail"
        options={{ title: "", headerTitleAlign: 'center', headerRight: () => (<Image style={{ width: 80, height: 80 }} source={require("./src/img/logo.png")} />) }}
        component={PostDetail} />
    </WorldStack.Navigator>
  );
};

let navigationRef;

function intiNavigation(ref) {
  if (ref) {
    navigationRef = ref;
    // handle deep link that app isn't launched
    Linking.getInitialURL().then(function (url) {
      handleDeepLink({ url });
    });
  }
}




function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            // testID={options.tabBarTestID}
            onPress={onPress}
            style={[styles.tabBarNavigation, { backgroundColor: isFocused ? color.tabBarColor : color.tabBarFocusColor }]}
          >

            <View style={[styles.iconsArea]}>
              {label === "Home" && <Image style={styles.navigationIcon} source={require('./src/img/icons/home.png')} tintColor="#212529" />}
              {label === "Search" && <Image style={styles.navigationIcon} source={require('./src/img/icons/search.png')} tintColor="#212529" />}
              {label === "Category" && <Image style={styles.navigationIcon} source={require('./src/img/icons/web.png')} tintColor="#212529" />}
              {label === "Video" && <Image style={styles.navigationIcon} source={require('./src/img/icons/video.png')} tintColor="#212529" />}
              {label === "LastNews" && <Image style={styles.navigationIcon} source={require('./src/img/icons/LastNews.png')} tintColor="#212529" />}
              {label === "Free" && <Image style={styles.navigationIcon} source={require('./src/img/icons/free.png')} tintColor="#212529" />}
              {label === "Syria" && <Image style={styles.navigationIcon} source={require('./src/img/icons/syria.png')} tintColor="#212529" />}
              {label === "Currency" && <Image style={styles.navigationIcon} source={require('./src/img/icons/gold.png')} tintColor="#212529" />}
            </View>

          </TouchableOpacity>
        );
      })}
    </View>
  );
}



OneSignal.setLogLevel(6, 0);
OneSignal.setAppId("6d0a13dd-aa94-4253-94d0-cb1c711a3bfb");

if (bell) {
  OneSignal.disablePush(true);

} else {
  OneSignal.disablePush(false);

}

//Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  console.log("Prompt response #334: ", response);
})
//Method for handling notifications recieved while app in foreground
// Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();

  // const postID = notification.additionalData.myappurl;
  // console.log("notification: ", postID);

  // Complete with null means don't show a notification.

  notificationReceivedEvent.complete(notification);


});

// Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {

  // var url = notification.additionalData.myappurl;
  // var myappurl = notification;

  console.log("OneSignal: notification opened:", notification);

  const { PostDetailStore } = this.props;
  this.props.navigation.navigate('Details',
    PostDetailStore.changePostDetail(notification),
    PostDetailStore.routeName = "HomeStack"
  );

  // function handleDeepLink({ url }) {
  //   if (url) {
  //     const parsedUrl = urlParse(url, true);

  //     // use host as route name and query as navigation params
  //     navigationRef.navigate({
  //       name: parsedUrl.host,
  //       params: parsedUrl.query,
  //     });
  //   }
  // }

  // var item = { id: 289418, date: "2022-02-28T14:47:33", date_gmt: "2022-02-28T11:47:33", guid: { rendered: "https://7al.net/?p=289418" } };
  // const { navigate } = this.props.navigation;
  // navigate('FreeScreen');

  // Linking.addEventListener('url', handleDeepLink);

  // return () => {
  //   Linking.removeEventListener('url', handleDeepLink);
  // };

  // Linking.openURL(myappurl);
  // const { navigation } = this.props;
  // this.props.navigation.navigate(myappurl);
  // this.props.navigation.navigate('Details',
  //   PostDetailStore.changePostDetail(item),
  //   PostDetailStore.routeName = "LastNewsStack"
  // );

  // <ArticleAdviceList postId={289822} />


});

// REMOTE NOTIFICATIONS SETUP END //


export default class App extends React.Component {


  componentDidMount() {
    analytics().logScreenView(
      {
        screen_name: 'Home',
        screen_class: 'HomeScreen',
      }
    )
  };


  render() {
    console.disableYellowBox = true;

    return (
      <Provider {...store}>

        <NavigationContainer ref={intiNavigation}>
          <Tab.Navigator initialRouteName="Home" tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Category" component={CategoryStackScreen} />
            <Tab.Screen name="Currency" component={CurrencyStackScreen} />
            <Tab.Screen name="Video" component={VideoStackScreen} />
            <Tab.Screen name="Free" component={FreeStackScreen} />
            <Tab.Screen name="Syria" component={SyriaStackScreen} />
            <Tab.Screen name="LastNews" component={LastNewsStackScreen} />
            <Tab.Screen name="Home" component={HomeStackScreen} />


          </Tab.Navigator>
        </NavigationContainer>

      </Provider >

    );
  }
}

const styles = StyleSheet.create({
  tabBarNavigation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  navigationIcon: {
    height: 24,
    width: 24,
  }
})
