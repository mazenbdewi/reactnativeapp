import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import VariousStore from '../../store/VariousStore';

import analytics from '@react-native-firebase/analytics';


@inject('VariousStore', 'PostDetailStore')
@observer
export class VariousScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        VariousStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'Various',
                screen_class: 'VariousScreen',
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

        this.props.navigation.push('Various Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "VariousStack"
        );

    };

    loadingCircle = () => {
        if (VariousStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { VariousStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                VariousStore.isFirstLoading = false;
                VariousStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { VariousStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                VariousStore.isFirstLoading = false;
                VariousStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { VariousStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={VariousStore.postData}
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

export default VariousScreen
