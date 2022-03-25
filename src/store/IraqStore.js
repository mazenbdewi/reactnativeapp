import { observable, action, configure, runInAction } from 'mobx';
import config from '../config/index';
import axios from 'axios';

configure({
    enforceActions: 'observed',
});

let itemNumber = 0;


class IraqStore {

    @observable moreCategoryList = [];
    @observable isLoading = false;
    @observable postData = [];
    @observable setData = [];
    @observable isFirstLoading = true;
    // @observable page = 1;

    @action async getCategoryList(page) {

        this.isLoading = true;
        try {
            const { data } = await axios.get(config.url + `wp-json/wp/v2/categories?per_page=20&page=${page}`);
            runInAction(() => {
                this.moreCategoryList = [...this.moreCategoryList, ...data];
                this.isLoading = true;
            })
        } catch (error) {
        }
    }

    @action async getCategoryPosts(page) {

        try {
            const { data } = await axios.get(config.url + `/wp-json/wp/v2/posts?categories=18284&per_page=${page}`);
            runInAction(() => {
                this.postData = [];
                this.setData = [...this.setData, ...data];
                if (this.isFirstLoading == true) {
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

            runInAction(() => {
                this.postData = [...this.postData, item];
            })


        })
    }

}

export default new IraqStore();