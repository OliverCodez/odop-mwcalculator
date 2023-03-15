import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

class Report2 extends ReportBase {

    constructor(props) {
//        console.log("In Report2.constructor props=",props);
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
//        console.log("In Report2.onClick event=",event);
        window.print();
        return false;
    }

    render() {
        super.render();
//        console.log('In Report2.render this.props=',this.props);
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
                            <td>{this.props.symbol_table[o.Torsion_Modulus].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Torsion_Modulus].value.toFixed(0) + ' ' + this.props.symbol_table[o.Torsion_Modulus].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>{this.props.symbol_table[o.Spring_Index].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Spring_Index].value.toFixed(3) + ' ' + this.props.symbol_table[o.Spring_Index].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Tensile].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Tensile].value.toFixed(0) + ' ' + this.props.symbol_table[o.Tensile].units}</td>
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
                            <td>Corrected % of MTS</td>
                            <td>=</td>
                            <td className="text-left text-value">0.000</td>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table id="view2" className="report-table text-table-small">
                    <thead>
                        <tr>
                            <th colSpan="4"></th>
                            <th/>
                            <th colSpan="2" className="text-center"><span className="text-value">---- kw2<sup>*</sup> ----</span></th>
                            <th/>
                            <th colSpan="3" className="text-center"><span className="text-value">-------- kw1<sup>*</sup> ---------</span></th>
                            <th/>
                            <th/>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-center"><span className="text-value text-caps">Force</span><br />{this.props.symbol_table[o.Force_1].units}</td>
                            <td className="text-center"><span className="text-value text-caps">Deflect</span><br />{this.props.symbol_table[o.Free_Length].units}</td>
                            <td className="text-center"><span className="text-value text-caps">Length</span><br />{this.props.symbol_table[o.Free_Length].units}</td>
                            <td/>
                            <td className="text-center"><span className="text-value text-caps">Stress</span><br />{this.props.symbol_table[o.Stress_1].units}</td>
                            <td className="text-center"><span className="text-value text-caps">%TS</span><br />%</td>
                            <td/>
                            <td className="text-center"><span className="text-value text-caps">Stress</span><br />{this.props.symbol_table[o.Stress_1].units}</td>
                            <td className="text-center"><span className="text-value text-caps">%TS</span><br />%</td>
                            <td className="text-center"><span className="text-value text-caps">Static&nbsp;FS</span><br />{this.props.symbol_table[o.FS_2].units}</td>
                            <td/>
                            <td className="text-center"><span className="text-value text-caps">Energy</span><br />{this.props.symbol_table[o.Energy].units}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span className="text-right text-value-small">Free</span></td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td>{(0.0).toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.Free_Length].value.toFixed(3)}</td>
                            <td/>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td/>
                            <td>{(0.0).toFixed(0)}</td>
                            <td>{(0.0).toFixed(1)}</td>
                            <td>Infinity</td>
                            <td/>
                            <td>{(0.0).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><span className="text-right text-value-small">1</span></td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td/>
                            <td>{this.kw2str1.toFixed(0)}</td>
                            <td>{(this.kw2str1 / this.dhat).toFixed(1)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.dhat).toFixed(1)}</td>
                            <td>{this.fs_1.toFixed(2)}</td>
                            <td/>
                            <td>{this.energy_1.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><span className="text-right text-value-small">2</span></td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td/>
                            <td>{this.kw2str2.toFixed(0)}</td>
                            <td>{(this.kw2str2 / this.dhat).toFixed(1)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value / this.dhat).toFixed(1)}</td>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(2)}</td>
                            <td/>
                            <td>{this.energy_2.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><span className="text-right text-value-small">Solid</span></td>
                            <td>{this.props.symbol_table[o.Force_Solid].value.toFixed(2)}</td>
                            <td>{(this.props.symbol_table[o.Free_Length].value - this.props.symbol_table[o.L_Solid].value).toFixed(4)}</td>
                            <td>{this.props.symbol_table[o.L_Solid].value.toFixed(3)}</td>
                            <td/>
                            <td>{this.kw2strs.toFixed(0)}</td>
                            <td>{(this.kw2strs / this.dhat).toFixed(1)}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_Solid].value.toFixed(0)}</td>
                            <td>{(this.props.symbol_table[o.Stress_Solid].value / this.dhat).toFixed(1)}</td>
                            <td>{this.props.symbol_table[o.FS_Solid].value.toFixed(2)}</td>
                            <td/>
                            <td>{this.energy_S.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <b><sup>*</sup></b> Calculations assume: {this.peenValue}; No set removal.
                <table id="view3" className="report-table">
                    <tbody>
                        <tr>
                            <td>kw1</td>
                            <td>=</td>
                            <td className="text-value-small">{this.kw1.toFixed(3)}</td>
                            <td className="text-left text-value-small">(Applies before set removal)</td>
                        </tr>
                        <tr>
                            <td>kw2</td>
                            <td>=</td>
                            <td className="text-value-small">{this.kw2.toFixed(3)}</td>
                            <td className="text-left text-value-small">(Applies after set removal)</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <span className="text-value">Stress Details</span>
                <table id="view4" className="report-table">
                    <tbody>
                        <tr className="text-value-row">
                            <td>Helix Angle</td>
                            <td>=</td>
                            <td className="text-left text-value">{this.hlx_ang.toFixed(2) + ' degrees'}</td>
                            <td/>
                            <td>Stress Ratio</td>
                            <td>=</td>
                            <td className="text-left text-value">{(this.props.symbol_table[o.Stress_1].value / this.props.symbol_table[o.Stress_2].value).toFixed(3) + ' ' + this.props.symbol_table[o.Spring_Index].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>Stress Amplitude</td>
                            <td>=</td>
                            <td className="text-left text-value" colSpan="5">{((this.props.symbol_table[o.Stress_2].value - this.props.symbol_table[o.Stress_1].value) / 2.0).toFixed(0) + ' ' + this.props.symbol_table[o.Stress_1].units}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <span className="text-value">Cycle Life Details</span>
                <table id="view5" className="report-table">
                    <tbody>
                        <tr className="text-value-row">
                            <td colSpan="7" className="text-left">Soderburg calculation inputs:</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>Stress Mean</td>
                            <td>=</td>
                            <td className="text-left text-value">{((this.props.symbol_table[o.Stress_1].value + this.props.symbol_table[o.Stress_2].value) / 2.0).toFixed(0) + ' ' + this.props.symbol_table[o.Stress_1].units}</td>
                            <td/>
                            <td>Stress Range</td>
                            <td>=</td>
                            <td className="text-left text-value">{(this.props.symbol_table[o.Stress_2].value - this.props.symbol_table[o.Stress_1].value).toFixed(0) + ' ' + this.props.symbol_table[o.Stress_1].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>{this.props.symbol_table[o.Stress_Lim_Stat].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Stress_Lim_Stat].value.toFixed(0) + ' ' + this.props.symbol_table[o.Stress_Lim_Stat].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Stress_Lim_Endur].name.replace(/_/g, ' ')}<sup>*</sup></td>
                            <td>=</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Stress_Lim_Endur].value.toFixed(0) + ' ' + this.props.symbol_table[o.Stress_Lim_Endur].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td colSpan="4"></td>
                            <td>{this.props.symbol_table[o.Life_Category].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td><span className="text-value text-left">{this.lifeTargValue}</span></td>
                        </tr>
                        <tr className="text-value-row">
                            <td colSpan="7" className="text-left">Soderberg calculation result: {this.props.symbol_table[o.FS_CycleLife].name.replace(/_/g, ' ')} = <span className="text-left text-value">{this.props.symbol_table[o.FS_CycleLife].value.toFixed(3) + ' ' + this.props.symbol_table[o.FS_CycleLife].units}</span></td>
                        </tr>
                    </tbody>
                </table>
                <br />
                {this.clWarnString === "" ?
                    <>
                        <table id="view6" className="report-table">
                            <tbody>
                                <tr className="text-value-row">
                                    <td colSpan="7" className="text-left">Modified Goodman calculation inputs:</td>
                                </tr>
                                <tr className="text-value-row">
                                    <td>{this.props.symbol_table[o.Material_Type].name.replace(/_/g, ' ')}</td>
                                    <td>=</td>
                                    <td className="text-left text-value">{this.matTypeValue}</td>
                                    <td/>
                                    <td colSpan="3" className="text-center">{this.peenValue}</td>
                                </tr>
                                <tr className="text-value-row">
                                    <td>{this.props.symbol_table[o.Tensile].name.replace(/_/g, ' ')}</td>
                                    <td>=</td>
                                    <td className="text-left text-value">{this.props.symbol_table[o.Tensile].value.toFixed(0) + ' ' + this.props.symbol_table[o.Tensile].units}</td>
                                    <td/>
                                    <td>{this.props.symbol_table[o.PC_Tensile_Endur].name.replace(/_/g, ' ')}<sup>*</sup></td>
                                    <td>=</td>
                                    <td className="text-left text-value">{this.props.symbol_table[o.PC_Tensile_Endur].value.toFixed(0) + ' ' + this.props.symbol_table[o.PC_Tensile_Endur].units}</td>
                                </tr>
                                <tr className="text-value-row">
                                    <td>{this.props.symbol_table[o.Stress_1].name.replace(/_/g, ' ')}</td>
                                    <td>=</td>
                                    <td className="text-left text-value">{this.props.symbol_table[o.Stress_1].value.toFixed(0) + ' ' + this.props.symbol_table[o.Stress_1].units}</td>
                                    <td/>
                                    <td>{this.props.symbol_table[o.Stress_2].name.replace(/_/g, ' ')}</td>
                                    <td>=</td>
                                    <td className="text-left text-value">{this.props.symbol_table[o.Stress_2].value.toFixed(0) + ' ' + this.props.symbol_table[o.Stress_2].units}</td>
                               </tr>
                                <tr className="text-value-row">
                                    <td colSpan="7" className="text-left">Modified Goodman calculation result: {this.props.symbol_table[o.Cycle_Life].name.replace(/_/g, ' ')} = <span className="text-left text-value">{this.props.symbol_table[o.Cycle_Life].value.toFixed(0) + ' ' + this.props.symbol_table[o.Cycle_Life].units + ' (estimate)'}</span></td>
                               </tr>
                           </tbody>
                        </table>
                    </>
                :
                    <>{this.clWarnString}</>
                }
                <br/>
                <sup>*</sup><span className="text-value-row">Source data for %_Tensile_Endur (Stress_Lim_Endur) based on Stress Ratio = <b>0.</b></span>
                <br/>
                <br/>
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Report2);
