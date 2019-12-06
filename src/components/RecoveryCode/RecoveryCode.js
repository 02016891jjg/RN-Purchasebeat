import React, { Component } from 'react'
import { Image, View, TextInput, TouchableOpacity, Text } from 'react-native'
import NavigationService from '../../../NavigationService';

import logoImage from '../../assets/images/loginlogo.png'
import styles from './RecoveryCode.styles';

export default class RecoveryCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recoverycode: '',
            recoverycodeValidated : true,
        }
        this.handleRecoverycode = this.handleRecoverycode.bind(this);
        this.doContinue = this.doContinue.bind(this);

        this.recoverycodeField = React.createRef();
    }

    handleRecoverycode(text) {
        this.setState({recoverycode : text});
    }

    validateRecoverycode(text) {
        if(text == '')
            return false;
        return true;
    }
    
    doContinue() {
        var recoverycode  = this.state.recoverycode;
        if(!this.validateRecoverycode(recoverycode)) {
            this.setState({recoverycodeValidated : false , recoverycode : ''});
            this.recoverycodeField.current.focus();
            return;
        }
        this.setState({
            recoverycode: '',
            recoverycodeValidated : true,
        });
        this.recoverycodeField.current.focus();
        NavigationService.navigate('ResetPassword');
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
                                RECOVERY CODE
                            </Text>
                            <Text style={styles.commentText}>
                                Enter your Recovery code and reset your password.
                            </Text>
                        </View>
                        <View style = {styles.row}>
                            <View style={styles.rowItem}>
                                <TextInput style={styles.input}
                                    value={this.state.recoverycode}
                                    ref={this.recoverycodeField}
                                    placeholder="Recovery Code"
                                    placeholderTextColor={this.state.recoverycodeValidated ? "gray" : "rgb(200,50,50)"}
                                    style={styles.standardInput}
                                    onChangeText={this.handleRecoverycode} />
                            </View> 
                            <View style={styles.rowItem}>
                                <TouchableOpacity onPress={this.doContinue} style={styles.standardButton}>
                                    <Text style={styles.standardText}>CHECK</Text>
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
