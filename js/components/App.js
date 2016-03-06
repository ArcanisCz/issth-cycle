import {Observable} from 'rx';
import {div, img} from '@cycle/dom';
import LeftPanel from './layout/LeftPanel';
import RightPanel from './layout/RightPanel';
import Resources from '../data/Resources';
import MessageProvider from '../data/MessageProvider';

function App(sources) {
    const messageProvider = MessageProvider();

    const rightPanelComponent = RightPanel({
        DOM: sources.DOM,
        props$: Observable.of({}),
        messageProvider$: messageProvider
    });

    const resources = Resources({
       addQi$: rightPanelComponent.changeQi$
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
