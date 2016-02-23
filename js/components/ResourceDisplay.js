import {Observable} from 'rx';
import {div, button} from '@cycle/dom';
import isolate from "@cycle/isolate";

function ResourceDisplay(sources) {
    console.log(sources);


    const actions = intent(sources.props$, sources.value$);
    const state$ = model(actions);
    return {
        DOM: view(state$)
    };
}

function intent(props$, value$) {
    "use strict";
    return {
        props$: props$,
        value$: value$
    }
}

function model(actions) {
    "use strict";
    return Observable.combineLatest(
        actions.props$,
        actions.value$,
        (props, value) => ({props, value})
    );
}

function view(state$) {
    "use strict";
    return state$.map(({props, value}) => {
            return div('.resource-display', {}, [
                props.text+": "+value
            ])
        }
    );
}

export default sources => isolate(ResourceDisplay)(sources)