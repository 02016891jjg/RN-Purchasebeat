import React, { Component } from 'react'
import { Image, View, TextInput, TouchableOpacity, Text  , AsyncStorage } from 'react-native'
import NavigationService from '../../../NavigationService';

import { API_URL } from '../../config/constants'

import logoImage from '../../assets/images/loginlogo.png'
import styles from './Login.styles';
import Toast from 'react-native-whc-toast'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            emailValidated : true,
            passwordValidated : true,
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.doLogin = this.doLogin.bind(this);

        this.emailField = React.createRef();
        this.passwordField = React.createRef();
    }

    handleEmail(eml) {
        this.setState({email : eml});
    }

    handlePassword(pwd) {
        this.setState({password : pwd});
    }

    validateEmail(eml) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 
        if(reg.test(eml) === false)
            return false;
        return true;
    }

    validatePassword(pwd) {
        if(pwd == '')
            return false;
        return true;
    }
    
    doLogin() {
        var email  = this.state.email;
        var password = this.state.password;
        if(!this.validateEmail(email)) {
            this.setState({emailValidated : false , email : ''});
            this.emailField.current.focus();
            return;
        }
        if(!this.validatePassword(password)) {
            this.setState({passwordValidated : false , password : ''});
            this.passwordField.current.focus();
            return;
        }
        
        //SEND REQUEST TO API SERVER
        console.log(API_URL + 'login');
        fetch(API_URL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.success){
                saveToken(json.success.token);

                this.setState({
                    email: '',
                    password: '',
                    emailValidated : true,
                    passwordValidated : true,
                });
                this.emailField.current.focus();
                NavigationService.navigate('Toplist');
            }
            else {
                this.refs.toast.show('Invalid Email Address of Password!');
            }
            
        })
        .catch((error) => {
            console.log(error);
        });
        ///////////////////////////////////
    }

    goRegister() {
        NavigationService.navigate('Register');
    }

    forgotPassword() {
        NavigationService.navigate('ForgotPassword');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.responsiveBox}>
                    <Image source={logoImage} resizeMode={'stretch'} style={styles.logoimage} />
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <TextInput style={styles.input}
                                value={this.state.email}
                                ref={this.emailField}
                                placeholder="Email"
                                placeholderTextColor={this.state.emailValidated ? "gray" : "rgb(200,50,50)"}
                                style={styles.standardInput}
                                onChangeText={this.handleEmail} 
                                autoCapitalize = 'none'
                                keyboardType='email-address'
                            />
                        </View> 
                        <View style={styles.rowItem}>
                            <TextInput style={styles.input}
                                value={this.state.password}
                                ref={this.passwordField}
                                placeholder="Password"
                                placeholderTextColor={this.state.passwordValidated ? "gray" : "rgb(200,50,50)"}
                                style={styles.standardInput}
                                secureTextEntry={true}
                                onChangeText={this.handlePassword} 
                                autoCapitalize = 'none'
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Toast
                            ref="toast"
                            style = {styles.toast}
                            textStyle = {styles.toastText}
                            position = {Toast.Position.top}
                            fadeInDuration = {0}
                            fadeOutDuration = {0}
                            opacity = {0.9}
                            positionValue = {100}
                        />
                        <View style={styles.rowItem}>
                            <TouchableOpacity onPress={this.doLogin} style={styles.standardButton}>
                                <Text style={styles.standardText}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowItem}>
                            <TouchableOpacity onPress={this.forgotPassword}>
                                <Text style={styles.standardRightText}>
                                    Forgot my password
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <Text style={styles.standardText}>
                                Do you have a account?
                            </Text>
                        </View>
                        <View style={styles.rowItem}>
                            <TouchableOpacity onPress={this.goRegister} style={styles.goButton}>
                                <Text style={styles.standardText}>REGISTER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const saveToken = async token => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.log(error.message);
    }
};
