import {Observable} from 'rx';
import {section, h1, div} from '@cycle/dom';
import isolate from "@cycle/isolate";

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 * @param {Object} sources.resources
 *
 * @return {{DOM: Observable}}
 */
function MessagePanel(sources) {
    const actions = intent(
        sources.props$
    );
    const state$ = model(actions);
    return {
        DOM: view(state$)
    };
}

export default sources => isolate(MessagePanel)(sources)

function intent(props$) {
    "use strict";
    return {
        props$: props$
    }
}

function model(actions) {
    "use strict";
    return Observable.combineLatest(
        actions.props$,
        (props) => {
            return {
                classes: props.display ? "show" : ""
            }
        }
    ).distinctUntilChanged();
}

function view(state$) {
    "use strict";
    return Observable.combineLatest(
        state$,
        (state) => {
            "use strict";
            return section('#message-panel', {
                className: state.classes
            }, [
                "aaa"
            ])
        }
    );
}