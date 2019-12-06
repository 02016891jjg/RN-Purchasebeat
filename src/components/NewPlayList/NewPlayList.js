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
import NavigationService from '../../../NavigationService';
import SideMenu from 'react-native-side-menu';
import { MusicBarLoader } from 'react-native-indicator';
import { withNavigation } from "react-navigation";
import { requestOneTimePayment } from 'react-native-paypal';
// import axios from 'axios';
// import utf8 from 'utf8'
// import base64 from 'base-64'
import PayPal from 'react-native-paypal-wrapper';

import { API_URL } from '../../config/constants'
import { BEAT_URL } from '../../config/constants'
import BeatSmall from '../BeatSmall/BeatSmall'
import SoundPlayer from '../UI/SoundPlayer/SoundPlayer'
import Menu from '../UI/SlideMenu/SlideMenu';

import logoImage from '../../assets/images/loginlogo.png'
import logoBackImage from '../../assets/images/logo_back.png'
import blueHeaderbackImage from '../../assets/images/blue_header_back.png'
import slideButtonBackImage from '../../assets/images/slide_button_back.png'
import backgroundImage from '../../assets/images/background.png'
import styles from './NewPlayList.styles';

class NewPlayList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            canPlay: true,
            isPlayingBeat: {},
            listSource: [],
            progress: 0,
            loading: false,
            token: '',
            isOpen: false,
            soundLoadSuccess: true,
            paypal_token: '',
            noMatch : false,
        }
        this.prevTimeStamp = 0;
        this.onPlayBeat = this.onPlayBeat.bind(this);
        this.onShowProducer = this.onShowProducer.bind(this);
        this.onPlayPrevBeat = this.onPlayPrevBeat.bind(this);
        this.onPlayNextBeat = this.onPlayNextBeat.bind(this);
        this.onVote = this.onVote.bind(this);
        this.onDownload = this.onDownload.bind(this);
        this.onHideMenu = this.onHideMenu.bind(this);
        this.updateMenuState = this.updateMenuState.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onSoundLoadSuccess = this.onSoundLoadSuccess.bind(this);
        this.goPaypal = this.goPaypal.bind(this);

        this.child = React.createRef();
    }

    componentDidMount = () => {
        // var binaryToBase64 = require('binaryToBase64');

        // var paypal_username = "AeEXLoKWjlmCU4LtN0_o2S6O-Dz2hLpF7OoMp3U9kl45E9Uf75xLYcLPnrLAM78vC4YgeRcCn8D3sAW9";
        // var paypal_pwd = "EOz8XejVHiRTG0_QheSejr-HEwHRWE45za83FgfZRuE1oc5Y3rcyPVNx0QbYQ2ZxO8ZajJq52LT4X95U";
        // var paypal_authToBytes = paypal_username + ":" + paypal_pwd;
        // var paypal_bytes = utf8.encode(paypal_authToBytes);
        // var paypal_encoded = base64.encode(paypal_bytes);
        // const Paypal_HEADER_ENCODED = paypal_encoded;

        // url = "https://api.sandbox.paypal.com/v1/oauth2/token";
        // let details = {
        //     'grant_type': 'client_credentials'
        // };

        // let formBody = [];
        // for (let property in details) {
        //     let encodedKey = encodeURIComponent(property);
        //     let encodedValue = encodeURIComponent(details[property]);
        //     formBody.push(encodedKey + "=" + encodedValue);
        // }
        // formBody = formBody.join("&");
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': 'Basic ' + Paypal_HEADER_ENCODED,
        //         'Content-Type': 'application/x-www-form-urlencoded'
        // },
        //     body: formBody
        // })
        // .then(res => res.json())
        // .then(resJson => {
        //     this.setState({
        //         paypal_token: resJson.access_token
        //     });
        //     console.log(resJson.access_token);

        // }).catch(error => {
        //     console.log(error);
        // });

        // axios.post('https://api.sandbox.paypal.com/v1/oauth2/token',
        //     {
        //         "grant_type": "client_credentials"
        //     },
        //     {
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //             'Authorization': 'Basic QVdCYU0zRldRYUN5Y3QwbWczQ05tMGg3RjhvaW1GVzdVZjlodTlvRHh4VV9vT09BTUJ1NWFkSnBGVURRc0ZjQVNWZVFCcGNndm9QQTFqMmU6RUlhU2tIVENQYmFRVlowZXM0VGljMXM1TTAtNHc0Q3ZaU3pycUZPTEhRWG5zUWRYSEFVTlFTSVU2OG5BNTRYaXBseE9EVlo1M0lGQW1HSFM='
        //         }
        //     }
        // )
        // .then(response => {
        //     console.log("TOKEN",response.data.access_token);
        // }).catch(err => {
        //     console.log("ERROR",{ ...err })
        // });
        
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", async () => {
            this.state.token = await getToken();
            this.setState({
                isLoading: true,
                soundLoadSuccess: true
            });
            if (!this.state.token)
                NavigationService.navigate('Login');

            var method = this.props.navigation.getParam('method');
            if (method == 'SearchBeats') {
                var beatTitle = this.props.navigation.getParam('beatTitle');
                var producerName = this.props.navigation.getParam('producerName');
                var genre = this.props.navigation.getParam('genre');
                var priceValue = this.props.navigation.getParam('priceValue');
                var sortBy = this.props.navigation.getParam('sortBy');

                //SEND REQUEST TO API SERVER
                fetch(API_URL + 'searchbeats', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'token': this.state.token,
                    },
                    body: JSON.stringify({
                        pbs_title: beatTitle,
                        pbs_prod_name: producerName,
                        pbs_genre: genre,
                        pbs_price_min: priceValue[0],
                        pbs_price_max: priceValue[1],
                        sort_by: sortBy == '' ? 1 : sortBy
                    })
                })
                    .then(response => response.json())
                    .then(json => {
                        if (json.success) {
                            var beatArray = json.beats, tempArray = [];
                            if(beatArray.length == 0) {
                                this.setState({
                                    noMatch : true,
                                    isLoading: false,
                                });
                            } else {
                                for (var i = 0; i < beatArray.length; i++)
                                    if (beatArray[i].pbg_status == "Active")
                                        tempArray.push({
                                            "index": i,
                                            "id": beatArray[i].pbs_id,
                                            "beatTitle": beatArray[i].pbs_title,
                                            "producerId": beatArray[i].pbs_prod_id,
                                            "producerName": beatArray[i].pbp_name,
                                            "price": beatArray[i].pbs_price,
                                            "fileName": beatArray[i].pbs_tagfile,
                                            "vote": beatArray[i].vote,
                                            "producerImage": beatArray[i].pbp_thumb,
                                            "duration": beatArray[i].pbs_duration,
                                            "downloaded": beatArray[i].download_id,
                                        });
                                this.setState({
                                    listSource: tempArray,
                                    isLoading: false,
                                    noMatch: false,
                                });
                                this.onPlayBeat(0);
                            }
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                ///////////////////////////////////
            } 

            else if (method == 'NewBeatList') {
                 var selIndex = this.props.navigation.getParam('selIndex');
                //SEND REQUEST TO API SERVER
                fetch(API_URL + 'newbeatlist', {
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
                            var beatArray = json.beats, tempArray = [];
                            for (var i = 0; i < beatArray.length; i++)
                                tempArray.push({
                                    "index": i,
                                    "id": beatArray[i].pbs_id,
                                    "beatTitle": beatArray[i].pbs_title,
                                    "producerId": beatArray[i].pbp_id,
                                    "producerName": beatArray[i].pbp_name,
                                    "price": beatArray[i].pbs_price,
                                    "fileName": beatArray[i].pbs_tagfile,
                                    "vote": null,
                                    "duration": beatArray[i].pbs_duration,
                                    "producerImage": beatArray[i].pbp_thumb,
                                    "downloaded": beatArray[i].download_id,
                                });
                            this.setState({
                                listSource: tempArray,
                                isLoading: false,
                            });
                            this.onPlayBeat(selIndex);
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            
            else {
                var selIndex = this.props.navigation.getParam('selIndex');
                //SEND REQUEST TO API SERVER
                fetch(API_URL + 'newsonglist', {
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
                            var beatArray = json.beats, tempArray = [];
                            for (var i = 0; i < beatArray.length; i++)
                                tempArray.push({
                                    "index": i,
                                    "id": beatArray[i].pbs_id,
                                    "beatTitle": beatArray[i].pbs_title,
                                    "producerId": beatArray[i].pbp_id,
                                    "producerName": beatArray[i].pbp_name,
                                    "price": beatArray[i].pbs_price,
                                    "fileName": beatArray[i].pbs_tagfile,
                                    "vote": null,
                                    "duration": beatArray[i].pbs_duration,
                                    "producerImage": beatArray[i].pbp_thumb,
                                    "downloaded": beatArray[i].download_id,
                                });
                            this.setState({
                                listSource: tempArray,
                                isLoading: false,
                            });
                            this.onPlayBeat(selIndex);
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    }

    onSoundLoadSuccess() {
        this.setState({
            soundLoadSuccess: true
        });
    }

    onPlayBeat = (index) => {
        if (!this.state.soundLoadSuccess)
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

    onShowProducer = (index) => {
        var method = this.props.navigation.getParam('method');
        if (!this.state.soundLoadSuccess)
            return;
        this.child.current.clearSound();

        if (method == 'NewBeatList'){
                NavigationService.navigate('Producer', {
                producerId: index
                });
        }
        else{
              NavigationService.navigate('Artist', {
                producerId: index
              });
        }
      
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
                console.log(json);
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

    actualDownload = () => {
        ToastAndroid.showWithGravityAndOffset(
            'The file downloaded to DownLoads folder!\n Just Minutes...',
            ToastAndroid.LONG, //can be SHORT, LONG
            ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
            25, //xOffset
            50 //yOffset
        );
        console.log(BEAT_URL + this.state.isPlayingBeat.fileName);
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
                // ToastAndroid.showWithGravityAndOffset(
                //     'The file downloaded to DownLoads folder!\n Just Minutes...',
                //     ToastAndroid.LONG, //can be SHORT, LONG
                //     ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
                //     25, //xOffset
                //     50 //yOffset
                // );
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
                //this.actualDownload();
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

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onHideMenu(pageName) {
        if(!(Object.keys(this.state.isPlayingBeat).length === 0 && this.state.isPlayingBeat.constructor === Object))
            this.child.current.clearSound();
        this.setState({ isOpen: false });
    }

    render() {
        const menu = <Menu page="NewPlayList" soundLoadSuccess={this.state.soundLoadSuccess} onHideMenu={this.onHideMenu} />;
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
                    onShowProducer={(index) => this.onShowProducer(index)}
                    isPlaying={i == this.state.isPlayingBeat.index ? true : false}
                    isBuyed={false}
                />
            )
        }
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
                                <Text style={styles.headerText}>New Play List</Text>
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
                    {(!this.state.isLoading && this.state.noMatch) &&
                        <View style={styles.loadingBox}>
                            <Text style={styles.loadingText}>No items match your search.</Text>
                        </View>
                    }
                    {!this.state.isLoading &&
                        <View style={styles.bodyBox}>
                            <ScrollView style={styles.listBodyBox}>
                                {items}
                            </ScrollView>
                        </View>
                    }
                    {(!this.state.isLoading && !this.state.noMatch) &&
                        <SoundPlayer
                            beatInfo={this.state.isPlayingBeat}
                            onPlayPrevBeat={this.onPlayPrevBeat}
                            onPlayNextBeat={this.onPlayNextBeat}
                            onVote={this.onVote}
                            onDownload={this.onDownload}
                            onShowProducer={(index) => this.onShowProducer(index)}
                            onSoundLoadSuccess={() => { this.onSoundLoadSuccess() }}
                            ref={this.child}
                        />
                    }
                </View>
            </SideMenu>
        );
    }
}

export default withNavigation(NewPlayList);

const getToken = async () => {
    let token = '';
    try {
        token = await AsyncStorage.getItem('token');
    } catch (error) {
        console.log(error.message);
    }
    return token;
}
