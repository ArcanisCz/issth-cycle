import {Observable} from 'rx';
import {section, h1, div} from '@cycle/dom';
import isolate from "@cycle/isolate";

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 *
 * @return {{DOM: Observable}}
 */
function BottomPanel(sources) {
    const actions = intent(
        sources.props$
    );
    const state$ = model(actions);
    return {
        DOM: view(state$)
    };
}

export default sources => isolate(BottomPanel)(sources)

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
            return section('#bottom-panel', {
                className: state.classes
            }, [
                "bottom panel"
            ])
        }
    );
}