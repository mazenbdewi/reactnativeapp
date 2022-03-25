import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import EconomicStore from '../../store/EconomicStore';

import analytics from '@react-native-firebase/analytics';



@inject('EconomicStore', 'PostDetailStore')
@observer
export class EconomicScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        EconomicStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'Economic',
                screen_class: 'EconomicScreen',
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

        this.props.navigation.push('Economic Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "EconomicStack"
        );

    };

    loadingCircle = () => {
        if (EconomicStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { EconomicStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                EconomicStore.isFirstLoading = false;
                EconomicStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { EconomicStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                EconomicStore.isFirstLoading = false;
                EconomicStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { EconomicStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={EconomicStore.postData}
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

export default EconomicScreen
