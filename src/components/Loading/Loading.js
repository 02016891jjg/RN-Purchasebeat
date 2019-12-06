import React, { Component } from 'react'
import { Image, View, Alert, BackHandler , AsyncStorage } from 'react-native'

import NavigationService from '../../../NavigationService';
import { API_URL } from '../../config/constants'

import loadingImage from '../../assets/images/loading.png'
import styles from './Loading.styles';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
        };

        this.testApi = this.testApi.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }
    componentDidMount = async () => {
        this.state.token = await getToken();
        setTimeout(() => {
            this.testApi();
        }, 3000);
    }

    closeWindow() {
        BackHandler.exitApp();
    }

    testApi() {
        fetch(API_URL + 'aboutus', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(json => {
            if(!this.state.token)
                NavigationService.navigate('Login');
            else {
                //SEND REQUEST TO API SERVER
                fetch(API_URL + 'genre', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'token': this.state.token,
                    }
                })
                .then(response => response.json())
                .then(json => {
                    if (json.success)
                        NavigationService.navigate('Toplist');
                    else
                        NavigationService.navigate('Login');
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert(
                        'Server Connection Error',
                        'There is a problem with your server connention.',
                        [
                        {text: 'Exit', onPress: this.closeWindow, style: 'cancel' },
                        {text: 'Try again', onPress: this.testApi },
                        ]
                    );
                });
                ///////////////////////////////////
            }
        })
        .catch((error) => {
            console.log(error);
            Alert.alert(
                'Server Connection Error',
                'There is a problem with your server connention.',
                [
                {text: 'Exit', onPress: this.closeWindow, style: 'cancel' },
                {text: 'Try again', onPress: this.testApi },
                ]
            );
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.responsiveBox}>
                    <Image source={loadingImage} resizeMode={'stretch'} style={styles.backimage}></Image>
                </View>
            </View>
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
