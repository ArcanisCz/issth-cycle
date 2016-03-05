import {Observable} from 'rx';


function MessageProvider() {
    "use strict";

    return Observable.just({
        meditate_button: "Meditate"
    });
}

export default MessageProvider;