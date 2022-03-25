import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import CultureStore from '../../store/CultureStore';

import analytics from '@react-native-firebase/analytics';



@inject('CultureStore', 'PostDetailStore')
@observer
export class CultureScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        CultureStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'Culture',
                screen_class: 'CultureScreen',
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

        this.props.navigation.push('Culture Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "CultureStack"
        );

    };

    loadingCircle = () => {
        if (CultureStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { CultureStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                CultureStore.isFirstLoading = false;
                CultureStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { CultureStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                CultureStore.isFirstLoading = false;
                CultureStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { CultureStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={CultureStore.postData}
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

export default CultureScreen
