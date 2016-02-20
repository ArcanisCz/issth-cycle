import {Observable} from 'rx';
import {div, img} from '@cycle/dom';
import MeditateButton from './MeditateButton';
import LeftPanel from './layout/LeftPanel';
import RightPanel from './layout/RightPanel';


function App(sources) {

    const leftPanelComponent = LeftPanel({
        DOM: sources.DOM, props$: Observable.of({
            text: "left",
            className: "col-md-3"
        })
    });

    const rightPanelComponent = RightPanel({
        DOM: sources.DOM, props$: Observable.of({
            text: "right",
            className: "col-md-9"
        })
    });


    const vTree$ = Observable
    .combineLatest(
        leftPanelComponent.DOM,
        rightPanelComponent.DOM,
        (leftPanelComponentVTree, rightPanelComponentVTree) =>
            div({className: 'app row'}, [
                leftPanelComponentVTree,
                rightPanelComponentVTree
            ])

    );

    return {
        DOM: vTree$
    };
}


export default App;
