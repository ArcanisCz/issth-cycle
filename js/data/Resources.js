import {Observable} from 'rx';

/**
 * @param {Object} sources
 * @param {Observable} sources.addQi$
 *
 * @return {{qi$: Observable, qiMax$: Observable}}
 */
function Resources(sources) {
    "use strict";

    const qiMax$ = Observable.just(10);
    const qi$ = sources.addQi$
        .scan((sum, x) => (Math.max(sum + x, 0)), 0)
        .distinctUntilChanged()
        .startWith(0);

    return {
        qi$: Observable.combineLatest(qi$, qiMax$, (qi, qiMax) => Math.min(qi, qiMax)).distinctUntilChanged(),
        qiMax$: qiMax$.distinctUntilChanged()
    }
}

export default Resources;
