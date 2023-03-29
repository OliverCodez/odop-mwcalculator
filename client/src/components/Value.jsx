import React, { Component } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

class Value extends Component {
    
    render() {
//        console.log('In Value.render this=',this);
        var classNames = 'text-right',
            id_val = 'Deflection_Solid OD_Solid ID_Solid Pitch',
            id_nan = 'OD_1 ID_1 OD_2 ID_2 Static_FS_1 Safe_Load';
        if ( id_val.includes( this.props.id ) ) {
            classNames = classNames + ' clear-val form-reset';
        }
        if ( id_nan.includes( this.props.id ) ) {
            classNames = classNames + ' clear-nan form-reset';
        }
        return (
            <>
                <td className={"align-middle " + (this.props.className !== undefined ? this.props.className : '')}>
                    <InputGroup>
                        {typeof this.props.value === 'number' ?
                            <Form.Control id={'v_'+this.props.id} type="text" disabled={true} className={classNames} value={this.props.value.toODOPPrecision()} />
                            :
                            <Form.Control id={'v_'+this.props.id} type="text" disabled={true} className={classNames} value={this.props.value} />
                        }
                    </InputGroup>
                </td>
            </>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Value);

