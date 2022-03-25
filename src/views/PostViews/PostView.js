import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Linking
} from 'react-native';
import ExternalLink from "../ExternalLink";
//Config
import RBSheet from "react-native-raw-bottom-sheet"; // Bottom Modal
//Components
import ListImage from '../../components/ListImage';
import styles from './style';
import globalStyle from '../../Styles/globalStyle';
import CategoryName from '../../components/CategoryName';
import { RightImageCard } from '../../components/index';
//Store
import { observer, inject } from 'mobx-react';
//Packages
import color from '../../config/color';
import language from '../../config/language';
import { createStackNavigator } from '@react-navigation/stack';

@inject('TextStore', 'PostDetailStore', 'PostListStore')
@observer
export default class PostView extends Component {

    state = {
        postData: [],
        sliderData: [],
        firstLoading: true,
        numColumns: 1,
        cardType: 1,
        page: 1,
        isLoading: false,
        dataStatus: true,
        isRefreshing: false,
        adsNumber: 0,
    };

    componentDidMount() {
        this.props.PostListStore.getPostData(1, 'Home');
        this.LoadCardDesign();
    };

    goToCategory = () => {
        const { PostDetailStore } = this.props;

        if (PostDetailStore.routeName === 'CategoryStack')
            this.props.navigation.navigate('Category View')
        else
            this.props.navigation.navigate('Category', { screen: 'Category View' });
    }

    LoadCardDesign = async () => {
        try {
            let cardDesign = await AsyncStorage.getItem('cardDesign');
            cardDesign = JSON.parse(cardDesign);

            this.setState({
                cardType: cardDesign.style,
                numColumns: cardDesign.column,
            })
        } catch (error) {
            //Default Card Design
        }
    };

    //numColumns state update for FlatList grid design change
    ChangeGrid = (gridStlye, columnNumber) => {

        this.setState({
            numColumns: columnNumber,
            cardType: gridStlye,
        })

        let cardDesign = {
            style: gridStlye,
            column: columnNumber,
        };

        AsyncStorage.setItem('cardDesign', JSON.stringify(cardDesign));
    };

    //#region Post Data Processes
    loadMoreData = () => {
        const { PostListStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                PostListStore.isFirstLoading = false;
                PostListStore.getPostData(this.state.page, 'Home')
            }
        })
    };

    onRefresh = () => {
        const { PostListStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                PostListStore.isFirstLoading = true;
                PostListStore.getPostData(this.state.page, 'Home', 'refresh')
            }
        })
    };
    //#endregion

    //#region  FlatList - Slider,Grid -  and Header Processes
    Slider = () => {
        const { PostListStore } = this.props;
        return (
            <View>

                <FlatList
                    renderItem={this.renderSliderData}
                    data={PostListStore.sliderData}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    pagingEnabled={true}
                    persistentScrollbar={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    };

    renderSliderData = (item, index) => {
        const { TextStore } = this.props;
        // var str = JSON.stringify(item);
        // console.log('items details' + str);
        return (
            <TouchableOpacity key={index} style={styles.sliderItemAreas} onPress={() => this.goToDetail(item)}>
                <ListImage style={styles.sliderImage} mediaId={item.item.featured_media} imageHeight={250} borderRadius={20} />
                <Image style={styles.imageCover} source={require('../../img/slider-cover.png')} />
                <View style={styles.sliderTextAreaCat}>
                    <CategoryName key={this.state.postData.categoryId} categoryId={item.item.categories[1] ? item.item.categories[1] : item.item.categories[0]} height={24} backgroundColor={color.sliderCategoryBackground} color={'#1D7BF6'} marginBottom={10} />
                </View>
                <View style={styles.sliderTextArea}>

                    <Text numberOfLines={3} style={styles.sliderTitle}>{TextStore.clearText(item.item.title.rendered)}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    goToDetail = (data) => {
        const { PostDetailStore } = this.props;
        this.props.navigation.navigate('Details',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "HomeStack"
        );
    };

    renderPostData = (item, index) => {


        return (
            <RightImageCard key={index} item={item} onPress={() => this.goToDetail(item)} />
        )


    }
    //#endregion

    //#region  Design Functions
    LoadingCircle = () => {
        if (this.props.PostListStore.isLoading)
            return null;
        return (
            <View style={{ padding: 25 }}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    //#endregion
    render() {

        const { PostListStore } = this.props;
        return (
            <SafeAreaView style={globalStyle.container}>
                <FlatList
                    style={styles.postList}
                    renderItem={this.renderPostData}
                    data={PostListStore.postData}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this.LoadingCircle}
                    ListHeaderComponent={this.Slider}

                    // onEndReached={this.loadMoreData}
                    // onEndReachedThreshold={10}

                    refreshing={this.state.isRefreshing}
                    onRefresh={this.onRefresh}
                />
                {/* RBSheet bottom Modal component */}
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={200}
                    duration={350}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "flex-start",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        },
                    }}
                >
                    <View>
                        <Text style={styles.changeText}>{language.itemDesingChange}</Text>
                    </View>
                    <View style={styles.changeButtonArea}>
                        <TouchableOpacity style={styles.gridChangeButton2} onPress={() => this.ChangeGrid(1, 1)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/card-list.png')} />
                            <Text stlye={styles.buttonText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridChangeButton2} onPress={() => this.ChangeGrid(2, 1)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/left-card-list.png')} />
                            <Text stlye={styles.buttonText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridChangeButton2} onPress={() => this.ChangeGrid(3, 1)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/right-card-list.png')} />
                            <Text stlye={styles.buttonText}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridChangeButton2} onPress={() => this.ChangeGrid(4, 2)}>
                            <Image style={styles.changeButtonImage} source={require('../../img/icons/two-grid-columns.png')} />
                            <Text stlye={styles.buttonText}>4</Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            </SafeAreaView>
        );
    }

}

