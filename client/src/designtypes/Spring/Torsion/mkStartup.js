import React from 'react';
import {
    loadInitialState,
    changeName,
    changeLabelsValue,
    startup,
} from '../../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Make Startup model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Spring/Torsion","US"),'}</li>
                        <li>{'changeName("Startup"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Torsion Spring default start point - US units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                </>
            ),
            actions: [
                loadInitialState("Spring/Torsion","US"),
                changeName("Startup"),
                changeLabelsValue([{name: "COMMENT", value: "Torsion Spring default start point - US units ..."}]),
                startup(),
            ]
        }
    ]
}
