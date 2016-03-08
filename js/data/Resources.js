import {Observable, BehaviorSubject} from 'rx';

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
        }, 0)
        .startWith(0)
        .distinctUntilChanged();

    const qiSubject = new BehaviorSubject();
    qi$.subscribe(qiSubject);

    return {
        qi$: qiSubject,
        qiMax$: qiMax$
    }
}

export default Resources;
