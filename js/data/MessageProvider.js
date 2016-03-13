import {Observable} from 'rx';


function MessageProvider() {
    "use strict";

    return Observable.just({
        absorb_button: "Absorb Qi",
        condense_button: "Condense Qi"
    });
}

export default MessageProvider;