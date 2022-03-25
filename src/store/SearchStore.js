import { action, configure, observable, runInAction } from 'mobx';
import axios from 'axios';
import config from '../config/index';

configure({
    enforceActions: 'observed'
})

class SearchStore {

    @observable searchData = [];
    @observable isLoading = true;
    @observable noResultImageVisible = true;

    @action async getSearchData(searchText) {

        this.searchData = "";
        this.noResultImageVisible = false;
        try {
            const { data } = await axios.get(config.url + `wp-json/wp/v2/posts?search=${searchText}&per_page=30`)
            runInAction(() => {
                this.searchData = data;
                this.isLoading = true;
            })
        } catch (error) {
            runInAction(() => {
                this.noResultImageVisible = true;
                this.isLoading.true;
            })
            console.log("Error in getSearchData inside SearchStore : " + error);
        }
    }
}

export default new SearchStore();