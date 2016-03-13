import {Observable, Subject} from 'rx';
import {div, img} from '@cycle/dom';
import LeftPanel from './layout/LeftPanel';
import RightPanel from './layout/RightPanel';
import TopPanel from './layout/TopPanel';
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

    const topPanelComponent = TopPanel({
        DOM: sources.DOM,
        props$: Observable.combineLatest(
            resources.qi$,
            qi => ({
                display: qi.max > 5
            })
        ),
        messageProvider$: messageProvider,
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
                display: qi.enabled
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
        (leftPanelComponentVTree, rightPanelComponentVTree, topPanelComponentVTree) =>
            div({className: 'row'}, [
                div(".my-row", {}, [
                    topPanelComponentVTree
                ]),
                div(".my-row", {}, [
                    leftPanelComponentVTree,
                    rightPanelComponentVTree
                ])
            ])

    );

    return {
        DOM: vTree$
    };
}


export default App;
