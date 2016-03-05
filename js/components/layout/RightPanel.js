import {Observable} from 'rx';
import {section, h1} from '@cycle/dom';
import isolate from "@cycle/isolate";
import BasicButton from '../BasicButton';
import MessageProvider from '../../data/MessageProvider';

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 *
 */
function RightPanel(sources) {

    const messages = MessageProvider();

    const props$ = messages.map(messages => ({text: messages.meditate_button}));
    //const enabled$ = Observable.timer(3000).map(e => false).startWith(true);
    const enabled$ = Observable.just(true);

    const aaa$ = Observable.combineLatest(props$, enabled$, function (props, enabled) {
        "use strict";
        props.enabled = enabled;
        return props;
    });


    const meditateButtonComponent = BasicButton({
        DOM: sources.DOM,
        props$: aaa$
    });

    //meditateButtonComponent.click$.subscribe(function (val) {
    //    "use strict";
    //    console.log("AAAAAA", val);
    //});


    const vTree$ = Observable.combineLatest(
        sources.props$, meditateButtonComponent.DOM,
        (props, meditate) =>
            section('#right-panel', {}, [
                meditate
            ])
    );

    return {
        DOM: vTree$,
        click$: meditateButtonComponent.click$
    };
}

/**
 * @return {{DOM: Observable, click$: Observable}}
 */
export default sources => isolate(RightPanel)(sources)
