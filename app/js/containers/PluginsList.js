// ----------------------------------------------------------------------------
// Copyright (c) 2016-2017, QIIME 2 development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

import { connect } from 'react-redux';

import Plugins from '../components/Plugins.jsx';

const mapStateToProps = (state) => {
    return {
        plugins: [...state.plugins.filter(
                    plugin => plugin.methods.length || plugin.visualizers.length)]
                                       .sort((a, b) => a.name > b.name)
    };
};

export default connect(
    mapStateToProps
)(Plugins);
