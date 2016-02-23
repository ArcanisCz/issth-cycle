import {Observable} from 'rx';
import {section, h1} from '@cycle/dom';
import isolate from "@cycle/isolate";
import BasicButton from '../BasicButton';
import MessageProvider from '../MessageProvider';


function RightPanel(sources) {

    const messages = MessageProvider();

    const props$= messages.get("meditate").map(message => ({text: message}));
    const enabled$ = Observable.timer(3000).map(e => false).startWith(true);

    const aaa$ = Observable.combineLatest(props$, enabled$, function(props, enabled){
        "use strict";
        props.enabled = enabled;
        return props;
    });


    const meditateButtonComponent = BasicButton({
        DOM: sources.DOM,
        props$: aaa$
    });

    meditateButtonComponent.click$.subscribe(function(val){
        "use strict";
         console.log("AAAAAA", val);
    });


    const vTree$ = Observable.combineLatest(
        sources.props$, meditateButtonComponent.DOM,
        (props, meditate) =>
            section('#right-panel', {}, [
                meditate
            ])
    );

    return {
        DOM: vTree$
    };
}

export default sources => isolate(RightPanel)(sources)
