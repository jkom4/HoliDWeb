import React from 'react';
import {ReactAgenda, ReactAgendaCtrl, guid, Modal} from 'react-agenda';
import {connect, useSelector} from "react-redux";
import {selectCurrentUser} from "../../features/AuthSlice";
import {selectVacances} from "../../features/VacancesSlices";

require('moment/locale/fr.js'); // this is important for traduction purpose

var colors = {
    'color-1': "rgba(102, 195, 131 , 1)",
    "color-2": "rgba(242, 177, 52, 1)",
    "color-3": "rgba(235, 85, 59, 1)"
}


var now = new Date();

var items = [
    {
        _id: guid(),
        name: 'Meeting , dev staff!',
        startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
        endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
        classes: 'color-1'
    },
    {
        _id: guid(),
        name: 'Working lunch , Holly',
        startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 0),
        endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 13, 0),
        classes: 'color-2 color-3'
    },

];

const convertirVacancesEnItems = (vacances) => {
    const items = [];
   // vacances = []
    // Logique pour attribuer des classes de couleur
    const classes = ['color-1', 'color-2', 'color-3'];
    let classeIndex = 0;

     vacances.forEach((vacance) => {
        vacance.activites.forEach((activite) => {
            const item = {
                _id: activite.id,
                name: activite.nom,
                startDateTime: new Date(activite.dateDebut),
                endDateTime: new Date(activite.dateFin),
                classes: classes[classeIndex]

            };
            items.push(item);
        });

        // Incrémente l'index pour passer à la couleur suivante
        classeIndex = (classeIndex + 1) % classes.length;


    });

    return items;
};

class Agenda extends React.Component {

    constructor(props) {

        super(props);
        const itemsVacances = convertirVacancesEnItems(this.props.vacances);
        this.state = {
            items: itemsVacances,
            selected: [],
            cellHeight: 30,
            showModal: false,
            locale: "fr",
            rowsPerHour: 2,
            numberOfDays: 10,
            startDate: new Date()
        }
        this.handleCellSelection = this.handleCellSelection.bind(this)
        this.handleItemEdit = this.handleItemEdit.bind(this)
        this.handleRangeSelection = this.handleRangeSelection.bind(this)
    }

    handleCellSelection(item) {
        console.log('handleCellSelection', item)
    }

    handleItemEdit(item) {
        console.log('handleItemEdit', item)
        this.setState({showModal: true})
    }

    handleRangeSelection(item) {
        console.log('handleRangeSelection', item)
    }

    render() {
        return (
            <div>

                <ReactAgenda
                    minDate={now}
                    maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
                    disablePrevButton={false}
                    startDate={this.state.startDate}
                    cellHeight={this.state.cellHeight}
                    locale={this.state.locale}
                    items={this.state.items}
                    numberOfDays={this.state.numberOfDays}
                    rowsPerHour={this.state.rowsPerHour}
                    itemColors={colors}
                    autoScale={false}
                    fixedHeader={true}
                    onItemEdit={this.handleItemEdit.bind(this)}
                    onCellSelect={this.handleCellSelection.bind(this)}
                    onRangeSelection={this.handleRangeSelection.bind(this)}/>
                {
                    this.state.showModal ?
                        <Modal clickOutside={() => this.setState({showModal: false})}>

                            <div className="modal-content">
                                <ReactAgendaCtrl
                                    items={this.state.items}
                                    itemColors={colors}
                                    selectedCells={this.state.selected}
                                    Addnew={this.addNewEvent}
                                    edit={this.editEvent}/>
                            </div>

                        </Modal> : ''
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    vacances: selectVacances(state) ,
});

export default connect(mapStateToProps)(Agenda);