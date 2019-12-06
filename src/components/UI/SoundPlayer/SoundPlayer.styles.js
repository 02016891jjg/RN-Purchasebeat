import {  StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      height : 100,
      marginTop : 10,
      width : '100%',
      flexDirection : 'row',
      backgroundColor: 'rgba(0,0,0 , 0.2)',
    },
    avatarContainer: {
      flex : 2,
      flexDirection : 'column',
      alignItems : 'center',
      justifyContent : 'center'
    },
    avatarTouchContainer : {
      alignItems : 'center'
    },
    avatar: {
      width: 50,
      height: 50,
    },
    avatarName: {
      padding : 5,
      textAlign : 'center',
      color : 'white',
      fontSize : 12,
    },
    progressContainer: {
      flex : 6,
      flexDirection : 'column',
      alignItems : 'center',
      justifyContent : 'center'
    },
    metaContainer: {
      flex : 2,
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'center'
    },
    buttonContainer: {
      flex : 1,
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'center',
      marginBottom : 20,
    },
    loadingBox : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center'
    },
    loadingText : {
      color : 'rgb(68,220,168)',
      fontSize : 10,
    },
    invalidText : {
      color : 'rgb(255,100,100)',
    },
  });