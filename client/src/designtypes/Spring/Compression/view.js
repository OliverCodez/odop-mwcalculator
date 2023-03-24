import React from 'react';
import DesignTable from "../../../components/DesignTable"
import Calculator from "./Calculator"
import Report from "./Report1"

export function getViewNames() {
    return [
        { name: "Advanced", title: 'Advanced', component: <DesignTable /> },
        { name: "Calculator", title: 'Calculator', component: <Calculator /> },
        { name: "Report", title: 'Report', component: <Report /> },
    ];
}
