import {Observable} from 'rx';
import {section, h1} from '@cycle/dom';
import isolate from "@cycle/isolate";


function LeftPanel(sources) {
    const vTree$ = sources.props$.map(props =>
        section('#left-panel', {}, [
        ])
    );

    return {
        DOM: vTree$
    };
}

export default sources => isolate(LeftPanel)(sources)
