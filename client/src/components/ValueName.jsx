import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class ValueName extends Component {
    
    render() {
//        console.log('In ValueName.render this=',this);
        var elName = this.props.name,
            elDisplay = elName,
            addtlClass = '';
        if ( elName == 'Free' ) elDisplay = 'Free Length';
        if ( elName == 'Solid' ) elDisplay = 'Solid Height';
        if ( elName == '1' ) {
            addtlClass = ' lineheight-tight';
            elDisplay = 'Min<br>Operating Load';
        }
        if ( elName = '2' ) {
            addtlClass = ' lineheight-tight';
            elDisplay = 'Max<br>Operating Load';
        }
        return (
            <td className={"align-middle " + (this.props.className !== undefined ? this.props.className : '')} id={"vn_" + (elName)}>
                <OverlayTrigger placement="top" overlay={this.props.tooltip !== undefined && <Tooltip>{this.props.tooltip}</Tooltip>}>
                    <span className={"d-block" + addtlClass}>{elDisplay}</span>
                </OverlayTrigger>
            </td>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(ValueName);
