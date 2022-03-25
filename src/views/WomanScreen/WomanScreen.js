import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import WomanStore from '../../store/WomanStore';

import analytics from '@react-native-firebase/analytics';



@inject('WomanStore', 'PostDetailStore')
@observer
export class WomanScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        WomanStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'Woman',
                screen_class: 'WomanScreen',
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

        this.props.navigation.push('Woman Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "WomanStack"
        );

    };

    loadingCircle = () => {
        if (WomanStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { WomanStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                WomanStore.isFirstLoading = false;
                WomanStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { WomanStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                WomanStore.isFirstLoading = false;
                WomanStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { WomanStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={WomanStore.postData}
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

export default WomanScreen
