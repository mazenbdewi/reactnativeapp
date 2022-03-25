import React, { Component } from 'react'
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
//Mobx State
import { observer, inject } from 'mobx-react';
//Components
import { Card } from '../../../components/index';

import CategoryStore from '../../../store/CategoryStore';




@inject('CategoryStore', 'PostDetailStore')
@observer
export class CategoryView extends Component {

    state = {
        categoryPage: 1,
        isRefreshing: false,
        page: 10,
        getItem: 1,
        dataStatus: true,
    }

    componentDidMount() {
        CategoryStore.getCategoryPosts(this.state.page);

    };


    renderCategoryItem = (item, index) => {

        return (
            <Card key={index} item={item} onPress={() => this.goToDetail(item)} />

        )
    };

    goToDetail = (data) => {
        const { PostDetailStore } = this.props;

        this.props.navigation.push('Category Detail',
            PostDetailStore.changePostDetail(data),
            PostDetailStore.routeName = "CategoryStack"
        );

    };

    loadingCircle = () => {
        if (CategoryStore.isLoading)
            return null;

        return (
            <View style={{ paddingBottom: 25, paddingTop: 25 }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }
    loadMoreData = () => {
        const { CategoryStore } = this.props;
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.dataStatus) {
                CategoryStore.isFirstLoading = false;
                CategoryStore.getCategoryPosts('', this.state.page)
            }
        })
    };


    onRefresh = () => {

        const { CategoryStore } = this.props;
        this.setState({
            page: 1,
        }, () => {
            if (this.state.dataStatus) {
                CategoryStore.isFirstLoading = true;
                CategoryStore.getCategoryPosts(this.state.page, 'refresh');


            }
        })
    };

    render() {
        const { CategoryStore } = this.props;

        return (
            <SafeAreaView>
                <FlatList
                    renderItem={this.renderCategoryItem}
                    data={CategoryStore.categoryPosts}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this.loadingCircle}
                    onEndReached={this.loadMoreData}
                    onEndReachedThreshold={10}
                // refreshing={this.state.isRefreshing}
                // onRefresh={this.onRefresh}

                />
            </SafeAreaView>
        )
    }
}

export default CategoryView
