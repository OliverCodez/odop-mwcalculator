import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

class Report3 extends ReportBase {

    constructor(props) {
//        console.log("In Report3.constructor props=",props);
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
//        console.log("In Report3.onClick event=",event);
        window.print();
        return false;
    }

    render() {
        super.render();
//        console.log('In Report3.render this.props=',this.props);
        var isGround = 1.7;
        if ( this.et_tab[this.props.symbol_table[o.End_Type].value][0].includes('Grounded') ) isGround = 1;
        return (
            <>
                <h4 className="d-flex mt-3">
                    <span className="mr-auto">Spring Compression Report</span>
                </h4>
                <br />
                <table id="view1" className="report-table">
                    <tbody>
                        <tr className="text-value-row">
                            <td className="text-left">Contact Person:</td>
                            <td/>
                            <td width="30%"></td>
                            <td/>
                            <td className="text-left">Phone:</td>
                            <td/>
                            <td width="30%"></td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-left">Company Name:</td>
                            <td/>
                            <td width="30%"></td>
                            <td/>
                            <td className="text-left">Email:</td>
                            <td/>
                            <td width="30%"></td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-left">Street:</td>
                            <td/>
                            <td width="30%"></td>
                            <td/>
                            <td className="text-left">Date:</td>
                            <td/>
                            <td width="30%"></td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-left">City, State & Zip:</td>
                            <td/>
                            <td width="30%"></td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Part_Number].name.replace(/_/g, ' ')}: </td>
                            <td/>
                            <td width="30%">{this.props.labels[o.Part_Number].value}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <span className="text-value">{this.props.labels[o.COMMENT].name.replace(/_/g, ' ')}: &nbsp; </span> <span className="text-value-row">{this.props.labels[o.COMMENT].value}</span> <br/>
                <br/>
                <table id="view2" className="report-table">
                    <tbody>
                        <tr className="text-value-row">
                            <td>{this.props.symbol_table[o.Spring_Type].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-left text-value" colSpan="2">{this.props.symbol_table[o.Spring_Type].value}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Material_Type].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-left text-value" colSpan="2">{this.matTypeValue}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>{this.props.symbol_table[o.Wire_Diameter].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Wire_Diameter].value.toFixed(4)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Wire_Diameter].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.ASTM_Fed_Spec].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-left text-value" colSpan="2">{this.astmFedSpecValue}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>{this.props.symbol_table[o.Mean_Dia].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Mean_Dia].value.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Mean_Dia].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Tensile].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Tensile].value.toFixed(0)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Tensile].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>{this.props.symbol_table[o.Spring_Index].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Spring_Index].value.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Spring_Index].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.End_Type].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-left text-value" colSpan="2">{this.et_tab[this.props.symbol_table[o.End_Type].value][0]}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>{this.props.symbol_table[o.Rate].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Rate].value.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Rate].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Total_Coils].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Total_Coils].value.toFixed(3)}</td>
                            <td className="text-left text-value">{"total " + this.props.symbol_table[o.Total_Coils].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>Pitch</td>
                            <td>=</td>
                            <td className="text-value">{this.pitch.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Free_Length].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Active_Coils].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Active_Coils].value.toFixed(3)}</td>
                            <td className="text-left text-value">{"active " + this.props.symbol_table[o.Active_Coils].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>Helix Angle</td>
                            <td>=</td>
                            <td className="text-value">{this.hlx_ang.toFixed(2)}</td>
                            <td className="text-left text-value">degrees</td>
                            <td/>
                            <td>{this.len_lbl}</td>
                            <td>=</td>
                            <td className="text-value">{this.wire_len_t.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Free_Length].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>Safe Load</td>
                            <td>=</td>
                            <td className="text-value">{this.safe_load.toFixed(3)}</td>
                            <td className="text-left text-value">{this.safe_load_u}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Weight].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.wgt1000.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Weight].units + "/1000"}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>Safe Travel</td>
                            <td>=</td>
                            <td className="text-value">{this.safe_travel.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Free_Length].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Cycle_Life].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Cycle_Life].units + " (estimate)"}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>Free Length Tol.</td>
                            <td>=</td>
                            <td className="text-value">{((((((this.props.symbol_table[o.Free_Length].value * 25.4) + 10) * (this.props.symbol_table[o.Spring_Index].value + (25))) / 2000 ) * isGround) / 25.4).toFixed(3)}</td>
                            <td className="text-value">inches</td>
                            <td/>
                            <td>Coil Diameter Tol.</td>
                            <td>=</td>
                            <td className="text-value">{((((this.props.symbol_table[o.Free_OD].value + this.props.symbol_table[o.ID_Free].value) / 2) * 0.7) / ((Math.pow(this.props.symbol_table[o.Wire_Diameter].value, 0.398)) * 135) * 2).toFixed(3)}</td>
                            <td className="text-value text-left">inches</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>Corrected % of MTS</td>
                            <td>=</td>
                            <td className="text-value">0.000</td>
                            <td className="text-value text-left"></td>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table id="view3" className="report-table text-table-small">
                    <thead>
                        <tr>
                            <th/>
                            <th className="text-center text-value" width="15%">Free </th>
                            <th className="text-center text-value" width="15%">1st&nbsp;Load</th>
                            <th className="text-center text-value" width="15%">2nd&nbsp;Load</th>
                            <th className="text-center text-value" width="15%">Solid</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-right"><span className="text-value-small">Force</span></td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Force_Solid].value.toFixed(2)}</td>
                            <td className="text-left" colSpan="2">{this.props.symbol_table[o.Force_1].units}</td>
                        </tr>
                        <tr>
                            <td className="text-right"><span className="text-value-small">Deflection</span></td>
                            <td>{(0.0).toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(3)}</td>
                            <td>{(this.props.symbol_table[o.Free_Length].value - this.props.symbol_table[o.L_Solid].value).toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Deflect_2].units}</td>
                        </tr>
                        <tr>
                            <td className="text-right"><span className="text-value-small">Length</span></td>
                            <td>{this.props.symbol_table[o.Free_Length].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_Solid].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.L_1].units}</td>
                        </tr>
                        <tr>
                            <td className="text-right"><span className="text-value-small">Outside Dia.</span></td>
                            <td>{this.props.symbol_table[o.Free_OD].value.toFixed(3)}</td>
                            <td>{this.od_1.toFixed(3)}</td>
                            <td>{this.od_2.toFixed(3)}</td>
                            <td>{this.od_solid.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Free_OD].units}</td>
                        </tr>
                        <tr>
                            <td className="text-right"><span className="text-value-small">Inside Dia.</span></td>
                            <td>{this.props.symbol_table[o.ID_Free].value.toFixed(3)}</td>
                            <td>{this.id_1.toFixed(3)}</td>
                            <td>{this.id_2.toFixed(3)}</td>
                            <td>{(this.od_solid - 2.0 * this.props.symbol_table[o.Wire_Diameter].value).toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.ID_Free].units}</td>
                        </tr>
                        <tr>
                            <td className="text-right"><span className="text-value-small">Energy</span></td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td>{this.energy_1.toFixed(2)}</td>
                            <td>{this.energy_2.toFixed(2)}</td>
                            <td>{this.energy_S.toFixed(2)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Energy].units}</td>
                        </tr>
                        <tr>
                            <td className="text-right"><span className="text-value-small">Stress</span><sup>*</sup></td>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_Solid].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_1].units}</td>
                        </tr>
                        <tr>
                            <td className="text-right"><span className="text-value-small">% Tensile</span><sup>*</sup></td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.dhat).toFixed(1)}</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value / this.dhat).toFixed(1)}</td>
                            <td>{(this.props.symbol_table[o.Stress_Solid].value / this.dhat).toFixed(1)}</td>
                            <td className="text-left">%</td>
                        </tr>
                        <tr>
                            <td className="text-right"><span className="text-value-small">Static F.S.</span><sup>*</sup></td>
                            <td>Infinity</td>
                            <td>{this.fs_1.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.FS_Solid].value.toFixed(2)}</td>
                            <td className="text-left">{this.props.symbol_table[o.FS_Solid].units}</td>
                        </tr>
                        <tr>
                            <td className="text-left" colSpan="6"><sup>*</sup> without pre-set &nbsp; kw = <span className="text-value-small">{this.kw1.toFixed(3)}</span></td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <span className="text-value-row">Deflection at 2nd load is {this.props.symbol_table[o.PC_Avail_Deflect].value.toFixed(0)}% of total available deflection.</span><br />
                {this.pcadmsg}{this.pcadmsg !== undefined && <br />}
                {this.errmsg1}{this.errmsg1 !== undefined && <br />}
                {this.errmsg0}
                <hr/>
                <table id="view4" className="report-table">
                    <tbody>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.Data_Source].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.Data_Source].value}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.Mandril].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.Mandril].value} {this.props.symbol_table[o.ID_Free].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.Wind].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.Wind].value}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.Shot_peen].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.Shot_peen].value} {"(calculations assume: " + this.peenValue + ")"}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.Stress_relieve_HT].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.Stress_relieve_HT].value}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.Pre_set].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.Pre_set].value} (calculations assume: No pre-set)</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.Finish].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.Finish].value}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.Squareness].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.Squareness].value} deg.</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.End_use].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.End_use].value}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.Fits_in___Works_over].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.Fits_in___Works_over].value} {this.props.symbol_table[o.ID_Free].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.Operating_temp].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.Operating_temp].value}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-right">{this.props.labels[o.Special_notes___tol].name.replace(/_/g, ' ')}: </td>
                            <td className="text-left text-value">{this.props.labels[o.Special_notes___tol].value}</td>
                        </tr>
                        <tr>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table id="view5" className="report-table">
                    <tbody>
                        <tr>
                            <td className="text-left text-value-row" colSpan="2">Approved for Mfg.</td>
                            <td/>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr className="text-value-row">
                            <td className="text-left">By __________________________</td>
                        </tr>
                        <br />
                        <tr className="text-value-row">
                            <td className="text-left">Date  ________________________</td>
                        </tr>
                    </tbody>
                </table>
            <br/>
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
    labels: state.model.labels,
});

export default connect(mapStateToProps)(Report3);
