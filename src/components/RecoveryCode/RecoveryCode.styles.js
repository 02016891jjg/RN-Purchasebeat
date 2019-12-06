import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(26,21,36)'
    },
    responsiveBox: {
        width: wp('80%'),
        height: hp('80%'),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems : 'center'
    },
    logoimage: {
        width: wp('60%'),
        height: wp('60%') / 3.53
    },
    row: {
        flex: 2,
        flexDirection: 'column',
        padding: 20,
        width : '100%',
        justifyContent : 'center'
    },
    rowItem: {
        padding: 10,
    },
    standardInput: {
        backgroundColor: 'white',
        color: 'black',
        height : 40,
        borderRadius : 5
    },
    standardText: {
        color: 'white',
        textAlign : 'center'
    },
    standardButton: { 
        backgroundColor: 'rgb(79,243,187)',
        padding: 15,
        height: 50,
        borderRadius: 5
    },
    goButton: { 
        borderWidth : 1,
        borderColor : 'rgb(42,110,212)',
        padding: 15,
        height: 50,
        borderRadius: 5
    },
    headerText : {
        color : 'white',
        fontSize : 20,
        textAlign : 'center',
        padding : 20
    },
    commentText : {
        color : 'white',
        fontSize : 12,
        textAlign : 'center',
        padding : 10
    },
    headerRow : {
        flex : 1,
        padding: 10,
        borderColor : 'gray',
        borderBottomWidth : 1
    }
})
