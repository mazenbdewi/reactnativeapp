import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import LebanonStore from '../../store/LebanonStore';

import analytics from '@react-native-firebase/analytics';




@inject('LebanonStore', 'PostDetailStore')
@observer
export class LebanonScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        LebanonStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'Lebanon',
                screen_class: 'LebanonScreen',
            }
        )

    };


    renderCategoryItem = (item, index) => {

        return (

            <Card key={index} item={item} onPress={() => this.goToDetail(item)} />


        )
    };

    goToDetail = (data) => {
        const { PostDetailStore } = this.props;

        this.props.navigation.push('Lebanon Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "LebanonStack"
        );

    };

    loadingCircle = () => {
        if (LebanonStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { LebanonStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                LebanonStore.isFirstLoading = false;
                LebanonStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { LebanonStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                LebanonStore.isFirstLoading = false;
                LebanonStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { LebanonStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={LebanonStore.postData}
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

export default LebanonScreen
