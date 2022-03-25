import { observable, action, configure, runInAction } from 'mobx';
import config from '../config/index';
import axios from 'axios';
import CategoryView from '../views/Category/CategoryView/CategoryView';

configure({
    enforceActions: 'observed',
});

class CategoryStore {

    @observable moreCategoryList = [];
    @observable isLoading = false;

    @observable categoryPosts;
    @observable CatID = 1;


    @observable isFirstLoading = true;
    @observable categoryPosts = [];



    @action async getCategoryList(page) {
        this.isLoading = false;
        try {
            // const { data } = await axios.get(config.url + `wp-json/wp/v2/categories?per_page=20&page=${page}`);
            runInAction(() => {
                // this.moreCategoryList = [...this.moreCategoryList, ...data];

                this.moreCategoryList = [
                    { id: 18284, name: 'العراق', cat: 'Iraq' },
                    { id: 4262, name: 'سوريا', cat: 'Syria' },
                    { id: 4263, name: 'العالم', cat: 'World' },
                    { id: 15330, name: 'لبنان', cat: 'Lebanon' },
                    { id: 26843, name: 'تقارير اقتصادية', cat: 'EconomyReports' },
                    { id: 26756, name: 'اقتصاد', cat: 'Economic' },
                    { id: 76, name: 'مساحة حرة', cat: 'Free' },
                    { id: 26779, name: 'تقارير', cat: 'Reports' },
                    { id: 25837, name: 'فديو', cat: 'Video' },
                    { id: 15554, name: 'المرأة', cat: 'Woman' },
                    { id: 26981, name: 'ثقافة', cat: 'Culture' },
                    { id: 26716, name: 'صحافة غربية', cat: 'InternationalPress' },
                    { id: 14537, name: 'منوعات', cat: 'Various' }

                ];

                this.isLoading = true;
            })
        } catch (error) {
        }
    }

    @action async getCategoryPosts(categoryId, page) {

        const catID = categoryId;

        this.isLoading = false;
        try {
            const { data } = await axios.get(config.url + `/wp-json/wp/v2/posts?categories=${categoryId}`);
            runInAction(() => {
                this.categoryPosts = [];
                this.categoryPosts = [...this.categoryPosts, ...data];
                this.isLoading = true;
            })
        } catch (error) {
        }
    }

}

export default new CategoryStore();