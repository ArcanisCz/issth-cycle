import {Observable} from 'rx';
import {div, img} from '@cycle/dom';
import LeftPanel from './layout/LeftPanel';
import RightPanel from './layout/RightPanel';


function App(sources) {

    const leftPanelComponent = LeftPanel({
        DOM: sources.DOM,
        props$: Observable.of({})
    });

    const rightPanelComponent = RightPanel({
        DOM: sources.DOM,
        props$: Observable.of({})
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
