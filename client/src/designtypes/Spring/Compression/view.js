import React from 'react';
import DesignTable from "../../../components/DesignTable"
import Calculator from "./Calculator"
import FooterReport from "./FooterReport"

export function getViewNames() {
    return [
        { name: "Advanced", title: 'Advanced', component: <DesignTable /> },
        { name: "Calculator", title: 'Calculator', component: <Calculator /> },
        { name: "FooterReport", title: 'FooterReport', component: <FooterReport /> },
    ];
}
