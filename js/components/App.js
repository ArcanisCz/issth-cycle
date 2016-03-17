import {Observable, Subject} from 'rx';
import {div, img} from '@cycle/dom';
import LeftPanel from './layout/LeftPanel';
import RightPanel from './layout/RightPanel';
import TopPanel from './layout/TopPanel';
import MessagePanel from './layout/MessagePanel';
import Resources from '../data/Resources';
import MessageProvider from '../data/MessageProvider';
import Advacement from '../data/Advacement';

function App(sources) {
    const messageProvider = MessageProvider();

    const changeQiProxy$ = new Subject();
    const changeMaxQiProxy$ = new Subject();

    const resources = Resources({
        add$: changeQiProxy$,
        addMax$: changeMaxQiProxy$
    });

    const advacement$ = Advacement({});

    const topPanelComponent = TopPanel({
        DOM: sources.DOM,
        props$: Observable.combineLatest(
            resources.qi$,
            qi => ({
                display: true
            })
        ),
        advacement$: advacement$,
        messageProvider$: messageProvider
    });

    const rightPanelComponent = RightPanel({
        DOM: sources.DOM,
        props$: Observable.just({
            display: true
        }),
        messageProvider$: messageProvider,
        resources: resources
    });

    const leftPanelComponent = LeftPanel({
        DOM: sources.DOM,
        props$: Observable.combineLatest(
            resources.qi$,
            qi => ({
                display: true
            })
        ),
        resources: resources
    });

    const messageComponent = MessagePanel({
        DOM: sources.DOM,
        props$: Observable.combineLatest(
            resources.qi$,
            qi => ({
                display: false
            })
        ),
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

    const vTree$ = Observable
    .combineLatest(
        leftPanelComponent.DOM,
        rightPanelComponent.DOM,
        topPanelComponent.DOM,
        messageComponent.DOM,
        (leftPanelComponentVTree, rightPanelComponentVTree, topPanelComponentVTree, messageComponentVTree) =>
            div({className: 'row'}, [
                div(".my-row", {}, [
                    topPanelComponentVTree
                ]),
                div(".my-row", {}, [
                    leftPanelComponentVTree,
                    rightPanelComponentVTree,
                    messageComponentVTree
                ])
            ])

    );

    return {
        DOM: vTree$
    };
}


export default App;
