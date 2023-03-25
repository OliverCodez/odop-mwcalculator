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
                        // TODO :: Finalize and fix bug with classList.remove in forEach (also support IE and older browsers)
                        console.log('clicked reset');
                        document.querySelectorAll('.err-notice').forEach(e => e.remove());

                        Array.from( document.querySelectorAll( '.adv-form' ) ).forEach( ( el ) => el.classList.remove( 'reset', 'borders-invalid', 'borders-warn' ) );

                        document.getElementById( 'nvuriv_Free_OD' ).value = 0;
                        document.getElementById( 'nvuriv_Free_OD' ).classList.add('reset');
                        document.getElementById( 'nvuriv_Wire_Diameter' ).value = 0;
                        document.getElementById( 'nvuriv_Wire_Diameter' ).classList.add('reset');
                        document.getElementById( 'nvuriv_Free_Length' ).value = 0;
                        document.getElementById( 'nvuriv_Free_Length' ).classList.add('reset');
                        document.getElementById( 'nvuriv_Total_Coils' ).value = 0;
                        document.getElementById( 'nvuriv_Total_Coils' ).classList.add('reset');
                    } }>Reset</button>
                </div>
            </div>
        );
    }

}

export default connect()(DesignTable);
