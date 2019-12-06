import {  StyleSheet } from 'react-native';

export default StyleSheet.create({
    menu: {
      flex: 1,
      width: window.width,
      height: window.height,
      backgroundColor: 'rgb(68,220,168)',
      padding: 20,
    },
    avatarContainer: {
      marginBottom: 20,
      marginTop: 20,
      flexDirection : 'column',
      justifyContent : 'center',
      alignItems : 'center',
      width : '100%',
      borderBottomColor : 'white',
      borderBottomWidth : 1,
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
    },
    name: {
      color : 'white',
      textAlign : 'center'
    },
    item: {
      fontSize: 14,
      fontWeight: '300',
      paddingTop: 5,
      color : 'white',
    },
    itemSelected: {
      fontSize: 14,
      fontWeight: '300',
      paddingTop: 5,
      color : 'rgb(17,13,24)',
    },
  });