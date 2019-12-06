import React, { Component } from 'react'
import { Image, View, TextInput, TouchableOpacity, Text } from 'react-native'
import NavigationService from '../../../NavigationService';

import logoImage from '../../assets/images/loginlogo.png'
import styles from './ResetPassword.styles';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password1: '',
            password2: '',
            passwordValidated : true,
        }
        this.handlePassword1 = this.handlePassword1.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.doContinue = this.doContinue.bind(this);

        this.password1Field = React.createRef();
        this.password2Field = React.createRef();
    }

    handlePassword1(text) {
        this.setState({password1 : text});
    }

    handlePassword2(text) {
        this.setState({password2 : text});
    }

    validatePassword() {
        if(this.state.password1 != this.state.password2 
            || this.state.password1 == ''
            || this.state.password2 == '')
            return false;
        return true;
    }
    
   doContinue() {
        if (!this.validatePassword()) {
            this.setState({ passwordValidated: false,password1: '', password2: '' });
            this.password1Field.current.focus();
            return;
        }
        alert('Reset password success.');
        this.setState({
            password1: '',
            password2: '',
            passwordValidated : true,
        });
        this.password1Field.current.focus();
        NavigationService.navigate('Login');
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
                                RESET PASSWORD
                            </Text>
                            <Text style={styles.commentText}>
                                Please reset your password.
                            </Text>
                        </View>
                        <View style = {styles.row}>
                            <View style={styles.rowItem}>
                                <TextInput style={styles.input}
                                    value={this.state.password1}
                                    ref={this.password1Field}
                                    placeholder="Password"
                                    placeholderTextColor={this.state.passwordValidated ? "gray" : "rgb(200,50,50)"}
                                    style={styles.standardInput}
                                    secureTextEntry={true}
                                    onChangeText={this.handlePassword1} />
                            </View> 
                            <View style={styles.rowItem}>
                                <TextInput style={styles.input}
                                    value={this.state.password2}
                                    ref={this.password2Field}
                                    placeholder="Confrim Password"
                                    placeholderTextColor="gray"
                                    style={styles.standardInput}
                                    secureTextEntry={true}
                                    onChangeText={this.handlePassword2} />
                            </View>
                            <View style={styles.rowItem}>
                                <TouchableOpacity onPress={this.doContinue} style={styles.standardButton}>
                                    <Text style={styles.standardText}>RESET</Text>
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
