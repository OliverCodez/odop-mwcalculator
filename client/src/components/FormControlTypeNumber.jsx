import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
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

class FormControlTypeNumber extends Component {

    constructor(props, context) {
//        console.log('In FormControlTypeNumber.constructor props=',props,'context=',context);
        super(props, context);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        var value = parseFloat(this.props.value);
        this.state = {
            value: value,
            valueString: value.toString(), // Update the display
            isInvalid: false,
            focused: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (Number.isFinite(this.props.value) && prevProps.value !== this.props.value) {
//            console.log('In FormControlTypeNumber.componentDidUpdate prevProps.value=',prevProps.value,'props.value=',this.props.value,'value=',this.state.value,'valueString=',this.state.valueString);
            if (this.props.value !== this.state.value) { // Only update our internal state value if they differ leaving the valueString unchanged.
                var value = parseFloat(this.props.value);
                this.setState({
                    value: value,
                    valueString: value.toString(), // Update the display
                });
            }
        }
    }

    onClick(event) {
        console.log('onclick 1');
//        console.log('In FormControlTypeNumber.onClick event.target.value=',event.target.value,'state=',this.state);
        if ( event.target.classList.contains( 'reset' ) ) {
            var valInt = 0;
            this.setState( {
                value: 0,
                valueString: valInt.toString(),
                cleanValue: 0,
                hasError: false,
                isInvalid: false
            } );
        }
        this.props.onClick(event); // Pass valid number onward
    }

    onChange(event) {
//        console.log('In FormControlTypeNumber.onChange event.target.value=',event.target.value,'state=',this.state);
        Array.from( document.querySelectorAll( '.cleared' ) ).forEach( ( el ) => el.classList.remove( 'cleared' ) );
        var value = parseFloat( event.target.value );
        if ( event.target.classList.contains('err-check') && !this.state.hasError ) {
            this.setState({
                cleanValue: this.state.value
            });
        }
        if (!isNaN(value)) {
//            console.log('In FormControlTypeNumber.onChange Valid event.target.value=',event.target.value,'state=',this.state);
            this.setState({
                value: value,
                valueString: event.target.value, // Update the display
                isInvalid: false,
            });
            this.props.onChangeValid(event); // Pass valid number onward
            this.props.onChange(event); // Pass valid number onward
        } else {
//            console.log('In FormControlTypeNumber.onChange Invalid event.target.value=',event.target.value,'state=',this.state);
            this.setState({
                valueString: event.target.value, // Update the display
                isInvalid: true,
            });
            this.props.onChangeInvalid(event); // Pass invalid number onward
        }
    }

    onFocus(event) {
//        console.log('In FormControlTypeNumber.onFocus event.target.value=',event.target.value,'state=',this.state);
        var valInt = this.state.value;
        if (!this.props.readOnly) {
            this.setState({
                valueString: valInt.toString(), // Update the display with unformatted value
                focused: true,
            });
        }
        this.props.onFocus(event);
    }

    onBlur(event) {
//        console.log('In FormControlTypeNumber.onBlur event.target.value=',event.target.value,'state=',this.state);
        if ( this.state.isInvalid ) {
            var updateVal = this.state.value;
            if ( this.state.hasError ) updateVal = this.state.cleanValue;
            event.target.value = updateVal.toString();
            this.props.onChangeValid( event ); // Pass valid number onward
            this.props.onChange( event ); // Pass valid number onward
        }
        this.setState( {
            valueString: this.state.value.toODOPPrecision(), // Update the display with formatted value
            isInvalid: false,
            focused: false,
        } );
        this.props.onBlur(event);
    }

    onContextMenu(event) {
//        console.log('In FormControlTypeNumber.onContextMenu event.target.value=',event.target.value);
        this.props.onContextMenu(event);
    }

    render() {
//        console.log('In FormControlTypeNumber.render value=',this.state.value,'valueString=',this.state.valueString);
//        console.log('In FormControlTypeNumber.render className=',this.props.className);
        var className = (this.props.className !== undefined ? this.props.className : '') + ' text-right',
            icon_alerts = this.props.icon_alerts; // start with the icon alerts
        
        if (icon_alerts === undefined) {
            icon_alerts = [];
        }

        if (this.state.focused && isNaN(parseFloat(this.state.valueString))) {
            className += ' borders-invalid';
        }

//        console.log('In FormControlTypeNumber.render icon_alerts=',icon_alerts);
        var icon_tooltip;
        if (icon_alerts.length > 0) {
            icon_tooltip =
                <>
                    <b>Alerts</b>
                    <ul>
                        {icon_alerts.map((entry, i) => { return <li className={entry.className} key={i}>{entry.severity}: {entry.message}</li>})}
                    </ul>
                </>;
//            console.log('icon_tooltip=',icon_tooltip);
        }

        var p = Object.assign({},this.props), // clone the props
            icon_class = 'fas fa-exclamation-triangle icon-invalid ',
            isErr = false;

        delete p.onChangeValid; // remove special on functions
        delete p.onChangeInvalid;
        delete p.disabledText;
        delete p.icon_alerts;
        delete p.validmin;
        delete p.validmax;

        if ( this.props.className.includes( 'err-check' ) ) {
            if ( icon_alerts.length > 0 ) {
                var errLevel = icon_alerts.map((entry, i) => { return entry.severity});
                className += ' borders-invalid';
                if ( errLevel.includes('Warn') ) {
                    icon_class += 'warn-notice ';
                    className += ' borders-warn';
                }
                if ( errLevel.includes('Err') ) {
                    icon_class += 'err-notice ';
                    isErr = this.state.cleanValue;
                    this.state.hasError = true;
                }
                else {
                    this.state.hasError = false;
                }
            }
            else {
                this.state.hasError = false;
            }
        }

        var setVal = this.props.disabledText ? '' : this.state.focused ? this.state.valueString : (Number.isFinite(this.state.value) ? this.state.value.toODOPPrecision() : '');

        if ( isErr ) {
            this.state.isInvalid = true;
            setVal = this.state.valueString;
        }

        return (<>
            {icon_alerts.length > 0 ?
                <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-lg">{icon_tooltip}</Tooltip>}>
                    <i className={icon_class}></i>
                </OverlayTrigger>
            :
            ''}
            <Form.Control type="number"
                {...p} // Allow OverlayTrigger to pass-in other props
                onClick={this.onClick}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                className={className}
                value={setVal} />
        </>)
    }
}

FormControlTypeNumber.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disabledText: PropTypes.bool,
    readOnly: PropTypes.bool,
    value: PropTypes.number,
    validmin: PropTypes.number,
    validmax: PropTypes.number,
    step: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onChangeValid: PropTypes.func,
    onChangeInvalid: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
}

FormControlTypeNumber.defaultProps = {
    className: '',
    disabled: false,
    disabledText: false,
    readOnly: false,
    value: '',
    validmin: -Number.MAX_VALUE,
    validmax: Number.MAX_VALUE,
    step: 'any',
    onClick: (()=>{}),
    onChange: (()=>{}),
    onChangeValid: (()=>{}),
    onChangeInvalid: (()=>{}),
    onFocus: (()=>{}),
    onBlur: (()=>{}),
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FormControlTypeNumber);