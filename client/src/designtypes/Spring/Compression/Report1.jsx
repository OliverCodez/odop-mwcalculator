import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';
import { getAlertsBySeverity, ERR, WARN, NOTICE, INFO } from '../../../components/Alerts';

class Report1 extends ReportBase {

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

    render() {
        super.render();
//        console.log('In Report1.render this=',this);
        var line = 1;
        return (
            <>
                <h4 className="d-flex mt-3">
                    <span className="mr-auto">Spring Compression Report</span>
                </h4>
                <br />
                {this.hits > 0 ?
                    <><b>Alerts:</b><ul>
                        { getAlertsBySeverity(ERR   ).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li> ) }
                        { getAlertsBySeverity(WARN  ).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li> ) }
                        { getAlertsBySeverity(NOTICE).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li> ) }
                        { getAlertsBySeverity(INFO  ).map((entry) => <li key={line++} className={entry.className}>{entry.severity}: {entry.message}</li> ) }
                    </ul></>
                : '' }
                {this.hits > 0 && this.startpntmsg}{this.hits > 0 && <br />}
                {this.hits > 0 && <br />}
                <table id="view1" className="report-table">
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
                            <td>{this.props.symbol_table[o.End_Type].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-left text-value" colSpan="2">{this.et_tab[this.props.symbol_table[o.End_Type].value][0]}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>{this.props.symbol_table[o.Spring_Index].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Spring_Index].value.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Spring_Index].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Total_Coils].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Total_Coils].value.toFixed(3)}</td>
                            <td className="text-left text-value">{"total " + this.props.symbol_table[o.Total_Coils].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>{this.props.symbol_table[o.Rate].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Rate].value.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Rate].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Active_Coils].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Active_Coils].value.toFixed(3)}</td>
                            <td className="text-left text-value">{"active " + this.props.symbol_table[o.Active_Coils].units}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table id="view2" className="report-table text-table-small">
                    <thead>
                        <tr>
                            <td></td>
                            <td className="text-center"><span className="text-value">Force</span><br />{this.props.symbol_table[o.Force_1].units}</td>
                            <td className="text-center"><span className="text-value">Deflect</span><br />{this.props.symbol_table[o.Free_Length].units}</td>
                            <td className="text-center"><span className="text-value">Length</span><br />{this.props.symbol_table[o.Free_Length].units}</td>
                            <td/>
                            <td className="text-center"><span className="text-value">OD</span><br />{this.props.symbol_table[o.Free_OD].units}</td>
                            <td className="text-center"><span className="text-value">ID</span><br />{this.props.symbol_table[o.ID_Free].units}</td>
                            <td/>
                            <td className="text-center"><span className="text-value">Stress</span><br />{this.props.symbol_table[o.Stress_1].units}</td>
                            <td className="text-center"><span className="text-value">Static&nbsp;FS</span><br />{this.props.symbol_table[o.FS_2].units}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span className="text-value-small">Free</span></td>
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
                            <td><span className="text-value-small">1</span></td>
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
                            <td><span className="text-value-small">2</span></td>
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
                            <td><span className="text-value-small">Solid</span></td>
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
                <br/>
                <table id="view3" className="report-table">
                    <tbody>
                        <tr className="text-value-row">
                            <td>Safe Load</td>
                            <td>=</td>
                            <td className="text-value">{this.safe_load.toFixed(3)}</td>
                            <td className="text-left text-value">{this.safe_load_u}</td>
                            <td/>
                            <td>{this.len_lbl}</td>
                            <td>=</td>
                            <td className="text-value">{this.wire_len_t.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Free_Length].units}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>{this.props.symbol_table[o.Length_of_Stroke].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Length_of_Stroke].value.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Length_of_Stroke].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Weight].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.wgt1000.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Weight].units + "/1000"}</td>
                        </tr>
                        <tr className="text-value-row">
                            <td>Pitch</td>
                            <td>=</td>
                            <td className="text-value">{this.pitch.toFixed(3)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Free_Length].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Cycle_Life].name.replace(/_/g, ' ')}</td>
                            <td>=</td>
                            <td className="text-value">{this.props.symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                            <td className="text-left text-value">{this.props.symbol_table[o.Cycle_Life].units + " (estimate)"}</td>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <br />
                <span className="text-value-row">Deflection at load point 2 is {this.props.symbol_table[o.PC_Avail_Deflect].value.toFixed(0)}% of total available deflection.</span><br />
                {this.pcadmsg}{this.pcadmsg !== undefined && <br />}
                <br />
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
});

export default connect(mapStateToProps)(Report1);
