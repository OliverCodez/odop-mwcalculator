import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import NameValueUnitsTable from './NameValueUnitsTable';
import ConstraintsMinTable from './ConstraintsMinTable';
import ConstraintsMaxTable from './ConstraintsMaxTable';
import NameValueUnitsCalcInputTable from './NameValueUnitsCalcInputTable';
import { connect } from 'react-redux';

class DesignTable extends Component {

    render() {
//        console.log('In DesignTable.render this=',this);
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
                    <button className="bg-neutral-500 text-white hover:bg-neutral-600 text-md font-semibold antialiased rounded py-12 px-16 text-center duration block" onClick={ () => {
                        Array.from( document.querySelectorAll( '.fa-exclamation-triangle' ) ).forEach( ( el ) => el.classList.add( 'clearerror' ) );
                        Array.from( document.querySelectorAll( '.adv-form' ) ).forEach( ( el ) => el.classList.add( 'reset', 'cleared' ) );
                        //Array.from( document.querySelectorAll( '.adv-form' ) ).forEach( ( el ) => el.classList.remove( 'borders-invalid', 'borders-warn', 'borders-fixed', 'reset' ) );
                        //Array.from( document.querySelectorAll( '.adv-form' ) ).forEach( ( el ) => el.classList.add( 'cleared' ) );
                        Array.from( document.querySelectorAll( '.adv-form' ) ).forEach( ( el ) => el.click() );
                    } }>Reset</button>
                </div>
            </div>
        );
    }

}

export default connect()(DesignTable);
