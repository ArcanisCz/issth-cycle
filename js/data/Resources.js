import {Observable, BehaviorSubject, Subject} from 'rx';


/**
 * @param {Object} sources
 * @param {Observable} sources.add$
 * @param {Observable} sources.addMax$
 */
function Resources(sources) {
    "use strict";

    const addQi$ = sources.add$
        .filter(e => e.resource === "qi")
        .map(e => e.value);

    const addMaxQi$ = sources.addMax$
        .filter(e => e.resource === "qi")
        .map(e => e.value);

    const qiMin$ = Observable.just(0);
    const qiMax$ = addMaxQi$.scan((sum, val) => sum + val, 5).startWith(5);
    const qiValue$ = addQi$.withLatestFrom(qiMax$, qiMin$, (change, max, min) => ({change, max, min}))
        .scan((sum, obj) => {
            const rawValue = sum + obj.change;
            const max = Math.min(rawValue, obj.max);
            return Math.max(max, obj.min);
        }, 0)
        .startWith(0);

    const qi$ = Observable.combineLatest(
        qiValue$,
        qiMax$,
        qiMin$,
        qiValue$.map(val => val > 0).find(val => !!val).startWith(false),
        (value, max, min, enabled) => ({value, max, min, enabled}))
        .distinctUntilChanged();


    return {
        qi$: qi$.shareValue({})
    }
}

/**
 * @typedef {Object} Resources.result
 * @property {Observable} qi$
 */
/**
 * @return Resources.result
 */
export default Resources;
