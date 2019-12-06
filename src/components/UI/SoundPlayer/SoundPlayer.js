import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { BEAT_URL, API_URL , PRODUCER_URL } from '../../../config/constants'
import Sound from 'react-native-sound'
import AntIcon from 'react-native-vector-icons/AntDesign';
import TextTicker from 'react-native-text-ticker'
import { LineDotsLoader } from 'react-native-indicator';

import styles from './SoundPlayer.styles';

export default class SoundPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seekPosition: [0],
            seekPositionChange: false,
            playState: 'play',
            canPlay : 'loading',
        }
        this.track = null;
        this.timer = null;
        this.seekPositionChangeStart = this.seekPositionChangeStart.bind(this);
        this.seekPositionChange = this.seekPositionChange.bind(this);
        this.seekPositionChangeFinish = this.seekPositionChangeFinish.bind(this);
        this.onPauseSound = this.onPauseSound.bind(this);
        this.onPlaySound = this.onPlaySound.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.setDefault = this.setDefault.bind(this);
        this.clearSound = this.clearSound.bind(this);
    }

    componentDidMount() {
    }

    clearSound() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.track) {
            this.track.release();
            //this.track = null;
        }
        this.state = {
            seekPosition: [0],
            seekPositionChange: false,
            playState: 'pause',
        }
    }

    setDefault() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.track) {
            this.track.release();
            //this.track = null;
        }
        this.setState({
            canPlay : 'loading'
        });
        var seconds = -100;
        console.log(this.props.beatInfo);
        if(this.props.beatInfo.duration) {
            var a = this.props.beatInfo.duration.split(':');
            seconds = (+a[0]) * 60 + (+a[1]);
        }
        const track = new Sound(BEAT_URL + this.props.beatInfo.fileName, null, (e) => {
        //const track = new Sound('http://192.168.200.226:7474/long.mp3', null, (e) => {
            if (e) {
                console.log('error loading track:', e)
                this.setState({
                    canPlay : 'errorPlay'
                });
                this.props.onSoundLoadSuccess();
            } else {
                this.track = track;
                this.track.play();
                this.setState({
                    playState: 'play',
                    duration: Math.max(seconds , this.track.getDuration()),
                    seekPosition: [0],
                    seekPositionChange: false,
                    canPlay : 'canPlay'
                });
                console.log("BEAT_INFO",this.state.duration);
                this.props.onSoundLoadSuccess();
                this.timer = setInterval(this.updateProgress, 500);
            }
        });
    }

    updateProgress = () => {
        if (this.state.playState != 'play' || this.state.seekPositionChange)
            return;
        this.track.getCurrentTime((seconds) => {
            if (seconds < this.state.duration) {
                let newValues = [0];
                newValues[0] = parseInt((seconds / this.state.duration) * 100);
                this.setState({
                    seekPosition: newValues,
                });
            } else {
                let newValues = [0];
                newValues[0] = 0;
                this.setState({
                    playState: 'pause',
                    seekPosition: newValues,
                });
            }
        });
    }

    onPauseSound = () => {
        if (this.state.playState != 'play')
            return;
        this.setState({
            playState: 'pause',
        });
        this.track.pause();
    }

    onPlaySound = () => {
        if (this.state.playState != 'pause')
            return;
        this.setState({
            playState: 'play',
        });
        this.track.play();
    }

    seekPositionChangeStart = () => {
        this.setState({
            seekPositionChange: true,
        });
    };

    seekPositionChange = values => {
        let newValues = [0];
        newValues[0] = values[0];
        this.setState({
            seekPosition: newValues,
        });
        this.track.setCurrentTime(this.state.duration * this.state.seekPosition / 100);
    };

    seekPositionChangeFinish = () => {
        this.setState({
            seekPositionChange: false,
        });
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.canPlay == 'loading' &&
                    <View style={styles.loadingBox}>
                        <Text style={styles.loadingText}>Please wait while loading beat file.</Text>
                        <LineDotsLoader
                            color='rgb(68,220,168)'
                            size={5}
                        />
                    </View>
                }
                {this.state.canPlay == 'errorPlay' &&
                    <View style={styles.loadingBox}>
                        <Text style={styles.invalidText}>Invalid beat file.</Text>
                    </View>
                }
                {this.state.canPlay == 'canPlay' &&
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity onPress={() => {this.props.onShowProducer(this.props.beatInfo.producerId)}} style={styles.avatarTouchContainer}>
                            <Image
                                style={styles.avatar}
                                source={{uri : PRODUCER_URL + this.props.beatInfo.producerImage}}
                            />
                            <Text style={styles.avatarName} numberOfLines={2}>{this.props.beatInfo.producerName}</Text>
                        </TouchableOpacity>
                    </View>
                }
                {this.state.canPlay == 'canPlay' &&
                    <View style={styles.progressContainer}>
                        <TextTicker
                            style={styles.avatarName}
                            duration={10000}
                            loop
                            bounce
                            repeatSpacer={20}
                            marqueeDelay={1000}
                        >
                            {this.props.beatInfo.fileName}
                        </TextTicker>
                        <MultiSlider
                            values={this.state.seekPosition}
                            sliderLength={200}
                            onValuesChangeStart={this.seekPositionChangeStart}
                            onValuesChange={this.seekPositionChange}
                            onValuesChangeFinish={this.seekPositionChangeFinish}
                            max={100}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this.props.onPlayPrevBeat}>
                                <AntIcon name="stepbackward" style={{ padding: 10 }} color="white" size={15} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.state.playState == 'pause' ? this.onPlaySound : this.onPauseSound}>
                                {this.state.playState == 'pause' ?
                                    <AntIcon name="caretright" style={{ padding: 10 }} color="white" size={20} />
                                    :
                                    <AntIcon name="pause" style={{ padding: 10 }} color="white" size={20} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.onPlayNextBeat}>
                                <AntIcon name="stepforward" style={{ padding: 10 }} color="white" size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {this.state.canPlay == 'canPlay' &&
                    <View style={styles.metaContainer}>
                        <TouchableOpacity onPress={this.props.onVote}>
                            <AntIcon name={this.props.beatInfo.vote ? 'like1' : 'like2'} style={{ padding: 10 }} color="white" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onDownload}>
                            <AntIcon name={this.props.beatInfo.downloaded ? 'clouddownload' : 'clouddownloado'} style={{ padding: 10 }} color="white" size={20} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}