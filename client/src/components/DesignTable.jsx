import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import ConstraintsMinTable from './ConstraintsMinTable';
import ConstraintsMaxTable from './ConstraintsMaxTable';
import NameValueUnitsCalcInputTable from './NameValueUnitsCalcInputTable';
import { connect } from 'react-redux';

class DesignTable extends Component {

    constructor( props, context ) {
        this.resetClick = this.resetClick.bind(this);
    }

    resetClick(event) {
        console.log('clicked!');
    }

    render() {
//        console.log('In DesignTable.render this=',this);
//        NameValueUnitsTable :: TODO :: extract fields from Independent Variable segment
        return (
            <div className='design-table'>
                <Row>
                    <NameValueUnitsTable />
                    <ConstraintsMinTable />
                    <ConstraintsMaxTable />
                </Row>
                <Row>
                    <NameValueUnitsCalcInputTable />
                </Row>
                <div id="reset-button">
                    <button type="reset" className="bg-neutral-500 text-white hover:bg-neutral-600 text-md font-semibold antialiased rounded py-12 px-16 text-center duration block" onClick={this.resetClick}>Reset</button>
                </div>
            </div>
        );
    }

}

export default connect()(DesignTable);
