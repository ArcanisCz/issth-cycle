import {Observable} from 'rx';
import {div, button, span} from '@cycle/dom';
import isolate from "@cycle/isolate";

/**
 * @param {Object} sources
 * @param {Observable} sources.props$
 * @param {Observable} sources.resouce$
 *
 * @return {{DOM: Observable}}
 */
function ResourceDisplay(sources) {
    const actions = intent(sources.props$, sources.resource$);
    const state$ = model(actions);
    return {
        DOM: view(state$)
    };
}

function intent(props$, resource$) {
    "use strict";
    return {
        props$: props$,
        resource$: resource$
    }
}

function model(actions) {
    "use strict";
    return Observable.combineLatest(
        actions.props$,
        actions.resource$,
        (props, resource) => {
            return {
                props: props,
                value: resource.value,
                max: resource.max,
                display: resource.enabled
            }
        }
    );
}

function view(state$) {
    "use strict";
    return state$.map(({props, value, max, display}) => {
            if(display){
                return div('.resource-display', {}, [
                    span([props.text + ": "]),
                    span([value]),
                    span(["("+max+")"])
                ])
            }else{
                return null
            }

        }
    );
}

export default sources => isolate(ResourceDisplay)(sources)