import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import ReportsStore from '../../store/ReportsStore';

import analytics from '@react-native-firebase/analytics';



@inject('ReportsStore', 'PostDetailStore')
@observer
export class ReportsScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        ReportsStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'Reports',
                screen_class: 'ReportsScreen',
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

        this.props.navigation.push('Reports Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "ReportsStack"
        );

    };

    loadingCircle = () => {
        if (ReportsStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { ReportsStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                ReportsStore.isFirstLoading = false;
                ReportsStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { ReportsStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                ReportsStore.isFirstLoading = false;
                ReportsStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { ReportsStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={ReportsStore.postData}
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

export default ReportsScreen
