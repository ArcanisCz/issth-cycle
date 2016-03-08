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
    const qiMin$ = Observable.just(0);
    const qi$ = Observable.combineLatest(sources.addQi$, qiMax$, qiMin$, (change, max, min) =>({change, max, min}))
        .scan((sum, obj) => {
            const rawValue = sum + obj.change;
            const max = Math.min(rawValue, obj.max);
            return Math.max(max, obj.min);
        }, 0);

    return {
        qi$: qi$.distinctUntilChanged().share().startWith(0),
        qiMax$: qiMax$.distinctUntilChanged().share().startWith(0)
    }
}

export default Resources;
