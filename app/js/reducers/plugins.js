const initialState = [
    {
        name: 'feature-table',
        workflows: [
            {
                name: 'relative_frequency',
                info: 'Produces: FeatureTable[RelativeFrequency]',
                description: 'Convert to relative frequencies',
                input: [
                    {
                        type: 'Artifact',
                        sub_type: 'table',
                        input_type: 'Dropdown',
                        input_choices: 'Artifacts'
                    }
                ],
                output: [
                    {
                        type: 'Name',
                        sub_type: 'relative_frequency_table',
                        input_type: 'Text',
                        input_hint: 'FeatureTable[RelativeFrequency]'
                    }
                ]
            },
            {
                name: 'presence_absence',
                info: 'Produces: FeatureTable[PresenceAbsence]',
                description: 'Convert to presence/absence',
                input: [
                    {
                        type: 'Artifact',
                        sub_type: 'table',
                        input_type: 'Dropdown',
                        input_choices: 'Artifacts'
                    }
                ],
                output: [
                    {
                        type: 'Name',
                        sub_type: 'presence_absence_table',
                        input_type: 'Text',
                        input_hint: 'FeatureTable[PresenceAbsence]'
                    }
                ]
            },
            {
                name: 'rarefy',
                info: 'Produces: FeatureTable[Frequency]',
                description: 'Rarefaction',
                input: [
                    {
                        type: 'Artifact',
                        sub_type: 'table',
                        input_type: 'Dropdown',
                        input_choices: 'Artifacts'
                    },
                    {
                        type: 'Parameter',
                        sub_type: 'depth',
                        input_type: 'Text',
                        input_hint: 'Int'
                    }
                ],
                output: [
                    {
                        type: 'Name',
                        sub_type: 'rarefied_table',
                        input_type: 'Text',
                        input_hint: 'FeatureTable[Frequency]'
                    }
                ]
            },
            {
                name: 'summarize',
                info: undefined,
                description: 'Summarize',
                input: [
                    {
                        type: 'Artifact',
                        sub_type: 'table',
                        input_type: 'Dropdown',
                        input_choices: 'Artifacts'
                    }
                ],
                output: [
                    {
                        type: undefined,
                        sub_type: undefined,
                        input_type: undefined,
                        input_hint: undefined
                    }
                ]
            }
        ]
    },
    {
        name: 'diversity',
        workflows: [
            {
                name: 'feature_table_to_pcoa',
                info: 'Produces: DistanceMatrix, PCoAResults',
                description: 'Rarefy, compute pairwise distances, and apply ordination',
                input: [
                    {
                        type: 'Artifact',
                        sub_type: 'table',
                        input_type: 'Dropdown',
                        input_choices: 'Artifacts'
                    },
                    {
                        type: 'Artifact',
                        sub_type: 'phylogeny',
                        input_type: 'Dropdown',
                        input_choices: 'Artifacts'
                    },
                    {
                        type: 'Parameter',
                        sub_type: 'depth',
                        input_type: 'Text',
                        input_hint: 'Int'
                    },
                    {
                        type: 'Parameter',
                        sub_type: 'metric',
                        input_type: 'Text',
                        input_hint: 'Str'
                    }
                ],
                output: [
                    {
                        type: 'Name',
                        sub_type: 'distance_matrix',
                        input_type: 'Text',
                        input_hint: 'DistanceMatrix'
                    },
                    {
                        type: 'Name',
                        sub_type: 'pcoa_results',
                        input_type: 'Text',
                        input_hint: 'PCoAResults'
                    }
                ]
            },
            {
                name: 'beta-diversity',
                info: 'Produces: DistanceMatrix',
                description: 'Beta diversity',
                input: [
                    {
                        type: 'Artifact',
                        sub_type: 'feature-table',
                        input_type: 'Dropdown',
                        input_choices: 'Artifacts'
                    },
                    {
                        type: 'Artifact',
                        sub_type: 'phylogeny',
                        input_type: 'Dropdown',
                        input_choices: 'Artifacts'
                    },
                    {
                        type: 'Parameter',
                        sub_type: 'metric',
                        input_type: 'Text',
                        input_hint: 'Str'
                    }
                ],
                output: [
                    {
                        type: 'Name',
                        sub_type: 'DistanceMatrix',
                        input_type: 'Text',
                        input_hint: 'DistanceMatrix'
                    }
                ]
            }
        ]
    }
];

const pluginsReducer = (state = initialState, action) => {
    switch (action.type) {
    default:
        return state;
    }
};

export default pluginsReducer;
