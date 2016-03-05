import {Observable} from 'rx';
import {div, img} from '@cycle/dom';
import LeftPanel from './layout/LeftPanel';
import RightPanel from './layout/RightPanel';
import Resources from '../data/Resources';

function App(sources) {

    const rightPanelComponent = RightPanel({
        DOM: sources.DOM,
        props$: Observable.of({})
    });

    const resources = Resources({
       addQi$: rightPanelComponent.click$.map(e => 1)
    });


    const leftPanelComponent = LeftPanel({
        DOM: sources.DOM,
        props$: Observable.of({}),
        resources: resources
    });


    const vTree$ = Observable
    .combineLatest(
        leftPanelComponent.DOM,
        rightPanelComponent.DOM,
        (leftPanelComponentVTree, rightPanelComponentVTree) =>
            div({className: 'app'}, [
                leftPanelComponentVTree,
                rightPanelComponentVTree
            ])

    );

    return {
        DOM: vTree$
    };
}


export default App;
