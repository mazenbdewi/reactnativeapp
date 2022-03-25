import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import SyriaStore from '../../store/SyriaStore';
import analytics from '@react-native-firebase/analytics';


@inject('SyriaStore', 'PostDetailStore')
@observer
export class SyriaScreen extends Component {


    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        SyriaStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'Syria',
                screen_class: 'SyriaScreen',
            }
        )


    };


    renderCategoryItem = (item, index) => {

        return (

            <Card style={{ paddingBottom: 25, paddingTop: 25 }} key={index} item={item} onPress={() => this.goToDetail(item)} />


        )
    };

    goToDetail = (data) => {
        console.log('Mazen test data : ' + JSON.stringify(data));
        const { PostDetailStore } = this.props;

        this.props.navigation.push('Syria Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "SyriaStack"
        );

    };

    loadingCircle = () => {
        if (SyriaStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { SyriaStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                SyriaStore.isFirstLoading = false;
                SyriaStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { SyriaStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                SyriaStore.isFirstLoading = false;
                SyriaStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { SyriaStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={SyriaStore.postData}
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

export default SyriaScreen
