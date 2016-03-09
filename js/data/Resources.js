import {Observable, BehaviorSubject} from 'rx';



/**
 * @param {Object} sources
 * @param {Observable} sources.add$
 */
function Resources(sources) {
    "use strict";

    const addQi$ = sources.add$
        .filter(e => e.resource === "qi")
        .map(e => e.value);

    const qiMax$ = Observable.just(10);
    const qiMin$ = Observable.just(0);
    const qi$ = Observable.combineLatest(addQi$, qiMax$, qiMin$, (change, max, min) =>({change, max, min}))
        .scan((sum, obj) => {
            const rawValue = sum + obj.change;
            const max = Math.min(rawValue, obj.max);
            return Math.max(max, obj.min);
        }, 0)
        .startWith(0)
        .distinctUntilChanged();

    //const qiResource = Resource(qiSubject, qiMax$, Observable.just(true));

    const aaa = Observable.combineLatest(
        qi$,
        qiMax$,
        Observable.just(true),
        //qi$.map(val => val > 0).find(val => !!val).startWith(false),
        (value, max, enabled) => ({value, max, enabled})
    );

    const qiSubject = new BehaviorSubject();
    aaa.subscribe(qiSubject);
    
    return {
        qi$: qiSubject

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
