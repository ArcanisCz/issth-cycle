import {Observable} from 'rx';
import {section, h1, span, div} from '@cycle/dom';
import isolate from "@cycle/isolate";
import BasicButton from '../BasicButton';

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 * @param {Observable} sources.messageProvider$,
 * @param {Resources.result} sources.resources
 *
 */
function RightPanel(sources) {
    const absorbButtonComponent = makeAbsorbButton(sources.messageProvider$, sources.DOM, sources.resources.qi$);
    const condenseButtonComponent = makeCondenseButton(sources.messageProvider$, sources.DOM, sources.resources.qi$);

    const actions = intent(sources.props$);
    const state$ = model(actions, absorbButtonComponent, condenseButtonComponent);
    return {
        DOM: view(state$),
        changeQi$: Observable.merge(
            absorbButtonComponent.click$.map(e => 1),
            condenseButtonComponent.click$.map(e => -5)
        ),
        changeMaxQi$: condenseButtonComponent.click$.map(e => 1)
    };
}


/**
 * @return {{DOM: Observable, changeQi$: Observable, changeMaxQi$: Observable}}
 */
export default sources => isolate(RightPanel)(sources)

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
 * @param {Object} absorbButtonComponent
 * @param {Object} condenseButtonComponent
 *
 * @return {{props$: Observable, absorbDom: Observable, condenseDom: Observable}}
 */
function model(actions, absorbButtonComponent, condenseButtonComponent) {
    "use strict";
    return Observable.combineLatest(
        actions.props$,
        absorbButtonComponent.DOM,
        condenseButtonComponent.DOM,
        (props, absorbDom, condenseDom) => ({props, absorbDom, condenseDom})
    );
}

function view(state$) {
    "use strict";
    return state$.map(({props, absorbDom, condenseDom}) =>
        section('#right-panel', {}, [
            div(".row", {}, [
                absorbDom,
                condenseDom
            ])
        ])
    );
}

function makeAbsorbButton(messages$, DOM, qi$) {
    "use strict";
    const props$ = messages$.map(messages => ({text: messages.absorb_button}));
    const enabled$ = qi$.map(o => o.value < o.max).startWith(true);
    //const enabled$ = Observable.just(true);

    return BasicButton({
        DOM: DOM,
        props$: Observable.combineLatest(props$, enabled$, (props, enabled) => {
            props.enabled = enabled;
            props.display = true;
            return props;
        })
    });
}

function makeCondenseButton(messages$, DOM, qi$) {
    "use strict";
    const props$ = messages$.map(messages => ({text: messages.condense_button}));
    const enabled$ = qi$.map(o => o.value >= 5).startWith(false);
    //const enabled$ = Observable.just(true);
    const display$ = enabled$.filter(e => !!e).take(1).startWith(false);

    return BasicButton({
        DOM: DOM,
        props$: Observable.combineLatest(props$, enabled$, display$, (props, enabled, display) => {
            props.enabled = enabled;
            props.display = display;
            return props;
        })
    });
}

