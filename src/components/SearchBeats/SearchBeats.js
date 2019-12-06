import React, { Component } from 'react'
import { Image, View, TextInput, TouchableOpacity, Text , AsyncStorage} from 'react-native'
import Toast from 'react-native-whc-toast'
import { Dropdown } from 'react-native-material-dropdown';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SideMenu from 'react-native-side-menu';
import AntIcon from 'react-native-vector-icons/AntDesign';

import NavigationService from '../../../NavigationService'
import Menu from '../UI/SlideMenu/SlideMenu';

import { API_URL } from '../../config/constants'
import logoImage from '../../assets/images/loginlogo.png'
import logoBackImage from '../../assets/images/logo_back.png'
import slideButtonBackImage from '../../assets/images/slide_button_back.png'
import blueHeaderbackImage from '../../assets/images/blue_header_back.png'
import backgroundImage from '../../assets/images/background.png'
import styles from './SearchBeats.styles';

export default class SearchBeats extends Component {

    constructor(props) {
        super(props)
        this.state = {
            beatTitle: '',
            producerName: '',
            priceValue : [0,500],
            genre : '',
            sortBy : '',
            genreData: [],
            sortData: [
                { "id": 1, "value": "Price" },
                { "id": 2, "value": "Date" },
                { "id": 3, "value": "Producer" },
            ],
            token: '',
            isOpen : false,
        }
        this.handlebeatTitle = this.handlebeatTitle.bind(this);
        this.handleproducerName = this.handleproducerName.bind(this);
        this.priceValuesChange = this.priceValuesChange.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeSoryBy = this.onChangeSoryBy.bind(this);
        this.updateMenuState = this.updateMenuState.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onHideMenu = this.onHideMenu.bind(this);
    }

    componentDidMount = async() => {
        this.state.token = await getToken();
        if(!this.state.token)
            NavigationService.navigate('Login');
        //SEND REQUEST TO API SERVER
        fetch(API_URL + 'genre', {
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
                var generArray = json.genre , tempArray=[];
                for(var i = 0 ; i < generArray.length; i++)
                    if(generArray[i].pbg_status == "Active")
                        tempArray.push({"id" : generArray[i].pbg_id , "value" : generArray[i].pbg_name});
                this.setState({genreData : tempArray});
            }
        })
        .catch((error) => {
            console.log(error);
        });
        ///////////////////////////////////
    }

    handlebeatTitle(uname) {
        this.setState({
            beatTitle: uname
        });
    }

    handleproducerName(eml) {
        this.setState({ 
            producerName: eml
        });
    }

    onChangeGenre(value) {
        this.setState({
            genre: value,
        });
    }

    priceValuesChange = values => {
        this.setState({
            priceValue: values,
        });
    };

    onChangeSoryBy(value) {
        this.setState({
            sortBy: value,
        });
    }


    doSearch() {
        NavigationService.navigate('SearchedList' , {
            method : "SearchBeats",
            beatTitle : this.state.beatTitle,
            producerName : this.state.producerName,
            genre : this.state.genre,
            priceValue : this.state.priceValue,
            sortBy : this.state.sortBy
        });
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

    render() {
        const menu = <Menu page='SearchBeats' onHideMenu={this.onHideMenu}/>;
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
                                <Text style={styles.headerText}>SEARCH BEATS</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodyBox}>
                        <View style={styles.inputBox}>
                            <Toast
                                ref="toast"
                                style={styles.toast}
                                textStyle={styles.toastText}
                                position={Toast.Position.top}
                                fadeInDuration={300}
                                fadeOutDuration={300}
                                opacity={0.9}
                                positionValue={100}
                            />
                            <View style={styles.rowItem}>
                                <TextInput style={styles.input}
                                    value={this.state.beatTitle}
                                    ref={this.beatTitleField}
                                    placeholder="BeatTitle"
                                    placeholderTextColor="gray"
                                    style={styles.standardInput}
                                    onChangeText={this.handlebeatTitle}
                                    autoCapitalize = 'none'
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <TextInput style={styles.input}
                                    value={this.state.producerName}
                                    ref={this.producerNameField}
                                    placeholder="ProducerName"
                                    placeholderTextColor="gray"
                                    style={styles.standardInput}
                                    onChangeText={this.handleproducerName}
                                    autoCapitalize = 'none'
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <Dropdown
                                    label='Genre'
                                    data={this.state.genreData}
                                    baseColor='rgb(255,255,255)'
                                    textColor='white'
                                    selectedItemColor='black'
                                    onChangeText = {value => this.onChangeGenre(value)}
                                />
                            </View>
                            <View style={styles.rowPriceItem}>
                                <Text style={styles.standardText}>Price {this.state.priceValue[0]} - {this.state.priceValue[1]}</Text>
                                <MultiSlider
                                    values={this.state.priceValue}
                                    onValuesChange={this.priceValuesChange}
                                    min={0}
                                    max={500}
                                    step={1}
                                    allowOverlap
                                    snapped
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <Dropdown
                                    label='Sort By'
                                    data={this.state.sortData}
                                    baseColor='rgb(255,255,255)'
                                    textColor='white'
                                    selectedItemColor='black'
                                    onChangeText = {value => this.onChangeSoryBy(value)}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.rowItem}>
                                <TouchableOpacity onPress={this.doSearch} style={styles.standardButton}>
                                    <Text style={styles.standardText}>Search</Text>
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

