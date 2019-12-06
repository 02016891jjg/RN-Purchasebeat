import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './BeatSmall.styles';

export default class BeatSmall extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.props.backgroundColor }]}>
                <View style={styles.titleBox}>
                    <TouchableOpacity onPress={() => { this.props.onPlayBeat(this.props.index) }}>
                        <Text style={styles.titleText} numberOfLines={1}>{this.props.beatTitle}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.producerNameBox}>
                    <TouchableOpacity onPress={() => { this.props.onShowProducer(this.props.producerId) }}>
                        <Text style={styles.nameText}>{this.props.producerName}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buyBox}>
                    <TouchableOpacity onPress={() => { this.props.onPlayBeat(this.props.index) }}>
                        <AntIcon
                            name="caretright"
                            color={this.props.isPlaying ? 'rgb(79,243,187)' : 'white'}
                            size={16}
                        />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => {}}>
                        <AntIcon
                            name="shoppingcart"
                            color={ this.props.isBuyed ? 'rgb(79,243,187)' : 'white'}
                            size={16}
                            style={{paddingLeft : 20}}
                        />
                    </TouchableOpacity> */}
                </View>
            </View>
        );
    }
}
