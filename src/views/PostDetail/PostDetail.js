import React, { Component } from 'react'
import { Text, View, Image, Dimensions, Linking, Alert, SafeAreaView } from 'react-native'
//Components
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './style';
import config from '../../config/index';
import { ArticleAdviceList, CategoryName, Author, Comments } from '../../components/index'
//Third Party Libraries
import axios from 'axios';
import HTML from 'react-native-render-html';
//Store
import { observer, inject } from 'mobx-react';
//Color Package
import color from '../../config/color';
import language from '../../config/language';
//Library
import RBSheet from "react-native-raw-bottom-sheet"; // Bottom Modal

import Moment from 'moment';

import analytics from '@react-native-firebase/analytics';



@inject('TextStore', 'PostDetailStore')
@observer
export default class PostDetail extends Component {

    state = {
        postData: [],
        imageUrl: '',
        change: 1,
        stackName: '',
    };

    componentDidMount() {
        this.getPostMapping();
        const { PostDetailStore } = this.props;
        this.setState({
            stackName: PostDetailStore.routeName,
        })

        analytics().logScreenView(
            {
                screen_name: PostDetailStore.postDetail.item.title.rendered,
                screen_class: 'PostDetails',
            }
        )
    };

    getPostMapping = () => {
        const { PostDetailStore, TextStore } = this.props;
        const data = PostDetailStore.postDetail;
        let postMapper = {
            id: data.item.id,
            title: TextStore.clearText(data.item.title.rendered),
            description: data.item.content.rendered,
            mediaId: data.item.featured_media,
            link: data.item.link,
            pubDate: Moment(data.item.date).format('YYYY-MM-DD'),
            categoryId: data.item.categories[1] ? data.item.categories[1] : data.item.categories[0],
            authorId: data.item.author,
        };
        this.setState({
            postData: postMapper
        });
        this.getThumbnailUrl(postMapper.mediaId);
    };

    getThumbnailUrl = async (id) => {
        try {
            const response = await axios.get(
                config.url + `wp-json/wp/v2/media/${id}`,
            );
            this.setState({ imageUrl: response.data.media_details.sizes.full.source_url });
        } catch (error) {
        }
    };

    reload = () => {
        const { PostDetailStore } = this.props;

        if (PostDetailStore.routeName === 'HomeStack') {
            this.props.navigation.push('Details')
        }
        else if (PostDetailStore.routeName === 'CategoryStack') {
            this.props.navigation.push('Category Detail')
        }
        else if (PostDetailStore.routeName === 'SearchStack')
            this.props.navigation.push('Search Detail')
        else {
            alert(this.state.stackName);
        }
    };

    goToCategory = () => {
        const { PostDetailStore } = this.props;

        if (PostDetailStore.routeName === 'CategoryStack')
            this.props.navigation.navigate('Category View')
        else
            this.props.navigation.navigate('Category', { screen: 'Category View' });
    }

    bottomSheet = () => {
        return (
            <View>
                {/* RBSheet bottom Modal component */}
                < RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }
                    }
                    height={500}
                    duration={350}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "flex-start",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 20,


                        },
                    }}
                >

                </ RBSheet >
            </View>
        )
    };



    render() {
        return (
            <ScrollView key={this.state.postData.title}>
                <TouchableOpacity style={styles.title} onPress={this.goToCategory}>
                    <CategoryName key={this.state.postData.categoryId} categoryId={this.state.postData.categoryId} height={32} backgroundColor={color.detailCategoryBackground} color={color.detailCategoryTextColor} />
                </TouchableOpacity>

                <Image style={styles.thumbnail} source={this.state.imageUrl ? { uri: this.state.imageUrl } : require('../../img/slider-cover.png')}
                />

                <View style={styles.textArea}>

                    <View style={styles.title}>
                        <Author key={this.state.postData.authorId} authorId={this.state.postData.authorId} alignItems='right' backgroundColor={color.detailAuthorBackground} color={color.detailAuthorTextColor} />
                        <Text>{this.state.postData.pubDate} </Text>

                    </View>

                    <Text style={styles.title}>{this.state.postData.title} </Text>
                    <HTML html={this.state.postData.description} tagsStyles={styles} imagesMaxWidth={Dimensions.get('screen').width} textSelectable={true} onLinkPress={(event, href) => this.clickUrl(href)} baseFontStyle={{ fontSize: 20, lineHeight: 35 }} />
                    <View style={styles.postInformation}>


                    </View>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={this.reload}>
                    <ArticleAdviceList postId={this.state.postData.id} />
                </TouchableOpacity>

                {this.bottomSheet()}
            </ScrollView>

        )
    }
}
