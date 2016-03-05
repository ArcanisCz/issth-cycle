import {Observable} from 'rx';

/**
 * @param {Object} sources
 * @param {Observable} sources.addQi$
 *
 * @return {{qi$: Observable}}
 */
function Resources(sources) {
    "use strict";

    return {
        qi$: sources.addQi$.scan((sum, x) => (sum + x), 0).startWith(0)
    }
}

export default Resources;
