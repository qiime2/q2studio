
const initialState = [
    // {
    //     name: 'feature-table',
    //     workflows: [
    //         {
    //             name: 'relative_frequency',
    //             info: 'Produces: FeatureTable[RelativeFrequency]'
    //         },
    //         {
    //             name: 'presence_absence',
    //             info: 'Produces: FeatureTable[PresenceAbsence]'
    //         },
    //         {
    //             name: 'rarefy',
    //             info: 'Produces: FeatureTable[Frequency]'
    //         },
    //         {
    //             name: 'summarize',
    //             info: undefined
    //         }
    //     ]
    // },
    // {
    //     name: 'diversity',
    //     workflows: [
    //         {
    //             name: 'feature_table_to_pcoa',
    //             info: 'Produces: DistanceMatrix, PCoAResults'
    //         },
    //         {
    //             name: 'beta-diversity',
    //             info: 'Produces: DistanceMatrix'
    //         }
    //     ]
    // }
];


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
