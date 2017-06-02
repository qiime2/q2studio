// ----------------------------------------------------------------------------
// Copyright (c) 2016-2017, QIIME 2 development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

import React from 'react';
import Select from 'react-select-plus';
import style from '!style-loader!css-loader!react-select-plus/dist/react-select-plus.css'; // eslint-disable-line


class ReactReduxSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Select
                name={this.props.name}
                value={this.state.selected}
                options={this.props.options}
                onChange={(selectedValue) => { this.setState({ selected: selectedValue }); }}
            />
        );
    }
}

ReactReduxSelect.propTypes = {
    name: React.PropTypes.string,
    options: React.PropTypes.array
};

export default ReactReduxSelect;
