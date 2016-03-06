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
function BasicButton(sources) {
    const actions = intent(sources.DOM, sources.props$);
    const state$ = model(actions);
    return {
        DOM: view(state$),
        click$: actions.click$
    };
}

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 *
 * @return {{DOM: Observable, click$: Observable}}
 */
export default sources => isolate(BasicButton)(sources)


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
        function (props, enabled) {
            return ({
                props: props,
                classes: enabled ? "enabled" : "disabled"
            });
        }
    );
}

function view(state$) {
    "use strict";
    return state$.map(({props, classes}) => {
            return div('.meditate-button', {
                className: classes
            }, [
                props.text
            ])
        }
    );
}