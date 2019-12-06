import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        width : '100%',
        height : 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection : 'row',
    },
    titleBox : {
        flex : 4,
        justifyContent: 'center',
    },
    producerNameBox : {
        flex : 4,
        justifyContent: 'center',
    },
    titleText : {
        color : 'white',
        marginLeft : 20,
        fontSize : 12,
    },
    nameText : {
        color : 'white',
        marginLeft : 20,
        fontSize : 12,
    },
    buyBox : {
        flexDirection : 'row',
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyText : {
        color : 'rgb(79,243,187)',
    }
})
