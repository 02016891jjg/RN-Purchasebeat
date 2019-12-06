import React, { Component } from 'react'
import {
    Image,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    PermissionsAndroid,
    Alert,
    ToastAndroid,
    AsyncStorage,
} from 'react-native'
import RNFetchBlob from "rn-fetch-blob";
import AntIcon from 'react-native-vector-icons/AntDesign';
import { MusicBarLoader } from 'react-native-indicator';
import SideMenu from 'react-native-side-menu';
import PayPal from 'react-native-paypal-wrapper';
import NavigationService from '../../../NavigationService';

import BeatSmall from '../BeatSmall/BeatSmall'
import { API_URL } from '../../config/constants'
import { BEAT_URL } from '../../config/constants'
import { PRODUCER_URL } from '../../config/constants'
import SoundPlayer from '../UI/SoundPlayer/SoundPlayer'
import Menu from '../UI/SlideMenu/SlideMenu';

import logoImage from '../../assets/images/loginlogo.png'
import logoBackImage from '../../assets/images/logo_back.png'
import blueHeaderbackImage from '../../assets/images/blue_header_back.png'
import slideButtonBackImage from '../../assets/images/slide_button_back.png'
import backgroundImage from '../../assets/images/background.png'
import producerImage from '../../assets/images/producer.png'
import styles from './Artist.styles';

