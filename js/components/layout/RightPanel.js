import {Observable} from 'rx';
import {section, h1, span} from '@cycle/dom';
import isolate from "@cycle/isolate";
import BasicButton from '../BasicButton';

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 * @param {Observable} sources.messageProvider$
 *
 */
function RightPanel(sources) {
    const meditateButtonComponent = makeButton(sources.messageProvider$, sources.DOM);

    const actions = intent(sources.props$);
    const state$ = model(actions, meditateButtonComponent);
    return {
        DOM: view(state$),
        addQi$: meditateButtonComponent.click$.map(e => 1)
    };
}

/**
 * @return {{props$: Observable}}
 */
function intent(props$) {
    "use strict";
    return {
        props$: props$
    }
}

/**
 *
 * @param {Object} actions
 * @param {Observable} actions.props$
 * @param {Object} meditateButtonComponent
 *
 * @return {{props$: Observable, meditateDom$: Observable}}
 */
function model(actions, meditateButtonComponent) {
    "use strict";
    return Observable.combineLatest(
        actions.props$,
        meditateButtonComponent.DOM,
        (props, meditateDom) => ({props, meditateDom})
    );
}

function view(state$) {
    "use strict";
    return state$.map(({props, meditateDom}) =>
        section('#right-panel', {}, [
            meditateDom
        ])
    );
}

function makeButton(messages$, DOM) {
    "use strict";
    const props$ = messages$.map(messages => ({text: messages.meditate_button}));
    const enabled$ = Observable.just(true);

    return BasicButton({
        DOM: DOM,
        props$: Observable.combineLatest(props$, enabled$, (props, enabled) => {
            props.enabled = enabled;
            return props;
        })
    });
}

/**
 * @return {{DOM: Observable, addQi$: Observable}}
 */
export default sources => isolate(RightPanel)(sources)
