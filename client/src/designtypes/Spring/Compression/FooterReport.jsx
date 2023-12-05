import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';
import { getAlertsBySeverity, ERR, WARN, NOTICE, INFO } from '../../../components/Alerts';
import HubspotForm from 'react-hubspot-form'

class Report extends ReportBase {

    constructor(props) {
//        console.log("In Report1.constructor props=",props);
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
//        console.log("In Report1.onClick event=",event);
        window.print();
        return false;
    }

    fillCalcData( targetObj = '#hs-form-iframe-0' ) {
        console.log('function available');
        var getData = [
                'static_compression spring',
                'nvurci_Material_Type',
                'nvuriv_Wire_Diameter',
                'nvurci_End_Type',
                'sv_Spring_Index',
                'sv_Total_Coils',
                'sv_Rate',
                'Wire_Len',// temp test wire len'sv_Active_Coils',
                // TODO :: For Prod Re-Enable additional fields
                /*'Free_Length_Tol',
                'Coil_Dia_Tol',
                'MTS_at_Solid',
                'v_Safe_Load',
                'Wire_Len',// Blank if report not yet generated
                'sv_Length_of_Stroke',
                'sv_Weight',
                'v_Pitch',
                'sv_Cycle_Life'*/
            ],
            toFill = [
                'spring_type',// raw: "compression spring"
                'material_type',// nvurci_Material_Type
                'spring_wire_diameter',// nvuriv_Wire_Diameter
                'end_type',// nvurci_End_Type
                'spring_index',// sv_Spring_Index
                'total_spring_coils',// sv_Total_Coils
                'spring_rate',// sv_Rate
                'active_spring_coils',// sv_Active_Coils
                /*'free_length_tolerance',// Free_Length_Tol
                'coil_diameter_tolerance',// Coil_Dia_Tol
                'mts_at_solid',// MTS_at_Solid
                'safe_load',// v_Safe_Load
                'wire_length',// Wire_Len
                'length_of_stroke',// sv_Length_of_Stroke
                'spring_weight',// sv_Weight
                'pitch',// v_Pitch
                'cycle_life'// sv_Cycle_Life*/
            ];
        for ( let i = 0; i < getData.length; ++i ) {
            var dataField = 'input[name=' + toFill[i] + ']',
                dataValue = '';
            if ( getData[i].includes( 'static_' ) ) dataValue = getData[i].split( '_' )[1];
            else dataValue = document.querySelector( '#' + getData[i] ).value;
            document.querySelector( targetObj ).contentDocument.querySelector( dataField ).value = dataValue;
        }
    }

