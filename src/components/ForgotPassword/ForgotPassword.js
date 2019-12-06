import React, { Component } from 'react'
import { Image, View, TextInput, TouchableOpacity, Text } from 'react-native'
import NavigationService from '../../../NavigationService';

import logoImage from '../../assets/images/loginlogo.png'

import styles from './ForgotPassword.styles';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailValidated : true,
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.doContinue = this.doContinue.bind(this);

        this.emailField = React.createRef();
    }

    handleEmail(eml) {
        this.setState({email : eml});
    }

    validateEmail(eml) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 
        if(reg.test(eml) === false)
            return false;
        return true;
    }
    
    doContinue() {
        var email  = this.state.email;
        var password = this.state.password;
        if(!this.validateEmail(email)) {
            this.setState({emailValidated : false , email : ''});
            this.emailField.current.focus();
            return;
        }
        this.setState({
            email: '',
            emailValidated : true,
        });
        this.emailField.current.focus();
        NavigationService.navigate('RecoveryCode');
    }

    goLogin() {
        NavigationService.navigate('Login');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.responsiveBox}>
                    <Image source={logoImage} resizeMode={'stretch'} style={styles.logoimage} />
                    <View style={styles.row}>
                        <View style={styles.headerRow}>
                            <Text style={styles.headerText}>
                                FORGOT PASSWORD
                            </Text>
                            <Text style={styles.commentText}>
                                Enter your Email address and we'll send you a link to your password.
                            </Text>
                        </View>
                        <View style = {styles.row}>
                            <View style={styles.rowItem}>
                                <TextInput style={styles.input}
                                    value={this.state.email}
                                    ref={this.emailField}
                                    placeholder="Email address"
                                    placeholderTextColor={this.state.emailValidated ? "gray" : "rgb(200,50,50)"}
                                    style={styles.standardInput}
                                    onChangeText={this.handleEmail} />
                            </View> 
                            <View style={styles.rowItem}>
                                <TouchableOpacity onPress={this.doContinue} style={styles.standardButton}>
                                    <Text style={styles.standardText}>SEND TO SERVER</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowItem}>
                                <TouchableOpacity onPress={this.goLogin} style={styles.goButton}>
                                    <Text style={styles.standardText}>GO LOGIN</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
