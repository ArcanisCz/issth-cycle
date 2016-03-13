import {Observable} from 'rx';
import {div, button} from '@cycle/dom';
import isolate from "@cycle/isolate";

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 *
 * @return {{DOM: Observable, click$: Observable}}
 */
export default sources => isolate(BasicButton)(sources)

function BasicButton(sources) {
    const actions = intent(sources.DOM, sources.props$);
    const state$ = model(actions);
    return {
        DOM: view(state$),
        click$: actions.click$.share()
    };
}

/**
 * @param {Observable} DOM
 * @param {Observable} props$
 */
function intent(DOM, props$) {
    "use strict";
    var enabled$ = props$.map(props => props.enabled);
    return {
        click$: DOM.events('click').pausable(enabled$),
        props$: props$,
        enabled$: enabled$
    }
}

function model(actions) {
    "use strict";
    return Observable.combineLatest(
        actions.props$,
        actions.enabled$,
        (props, enabled)=> ({
            text: props.text,
            classes: (enabled ? "enabled" : "disabled") + (props.display ? " show" : " hide")
        }))
        .distinctUntilChanged()
}

function view(state$) {
    "use strict";
    return state$.map(({text, classes}) => {
            return div('.meditate-button', {
                className: classes
            }, [
                text
            ])
        }
    );
}