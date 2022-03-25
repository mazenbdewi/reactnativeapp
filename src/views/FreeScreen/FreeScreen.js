import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import FreeStore from '../../store/FreeStore';

import analytics from '@react-native-firebase/analytics';



@inject('FreeStore', 'PostDetailStore')
@observer
export class FreeScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        FreeStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'Free',
                screen_class: 'FreeScreen',
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

        this.props.navigation.push('Free Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "FreeStack"
        );

    };

    loadingCircle = () => {
        if (FreeStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { FreeStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                FreeStore.isFirstLoading = false;
                FreeStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { FreeStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                FreeStore.isFirstLoading = false;
                FreeStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { FreeStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={FreeStore.postData}
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

export default FreeScreen
