import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    responsiveBox: {
        width: wp('100%'),
        height: hp('100%'),
        flexDirection: 'column',
        justifyContent: 'center'
    },
    backimage : {
        width : '100%',
        height : '100%'
    }
})
