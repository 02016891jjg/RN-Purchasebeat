import React ,{Component} from 'react'

import {
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  PermissionsAndroid,
  Alert,
  ToastAndroid,
  AsyncStorage,
} from 'react-native'

import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  MusicBarLoader
} from 'react-native-indicator';
import Menu from '../UI/SlideMenu/SlideMenu';

import SideMenu from 'react-native-side-menu';
import { API_URL } from '../../config/constants'
import { BEAT_URL } from '../../config/constants'
import { PRODUCER_URL } from '../../config/constants'
import logoImage from '../../assets/images/loginlogo.png'
import logoBackImage from '../../assets/images/logo_back.png'
import blueHeaderbackImage from '../../assets/images/blue_header_back.png'
import slideButtonBackImage from '../../assets/images/slide_button_back.png'
import backgroundImage from '../../assets/images/background.png'
import avatarImage from '../../assets/images/avatar.png'


import styles from './ArticleProducer.styles';
import NavigationService from '../../../NavigationService';
import { Thumbnail } from 'react-native-thumbnail-video';


export default class ArticleProducer extends Component{

    constructor(props){
        super(props)
        this.state ={
            isLoading:false,
            token:'',
            isOpen:false,
            image:'',
            youtube:'',
            title:'',
            detail:''
        }

        this.updateMenuState=this.updateMenuState.bind(this);
        this.toggle=this.toggle.bind(this);
        this.updateMenuState=this.updateMenuState.bind(this);
        this.onHideMenu=this.onHideMenu.bind(this);
    }

  componentDidMount = async() =>{
     
    this.state.token =await getToken();

     if(!this.state.token) NavigationService.navigate('Login');

     var producerId = this.props.navigation.getParam('producerId');
     fetch(API_URL + 'article/' + producerId,{

           method:'GET',
           headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': this.state.token,
           }

     })
     .then((response) => response.json())
     .then((responseJson) =>{
       

            var articleItem = responseJson.article;
            
            this.setState({
                title:articleItem.pbe_title,
                detail:articleItem.pbe_details,
                image:articleItem.pbe_image,
                youtube:articleItem.pbe_youtube,
                isLoading:false,

            });
           
        

     })
     .catch((error) => {
         console.log(error);
     });
  }
  updateMenuState(isOpen) {
        this.setState({isOpen});
    }
  onHideMenu() {
  
    this.setState({
      isOpen: false,
    });
  }
   toggle(){
        this.setState({isOpen:!this.state.isOpen});
    }
    render(){
        const menu = <Menu onHideMenu={this.onHideMenu}/>;

       return(
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
                                <Text style={styles.headerText}>ARTICLE</Text>
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
                     {
                        !this.state.isLoading &&
                        <View style={styles.bodyBox}>
                            <View style={styles.producerBox}>
                             
                             <View style={styles.producerImageBox}>
                                 {
                                     this.state.youtube !==''?
                                       <Thumbnail url ={this.state.youtube}  imageWidth={120} imageHeight={120} showPlayIcon={false}/>
                                       :<Image style={styles.backgroundImage} source={this.state.image !==''?{uri:this.state.image}:avatarImage} />
                                 }
                                
                                </View>
                                <View style={styles.producerDescriptionBox}>
                                      <Text style={styles.DescriptionTitleText}>{this.state.title}</Text>
                                    
                                </View>
                              </View>
                                <ScrollView style={styles.listBodyBox}>
                                        <Text style={styles.DescriptionBodyText}>{this.state.detail}</Text>
                                </ScrollView>
                        </View>
                    }
               </View>

                </SideMenu>
       )

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
