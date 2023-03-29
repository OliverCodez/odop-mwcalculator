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
                        Array.from( document.querySelectorAll( '.tab-content' ) ).forEach( ( el ) => el.classList.add( 'cleared' ) );
                        Array.from( document.querySelectorAll( '.form-reset' ) ).forEach( ( el ) => el.classList.add( 'reset' ) );
                        Array.from( document.querySelectorAll( '.clear-val' ) ).forEach( ( el ) => el.value = 0.000 );
                        Array.from( document.querySelectorAll( '.clear-nan' ) ).forEach( ( el ) => el.value = 'NaN' );
                        Array.from( document.querySelectorAll( '.clear-blank' ) ).forEach( ( el ) => el.value = '' );
                        Array.from( document.querySelectorAll( '.form-reset' ) ).forEach( ( el ) => el.click() );
                        Array.from( document.querySelectorAll( '.reset' ) ).forEach( ( el ) => el.classList.remove( 'reset' ) );
                    } }>Reset</button>
                </div>
            </div>
        );
    }

}

export default connect()(DesignTable);
