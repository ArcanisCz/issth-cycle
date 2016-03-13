import {Observable, Subject} from 'rx';
import {div, img} from '@cycle/dom';
import LeftPanel from './layout/LeftPanel';
import RightPanel from './layout/RightPanel';
import Resources from '../data/Resources';
import MessageProvider from '../data/MessageProvider';

function App(sources) {
    const messageProvider = MessageProvider();

    const changeQiProxy$ = new Subject();
    const changeMaxQiProxy$ = new Subject();

    const resources = Resources({
        add$: changeQiProxy$,
        addMax$: changeMaxQiProxy$
    });

    const rightPanelComponent = RightPanel({
        DOM: sources.DOM,
        props$: Observable.just({}),
        messageProvider$: messageProvider,
        resources: resources
    });

    rightPanelComponent.changeQi$
        .map(value => ({
            resource: "qi",
            value: value
        }))
        .subscribe(changeQiProxy$);

    rightPanelComponent.changeMaxQi$
        .map(value => ({
            resource: "qi",
            value: value
        }))
        .subscribe(changeMaxQiProxy$);



    const leftPanelComponent = LeftPanel({
        DOM: sources.DOM,
        props$: Observable.of({
            enabled: true
        }),
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
