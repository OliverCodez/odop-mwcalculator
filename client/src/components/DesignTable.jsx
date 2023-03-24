import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import ConstraintsMinTable from './ConstraintsMinTable';
import ConstraintsMaxTable from './ConstraintsMaxTable';
import NameValueUnitsCalcInputTable from './NameValueUnitsCalcInputTable';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class DesignTable extends Component {

    constructor(props) {
//        console.log("In Report1.constructor props=",props);
//        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
//        console.log("In Report1.onClick event=",event);
        console.log('clicked reset');
        return false;
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
                    <Button className="bg-neutral-500 text-white hover:bg-neutral-600 text-md font-semibold antialiased rounded py-12 px-16 text-center duration block" onClick={this.onClick}>Reset</Button>
                </div>
            </div>
        );
    }

}

export default connect()(DesignTable);
