import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { changeSymbolValue } from '../../store/actionCreators';

class ActionSelectCatalog extends React.Component {

    constructor(props) {
        console.log('In ActionSelectCatalog.constructor props=',props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSelectCatalogName = this.onSelectCatalogName.bind(this);
        this.onSelectCatalogEntry = this.onSelectCatalogEntry.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false,
            names: [],
            name: undefined,
            entries: [],
            entry: 0
        };
    }

    componentDidMount() {
        console.log('In ActionSelectCatalog componentDidMount this.state=',this.state);
        var { getCatalogNames, getCatalogEntries } = require('../../designtypes/'+this.props.type+'/catalog.js'); // Dynamically load getCatalogNames & getCatalogEntries
        var names = getCatalogNames();
        var name;
        if (names.length > 0)
            name = names[0]; // Default to first name
        // Loop to create p and x from symbol_table
        var p = [];
        this.props.symbol_table.forEach((element) => {
            if (element.input) {
                p.push(element.value);
            }
        });
        var x = [];
        this.props.symbol_table.forEach((element) => {
            if (!element.input) {
                x.push(element.value);
            }
        });
        var entries = getCatalogEntries(name, p, x);
        var entry;
        if (entries.length === 1)
            entry = 0; // Default to first entry
        else if (entries.length === 2)
            entry = 1; // Default to middle entry
        else // if (entries.length == 3)
            entry = 1; // Default to middle entry
        this.setState({
            names: names,
            name: name,
            entries: entries,
            entry: entry
        });
    }

    toggle() {
        console.log('In ActionSelectCatalog.toggle');
        var { getCatalogNames, getCatalogEntries } = require('../../designtypes/'+this.props.type+'/catalog.js'); // Dynamically load getCatalogNames & getCatalogEntries
        var names = getCatalogNames();
        var name;
        if (names.length > 0)
            name = names[0]; // Default to first name
        // Loop to create p and x from symbol_table
        var p = [];
        this.props.symbol_table.forEach((element) => {
            if (element.input) {
                p.push(element.value);
            }
        });
        var x = [];
        this.props.symbol_table.forEach((element) => {
            if (!element.input) {
                x.push(element.value);
            }
        });
        var entries = getCatalogEntries(name, p, x);
        var entry;
        if (entries.length === 1)
            entry = 0; // Default to first entry
        else if (entries.length === 2)
            entry = 1; // Default to middle entry
        else // if (entries.length == 3)
            entry = 1; // Default to middle entry
        this.setState({
            modal: !this.state.modal,
            names: names,
            name: name,
            entries: entries,
            entry: entry
        });
    }

    onSelectCatalogName(event) {
        console.log('In ActionSelectCatalog.onSelectCatalogName event.target.value=',event.target.value);
        var name = event.target.value;
        var { getCatalogEntries } = require('../../designtypes/'+this.props.type+'/catalog.js'); // Dynamically load getCatalogEntries
        // Loop to create p and x from symbol_table
        var p = [];
        this.props.symbol_table.forEach((element) => {
            if (element.input) {
                p.push(element.value);
            }
        });
        var x = [];
        this.props.symbol_table.forEach((element) => {
            if (!element.input) {
                x.push(element.value);
            }
        });
        var entries = getCatalogEntries(name, p, x);
        var entry;
        if (entries.length === 1)
            entry = 0; // Default to first entry
        else if (entries.length === 2)
            entry = 1; // Default to middle entry
        else // if (entries.length == 3)
            entry = 1; // Default to middle entry
        this.setState({
            name: name,
            entries: entries,
            entry: entry
        });
    }

    onSelectCatalogEntry(event) {
      console.log('In ActionSelectCatalog.onSelectCatalogEntry event.target.value=',event.target.value);
      this.setState({
          entry: parseFloat(event.target.value) 
      });
  }

    onSelect() {
        console.log('In ActionSelectCatalog.onSelect this.state=',this.state);
        this.setState({
            modal: !this.state.modal
        });
        // Do select catalog entry
        this.props.changeSymbolValue('OD_Free',this.state.entries[this.state.entry][1]);
        this.props.changeSymbolValue('Wire_Dia',this.state.entries[this.state.entry][2]);
        this.props.changeSymbolValue('L_Free',this.state.entries[this.state.entry][3]);
        this.props.changeSymbolValue('Coils_T',this.state.entries[this.state.entry][4]);
        // Given Material Name, this.state.entries[this.state.entry][5], look up material type index
        this.props.changeSymbolValue('Material_Type',2); // TODO: 2 (MUSIC_WIRE) is Fudge
        // Given End Type, this.state.entries[this.state.entry][6], look up end type index
        this.props.changeSymbolValue('End_Type',4); // TODO: 4 (Closed&Ground) is Fudge
    }

    onCancel() {
        console.log('In ActionSelectCatalog.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
        console.log('In ActionSelectCatalog.render this.state=',this.state);
        return (
            <React.Fragment>
                <DropdownItem onClick={this.toggle} disabled={this.state.names.length === 0}>
                    Select Catalog&hellip;
                </DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Select Catalog</ModalHeader>
                    <ModalBody>
                        <Label for="catalogNameSelect">Select catalog name:</Label>
                        <Input type="select" id="catalogNameSelect" onChange={this.onSelectCatalogName} value={this.state.name}>
                            {this.state.names.map((element, index) =>
                                <option key={index} value={element}>{element}</option>
                            )}
                        </Input>
                        <br />
                        <Label for="catalogEntrySelect">Select entry:</Label>
                        <Input type="select" id="catalogEntrySelect" onChange={this.onSelectCatalogEntry} value={this.state.entry}>
                            {this.state.entries.map((element, index) => (
                                <option key={index} value={index}>{element[0]}: [OD_Free: {element[1]}, Wire_Dia: {element[2]}, L_Free: {element[3]}, Coils_T: {element[4]}, Material_Type: {element[5]}, End_Type: {element[6]}]</option>
                            ))}
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
                        <Button color="primary" onClick={this.onSelect}>Select</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.type,
    symbol_table: state.symbol_table
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionSelectCatalog);