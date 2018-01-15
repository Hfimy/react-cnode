// observable 观察得到的  autorun 想要达到一个效果
import { observable, computed, autorun, action } from 'mobx';

export class AppState {
    @observable count = 0
    @observable name = 'hfimy'
    @computed get msg() {
        return `${this.name} say count is ${this.count}`;
    }

    @action add() {
        this.count += 1;
    }
    @action changeName(name) {
        this.name = name;
    }
}

const appState = new AppState();

autorun(() => {
    // console.log(appState.msg);
});

export default appState;
