import {Observable} from 'rx';
import {section, h1, div} from '@cycle/dom';
import isolate from "@cycle/isolate";

function TopPanel(sources) {
    const actions = intent(
        sources.props$
    );
    const state$ = model(actions);
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
            return section('#top-panel', {
                className: state.classes
            }, [])
        }
    );
}