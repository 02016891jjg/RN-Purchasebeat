import React, { Component } from 'react'
import { Image, View, TouchableOpacity, Text, ScrollView, AsyncStorage } from 'react-native'
import Menu from '../UI/SlideMenu/SlideMenu';
import styles from './Articles.styles';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  API_URL
} from '../../config/constants'
import NavigationService from '../../../NavigationService';
import SideMenu from 'react-native-side-menu';
import { MusicBarLoader } from 'react-native-indicator';
import logoImage from '../../assets/images/loginlogo.png'
import logoBackImage from '../../assets/images/logo_back.png'
import blueHeaderbackImage from '../../assets/images/blue_header_back.png'
import slideButtonBackImage from '../../assets/images/slide_button_back.png'
import backgroundImage from '../../assets/images/background.png'
import beatsImage from '../../assets/images/beats_image.png'
import ArticleItem from '../ArticleItem/ArticleItem'
import avatarImage from '../../assets/images/avatar.png'





export default class Articles extends Component{
   
    constructor(props) {
        super(props)
        this.state = {
            isOpen:false,
            isLoading:true,
            token:'',
            listSource:[]
        }
        this.onSelectItem = this.onSelectItem.bind(this);
        this.toggle = this.toggle.bind(this);
        this.updateMenuState = this.updateMenuState.bind(this);
        this.onHideMenu = this.onHideMenu.bind(this);

    }
    onSelectItem = (index) => {
        NavigationService.navigate('ArticleProducer', {
          producerId: index
        });
      }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }
    
    toggle(){
        this.setState({isOpen:!this.state.isOpen});
    }

    onHideMenu() {
        this.setState({isOpen:false})
    }
    componentDidMount = async () =>{
         this.state.token = await getToken();
      
        if (!this.state.token) NavigationService.navigate('Login');
       
        //SEND REQUEST TO API SERVER
        fetch(API_URL + 'articles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': this.state.token,
              }
        })
           .then((response) => response.json())
           .then((responseJson) => {
                if (!responseJson.success) {
                    var articleArray = responseJson.articles,
                      tempArray = [];
                     
                    for(var i=0;i<articleArray.length;i++)  
                        tempArray.push({
                            "index":i,
                            "pbe_id":articleArray[i].pbe_id,
                            "pbe_title":articleArray[i].pbe_title,
                            "pbe_overview":articleArray[i].pbe_overview,
                            "pbe_details":articleArray[i].pbe_details,
                            "pbe_status":articleArray[i].pbe_status,
                            "pbe_youtube": articleArray[i].pbe_youtube,
                            "pbe_image":articleArray[i].pbe_image
                        });

                        this.setState({
                           listSource:tempArray,
                           isLoading:false
                        });
                }

            })
            .catch((error) => {
                console.log(error);
            });
        ///////////////////////////////////
    }
    render(){
        const items = [];
        var list = this.state.listSource;
        for(var i=0;i<list.length;i++)
        {
            items.push(
                <ArticleItem key={i} 
                index={i}
                id={list[i].pbe_id}
                title={list[i].pbe_title}
                detail={list[i].pbe_details}
                youtube={list[i].pbe_youtube}
                image={list[i].pbe_image}
                onPress={(index) => this.onSelectItem(index)}
                />
            )
        }
        const menu = <Menu page="Articles" onHideMenu={this.onHideMenu}/>;
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
                         <Image style={styles.backgroundImage} source={blueHeaderbackImage}/>
                         <Text style={styles.headerText}>ARTICLES</Text>
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