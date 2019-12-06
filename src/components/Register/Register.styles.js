import { StyleSheet, PixelRatio } from 'react-native'
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
        flex : 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoimage: {
        width: wp('60%'),
        height: wp('60%') / 3.53,
        marginTop: 35,
        marginBottom: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        width: '100%',
        justifyContent : 'center'
    },
    inputBox: {
        flex: 12,
        flexDirection: 'column',
        padding: 10,
        width: '100%',
        justifyContent : 'center'
    },
    rowItem: {
        flex: 1,
        marginTop: 10,
        justifyContent : 'center'
    },
    standardInput: {
        backgroundColor: 'white',
        color: 'black',
        height: 35,
        fontSize : 12
    },
    standardText: {
        color: 'white',
        textAlign: 'center'
    },
    standardButton: {
        backgroundColor: 'rgb(79,243,187)',
        padding: 15,
        height: 50,
        borderRadius: 5
    },
    goButton: {
        borderWidth: 1,
        borderColor: 'rgb(42,110,212)',
        padding: 15,
        height: 50,
        borderRadius: 5
    },
    imageBox : {
        flex: 4,
        alignItems : 'center',
        justifyContent : 'center'
    },
    imageContainer: {
        borderRadius: 130,
        width: 130,
        height: 130,
        borderColor: '#9B9B9B',
        borderWidth: 2 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    toastError : {
        backgroundColor : 'rgb(200,50,50)',
        width  : 200
    },
    toastSuccess : {
        backgroundColor : 'rgb(20,150,20)',
        width  : 200
    },
    toastText : {
        color : 'white',
        textAlign : 'center'
    }
})
