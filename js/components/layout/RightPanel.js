import {Observable} from 'rx';
import {section, h1, span} from '@cycle/dom';
import isolate from "@cycle/isolate";
import BasicButton from '../BasicButton';

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 * @param {Observable} sources.messageProvider$,
 * @param {Observable} sources.resources
 *
 */
function RightPanel(sources) {
    const meditateButtonComponent = makeButton(sources.messageProvider$, sources.DOM);
    const spendButtonComponent = makeSpendButton(sources.messageProvider$, sources.DOM, sources.resources.qi$);

    const actions = intent(sources.props$);
    const state$ = model(actions, meditateButtonComponent, spendButtonComponent);
    return {
        DOM: view(state$),
        changeQi$: Observable.merge(
            meditateButtonComponent.click$.map(e => 1),
            spendButtonComponent.click$.map(e => -1)
        )
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
 * @param {Object} spendButtonComponent
 *
 * @return {{props$: Observable, meditateDom$: Observable}}
 */
function model(actions, meditateButtonComponent, spendButtonComponent) {
    "use strict";
    return Observable.combineLatest(
        actions.props$,
        meditateButtonComponent.DOM,
        spendButtonComponent.DOM,
        (props, meditateDom, spendDom) => ({props, meditateDom, spendDom})
    );
}

function view(state$) {
    "use strict";
    return state$.map(({props, meditateDom, spendDom}) =>
        section('#right-panel', {}, [
            meditateDom,
            spendDom
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

function makeSpendButton(messages$, DOM, qi$) {
    "use strict";
    const props$ = messages$.map(messages => ({text: messages.meditate_button1}));
    const enabled$ = qi$.map(value => value > 0);

    return BasicButton({
        DOM: DOM,
        props$: Observable.combineLatest(props$, enabled$, (props, enabled) => {
            props.enabled = enabled;
            return props;
        })
    });
}

/**
 * @return {{DOM: Observable, changeQi$: Observable}}
 */
export default sources => isolate(RightPanel)(sources)
