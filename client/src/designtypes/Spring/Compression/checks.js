import * as o from './symbol_table_offsets';
import { checks as commonChecks, clearAlerts, addAlert, check_message, check_DCD_alert, ERR, WARN, INFO } from '../../../components/Alerts';
import { CONSTRAINED, MIN, MAX } from '../../../store/actionTypes';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

export function checks(store) {        /*    Compression  Spring  */
//    console.log('<li>','@@@@@ Start check store=',store,'</li><ul>');
    clearAlerts();
    var design = store.getState();

// Alerts common to all round-wire coil springs 

    if (design.model.symbol_table[o.Wire_Diameter].value > design.model.symbol_table[o.ID_Free].value) {
        addAlert({
            element: design.model.symbol_table[o.Wire_Diameter],
            name: design.model.symbol_table[o.Wire_Diameter].name, 
            message: check_message(design,o.Wire_Diameter,'>',o.ID_Free),
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Wire_Diameter_GT_ID_Free)'
        });
        addAlert({
            element: design.model.symbol_table[o.ID_Free],
            name: design.model.symbol_table[o.ID_Free].name, 
            message: check_message(design,o.ID_Free,'<=',o.Wire_Diameter),
            severity: WARN,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Wire_Diameter].value < 0.5 * design.model.symbol_table[o.tbase010].value && design.model.symbol_table[o.Prop_Calc_Method].value === 1) {
        addAlert({
            element: design.model.symbol_table[o.Wire_Diameter],
            name: design.model.symbol_table[o.Wire_Diameter].name, 
            message: 'Material properties for this ' + design.model.symbol_table[o.Wire_Diameter].name + ' (' + design.model.symbol_table[o.Wire_Diameter].value.toODOPPrecision() + ') may not be accurate.',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#MatPropAccuracy)'
        });
    }
    if (design.model.symbol_table[o.Wire_Diameter].value > 5.0 * design.model.symbol_table[o.tbase400].value && design.model.symbol_table[o.Prop_Calc_Method].value === 1) {
        addAlert({
            element: design.model.symbol_table[o.Wire_Diameter],
            name: design.model.symbol_table[o.Wire_Diameter].name, 
            message: 'Material properties for this ' + design.model.symbol_table[o.Wire_Diameter].name + ' (' + design.model.symbol_table[o.Wire_Diameter].value.toODOPPrecision() + ') may not be accurate.',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#MatPropAccuracy)'
        });
    }
    if (design.model.symbol_table[o.Life_Category].value > 1 && !(design.model.symbol_table[o.FS_CycleLife].lmin & CONSTRAINED)) {
        addAlert({
            element: design.model.symbol_table[o.FS_CycleLife], 
            name: design.model.symbol_table[o.FS_CycleLife].name, 
            message: design.model.symbol_table[o.FS_CycleLife].name + ' MIN is not set.', 
            severity: WARN, 
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#FS_CycleLife_MIN_not_set)'
        });
    }
    if (design.model.symbol_table[o.FS_2].lmax & CONSTRAINED && design.model.symbol_table[o.FS_2].value > design.model.symbol_table[o.FS_2].cmax && design.model.result.objective_value > design.model.system_controls.objmin) {
        addAlert({
            element: design.model.symbol_table[o.FS_2], 
            name: design.model.symbol_table[o.FS_2].name, 
            message: 'Over-design concern', 
            severity: WARN, 
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#OverDesign)' 
        });
    }
    if (design.model.symbol_table[o.Active_Coils].value < 1.0) {
        addAlert({
            element: design.model.symbol_table[o.Active_Coils],
            name: design.model.symbol_table[o.Active_Coils].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Active_Coils].name + ' (' + design.model.symbol_table[o.Active_Coils].value.toODOPPrecision() + ') < 1.0',
            severity: WARN, 
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Active_Coils_LT_1)'
        });
    }
    if (design.model.symbol_table[o.Spring_Index].value < 4.0 || design.model.symbol_table[o.Spring_Index].value > 25.0) {
        addAlert({
            element: design.model.symbol_table[o.Spring_Index], 
            name: design.model.symbol_table[o.Spring_Index].name, 
            message: 'Manufacturability concern', 
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#SI_manufacturability)' 
        });
    }
    if (design.model.symbol_table[o.Prop_Calc_Method].value !== 1) {
        if (design.model.symbol_table[o.Cycle_Life].lmin & CONSTRAINED || design.model.symbol_table[o.Cycle_Life].lmax & CONSTRAINED) {
            addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name, 
                message: design.model.symbol_table[o.Cycle_Life].name + ' calculation not available',
                severity: WARN,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA)'
            });
        } else {
            addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name, 
                message: design.model.symbol_table[o.Cycle_Life].name + ' calculation not available',
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA)'
            });
        }
    }
    if (design.model.symbol_table[o.FS_2].value <= 1.0) {
        if (design.model.symbol_table[o.Cycle_Life].lmin & CONSTRAINED || design.model.symbol_table[o.Cycle_Life].lmax & CONSTRAINED) {
            addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name, 
                message: design.model.symbol_table[o.Cycle_Life].name + ' not defined beyond yield',
                severity: WARN,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA_FS_2)'
            });
        } else {
            addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name, 
                message: design.model.symbol_table[o.Cycle_Life].name + ' not defined beyond yield',
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA_FS_2)'
            });
        }
    }
    if ((design.model.symbol_table[o.Cycle_Life].lmin & CONSTRAINED && design.model.symbol_table[o.Cycle_Life].value < 1e+4) || (design.model.symbol_table[o.Cycle_Life].lmax & CONSTRAINED && design.model.symbol_table[o.Cycle_Life].value > 1e+7)) {
            addAlert({
                element: design.model.symbol_table[o.Cycle_Life],
                name: design.model.symbol_table[o.Cycle_Life].name, 
                message: design.model.symbol_table[o.Cycle_Life].name + ' value is extrapolated',
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeExtrapolated)'
            });
    }

    check_DCD_alert(design.model.symbol_table[o.Active_Coils], MIN, '');
    check_DCD_alert(design.model.symbol_table[o.Spring_Index], MIN, '');
    check_DCD_alert(design.model.symbol_table[o.Spring_Index], MAX, '');
    check_DCD_alert(design.model.symbol_table[o.FS_2], MIN, '');
    check_DCD_alert(design.model.symbol_table[o.FS_2], MAX, '');

    if (design.model.symbol_table[o.Tensile].value <= design.model.system_controls.smallnum) {
        addAlert({
            element: design.model.symbol_table[o.Tensile],
            name: design.model.symbol_table[o.Tensile].name, 
            message: 'RELATIONSHIP: ' + design.model.symbol_table[o.Tensile].name + ' (' + design.model.symbol_table[o.Tensile].value.toODOPPrecision() + ') <= ' + design.model.system_controls.smallnum.toODOPPrecision(),
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/alerts.html#TensileValueSuspect)'
        });
    }

