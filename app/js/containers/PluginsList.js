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
