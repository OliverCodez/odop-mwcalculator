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
                    <button type="number" className="bg-neutral-500 text-white hover:bg-neutral-600 text-md font-semibold antialiased rounded py-12 px-16 text-center duration block form-control" onClick={ () => {
                        // TODO :: Finalize and fix bug with classList.remove in forEach (also support IE and older browsers)
                        console.log('clicked reset');
                        Array.from( document.querySelectorAll( '.adv-form' ) ).forEach( ( el ) => el.classList.remove( 'borders-invalid', 'borders-warn', 'borders-fixed' ) );
                        
                    } }>Reset</button>
                </div>
            </div>
        );
    }

}

export default connect()(DesignTable);
