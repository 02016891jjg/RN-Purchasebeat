import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  logoimage: {
    width: 150,
    height: 40,
    marginTop: 40,
  },
  logoBox: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBox: {
    width: '100%',
    flexDirection: 'row',
  },
  slideBox: {
    flex: 1,
  },
  titleBox: {
    flex: 3,
    flexDirection: 'column'
  },
  slideButton: {
    marginTop: 40,
    height: 50,
    width: 40,
    alignItems: 'center',
  },
  standardText: {
    color: 'white',
    textAlign: 'center'
  },
  bodyBox: {
    flex: 1,
    paddingTop: 10,
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  producerBox: {
    width: '100%',
    flexDirection: 'row',
    height: 150
  },
  producerImageBox: {
    padding: 10,
    flex: 1,
    width: '100%',
  },
  producerDescriptionBox: {
    flex: 1,
    width: '100%',
    padding: 10
  },
  listBodyBox: {
    flex: 1,
    width: '100%',
  },
  titleArea: {
    marginTop: 20,
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    textAlign: 'right',
    fontSize: 18,
    marginRight: 20
  },
  DescriptionTitleText: {
    color: 'rgb(79,243,187)',
    fontSize: 18
  },
  DescriptionBodyText: {
    color: 'white',
    fontSize: 12
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: 'rgb(68,220,168)',
    paddingTop: 10,
  }
})
