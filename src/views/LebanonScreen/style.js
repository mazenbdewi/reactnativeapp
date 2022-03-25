
import {
    Dimensions
} from 'react-native';

const width = Dimensions.get('screen').width;

export default {

    header: {
        flex: 1,
        height: 45,
        width: '90%',
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
    },
    changeGridButton: {
        alignSelf: 'flex-end',
        marginRight: 5,
        justifyContent: 'center',
    },
    changeImage: {
        margin: 10,
        height: 20,
        width: 20,
        right: 0,
        borderRadius: 10


    },
    logoview: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 130,
        width: 130,
    },
    sliderItemAreas: {
        width,
        height: 'auto',
        padding: 10,
        marginBottom: 10,
    },
    imageCover: {
        position: 'absolute',
        marginTop: 30,
        top: 10,
        left: 10,
        opacity: 1,
        height: '100%',
        width: '90%',


    },
    sliderTextArea: {
        position: 'absolute',
        padding: 10,
        left: 10,
        bottom: 30,
    },
    sliderTextAreaCat: {
        position: 'absolute',
        paddingBottom: 180,
        paddingRight: 10,
        right: 10,
        bottom: 30,
        flex: 1
    },
    sliderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'right',
        backgroundColor: "rgba(0,0,0, 0.5)",
        padding: 10,
        borderRadius: 10
    },
    changeButtonArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeText: {
        fontWeight: '600',
        paddingLeft: 10,
        borderLeftColor: '#f6bc31',
        borderLeftWidth: 2,
        marginLeft: 30,
        marginTop: 20,
        textAlign: 'right',
    },
    gridChangeButton: {
        padding: 5,
        margin: 5,
        alignItems: 'center'
    },
    gridChangeButton2: {
        padding: 15,
        margin: 15,
        alignItems: 'center'
    },
    changeButtonImage: {
        height: 32,
        width: 32,
        marginBottom: 15,
    },

}
