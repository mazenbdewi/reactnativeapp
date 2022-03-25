import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import InternationalPressStore from '../../store/InternationalPressStore';

import analytics from '@react-native-firebase/analytics';



@inject('InternationalPressStore', 'PostDetailStore')
@observer
export class InternationalPressScreen extends Component {


    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        InternationalPressStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'InternationalPress',
                screen_class: 'InternationalPressScreen',
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

        this.props.navigation.push('InternationalPress Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "InternationalPressStack"
        );

    };

    loadingCircle = () => {
        if (InternationalPressStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { InternationalPressStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                InternationalPressStore.isFirstLoading = false;
                InternationalPressStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { InternationalPressStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                InternationalPressStore.isFirstLoading = false;
                InternationalPressStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { InternationalPressStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={InternationalPressStore.postData}
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

export default InternationalPressScreen
