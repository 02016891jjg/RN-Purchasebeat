import React,{Component} from 'react'
import { Image, View, TouchableOpacity, Text, ScrollView, AsyncStorage } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign';
import SideMenu from 'react-native-side-menu';
import { MusicBarLoader } from 'react-native-indicator';

import NavigationService from '../../../NavigationService';
import { API_URL } from '../../config/constants'
import Beat from '../Beat/Beat'
import Menu from '../UI/SlideMenu/SlideMenu';

import logoImage from '../../assets/images/loginlogo.png'
import logoBackImage from '../../assets/images/logo_back.png'
import blueHeaderbackImage from '../../assets/images/blue_header_back.png'
import slideButtonBackImage from '../../assets/images/slide_button_back.png'
import backgroundImage from '../../assets/images/background.png'
import beatsImage from '../../assets/images/beats_image.png'
import styles from './NewBeatList.styles';

export default class NewBeatList extends Component{
    
    constructor(props){
        super(props)
       this.state = {
         isOpen: false,
         token: '',
         listSource: [],
         isLoading: true,
       }

         this.onSelectItem = this.onSelectItem.bind(this);
         this.updateMenuState = this.updateMenuState.bind(this);
         this.toggle = this.toggle.bind(this);
         this.onShowProducer = this.onShowProducer.bind(this);
         this.onHideMenu = this.onHideMenu.bind(this);
    }
     onSelectItem(index) {
       NavigationService.navigate('NewPlayList', {
         method: "NewBeatList",
         listSource: this.state.listSource,
         selIndex: index
       });
     }

     onShowProducer = (index) => {
       NavigationService.navigate('Producer', {
         producerId: index
       });
     }

     componentDidMount = async () => {
       this.state.token = await getToken();
    
       if (!this.state.token)
         NavigationService.navigate('Login');

       //SEND REQUEST TO API SERVER
       fetch(API_URL + 'newbeatlist', {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json',
             'token': this.state.token,
           }
         })
         .then(response => response.json())
         .then(json => {
           if (json.success) {

             var beatArray = json.beats,
               tempArray = [];

             for (var i = 0; i < beatArray.length; i++)
               tempArray.push({
                 "index": i,
                 "id": beatArray[i].pbs_id,
                 "beatTitle": beatArray[i].pbs_title,
                 "beatDescription": beatArray[i].pbs_desc,
                 "price": beatArray[i].pbs_price,
                 "producerId": beatArray[i].pbp_id,
                 "producerName": beatArray[i].pbp_name,
                 "producerImage": beatArray[i].pbp_thumb,
                 "filename": beatArray[i].pbs_tagfile,
                 "vote": beatArray[i].vote
               });
             this.setState({
               listSource: tempArray,
               isLoading: false,
             });
             console.log(this.state.listSource);
           }

         })
         .catch((error) => {
           console.log(error);
         });
       ///////////////////////////////////
     }

     updateMenuState(isOpen) {
       this.setState({
         isOpen
       });
     }

     toggle() {
       this.setState({
         isOpen: !this.state.isOpen,
       });
     }

     onHideMenu() {
       this.setState({
         isOpen: false
       });
     }
  
     render(){
           const items = [];
        var list = this.state.listSource;
        for (var i = 0; i < list.length; i++) {
            items.push(
                <Beat key={i}
                    index={i}
                    image={beatsImage}
                    imageName={list[i].producerImage}
                    title={list[i].beatTitle}
                    description={list[i].beatDescription}
                    price={list[i].price}
                    onPress={(index) => this.onSelectItem(index)}
                    onShowProducer={(index) => this.onShowProducer(index)}
                />
            )
        }

        const menu = <Menu  page='NewBeatList' onHideMenu={this.onHideMenu}/>;

        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                openMenuOffset={200}
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
                <View style={styles.container}>
                    <Image style={styles.backgroundImage} source={backgroundImage} />
                    <View style={styles.logoBox}>
                        <Image style={styles.backgroundImage} source={logoBackImage} />
                        <Image source={logoImage} resizeMode={'stretch'} style={styles.logoimage} />
                    </View>
                    <View style={styles.headerBox}>
                        <View style={styles.slideBox}>
                            <TouchableOpacity style={styles.slideButton} onPress={this.toggle}>
                                <Image style={styles.backgroundImage} source={slideButtonBackImage} />
                                <AntIcon name={this.state.isOpen ? "left" : 'right'} color="white" size={20} style={{ marginTop: 10 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBox}>
                            <View style={styles.titleArea}>
                                <Image style={styles.backgroundImage} source={blueHeaderbackImage} />
                                <Text style={styles.headerText}>New Beats</Text>
                            </View>
                        </View>
                    </View>
                    {this.state.isLoading &&
                        <View style={styles.loadingBox}>
                            <MusicBarLoader
                                color='rgb(68,220,168)'
                                barWidth={10}
                                barHeight={50}
                                betweenSpace={5}
                            />
                            <Text style={styles.loadingText}>Loading</Text>
                        </View>
                    }
                    {!this.state.isLoading &&
                        <View style={styles.bodyBox}>
                            <ScrollView style={styles.listBodyBox}>
                                {items}
                            </ScrollView>
                        </View>
                    }
                </View>
            </SideMenu>
        );
     }
     

}
const getToken = async () => {
  let token = '';
  try {
    token = await AsyncStorage.getItem('token');
  } catch (error) {
    console.log(error.message);
  }
  return token;
}