import React,{Component} from 'react'
import { Image, View, TextInput, TouchableOpacity, Text } from 'react-native'

import styles from './ArticleItem.styles'
import { Thumbnail } from 'react-native-thumbnail-video';
import avatarImage from '../../assets/images/avatar.png'



export default class ArticleItem extends Component{

   constructor(props){
       super(props)
       this.state = {

       }
   }
   
   render() {
      
    return (     
        <TouchableOpacity onPress={()=>{this.props.onPress(this.props.id)}} activeOpacity={.5}>
            <View style={styles.container}>
                {
                    this.props.youtube !=='undefined' && this.props.youtube !=='' ?                    
                        <Thumbnail url ={this.props.youtube}  imageWidth={70} imageHeight={70} showPlayIcon={false}/>
                        : <View style={styles.imageBox}>
                             <Image style = {styles.imageArea} resizeMode={'stretch'} source={this.props.image !=='' && this.props.image !=='undefined'?{uri:this.props.image}:avatarImage}/>
                          </View>                        
                }
                <View style={styles.bodyBox}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                    <Text style={styles.descriptionText} numberOfLines={2}>{this.props.detail}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

   }

}