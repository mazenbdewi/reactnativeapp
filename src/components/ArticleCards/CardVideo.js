import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import ListImage from '../ListImage'
import { observer, inject } from 'mobx-react';


@inject('TextStore')
@observer
export default class CardVideo extends Component {

    state = {
        articleItem: [],
    };

    componentDidMount() {
        this.setState({
            articleItem: this.props.item,
        })
    }

    render() {
        const { TextStore, item, key, onPress } = this.props;
        return (
            <TouchableOpacity key={key} style={styles.listItemAreas} onPress={onPress}>
                <ListImage mediaId={item.item.featured_media} imageHeight={170} imageWidth={'100%'} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    listItemAreas: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        flex: 1,
    },

    listTextArea: {
        padding: 30,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        display: 'none'
    },
})

