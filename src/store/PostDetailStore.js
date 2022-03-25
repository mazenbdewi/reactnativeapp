import { configure, observable, action, runInAction } from 'mobx';

configure({
  enforceActions: 'observed',
});

class PostDetailStore {

  @observable postDetail;
  @observable routeName; //Article Advice List using to route name

  @action changePostDetail = (item) => {

    runInAction(() => {
      this.postDetail = item;
    })
  }
}

export default new PostDetailStore();
