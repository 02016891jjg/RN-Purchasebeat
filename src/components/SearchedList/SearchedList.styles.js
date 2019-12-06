import { StyleSheet} from 'react-native'

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
    logobackimage: {
        width: '100%',
        height: 80
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
    standardText: {
        color: 'white',
        textAlign : 'center'
    },
    bodyBox : {
        flex:1,
        paddingTop : 30,
        width: '90%',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    listBodyBox : {
        flex : 1,
        width : '100%',
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
    DescriptionTitleText : {
        color : 'rgb(79,243,187)',
        fontSize : 18
    },
    DescriptionBodyText : {
        color : 'white',
        fontSize : 12
    },
    loadingBox : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    loadingText : {
        color : 'rgb(68,220,168)',
        paddingTop : 10,
    }
})