    render() {
        super.render();
//        console.log('In Report1.render this=',this);
//        TODO: fillCalcData() function implementation and complete
        var line = 1;
        var isGround = 1.7;
        if ( this.et_tab[this.props.symbol_table[o.End_Type].value][0].includes('Grounded') ) isGround = 1;
        return (
            <>
                <div className='mwc-sub-intro'>
                    <div>
                        <span className='mwc-sub-intro-title'>Get Your Design Data</span>
                        <span className='mwc-sub-intro-body mwc-indent27'>Enter your email below to get your spring data in an easy-to-use format for copying into
    your documents or sharing with colleagues.</span>
                    </div>
                </div>
                <div id="mwc-cta">
                    <HubspotForm
                        // TODO : After Test Change Form and Portal IDs
                        portalId='44500165'//testform; real form:'8642978'
                        formId='b1068814-c6e0-4f4c-bf5a-c4da95cdeed0'//testform; real form:'e2d615a6-2965-487e-85da-c79dc8113a9d'
                        onSubmit={() => console.log('submit')}
                        onBeforeFormSubmit={(form) => this.fillCalcData()}
                        onFormSubmitted={() => document.getElementById('report_Inner').classList.remove('hide-soft')}
                        onReady={(form) => console.log('loaded')}
                    />
                </div>
                <div className='mwc-sub-intro margin-botton-40'>
                    <div>
                        <span className='mwc-sub-intro-title'>Need Help With Your Spring Data?</span>
                        <span className='mwc-sub-intro-body mwc-indent27'>Do you need to request a quote? Please feel free to contact us - we have expert engineers
On staff who can assist with spring design and quote stock or custom parts.</span>
                        <div className='mwc-cta-block'>
                            <button className='mwc-cta-button'>Talk to an Engineer</button>
                            <button className='mwc-cta-button'>Request a Quote</button>
                        </div>
                    </div>
                </div>
                <div id="report_Inner" className="hide-soft">
                    <h4 className="d-flex mt-3">
                        <span className="mr-auto">Spring Compression Report</span>
                    </h4>
                    <br />
                    <table id="view1" className="report-table report-mobile-stack">
                        <tbody>
                            <tr className="text-value-row">
                                <td>{this.props.symbol_table[o.Spring_Type].name.replace(/_/g, ' ')}</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.props.symbol_table[o.Spring_Type].value}</td>
                                <td/>
                                <td>{this.props.symbol_table[o.Material_Type].name.replace(/_/g, ' ')}</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.matTypeValue}</td>
                            </tr>
                            <tr className="text-value-row">
                                <td>{this.props.symbol_table[o.Wire_Diameter].name.replace(/_/g, ' ')}</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.props.symbol_table[o.Wire_Diameter].value.toFixed(4) + ' ' + this.props.symbol_table[o.Wire_Diameter].units}</td>
                                <td/>
                                <td>{this.props.symbol_table[o.End_Type].name.replace(/_/g, ' ')}</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.et_tab[this.props.symbol_table[o.End_Type].value][0]}</td>
                            </tr>
                            <tr className="text-value-row">
                                <td>{this.props.symbol_table[o.Spring_Index].name.replace(/_/g, ' ')}</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.props.symbol_table[o.Spring_Index].value.toFixed(3) + ' ' + this.props.symbol_table[o.Spring_Index].units}</td>
                                <td/>
                                <td>{this.props.symbol_table[o.Total_Coils].name.replace(/_/g, ' ')}</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.props.symbol_table[o.Total_Coils].value.toFixed(3) + ' total ' + this.props.symbol_table[o.Total_Coils].units}</td>
                            </tr>
                            <tr className="text-value-row">
                                <td>{this.props.symbol_table[o.Rate].name.replace(/_/g, ' ')}</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.props.symbol_table[o.Rate].value.toFixed(3) + ' ' + this.props.symbol_table[o.Rate].units}</td>
                                <td/>
                                <td>{this.props.symbol_table[o.Active_Coils].name.replace(/_/g, ' ')}</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.props.symbol_table[o.Active_Coils].value.toFixed(3) + ' active ' + this.props.symbol_table[o.Active_Coils].units}</td>
                            </tr>
                            <tr className="text-value-row">
                                <td>Free Length Tol.</td>
                                <td>=</td>
                                <td className="text-left text-value">{((((((this.props.symbol_table[o.Free_Length].value * 25.4) + 10) * (this.props.symbol_table[o.Spring_Index].value + (25))) / 2000 ) * isGround) / 25.4).toFixed(3) + ' inches'}</td>
                                <td/>
                                <td>Coil Diameter Tol.</td>
                                <td>=</td>
                                <td className="text-left text-value">{((((this.props.symbol_table[o.Free_OD].value + this.props.symbol_table[o.ID_Free].value) / 2) * 0.7) / ((Math.pow(this.props.symbol_table[o.Wire_Diameter].value, 0.398)) * 135) * 2).toFixed(3) + ' inches'}</td>
                            </tr>
                            <tr className="text-value-row">
                                <td>% MTS at Solid</td>
                                <td>=</td>
                                <td className="text-left text-value">{(this.props.symbol_table[o.Stress_Solid].value / this.dhat).toFixed(1)}</td>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <table id="view2" className="report-table text-table-small calc-outdesk">
                        <thead>
                            <tr>
                                <td></td>
                                <td className="text-center"><span className="text-value text-caps">Force</span><br />{this.props.symbol_table[o.Force_1].units}</td>
                                <td className="text-center"><span className="text-value text-caps">Deflect</span><br />{this.props.symbol_table[o.Free_Length].units}</td>
                                <td className="text-center"><span className="text-value text-caps">Length</span><br />{this.props.symbol_table[o.Free_Length].units}</td>
                                <td/>
                                <td className="text-center"><span className="text-value text-caps">OD</span><br />{this.props.symbol_table[o.Free_OD].units}</td>
                                <td className="text-center"><span className="text-value text-caps">ID</span><br />{this.props.symbol_table[o.ID_Free].units}</td>
                                <td/>
                                <td className="text-center"><span className="text-value text-caps">Stress</span><br />{this.props.symbol_table[o.Stress_1].units}</td>
                                <td className="text-center"><span className="text-value text-caps">Static&nbsp;FS</span><br />{this.props.symbol_table[o.FS_2].units}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-right"><span className="text-value-small">Free</span></td>
                                <td>{(0.0).toFixed(2)}</td>
                                <td>{(0.0).toFixed(4)}</td>
                                <td>{this.props.symbol_table[o.Free_Length].value.toFixed(3)}</td>
                                <td/>
                                <td>{this.props.symbol_table[o.Free_OD].value.toFixed(4)}</td>
                                <td>{this.props.symbol_table[o.ID_Free].value.toFixed(4)}</td>
                                <td/>
                                <td>{(0.0).toFixed(0)}</td>
                                <td>Infinity</td>
                            </tr>
                            <tr>
                                <td className="text-right"><span className="text-value-small">1</span></td>
                                <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                                <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(4)}</td>
                                <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                                <td/>
                                <td>{this.od_1.toFixed(4)}</td>
                                <td>{this.id_1.toFixed(4)}</td>
                                <td/>
                                <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                                <td>{this.fs_1.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="text-right"><span className="text-value-small">2</span></td>
                                <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                                <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(4)}</td>
                                <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                                <td/>
                                <td>{this.od_2.toFixed(4)}</td>
                                <td>{this.id_2.toFixed(4)}</td>
                                <td/>
                                <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                                <td>{this.props.symbol_table[o.FS_2].value.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="text-right"><span className="text-value-small">Solid</span></td>
                                <td>{this.props.symbol_table[o.Force_Solid].value.toFixed(2)}</td>
                                <td>{(this.props.symbol_table[o.Free_Length].value - this.props.symbol_table[o.L_Solid].value).toFixed(4)}</td>
                                <td>{this.props.symbol_table[o.L_Solid].value.toFixed(3)}</td>
                                <td/>
                                <td>{this.od_solid.toFixed(4)}</td>
                                <td>{(this.od_solid - 2.0 * this.props.symbol_table[o.Wire_Diameter].value).toFixed(4)}</td>
                                <td/>
                                <td>{this.props.symbol_table[o.Stress_Solid].value.toFixed(0)}</td>
                                <td>{this.props.symbol_table[o.FS_Solid].value.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="view2" className="report-table text-table-small report-mobile-only">
                        <thead>
                            <tr>
                                <td/>
                                <td className="text-center"><span className="text-value-small">Free</span></td>
                                <td className="text-center"><span className="text-value-small">1</span></td>
                                <td className="text-center"><span className="text-value-small">2</span></td>
                                <td className="text-center"><span className="text-value-small">Solid</span></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-right"><span className="text-value text-caps">Force</span><br />{this.props.symbol_table[o.Force_1].units}</td>
                                <td>{(0.0).toFixed(2)}</td>
                                <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                                <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                                <td>{this.props.symbol_table[o.Force_Solid].value.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="text-right"><span className="text-value text-caps">Deflect</span><br />{this.props.symbol_table[o.Free_Length].units}</td>
                                <td>{(0.0).toFixed(4)}</td>
                                <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(4)}</td>
                                <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(4)}</td>
                                <td>{(this.props.symbol_table[o.Free_Length].value - this.props.symbol_table[o.L_Solid].value).toFixed(4)}</td>
                            </tr>
                            <tr>
                                <td className="text-right"><span className="text-value text-caps">Length</span><br />{this.props.symbol_table[o.Free_Length].units}</td>
                                <td>{this.props.symbol_table[o.Free_Length].value.toFixed(3)}</td>
                                <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                                <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                                <td>{this.props.symbol_table[o.L_Solid].value.toFixed(3)}</td>
                            </tr>
                            <tr>
                                <td className="text-right"><span className="text-value text-caps">OD</span><br />{this.props.symbol_table[o.Free_OD].units}</td>
                                <td>{this.props.symbol_table[o.Free_OD].value.toFixed(4)}</td>
                                <td>{this.od_1.toFixed(4)}</td>
                                <td>{this.od_2.toFixed(4)}</td>
                                <td>{this.od_solid.toFixed(4)}</td>
                            </tr>
                            <tr>
                                <td className="text-right"><span className="text-value text-caps">ID</span><br />{this.props.symbol_table[o.ID_Free].units}</td>
                                <td>{this.props.symbol_table[o.ID_Free].value.toFixed(4)}</td>
                                <td>{this.id_1.toFixed(4)}</td>
                                <td>{this.id_2.toFixed(4)}</td>
                                <td>{(this.od_solid - 2.0 * this.props.symbol_table[o.Wire_Diameter].value).toFixed(4)}</td>
                            </tr>
                            <tr>
                                <td className="text-right"><span className="text-value text-caps">Stress</span><br />{this.props.symbol_table[o.Stress_1].units}</td>
                                <td>{(0.0).toFixed(0)}</td>
                                <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                                <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                                <td>{this.props.symbol_table[o.Stress_Solid].value.toFixed(0)}</td>
                            </tr>
                            <tr>
                                <td className="text-right"><span className="text-value text-caps">Static&nbsp;FS</span><br />{this.props.symbol_table[o.FS_2].units}</td>
                                <td>Infinity</td>
                                <td>{this.fs_1.toFixed(2)}</td>
                                <td>{this.props.symbol_table[o.FS_2].value.toFixed(2)}</td>
                                <td>{this.props.symbol_table[o.FS_Solid].value.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <table id="view3" className="report-table report-mobile-stack">
                        <tbody>
                            <tr className="text-value-row">
                                <td>Safe Load</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.safe_load.toFixed(3) + ' ' + this.safe_load_u}</td>
                                <td/>
                                <td>{this.len_lbl}</td>
                                <td>=</td>
                                <td id="Wire_Len" className="text-left text-value">{this.wire_len_t.toFixed(3) + ' ' + this.props.symbol_table[o.Free_Length].units}</td>
                            </tr>
                            <tr className="text-value-row">
                                <td>{this.props.symbol_table[o.Length_of_Stroke].name.replace(/_/g, ' ')}</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.props.symbol_table[o.Length_of_Stroke].value.toFixed(3) + ' ' + this.props.symbol_table[o.Length_of_Stroke].units}</td>
                                <td/>
                                <td>{this.props.symbol_table[o.Weight].name.replace(/_/g, ' ')}</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.wgt1000.toFixed(3) + ' ' + this.props.symbol_table[o.Weight].units + '/1000'}</td>
                            </tr>
                            <tr className="text-value-row">
                                <td>Pitch</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.pitch.toFixed(3) + ' ' + this.props.symbol_table[o.Free_Length].units}</td>
                                <td/>
                                <td>{this.props.symbol_table[o.Cycle_Life].name.replace(/_/g, ' ')}</td>
                                <td>=</td>
                                <td className="text-left text-value">{this.props.symbol_table[o.Cycle_Life].value.toFixed(0) + ' ' + this.props.symbol_table[o.Cycle_Life].units + ' (estimate)'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <span className="text-value-row">Deflection at load point 2 is {this.props.symbol_table[o.PC_Avail_Deflect].value.toFixed(0)}% of total available deflection.</span><br />
                    {this.pcadmsg}{this.pcadmsg !== undefined && <br />}
                    <br />
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Report);
