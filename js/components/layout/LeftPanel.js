import {Observable} from 'rx';
import {section, h1, div} from '@cycle/dom';
import isolate from "@cycle/isolate";
import ResourceDisplay from '../ResourceDisplay';

/**
 *
 * @param {Object} sources
 * @param {Observable} sources.DOM
 * @param {Observable} sources.props$
 * @param {Object} sources.resources
 *
 * @return {{DOM: Observable}}
 */
function LeftPanel(sources) {
    const qiDisplayComponent = ResourceDisplay({
        props$: Observable.of({
            text: "Qi"
        }),
        resource$: sources.resources.qi$
    });

    const vTree$ = Observable.combineLatest(
        sources.props$,
        qiDisplayComponent.DOM,
        (props, qi) =>
            section('#left-panel', {}, [
                qi
            ])
    );

    return {
        DOM: vTree$
    };
}

export default sources => isolate(LeftPanel)(sources)
