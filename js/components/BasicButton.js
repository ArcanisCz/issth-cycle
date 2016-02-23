import {Observable} from 'rx';
import {div, button} from '@cycle/dom';
import isolate from "@cycle/isolate";


function BasicButton(sources) {
    const actions = intent(sources.DOM, sources.props$);
    const state$ = model(actions);
    return {
        DOM: view(state$),
        click$: actions.click$
    };
}

function intent(DOM, props$) {
    "use strict";
    return {
        click$: DOM.events('click'),
        props$: props$
    }
}

function model(actions) {
    "use strict";
    return Observable.combineLatest(
        actions.props$,
        (props) => ({props})
    );
}

function view(state$) {
    "use strict";
    return state$.map(({props}) => {
            return div('.meditate-button', {}, [
                props.text
            ])
        }
    );
}

export default sources => isolate(BasicButton)(sources)
