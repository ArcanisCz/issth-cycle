import {Observable} from 'rx';


function MessageProvider() {
    "use strict";

    return Observable.just({
        meditate_button: "Meditate",
        meditate_button1: "Spend"
    });
}

export default MessageProvider;