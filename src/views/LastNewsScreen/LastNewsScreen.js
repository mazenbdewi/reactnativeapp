import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import LastNewsStore from '../../store/LastNewsStore';

import analytics from '@react-native-firebase/analytics';



@inject('LastNewsStore', 'PostDetailStore')
@observer
export class LastNewsScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        LastNewsStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'LastNews',
                screen_class: 'LastNewsScreen',
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

        this.props.navigation.push('LastNews Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "LastNewsStack"
        );

    };

    loadingCircle = () => {
        if (LastNewsStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { LastNewsStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                LastNewsStore.isFirstLoading = false;
                LastNewsStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { LastNewsStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                LastNewsStore.isFirstLoading = false;
                LastNewsStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { LastNewsStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={LastNewsStore.postData}
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

export default LastNewsScreen