// Alerts specific to compression springs. 

    if (design.model.symbol_table[o.Force_1].value > design.model.symbol_table[o.Force_2].value) {
        addAlert({
            element: design.model.symbol_table[o.Force_1], 
            name: design.model.symbol_table[o.Force_1].name, 
            message: check_message(design,o.Force_1,'>',o.Force_2),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#F1_GT_F2)',
        });
        addAlert({
            element: design.model.symbol_table[o.Force_2], 
            name: design.model.symbol_table[o.Force_2].name, 
            message: check_message(design,o.Force_2,'<',o.Force_1),
            severity: ERR,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Force_2].value > design.model.symbol_table[o.Force_Solid].value) {
        addAlert({
            element: design.model.symbol_table[o.Force_2],
            name: design.model.symbol_table[o.Force_2].name, 
            message: check_message(design,o.Force_2,'>',o.Force_Solid),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#Excess_Force)'
        });
        addAlert({
            element: design.model.symbol_table[o.Force_Solid],
            name: design.model.symbol_table[o.Force_Solid].name, 
            message: check_message(design,o.Force_Solid,'<',o.Force_2),
            severity: ERR,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.Free_Length].value < design.model.symbol_table[o.L_Solid].value) {
        addAlert({
            element: design.model.symbol_table[o.Free_Length],
            name: design.model.symbol_table[o.Free_Length].name, 
            message: check_message(design,o.Free_Length,'<',o.L_Solid),
            severity: ERR,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#Free_Length_LT_L_Solid)'
        });
        addAlert({
            element: design.model.symbol_table[o.L_Solid],
            name: design.model.symbol_table[o.L_Solid].name, 
            message: check_message(design,o.L_Solid,'>=',o.Free_Length),
            severity: ERR,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.L_2].value < design.model.symbol_table[o.L_Solid].value) {
        addAlert({
            element: design.model.symbol_table[o.L_2],
            name: design.model.symbol_table[o.L_2].name, 
            message: check_message(design,o.L_2,'<',o.L_Solid),
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#L_2_LT_L_Solid)'
        });
        addAlert({
            element: design.model.symbol_table[o.L_Solid],
            name: design.model.symbol_table[o.L_Solid].name, 
            message: check_message(design,o.L_Solid,'>=',o.L_2),
            severity: WARN,
            duplicate: true
        });
    }
    if (design.model.symbol_table[o.FS_Solid].value < 1.0) {
        addAlert({
            element: design.model.symbol_table[o.FS_Solid], 
            name: design.model.symbol_table[o.FS_Solid].name, 
            message: design.model.symbol_table[o.FS_Solid].name + ' (' + design.model.symbol_table[o.FS_Solid].value.toODOPPrecision() + ') < 1.0',
            severity: WARN,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#FS_Solid_LT_1)'
        });
    }

    check_DCD_alert(design.model.symbol_table[o.Deflect_1], MIN, 'C');
    check_DCD_alert(design.model.symbol_table[o.FS_Solid], MIN, 'C');
    check_DCD_alert(design.model.symbol_table[o.PC_Avail_Deflect], MAX, 'C');

    var deflectRatio = design.model.symbol_table[o.Deflect_2].value / design.model.symbol_table[o.Free_Length].value;
    var sq1 = 1.4 * design.model.symbol_table[o.Slenderness].value - 4.0;
    var buckleMsg;
    if (sq1 > design.model.system_controls.smallnum) {  /* structured to avoid div by 0 */
        if (deflectRatio > 0.76 / sq1) {
            buckleMsg = "Given fixed/free  ends, a deflection ratio of " + deflectRatio.toFixed(3) +
                       "  and a Slenderness ratio of " + design.model.symbol_table[o.Slenderness].value.toFixed(1) + ", " +
                       "this spring tends to buckle.";
            addAlert({
                element: design.model.symbol_table[o.Slenderness], 
                name: design.model.symbol_table[o.Slenderness].name, 
                message: buckleMsg,
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#buckling)'
            });
        }
    }
    sq1 = 2.0 * design.model.symbol_table[o.Slenderness].value - 8.0;
    if (sq1 > design.model.system_controls.smallnum) {  /* structured to avoid div by 0 */
        if (deflectRatio > 1.6 / sq1) {
            buckleMsg = "Given fixed/fixed ends, this spring also tends to buckle.";
            addAlert({
                element: design.model.symbol_table[o.Slenderness], 
                name: design.model.symbol_table[o.Slenderness].name, 
                message: buckleMsg,
                severity: INFO,
                help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#buckling)'
            });
        }
    }
    var PC_Avail_Deflect1 = 100.0 * design.model.symbol_table[o.Deflect_1].value / (design.model.symbol_table[o.Free_Length].value - design.model.symbol_table[o.L_Solid].value); 
    if (PC_Avail_Deflect1 < 20.0) {
        addAlert({
            value: PC_Avail_Deflect1, 
            name: '%_Avail_Deflect@1', 
            message: '%_Avail_Deflect@1 (' + PC_Avail_Deflect1.toODOPPrecision() + ') < 20',
            severity: INFO,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect1_LT_20)'
        });
    }
    if (design.model.symbol_table[o.PC_Avail_Deflect].value > 80.0) {
        addAlert({
            element: design.model.symbol_table[o.PC_Avail_Deflect], 
            name: design.model.symbol_table[o.PC_Avail_Deflect].name + '@2', 
            message: '%_Avail_Deflect@2 (' + design.model.symbol_table[o.PC_Avail_Deflect].value.toODOPPrecision() + ') > 80',
            severity: INFO,
            help_url: '[Help](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect2_GT_80)'
        });
    }

    commonChecks(store); // Now run the generic checks after the more specific checks

//    console.log('</ul><li>','End check','</li>');

}