import React , { Component } from 'react';
import {
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

import NavigationService from '../../../../NavigationService';
import { PRODUCER_URL , API_URL } from '../../../config/constants'
import avatarImage from '../../../assets/images/avatar.png'
import styles from './SlideMenu.styles';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myProfile : null,
            token: '',
            imageName : '',
            userName : ''
        }
        this.gotoSelectedPage = this.gotoSelectedPage.bind(this);
        this.setImage = this.setImage.bind(this);
        _signOutAsync = this._signOutAsync.bind(this);
    }

    componentDidMount = async () => {
        this.state.token = await getToken();
        if(!this.state.token)
            NavigationService.navigate('Login');

        fetch(API_URL + 'getprofile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': this.state.token,
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if(json.success){
                this.setState({
                    imageName : json.profile.pbp_thumb,
                    userName : json.profile.pbp_username
                })
                console.log(PRODUCER_URL + this.state.imageName);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    setImage(imageName) {
        this.setState({
            imageName : imageName
        });
    }

    gotoSelectedPage = (pageName) => {
        if(pageName == 'SearchedList' && !this.props.soundLoadSuccess)
            return;
        NavigationService.navigate(pageName);
        this.props.onHideMenu(pageName);
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.gotoSelectedPage('Login');
    };

    render() {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={(this.state.imageName == " " || this.state.imageName == "") ? avatarImage : {uri : PRODUCER_URL + this.state.imageName}}
                    />
                    <Text style={styles.name}>{this.state.userName}</Text>
                </View>
                <TouchableOpacity onPress={() => this.gotoSelectedPage('Profile')} activeOpacity={.5}>
                    <Text style={this.props.page == 'Profile' ? styles.itemSelected : styles.item}>
                        MY PROFILE
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.gotoSelectedPage('Articles')} activeOpacity = {.5} >
                   <Text style = {this.props.page == 'Articles' ? styles.itemSelected : styles.item}>
                  ARTICLES</Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress = {() =>this.gotoSelectedPage('NewSongList')} activeOpacity = {.5}>
                   <Text style = {this.props.page == 'NewSongList' ? styles.itemSelected : styles.item}>
                     NEW SONGS
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() =>this.gotoSelectedPage('NewBeatList')} activeOpacity = {.5}>
                   <Text style = {this.props.page == 'NewBeatList' ? styles.itemSelected : styles.item}>
                     NEW BEATS
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.gotoSelectedPage('Toplist')} activeOpacity={.5}>
                    <Text style={this.props.page == 'Toplist' ? styles.itemSelected : styles.item}>
                        TOP LIST
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.gotoSelectedPage('SearchBeats')} activeOpacity={.5}>
                    <Text style={this.props.page == 'SearchBeats' ? styles.itemSelected : styles.item}>
                        SEARCH BEATS
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._signOutAsync} activeOpacity={.5}>
                    <Text style={this.props.page == 'Logout' ? styles.itemSelected : styles.item}>
                        LOGOUT
                    </Text>
                </TouchableOpacity>
            </ScrollView>
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