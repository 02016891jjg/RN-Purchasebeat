import { StyleSheet, PixelRatio } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width : '100%'
    },
    backgroundImage : {
        flex: 1,
        resizeMode : 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    logoimage: {
        width: 150,
        height: 40,
        marginTop : 40,
    },
    logoBox : {
        width: '100%',
        height : 100,
        alignItems : 'center',
        justifyContent : 'center',
    },
    headerBox : {
        width: '100%',
        flexDirection : 'row',
    },
    slideBox : {
        flex : 1,
    },
    titleBox : {
        flex : 3,
        flexDirection : 'column'
    },
    slideButton : {
        marginTop : 40,
        height: 50,
        width : 40,
        alignItems : 'center',
    },
    titleArea : {
        marginTop : 20,
        height: 50,
        width : '100%',
        justifyContent : 'center',
    },
    headerText : {
        color : 'white',
        textAlign : 'right',
        fontSize : 18,
        marginRight : 20
    },
    bodyBox : {
        flex:1,
        paddingTop : 10,
        width: '80%',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        width: '100%',
        justifyContent : 'center'
    },
    inputBox: {
        flex: 2,
        flexDirection: 'column',
        padding: 10,
        width: '100%',
        justifyContent : 'center'
    },
    rowItem: {
        flex: 1,
        padding: 0,
        justifyContent : 'center'
    },
    rowPriceItem: {
        flex: 1,
        paddingTop: 20,
        justifyContent : 'center',
        alignItems : 'center',
    },
    standardInput: {
        backgroundColor: 'white',
        color: 'black',
        height: 40,
    },
    standardText: {
        color: 'white',
        fontSize : 16,
        textAlign: 'center'
    },
    standardButton: {
        backgroundColor: 'rgb(79,243,187)',
        padding: 15,
        height: 50,
        borderRadius: 5
    },
    toast : {
        backgroundColor : 'rgb(200,50,50)',
        width  : 200
    },
    toastText : {
        color : 'white',
        textAlign : 'center'
    }
})
