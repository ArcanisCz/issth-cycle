import {Observable} from 'rx';
import {div, h1} from '@cycle/dom';
import isolate from "@cycle/isolate";


function LeftPanel(sources) {
    const vTree$ = sources.props$.map(props =>
        div('.left-panel', {
            className: props.className
        }, [
            h1([props.text])
        ])
    );

    return {
        DOM: vTree$
    };
}

export default sources => isolate(LeftPanel)(sources)
