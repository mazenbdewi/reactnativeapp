import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { CardVideo } from '../../components/index';

import VideoStore from '../../store/VideoStore';

import analytics from '@react-native-firebase/analytics';



@inject('VideoStore', 'PostDetailStore')
@observer
export class VideoScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        VideoStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'Video',
                screen_class: 'VideoScreen',
            }
        )

    };


    renderCategoryItem = (item, index) => {

        return (

            <CardVideo key={index} item={item} onPress={() => this.goToDetail(item)} />


        )
    };

    goToDetail = (data) => {
        const { PostDetailStore } = this.props;

        this.props.navigation.push('Video Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "VideoStack"
        );

    };

    loadingCircle = () => {
        if (VideoStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { VideoStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                VideoStore.isFirstLoading = false;
                VideoStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { VideoStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                VideoStore.isFirstLoading = false;
                VideoStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { VideoStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={VideoStore.postData}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this.loadingCircle}
                    onEndReached={this.loadMoreData}
                    onEndReachedThreshold={10}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.onRefresh}

                />
            </SafeAreaView>
        )
    }
}

export default VideoScreen
