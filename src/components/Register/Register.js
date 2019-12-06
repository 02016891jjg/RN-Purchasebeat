import React, { Component } from 'react'
import { Image, View, TextInput, TouchableOpacity, Text , AsyncStorage, ScrollView} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-whc-toast'

import NavigationService from '../../../NavigationService'

import { API_URL } from '../../config/constants'
import logoImage from '../../assets/images/loginlogo.png'
import styles from './Register.styles';

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            payemail: '',
            phone: '',
            password1: '',
            password2: '',
            usernameValidated: true,
            emailValidated: true,
            payemailValidated: true,
            phoneValidated: true,
            passwordValidated: true,
            ImageSource: null,
            data: null,
            toast : 'success',
            uploadFileName : '',
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePayemail = this.handlePayemail.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handlePassword1 = this.handlePassword1.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.doRegister = this.doRegister.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePhone = this.validatePhone.bind(this);

        this.usernameField = React.createRef();
        this.emailField = React.createRef();
        this.payemailField = React.createRef();
        this.phoneField = React.createRef();
        this.password1Field = React.createRef();
        this.password2Field = React.createRef();
    }

    handleUsername(uname) {
        this.setState({ username: uname });
    }

    handleEmail(eml) {
        this.setState({ email: eml });
    }

    handlePayemail(eml) {
        this.setState({ payemail: eml });
    }

    handlePhone(pho) {
        this.setState({ phone: pho });
    }

    handlePassword1(pwd) {
        this.setState({ password1: pwd });
    }

    handlePassword2(pwd) {
        this.setState({ password2: pwd });
    }

    validateUsername() {
        if (this.state.username == '')
            return false;
        return true;
    }

    validateEmail(eml) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(eml) === false)
            return false;
        return true;
    }

    validatePayemail(eml) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(eml) === false)
            return false;
        return true;
    }

    validatePassword() {
        if (this.state.password1 != this.state.password2
            || this.state.password1 == ''
            || this.state.password2 == '')
            return false;
        return true;
    }

    validatePhone() {
        if (this.state.phone == '')
            return false;
        return true;
    }

    async doRegister() {
        const uploadFileName = this.uploadImageToServer();
        
        if (!this.validateUsername()) {
            this.setState({ usernameValidated: false, username: '' });
            this.usernameField.current.focus();
            return;
        }
        var email = this.state.email;
        if (!this.validateEmail(email)) {
            this.setState({ emailValidated: false, email: '' });
            this.emailField.current.focus();
            return;
        }
        payemail = this.state.payemail;
        if (!this.validateEmail(payemail)) {
            this.setState({ payemailValidated: false, payemail: '' });
            this.payemailField.current.focus();
            return;
        }
        if (!this.validatePhone()) {
            this.setState({ phoneValidated: false, phone: '' });
            this.phoneField.current.focus();
            return;
        }
        if (!this.validatePassword()) {
            this.setState({ passwordValidated: false, password1: '', password2: '' });
            this.password1Field.current.focus();
            return;
        }

        //SEND REQUEST TO API SERVER
        fetch(API_URL + 'register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                fullname: this.state.username,
                username: this.state.username,
                email: this.state.email,
                paypal_email: this.state.payemail,
                password: this.state.password1,
                phone: this.state.phone,
                image : uploadFileName
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.success){
                this.refs.toast.show('Register Success! Please Go to Login Page!');
                this.setState({
                    username: '',
                    email: '',
                    payemail: '',
                    phone: '',
                    password1: '',
                    password2: '',
                    emailValidated: true,
                    phoneValidated: true,
                    passwordValidated: true,
                    ImageSource: null,
                    data: null,
                    toast : 'success',
                    fileName : ''
                });
                NavigationService.navigate('Login');
            }
            else {
                this.refs.toast.show('Error Occurred!');
                this.setState({
                    toast : 'error'
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
        ///////////////////////////////////

        this.emailField.current.focus();
    }

    goLogin() {
        NavigationService.navigate('Login');
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                this.setState({
                    ImageSource: source,
                    data: response
                });
            }
        });
    }

    uploadImageToServer = () => {
        if(!this.state.data)
            return '';
        var data = new FormData();
        const fileName = Math.random().toString().replace('0.', '') + Math.floor(Date.now() / 1000) + this.state.data.fileName;
        data.append("profile", {uri: this.state.data.uri, name: fileName, type: this.state.data.type})

        fetch(API_URL + 'upload_image', {
            method: 'POST',
            body : data
        })
        .then(response => response.json())
        .then(json => {
            this.setState({
                uploadFileName : json.success
            });
        })
        .catch((error) => {
            console.log(error);
        });
        return fileName;
    }    

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.responsiveBox}>
                    <Image source={logoImage} style={styles.logoimage} resizeMode='stretch' />
                    <ScrollView style={{width: '100%'}}>
                    <View style={styles.inputBox}>
                        <Toast
                            ref="toast"
                            style = {this.state.toast == 'success' ? styles.toastSuccess : styles.toastError}
                            textStyle = {styles.toastText}
                            position = {Toast.Position.top}
                            fadeInDuration = {300}
                            fadeOutDuration = {300}
                            opacity = {0.9}
                            positionValue = {100}
                        />
                        <View style={styles.imageBox}>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                <View style={styles.imageContainer}>
                                    {this.state.ImageSource === null ?
                                        <Text style={styles.standardText}>Select a Photo</Text> :
                                        <Image style={styles.imageContainer} source={this.state.ImageSource} />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowItem}>
                            <TextInput style={styles.input}
                                value={this.state.username}
                                ref={this.usernameField}
                                placeholder="Name"
                                placeholderTextColor={this.state.usernameValidated ? "gray" : "rgb(200,50,50)"}
                                style={styles.standardInput}
                                onChangeText={this.handleUsername}
                                autoCapitalize = 'none'
                            />
                        </View>
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
                                value={this.state.payemail}
                                ref={this.payemailField}
                                placeholder="PayPal Email"
                                placeholderTextColor={this.state.payemailValidated ? "gray" : "rgb(200,50,50)"}
                                style={styles.standardInput}
                                onChangeText={this.handlePayemail}
                                autoCapitalize = 'none'
                                keyboardType='email-address'
                            />
                        </View>
                        <View style={styles.rowItem}>
                            <TextInput style={styles.input}
                                value={this.state.phone}
                                ref={this.phoneField}
                                placeholder="Phone Number"
                                placeholderTextColor={this.state.phoneValidated ? "gray" : "rgb(200,50,50)"}
                                style={styles.standardInput}
                                onChangeText={this.handlePhone}
                                autoCapitalize = 'none'
                                keyboardType='phone-pad'
                            />
                        </View>
                        <View style={styles.rowItem}>
                            <TextInput style={styles.input}
                                value={this.state.password1}
                                ref={this.password1Field}
                                placeholder="Password"
                                placeholderTextColor={this.state.passwordValidated ? "gray" : "rgb(200,50,50)"}
                                style={styles.standardInput}
                                secureTextEntry={true}
                                onChangeText={this.handlePassword1}
                                autoCapitalize = 'none'
                            />
                        </View>
                        <View style={styles.rowItem}>
                            <TextInput style={styles.input}
                                value={this.state.password2}
                                ref={this.password2Field}
                                placeholder="Confrim Password"
                                placeholderTextColor="gray"
                                style={styles.standardInput}
                                secureTextEntry={true}
                                onChangeText={this.handlePassword2}
                                autoCapitalize = 'none'
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <TouchableOpacity onPress={this.doRegister} style={styles.standardButton}>
                                <Text style={styles.standardText}>REGISTER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <TouchableOpacity onPress={this.goLogin} style={styles.goButton}>
                                <Text style={styles.standardText}>GO LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
