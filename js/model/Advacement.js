import {Observable} from 'rx';

export const RANK = {
    CONDENSATION: "condensation"
};

export const SUBRANK_CONDENSATION = {
    ZERO: "zero",
    ONE: "one",
    TWO: "two",
    THREE: "three"
};

/**
 * @param {Object} sources
 * @param {Resources.result} sources.resources
 * @return Observable
 */
export function Advacement(sources) {

    const condensation_0$ = createRankStream(
        Observable.just(true),
        Observable.just(true),
        createRankObject(RANK.CONDENSATION, SUBRANK_CONDENSATION.ZERO)
    );

    const condensation_1$ = createRankStream(
        condensation_0$,
        sources.resources.qi$.filter(qi => qi.max > 5),
        createRankObject(RANK.CONDENSATION, SUBRANK_CONDENSATION.ONE)
    );

    const condensation_2$ = createRankStream(
        condensation_1$,
        sources.resources.qi$.filter(qi => qi.max > 6),
        createRankObject(RANK.CONDENSATION, SUBRANK_CONDENSATION.TWO)
    );

    return Observable.merge(
        condensation_0$,
        condensation_1$,
        condensation_2$
    ).shareValue({});
}

export default {RANK, SUBRANK_CONDENSATION, Advacement}

const createRankStream = (previous, condition$, result) => condition$
    .pausable(previous.map(e => true).startWith(false))
    .map(e=> result)
    .first();


const createRankObject = (rank, subrank) => ({
    rank: rank,
    subrank: subrank
});

