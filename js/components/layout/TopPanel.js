import {Observable} from 'rx';
import {section, h1, div} from '@cycle/dom';
import isolate from "@cycle/isolate";

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 * @param {Object} sources.advacement$
 *
 * @return {{DOM: Observable}}
 */
function TopPanel(sources) {
    const actions = intent(
        sources.props$
    );
    const state$ = model(actions, sources.advacement$);
    return {
        DOM: view(state$)
    };
}

export default sources => isolate(TopPanel)(sources)

function intent(props$) {
    "use strict";
    return {
        props$: props$
    }
}

function model(actions, advacement$) {
    "use strict";
    return Observable.combineLatest(
        actions.props$,
        advacement$,
        (props, advacement) => {
            return {
                classes: props.display ? "show" : "",
                rank: advacement.rank
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
            return section('#top-panel', {
                className: state.classes
            }, [
                "Rank: "+state.rank
            ])
        }
    );
}