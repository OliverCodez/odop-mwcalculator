import React from 'react';
import { Container, Row, InputGroup, Form } from 'react-bootstrap';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import SymbolName from '../../../components/SymbolName';
import SymbolValue from '../../../components/SymbolValue';
import SymbolUnits from '../../../components/SymbolUnits';
import SymbolValueWireDia from '../SymbolValueWireDia';
import ValueName from '../../../components/ValueName';
import Value from '../../../components/Value';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

export class Calculator extends ReportBase {

    render() {
        super.render();
//        console.log('In Calculator.render this=',this);
        var isGround = 1.7;
        if ( this.et_tab[this.props.symbol_table[o.End_Type].value][0].includes('Grounded') ) isGround = 1;
        return (
            <Container>
                <Row>
                    <table className="report-table report-table-1">
                        <tbody>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                {this.props.symbol_table[o.Prop_Calc_Method].value === 1 ?
                                    <SymbolValue element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} />
                                    :
                                    <Value id="Material_Type" value={this.matTypeValue} />
                                }
                                <SymbolUnits element={this.props.symbol_table[o.Material_Type]} index={o.Material_Type} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <SymbolValue element={this.props.symbol_table[o.End_Type]} index={o.End_Type} />
                                <SymbolUnits element={this.props.symbol_table[o.End_Type]} index={o.End_Type} className="text-left" />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <table className="report-table">
                        <thead>
                            <tr className='report-table-head'>
                                <th></th>
                                <ValueName name={<><b>Length</b><br />{this.props.symbol_table[o.Free_Length].units}</>} tooltip="Length at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Deflection</b><br />{this.props.symbol_table[o.Free_Length].units}</>} tooltip="Deflection at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Force</b><br />{this.props.symbol_table[o.Force_1].units}</>} tooltip="Force at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>OD</b><br />{this.props.symbol_table[o.Free_OD].units}</>} tooltip="Outside Diameter at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>ID</b><br />{this.props.symbol_table[o.ID_Free].units}</>} tooltip="Inside Diameter at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Stress</b><br />{this.props.symbol_table[o.Stress_1].units}</>} tooltip="Stress at free point, point 1, point 2 and solid point" className="text-center" />
                                <ValueName name={<><b>Static FS</b><br />{this.props.symbol_table[o.FS_2].units}</>} tooltip="Static Factor of Safety at free point, point 1, point 2 and solid point" className="text-center" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <ValueName name={<b>Free</b>} tooltip="Free or no load point" />
                                <SymbolValue element={this.props.symbol_table[o.Free_Length]} index={o.Free_Length} />
                                <Value id="Deflection_Free" value={0.0} />
                                <Value id="Force_Free" value={0.0} />
                                <SymbolValue element={this.props.symbol_table[o.Free_OD]} index={o.Free_OD} />
                                <SymbolValue element={this.props.symbol_table[o.ID_Free]} index={o.ID_Free} />
                                <Value id="Stress_Free" value={0.0} />
                                <td className="align-middle">
                                    <InputGroup>
                                        <Form.Control type="text" disabled={true} className="text-right text-muted" value={"Infinity"} />
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <ValueName name={<b>1</b>} tooltip="Point 1 (minimum operating load)" />
                                <SymbolValue element={this.props.symbol_table[o.L_1]} index={o.L_1} />
                                <SymbolValue element={this.props.symbol_table[o.Deflect_1]} index={o.Deflect_1} />
                                <SymbolValue element={this.props.symbol_table[o.Force_1]} index={o.Force_1} />
                                <Value id="OD_1" value={this.od_1} />
                                <Value id="ID_1" value={this.id_1} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_1]} index={o.Stress_1} />
                                <Value id="Static_FS_1" value={this.fs_1} />
                            </tr>
                            <tr>
                                <ValueName name={<b>2</b>} tooltip="Point 2 (maximum operating load)" />
                                <SymbolValue element={this.props.symbol_table[o.L_2]} index={o.L_2} />
                                <SymbolValue element={this.props.symbol_table[o.Deflect_2]} index={o.Deflect_2} />
                                <SymbolValue element={this.props.symbol_table[o.Force_2]} index={o.Force_2} />
                                <Value id="OD_2" value={this.od_2} />
                                <Value id="ID_2" value={this.id_2} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_2]} index={o.Stress_2} />
                                <SymbolValue element={this.props.symbol_table[o.FS_2]} index={o.FS_2} />
                            </tr>
                            <tr>
                                <ValueName name={<b>Solid</b>} tooltip="Fully compressed" />
                                <SymbolValue element={this.props.symbol_table[o.L_Solid]} index={o.L_Solid} />
                                <Value id="Deflection_Solid" value={(this.props.symbol_table[o.Free_Length].value - this.props.symbol_table[o.L_Solid].value)} />
                                <SymbolValue element={this.props.symbol_table[o.Force_Solid]} index={o.Force_Solid} />
                                <Value id="OD_Solid" value={this.od_solid} />
                                <Value id="ID_Solid" value={(this.od_solid - 2.0 * this.props.symbol_table[o.Wire_Diameter].value)} />
                                <SymbolValue element={this.props.symbol_table[o.Stress_Solid]} index={o.Stress_Solid} />
                                <SymbolValue element={this.props.symbol_table[o.FS_Solid]} index={o.FS_Solid} />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <table className="report-table">
                        <tbody>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Length_of_Stroke]} index={o.Length_of_Stroke} />
                                <SymbolValue element={this.props.symbol_table[o.Length_of_Stroke]} index={o.Length_of_Stroke} />
                                <SymbolUnits element={this.props.symbol_table[o.Length_of_Stroke]} index={o.Length_of_Stroke} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Wire_Diameter]} index={o.Wire_Diameter} />
                                <SymbolValueWireDia element={this.props.symbol_table[o.Wire_Diameter]} index={o.Wire_Diameter} />
                                <SymbolUnits element={this.props.symbol_table[o.Wire_Diameter]} index={o.Wire_Diameter} className="text-left" />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Total_Coils]} index={o.Total_Coils} />
                                <SymbolValue element={this.props.symbol_table[o.Total_Coils]} index={o.Total_Coils} />
                                <SymbolUnits element={this.props.symbol_table[o.Total_Coils]} index={o.Total_Coils} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <SymbolValue element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} />
                                <SymbolUnits element={this.props.symbol_table[o.Spring_Index]} index={o.Spring_Index} className="text-left" />
                            </tr>
                            <tr>
                                <SymbolName element={this.props.symbol_table[o.Active_Coils]} index={o.Active_Coils} />
                                <SymbolValue element={this.props.symbol_table[o.Active_Coils]} index={o.Active_Coils} />
                                <SymbolUnits element={this.props.symbol_table[o.Active_Coils]} index={o.Active_Coils} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <SymbolValue element={this.props.symbol_table[o.Rate]} index={o.Rate} />
                                <SymbolUnits element={this.props.symbol_table[o.Rate]} index={o.Rate} className="text-left" />
                            </tr>
                            <tr>
                                <ValueName className='font-weight-bold' name="Safe Load" tooltip="Greatest static load that can be supported without exceeding maximum allowable stress (Stress_Lim_Stat)"/>
                                <Value id="Safe_Load" value={this.safe_load} />
                                <td className="text-left">{this.safe_load_u}</td>
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <SymbolValue element={this.props.symbol_table[o.Weight]} index={o.Weight} />
                                <SymbolUnits element={this.props.symbol_table[o.Weight]} index={o.Weight} className="text-left" />
                            </tr>
                            <tr>
                                <ValueName className='font-weight-bold' name="Pitch" tooltip="Pitch is the distance between two adjacent coils"/>
                                <Value id="Pitch" value={this.pitch} />
                                <SymbolUnits element={this.props.symbol_table[o.Free_Length]} index={o.Free_Length} className="text-left" />
                                <td> &nbsp; &nbsp; </td>
                                <SymbolName element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <SymbolValue element={this.props.symbol_table[o.Cycle_Life]} index={o.Cycle_Life} />
                                <td className="text-left">{this.cycle_life_u}</td>
                            </tr>
                            <tr>
                                <td className="align-middle font-weight-bold">
                                    <span>Free Length Tol.</span>
                                </td>
                                <td className="align-middle ">
                                    <InputGroup>
                                        <Form.Control type="text" disabled={true} className="text-right" value={((((((this.props.symbol_table[o.Free_Length].value * 25.4) + 10) * (this.props.symbol_table[o.Spring_Index].value + (25))) / 2000 ) * isGround) / 25.4).toFixed(3)} />
                                    </InputGroup>
                                </td>
                                <td clasclassNames="text-nowrap align-middle text-left">inches</td>
                                <td> &nbsp; &nbsp; </td>
                                <td className="align-middle symbol-name">
                                    <span>Coil Dia. Tol.</span>
                                </td>
                                <td className="align-middle ">
                                    <InputGroup>
                                        <Form.Control type="text" disabled={true} className="text-right" value={((((this.props.symbol_table[o.Free_OD].value + this.props.symbol_table[o.ID_Free].value) / 2) * 0.7) / ((Math.pow(this.props.symbol_table[o.Wire_Diameter].value, 0.398)) * 135) * 2).toFixed(3)} />
                                    </InputGroup>
                                </td>
                                <td clasclassNames="text-left">inches</td>
                            </tr>
                            <tr>
                                <td className="align-middle font-weight-bold">
                                    <span>Corrected % of MTS</span>
                                </td>
                                <td className="align-middle ">
                                    <div className="input-group">
                                        <input disabled="" type="text" className="text-right form-control" value="0.000" />
                                    </div>
                                </td>
                                <td clasclassNames="text-nowrap align-middle text-left"></td>
                                <td />
                                <td />
                                <td />
                                <td />
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
                <Row>
                    <table className="report-table">
                        <tbody>
                            <tr>
                                <td className='font-weight-bold'>
                                    Deflection at point 2 (maximum operating load) is
                                </td>
                                <SymbolValue element={this.props.symbol_table[o.PC_Avail_Deflect]} index={o.PC_Avail_Deflect} />
                                <td className='font-weight-bold'>
                                    % of total available deflection.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Row>
                <br />
           </Container>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Calculator);
