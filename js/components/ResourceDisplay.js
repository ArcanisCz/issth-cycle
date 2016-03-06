import {Observable} from 'rx';
import {div, button, span} from '@cycle/dom';
import isolate from "@cycle/isolate";

/**
 * @param {Object} sources
 * @param {Observable} sources.props$
 * @param {Observable} sources.value$
 * @param {Observable} sources.max$
 *
 * @return {{DOM: Observable}}
 */
function ResourceDisplay(sources) {
    const actions = intent(sources.props$, sources.value$, sources.max$);
    const state$ = model(actions);
    return {
        DOM: view(state$)
    };
}

function intent(props$, value$, max$) {
    "use strict";
    return {
        props$: props$,
        value$: value$,
        max$: max$
    }
}

function model(actions) {
    "use strict";
    return Observable.combineLatest(
        actions.props$,
        actions.value$,
        actions.max$,
        (props, value, max) => {
            return {
                props: props,
                value: value,
                max: max
            }
        }
    );
}

function view(state$) {
    "use strict";
    return state$.map(({props, value, max}) => {
            return div('.resource-display', {}, [
                span([props.text + ": "]),
                span([value]),
                span(["("+max+")"])
            ])
        }
    );
}

export default sources => isolate(ResourceDisplay)(sources)