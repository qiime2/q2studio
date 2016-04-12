import { List as ImmutableList, Map as ImmutableMap } from 'immutable';

const initialState = ImmutableList.of(
    ImmutableMap({
        name: 'feature-table',
        workflows: ImmutableList.of(
            ImmutableMap({
                name: 'relative_frequency',
                info: 'Produces: FeatureTable[RelativeFrequency]'
            }),
            ImmutableMap({
                name: 'presence_absence',
                info: 'Produces: FeatureTable[PresenceAbsence]'
            }),
            ImmutableMap({
                name: 'rarefy',
                info: 'Produces: FeatureTable[Frequency]'
            }),
            ImmutableMap({
                name: 'summarize',
                info: undefined
            })
        )
    }),
    ImmutableMap({
        name: 'diversity',
        workflows: ImmutableList.of(
            ImmutableMap({
                name: 'feature_table_to_pcoa',
                info: 'Produces: DistanceMatrix, PCoAResults'
            }),
            ImmutableMap({
                name: 'beta-diversity',
                info: 'Produces: DistanceMatrix'
            })
        )
    })
);


const main = (state = initialState, action) => {
    switch (action.type) {
    case 'DELETE_ARTIFACT':
        break;
    default:
        break;
    }
    return state;
};

export default main;
