import React, { Component } from 'react'
import { Image, View, TextInput, TouchableOpacity, Text } from 'react-native'

import styles from './Beat.styles';
import { PRODUCER_URL } from '../../config/constants'
import avatarImage from '../../assets/images/avatar.png'

export default class Beat extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <TouchableOpacity  onPress={() => {this.props.onPress(this.props.index)}} activeOpacity={.5}>
                <View style={styles.container}>
                    <View style={styles.imageBox}>
                        <Image style = {styles.imageArea} resizeMode={'stretch'} source={{uri : PRODUCER_URL + this.props.imageName}}/>
                    </View>
                    <View style={styles.bodyBox}>
                        <Text style={styles.titleText}>{this.props.title}</Text>
                        <Text style={styles.descriptionText} numberOfLines={1}>{this.props.description}</Text>
                        <View style={styles.buyBox}>
                            <View style={styles.buyValueBox}>
                                <Text style={styles.valueText}>
                                    {this.props.price + '$'}
                                </Text>
                            </View>
                            <View style={styles.buyBuyBox}>
                                <Text style={styles.buy1Text}>
                                    BUY
                                    <Text style={styles.buy2Text}>  $</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
