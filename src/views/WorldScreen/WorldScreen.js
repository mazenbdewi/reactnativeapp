import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../components/index';

import WorldStore from '../../store/WorldStore';

import analytics from '@react-native-firebase/analytics';



@inject('WorldStore', 'PostDetailStore')
@observer
export class WorldScreen extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        dataStatus: true,
        isLoading: false,
    }

    componentDidMount() {
        WorldStore.getCategoryPosts(this.state.page);

        analytics().logScreenView(
            {
                screen_name: 'World',
                screen_class: 'WorldScreen',
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

        this.props.navigation.push('World Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "WorldStack"
        );

    };

    loadingCircle = () => {
        if (WorldStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    //#region Post Data Processes
    loadMoreData = () => {
        const { WorldStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                WorldStore.isFirstLoading = false;
                WorldStore.getCategoryPosts(this.state.page)
            }
        })
    };



    onRefresh = () => {

        const { WorldStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                WorldStore.isFirstLoading = false;
                WorldStore.getCategoryPosts(this.state.page);


            }
        })
    };

    render() {
        const { WorldStore } = this.props;

        return (
            <SafeAreaView style={{ backgroundColor: '#212529' }}>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={WorldStore.postData}
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

export default WorldScreen
