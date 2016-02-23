import {Observable} from 'rx';
import {section, h1} from '@cycle/dom';
import isolate from "@cycle/isolate";
import BasicButton from '../BasicButton';


function RightPanel(sources) {
    const meditateButtonComponent = BasicButton({
        DOM: sources.DOM,
        props$: Observable.of({
            text: "Meditate"
        })
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