export default class Artist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            producerInfo : {},
            isLoading : true,
            listSource: [],
            canPlay: true,
            isPlayingBeat: {},
            progress: 0,
            loading: false,
            isOpen: false,
            token : '',
            soundLoadSuccess : true,
        }
        this.prevTimeStamp = 0;
        this.onPlayBeat = this.onPlayBeat.bind(this);
        this.onPlayPrevBeat = this.onPlayPrevBeat.bind(this);
        this.onPlayNextBeat = this.onPlayNextBeat.bind(this);
        this.onVote = this.onVote.bind(this);
        this.onDownload = this.onDownload.bind(this);
        this.updateMenuState = this.updateMenuState.bind(this);
        this.toggle = this.toggle.bind(this);
        this.child = React.createRef();
        this.onHideMenu = this.onHideMenu.bind(this);
        this.onSoundLoadSuccess = this.onSoundLoadSuccess.bind(this);
        this.goPaypal = this.goPaypal.bind(this);

        this.child = React.createRef();
    }

    componentDidMount = async() => {
        this.state.token = await getToken();
            if(!this.state.token)
                NavigationService.navigate('Login');
        var artistId = this.props.navigation.getParam('producerId');
        //var producerId = 77;
        //SEND REQUEST TO API SERVER
        fetch(API_URL + 'artists/' + artistId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': this.state.token,
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    var beatArray = json.artist, tempArray = [];
                    for (var i = 0; i < beatArray.length; i++) {
                        if (beatArray[i].pbs_status == "Active") {
                            tempArray.push({
                                "index": i,
                                "id": beatArray[i].pbs_id,
                                "beatTitle": beatArray[i].pbs_title,
                                "producerId" : beatArray[i].pbp_prod_id,
                                "producerName": beatArray[i].pbp_name,
                                "price": beatArray[i].pbs_price,
                                "fileName": beatArray[i].pbs_tagfile,
                                "vote": beatArray[i].vote,
                                "producerImage": beatArray[i].pbp_thumb,
                                "duration" : beatArray[i].pbs_duration,
                                "downloaded": beatArray[i].download_id,
                            });
                        }
                    }
                    this.setState({
                        listSource: tempArray,
                        isLoading: false,
                        producerInfo : beatArray[0],
                        soundLoadSuccess : true
                    });
                    this.onPlayBeat(0);
                }

            })
            .catch((error) => {
                console.log(error);
            });
        ///////////////////////////////////
    }

    async goPaypal() {
        PayPal.initialize(PayPal.PRODUCTION, 'AYPiouJwJOumdaW8cnsXYawvH3WexVlXZiUI1MyLsGgmM2jbevYs2lP4FZya8fmvTs7Bm04FsWrbJVIS'); // 3 enviroments - NO_NETWORK, SANDBOX, PRODUCTION
        PayPal.pay({
          price: this.state.isPlayingBeat.price,
          currency: 'USD',
          description: 'Buy ' + this.state.isPlayingBeat.beatTitle,
        }).then(confirm => {
            //SEND REQUEST TO API SERVER
            fetch(API_URL + 'downloadbeat/' + this.state.isPlayingBeat.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'token': this.state.token,
                }
            })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    this.state.isPlayingBeat.downloaded = '123456';
                    this.state.listSource[this.state.isPlayingBeat.index].downloaded = "123456";
                }
            })
            .catch((error) => {
                console.log(error);
            });
            ///////////////////////////////////
            this.actualDownload();
        })
        .catch(error => console.log(error));
    }

    onSoundLoadSuccess () {
        this.setState({
            soundLoadSuccess : true
        });
    }

    onPlayBeat = (index) => {
        if(!this.state.soundLoadSuccess)
            return;
        var curTimestamp = (new Date).valueOf();
        if (curTimestamp - this.prevTimeStamp < 1000 || index == this.state.isPlayingBeat.index)
            return;
        this.prevTimeStamp = curTimestamp;
        this.setState({
            isPlayingBeat: this.state.listSource[index],
            soundLoadSuccess: false
        },() => {
            this.child.current.setDefault();
        });
    }

    onPlayPrevBeat = () => {
        let curIndex = this.state.isPlayingBeat.index;
        if (curIndex == 0)
            return;
        this.onPlayBeat(curIndex - 1);
    }

    onPlayNextBeat = () => {
        let curIndex = this.state.isPlayingBeat.index;
        if (curIndex == (this.state.listSource.length - 1))
            return;
        this.onPlayBeat(curIndex + 1);
    }

    onVote = () => {
        if (this.state.isPlayingBeat.vote != null)
            return;
        console.log(this.state.isPlayingBeat.id);
        //SEND REQUEST TO API SERVER
        fetch(API_URL + 'votebeat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': this.state.token,
            },
            body: JSON.stringify({
                beat_id: this.state.isPlayingBeat.id,
                vote: 5,
            })
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    this.state.listSource[this.state.isPlayingBeat.index].vote = 5;
                    this.setState({
                        isPlayingBeat: this.state.listSource[this.state.isPlayingBeat.index],
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        ///////////////////////////////////
    }

    actualDownload = () => {
        ToastAndroid.showWithGravityAndOffset(
            'The file downloaded to DownLoads folder!\n Just Minutes...',
            ToastAndroid.LONG, //can be SHORT, LONG
            ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
            25, //xOffset
            50 //yOffset
        );
        this.setState({
            progress: 0,
            loading: true
        });
        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob.config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            path: dirs.DownloadDir + "/" + this.state.isPlayingBeat.fileName,
            fileCache: true
        })
            .fetch(
                "GET",
                BEAT_URL + this.state.isPlayingBeat.fileName,
                {
                    //some headers ..
                }
            )
            .progress((received, total) => {
                console.log("progress", received / total);
                this.setState({ progress: received / total });
            })
            .then(res => {
                this.setState({
                    progress: 100,
                    loading: false
                });
            });
    };

    async onDownload() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Storage Permission",
                    message: "App needs access to memory to download the file "
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                if(this.state.isPlayingBeat.downloaded) {
                    this.actualDownload();
                    return;
                }
                Alert.alert(
                    'Download Beats',
                    'This beat price is $' + this.state.isPlayingBeat.price + '\nDo you want to buy this beats?',
                    [
                        { text: 'YES', onPress: () => { this.goPaypal() } },
                        { text: 'NO', style: 'cancel' },
                    ]
                );
            } else {
                Alert.alert(
                    "Permission Denied!",
                    "You need to give storage permission to download the file"
                );
            }
        } catch (err) {
            console.warn(err);
        }
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
        this.child.current.clearSound();
        this.setState({
            isOpen: false,
        });
    }

    render() {
        const items = [];
        var list = this.state.listSource;
        for (var i = 0; i < list.length; i++) {
            items.push(
                <BeatSmall key={i}
                    index={i}
                    beatTitle={list[i].beatTitle}
                    producerId={list[i].producerId}
                    producerName={list[i].producerName}
                    price={list[i].price}
                    backgroundColor={(i % 2 == 0) ? 'rgb(48,43,56)' : 'rgb(21,17,29)'}
                    onPlayBeat={(index) => { this.onPlayBeat(index) }}
                    onShowProducer={(index) => {}}
                    isPlaying={i == this.state.isPlayingBeat.index ? true : false}
                    isBuyed={false}
                />
            )
        }
        const menu = <Menu onHideMenu={this.onHideMenu} soundLoadSuccess={this.state.soundLoadSuccess}/>;
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
                                <Text style={styles.headerText}>ARTIST</Text>
                            </View>
                        </View>
                    </View>
                    {this.state.isLoading &&
                        <View style={styles.loadingBox}>
                            <MusicBarLoader
                                color='rgb(68,220,168)'
                                barWidth={10}
                                barHeight={50}
                                betweenSpace={5}
                            />
                            <Text style={styles.loadingText}>Loading</Text>
                        </View>
                    }
                    {!this.state.isLoading &&
                        <View style={styles.bodyBox}>
                            <View style={styles.producerBox}>
                                <View style={styles.producerImageBox}>
                                    <Image style={styles.backgroundImage} source={this.state.producerInfo.pbp_thumb !=='undefined'?{uri : PRODUCER_URL + this.state.producerInfo.pbp_thumb}:{uri:''}} />
                                </View>
                                <View style={styles.producerDescriptionBox}>
                                    <Text style={styles.DescriptionTitleText}>{this.state.producerInfo.pbp_name}</Text>
                                    <Text style={styles.DescriptionBodyText}>{this.state.producerInfo.pbp_country}</Text>
                                    <Text style={styles.DescriptionBodyText}>City :{this.state.producerInfo.pbp_city} </Text>
                                    <Text style={styles.DescriptionBodyText}>State : {this.state.producerInfo.pbp_state}</Text>
                                </View>
                            </View>
                            <ScrollView style={styles.listBodyBox}>
                                {items}
                            </ScrollView>
                        </View>
                    }
                    {!this.state.isLoading &&
                        <SoundPlayer
                            beatInfo={this.state.isPlayingBeat}
                            onPlayPrevBeat={this.onPlayPrevBeat}
                            onPlayNextBeat={this.onPlayNextBeat}
                            onVote={this.onVote}
                            onDownload={this.onDownload}
                            onShowProducer={(index) => {}}
                            ref={this.child}
                            onSoundLoadSuccess={() => {this.onSoundLoadSuccess()}}
                            ref={this.child}
                        />
                    }
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
