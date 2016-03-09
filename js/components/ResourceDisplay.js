import {Observable} from 'rx';
import {div, button, span} from '@cycle/dom';
import isolate from "@cycle/isolate";

/**
 * @param {Object} sources
 * @param {Observable} sources.props$
 * @param {Observable} sources.resource$
 *
 * @return {{DOM: Observable}}
 */
function ResourceDisplay(sources) {
    const actions = intent(
        sources.props$,
        sources.resource$
    );
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
                text: props.text,
                value: resource.value,
                max: resource.max,
                display: resource.enabled
            }
        }
    ).startWith({
        text: "",
        value: 0,
        max: 0,
        display: false
    }).distinctUntilChanged();
}

function view(state$) {
    "use strict";
    return state$.map(({text, value, max, display}) => {

            if (display) {
                return div('.resource-display', {}, [
                    span([text + ": "]),
                    span([value]),
                    span(["(" + max + ")"])
                ])
            } else {
                return null
            }
        }
    );

}

export default sources => isolate(ResourceDisplay)(sources)