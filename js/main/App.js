import {Observable, Subject} from 'rx';
import {div, img} from '@cycle/dom';
import LeftPanel from './../components/layout/LeftPanel';
import RightPanel from './../components/layout/RightPanel';
import TopPanel from './../components/layout/TopPanel';
import MessagePanel from './../components/layout/MessagePanel';
import Resources from '../model/Resources';
import MessageProvider from '../data/MessageProvider';
import {Advacement, RANK, SUBRANK_CONDENSATION} from '../model/Advacement';

function App(sources) {
    const messageProvider = MessageProvider();

    const changeQiProxy$ = new Subject();
    const changeMaxQiProxy$ = new Subject();


    const model = {};

    model.resources = Resources({
        add$: changeQiProxy$,
        addMax$: changeMaxQiProxy$
    });

    model.advacement$ = Advacement({
        resources: model.resources
    });


    const topPanelComponent = TopPanel({
        DOM: sources.DOM,
        props$: Observable.combineLatest(
            model.advacement$.filter(advacement => advacement.subrank === SUBRANK_CONDENSATION.ONE).map(e => true).startWith(false),
            show => ({
                display: show
            })
        ),
        advacement$: model.advacement$,
        messageProvider$: messageProvider
    });

    const rightPanelComponent = RightPanel({
        DOM: sources.DOM,
        props$: Observable.just({
            display: true
        }),
        messageProvider$: messageProvider,
        resources: model.resources
    });

    const leftPanelComponent = LeftPanel({
        DOM: sources.DOM,
        props$: Observable.combineLatest(
            model.advacement$.filter(advacement => advacement.subrank === SUBRANK_CONDENSATION.ONE).map(e => true).startWith(false),
            show => ({
                display: show
            })
        ),
        resources: model.resources
    });

    const messageComponent = MessagePanel({
        DOM: sources.DOM,
        props$: Observable.combineLatest(
            model.advacement$.filter(advacement => advacement.subrank === SUBRANK_CONDENSATION.TWO).map(e => true).startWith(false),
            show => ({
                display: show
            })
        ),
        resources: model.resources
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
