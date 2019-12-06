import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imageArea: {
    flex: 1,
    resizeMode: 'contain',
    width: null,
    height: null
  },
  imageBox: {
    width: 70,
    height: 70,
  },
  bodyBox: {
    flex: 1,
    marginLeft: 10,
    height: 70,
    flexDirection: 'column',
    backgroundColor: 'rgb(17,13,24)'
  },
  titleText: {
    color: 'rgb(79,243,187)',
    fontSize: 12,
    paddingLeft: 5
  },
  descriptionText: {
    color: 'white',
    fontSize: 12,
    paddingLeft: 5,
    width: 200,
    
  },
  buyBox: {
    flexDirection: 'row',
    flex: 1
  },
  buyValueBox: {
    flex: 2
  },
  buyBuyBox: {
    flexDirection: 'row',
    flex: 1
  },
  valueText: {
    color: 'rgb(79,243,187)',
    fontSize: 18,
    paddingLeft: 5
  },
  buy1Text: {
    color: 'white',
    fontSize: 16
  },
  buy2Text: {
    color: 'rgb(247,211,9)',
    fontSize: 18
  }
})
