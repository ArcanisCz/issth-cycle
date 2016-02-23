import {Observable} from 'rx';


function MessageProvider() {
    "use strict";

    return {
        get: function (key) {
            return Observable.timer(1000).map(e => "[" + key + "]").startWith("{key}");
        }
    }
}

export default MessageProvider;