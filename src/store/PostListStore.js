import { configure, observable, action, runInAction } from 'mobx';
import config from '../config/index'
import axios from 'axios';

configure({
    enforceActions: 'observed',
});

let itemNumber = 0;

class PostListStore {

    @observable postData = [];
    @observable sliderData = [];
    @observable setData = [];
    @observable page = 1;
    @observable isFirstLoading = true;
    @observable isLoading = false;

    /* getPostData Function is domain.com/wp-json/wp/posts get data and data parse for slider and grid list */
    @action async getPostData(page, requestPage, requestType) {

        if (requestType === 'refresh') {
            this.postData = [];
            this.sliderData = [];
            itemNumber = 0;
        }

        try {
            // const { data } = await axios.get(config.url + `wp-json/wp/v2/posts?page=${page}`);
            const { data } = await axios.get(config.url + `/wp-json/wp/v2/posts?categories=146&per_page=8`);

            runInAction(() => {
                this.setData = [];
                this.setData = [...this.setData, ...data];
                if (this.isFirstLoading == true || requestType == 'refresh') {
                    this.dataParser(this.setData)
                }
                else {
                    this.postData = [...this.postData, ...data];
                }
                this.isLoading = true;
            })
        } catch (error) {

        }
    }

    @action async dataParser(data) {

        data.map(item => {
            if (itemNumber < 4) {
                runInAction(() => {
                    this.sliderData = [...this.sliderData, item];
                })
            }
            else {
                runInAction(() => {
                    this.postData = [...this.postData, item];
                })
            }
            itemNumber++;
        })
    }
}

export default new PostListStore();