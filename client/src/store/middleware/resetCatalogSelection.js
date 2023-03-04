import { changeSymbolValue } from '../actionCreators';

// If any of the Catalog entries are changed,
// then reset Catalog Name and Number to blank
export function resetCatalogSelection(store, action) {
//    console.log('<li>','Start resetCatalogSelection store=',store,'action=',action,'</li><ul>');
    if (action.payload.name === "Free_OD" || // Compression and Extension
        action.payload.name === "Wire_Diameter" || // Compression and Extension
        action.payload.name === "Free_Length" || // Compression Only
        action.payload.name === "Total_Coils" || // Compression and Extension
        action.payload.name === "Initial_Tension" || // Extension Only
        action.payload.name === "Material_Type" || // Compression and Extension
        action.payload.name === "End_Type") { // Compression and Extension
        store.dispatch(changeSymbolValue('Catalog_Name', ''))
        store.dispatch(changeSymbolValue('Catalog_Number', ''))
    }
//    console.log('</ul><li>','End resetCatalogSelection','</li>');
}
 