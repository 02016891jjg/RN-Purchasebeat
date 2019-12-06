/**
 * PurchaseBeat React Native App
 * https://github.com/G33N/PurchaseBeats.git
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createStackNavigator,createAppContainer } from 'react-navigation';
import { StatusBar , BackHandler , Alert } from 'react-native'

import Loading from './src/components/Loading/Loading'
import Login from './src/components/Login/Login'
import Register from './src/components/Register/Register'
import ForgotPassword from './src/components/ForgotPassword/ForgotPassword'
import RecoveryCode from './src/components/RecoveryCode/RecoveryCode'
import ResetPassword from './src/components/ResetPassword/ResetPassword'
import Toplist from './src/components/Toplist/Toplist'
import Producer from './src/components/Producer/Producer'
import SearchBeats from './src/components/SearchBeats/SearchBeats'
import SearchedList from './src/components/SearchedList/SearchedList'
import Profile from './src/components/Profile/Profile'
import Articles from './src/components/Articles/Articles'
import ArticleProducer from './src/components/ArticleProducer/ArticleProducer'
import NewSongList from './src/components/NewSongList/NewSongList'
import NewBeatList from './src/components/NewBeatList/NewBeatList'
import NewPlayList from './src/components/NewPlayList/NewPlayList'
import Artist from './src/components/Artist/Artist'


import NavigationService from './NavigationService';

const ActivityProject = createStackNavigator(
  {
    Loading: { screen: Loading , navigationOptions: {header: null,},},
    Login: { screen: Login , navigationOptions: {header: null,},},
    Register: { screen: Register , navigationOptions: {header: null,},},
    ForgotPassword: { screen: ForgotPassword , navigationOptions: {header: null,},},
    RecoveryCode: { screen: RecoveryCode , navigationOptions: {header: null,},},
    ResetPassword: { screen: ResetPassword , navigationOptions: {header: null,},},
    Toplist: { screen: Toplist , navigationOptions: {header: null,},},
    Producer: { screen: Producer , navigationOptions: {header: null,},},
    Artist: { screen: Artist , navigationOptions: {header: null,},},
    ArticleProducer: { screen: ArticleProducer , navigationOptions: {header: null,},},
    SearchBeats: { screen: SearchBeats , navigationOptions: {header: null,},},
    SearchedList: { screen: SearchedList , navigationOptions: {header: null,},},
    Profile: { screen: Profile , navigationOptions: {header: null,},},
    Articles: { screen: Articles , navigationOptions: {header: null,},},
    NewSongList: { screen: NewSongList , navigationOptions: {header: null,},},
    NewBeatList: { screen: NewBeatList , navigationOptions: {header: null,},},
    NewPlayList: { screen: NewPlayList , navigationOptions: {header: null,},},
  },
  {
    initialRouteName: "Loading",
    headerLayoutPreset: 'center',
    transitionConfig : () => ({
    transitionSpec: {
      duration: 0,
      },
  }),
  },);

  
const AppContainer = createAppContainer(ActivityProject)

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount = () => {
    console.disableYellowBox = true;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    // Alert.alert(
    //     'Confirm exit',
    //     'Do you want to quit the app?',
    //     [
    //         {text: 'NO', style: 'cancel'},
    //         {text: 'YES', onPress: () => BackHandler.exitApp()}
    //     ]
    // );
    return true;    // Very important, prevents the default functionality of exiting the app.
  }
  render() {
    return( 
      [
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = 'rgb(26,21,36)' translucent = {true} key="status_bar"/>
        ,
        <AppContainer ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} key="app_container"/>
      ]
    );
  }
}