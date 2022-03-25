import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import EconomyReportsStore from '../../store/EconomyReportsStore';

import analytics from '@react-native-firebase/analytics';




@inject('EconomyReportsStore', 'PostDetailStore')
@observer
export class EconomyReportsScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        EconomyReportsStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'EconomyReports',
                screen_class: 'EconomyReportsScreen',
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

        this.props.navigation.push('EconomyReports Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "EconomyReportsStack"
        );

    };

    loadingCircle = () => {
        if (EconomyReportsStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { EconomyReportsStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                EconomyReportsStore.isFirstLoading = false;
                EconomyReportsStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { EconomyReportsStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                EconomyReportsStore.isFirstLoading = false;
                EconomyReportsStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { EconomyReportsStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={EconomyReportsStore.postData}
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

export default EconomyReportsScreen
