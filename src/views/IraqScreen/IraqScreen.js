import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import IraqStore from '../../store/IraqStore';

import analytics from '@react-native-firebase/analytics';

@inject('IraqStore', 'PostDetailStore')
@observer
export class IraqScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }



    componentDidMount() {
        IraqStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'Iraq',
                screen_class: 'IraqScreen',
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

        this.props.navigation.push('Iraq Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "IraqStack"
        );

    };

    loadingCircle = () => {
        if (IraqStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { IraqStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                IraqStore.isFirstLoading = false;
                IraqStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { IraqStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                IraqStore.isFirstLoading = false;
                IraqStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { IraqStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={IraqStore.postData}
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

export default IraqScreen
