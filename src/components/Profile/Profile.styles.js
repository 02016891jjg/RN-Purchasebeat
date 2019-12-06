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
        justifyContent : 'center',
        alignItems : 'center'
    },
    inputBox: {
        flex:8,
        flexDirection: 'column',
        width: '100%',
        justifyContent : 'center'
    },
    rowItem: {
        flex: 1,
        padding: 0,
        justifyContent : 'center'
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
        borderRadius: 5,
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
    },
    imageBox : {
        flex: 3,
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
})
