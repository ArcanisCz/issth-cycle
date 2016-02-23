import {Observable} from 'rx';
import {section, h1} from '@cycle/dom';
import isolate from "@cycle/isolate";
import ResourceDisplay from '../ResourceDisplay'


function LeftPanel(sources) {

    const resourceDisplayComponent = ResourceDisplay({
        props$: Observable.of({
            text: "Qi"
        }),
        value$: Observable.just(10)
    });

    const vTree$ = Observable.combineLatest(
        sources.props$, resourceDisplayComponent.DOM,
        (props, resourceDisplay) =>
            section('#left-panel', {}, [
                resourceDisplay
            ])
    );

    return {
        DOM: vTree$
    };
}

export default sources => isolate(LeftPanel)(sources)
