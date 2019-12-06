import React, { Component } from 'react'
import { Image, View, TextInput, TouchableOpacity, Text , AsyncStorage} from 'react-native'
import Toast from 'react-native-whc-toast'
import { Dropdown } from 'react-native-material-dropdown';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SideMenu from 'react-native-side-menu';
import AntIcon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker'

import NavigationService from '../../../NavigationService'
import Menu from '../UI/SlideMenu/SlideMenu';

import { API_URL , PRODUCER_URL } from '../../config/constants'
import logoImage from '../../assets/images/loginlogo.png'
import logoBackImage from '../../assets/images/logo_back.png'
import slideButtonBackImage from '../../assets/images/slide_button_back.png'
import blueHeaderbackImage from '../../assets/images/blue_header_back.png'
import backgroundImage from '../../assets/images/background.png'
import styles from './Profile.styles';

export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            payemail: '',
            password1: '',
            password2: '',
            phone: '',
            usernameValidated: true,
            emailValidated: true,
            payemailValidated: true,
            phoneValidated: true,
            passwordValidated: true,
            ImageSource: null,
            data: null,
            isOpen : false,
            token : '',
            toast : 'success',
        }
        //Input Box Functions
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePayemail = this.handlePayemail.bind(this);
        this.handlePassword1 = this.handlePassword1.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.doRegister = this.doRegister.bind(this);
        this.validatePassword = this.validatePassword.bind(this);

        this.usernameField = React.createRef();
        this.emailField = React.createRef();
        this.payemailField = React.createRef();
        this.password1Field = React.createRef();
        this.password2Field = React.createRef();
        //Side Menu Bar Functions
        this.updateMenuState = this.updateMenuState.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onHideMenu = this.onHideMenu.bind(this);

        this.child = React.createRef();
    }

    componentDidMount = async () => {
        this.state.token = await getToken();
            if(!this.state.token)
                NavigationService.navigate('Login');
        //SEND REQUEST TO API SERVER
        fetch(API_URL + 'getprofile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token' : this.state.token,
            },
        })
        .then(response => response.json())
        .then(json => {
            if(json.success){
                const preProfile = json.profile;
                this.setState({
                    username : preProfile.pbp_name,
                    email : preProfile.pbp_email,
                    payemail: preProfile.pbp_paypal_email,
                    phone : preProfile.pbp_phone,
                    imageName : preProfile.pbp_thumb,
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
        ///////////////////////////////////
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    onHideMenu() {
        this.setState({
            isOpen: false,
        });
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

    handleUsername(uname) {
        this.setState({ username: uname });
    }

    handleEmail(eml) {
        this.setState({ email: eml });
    }

    handlePayemail(eml) {
        this.setState({ payemail: eml });
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
        if (this.state.password1 != this.state.password2)
            return false;
        return true;
    }

    doRegister() {
        var temp = this.uploadImageToServer();
        const uploadFileName = (temp == '' ? this.state.imageName : temp);
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
        if (!this.validatePassword()) {
            this.setState({ passwordValidated: false, password1: '', password2: '' });
            this.password1Field.current.focus();
            return;
        }
        console.log(this.state.password1);
        //SEND REQUEST TO API SERVER
        fetch(API_URL + 'updateprofile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token' : this.state.token,
            },
            body: JSON.stringify({
                fullname: this.state.username,
                username: this.state.username,
                email: this.state.email,
                paypal_email: this.state.payemail,
                password: this.state.password1,
                phone: this.state.phone,
                image : uploadFileName,
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.success){
                this.setState({
                    imageName : uploadFileName,
                    toast : 'success',
                });
                this.refs.toast.show('Success!');
                this.child.current.setImage(uploadFileName);
            }
            else{
                this.setState({
                    toast : 'error'
                });
                this.refs.toast.show('Error Occurred!');
            }
            
        })
        .catch((error) => {
            console.log(error);
        });
        ///////////////////////////////////
    }

    render() {
        const menu = <Menu page="Profile" onHideMenu={this.onHideMenu} ref={this.child}/>;
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
                                <Text style={styles.headerText}>PROFILE</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodyBox}>
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
                                        {this.state.ImageSource ? 
                                            <Image style={styles.imageContainer} source={this.state.ImageSource} /> :
                                            (
                                                (this.state.imageName == " " || this.state.imageName == "") ?
                                                <Text style={styles.standardText}>Select a Photo</Text> :
                                                <Image style={styles.imageContainer} source={{uri : PRODUCER_URL + this.state.imageName}} />
                                            )
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
                                    <Text style={styles.standardText}>CHANGE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
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

