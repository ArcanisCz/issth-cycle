import {Observable} from 'rx';
import {section, h1, div} from '@cycle/dom';
import isolate from "@cycle/isolate";
import ResourceDisplay from '../ResourceDisplay';

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 * @param {Object} sources.resources
 *
 * @return {{DOM: Observable}}
 */
function LeftPanel(sources) {
    const qiDisplayComponent = ResourceDisplay({
        props$: Observable.of({
            text: "Qi"
        }),
        resource$: sources.resources.qi$
    });

    const actions = intent(
        sources.props$
    );
    const state$ = model(actions);
    return {
        DOM: view(state$, qiDisplayComponent.DOM)
    };
}

export default sources => isolate(LeftPanel)(sources)

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
        (props, qi) => {
            return {
                classes: props.display ? "show" : ""
            }
        }
    ).distinctUntilChanged();
}

function view(state$, qiDisplayComponent) {
    "use strict";
    return Observable.combineLatest(
        state$,
        qiDisplayComponent,
        (state, qi) => {
            "use strict";
            return section('#left-panel', {
                className: state.classes
            }, [
                qi
            ])
        }
    );
}