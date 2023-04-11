import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class ValueName extends Component {
    
    render() {
        var appendClass = '';
        if ( this.props.id == 'max_t1' || this.props.id == 'min_t1' ) appendClass = ' lineheight-tight';
//        console.log('In ValueName.render this=',this);
        return (
            <td className={"align-middle " + (this.props.className !== undefined ? this.props.className : '')} id={"vn_" + this.props.id}>
                <OverlayTrigger placement="top" overlay={this.props.tooltip !== undefined && <Tooltip>{this.props.tooltip}</Tooltip>}>
                    <span className={"d-block" + appendClass}>{this.props.name}</span>
                </OverlayTrigger>
            </td>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(ValueName);
