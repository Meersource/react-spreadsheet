import React from 'react';
import { strings } from './localization'

class ComponentA extends React.Component {

    render() {
        return (
            <div>
                <h1>{strings.choice}{' 1'}</h1>
                {strings.setLanguage('it')}
                <h1>{strings.choice}{' 1'}</h1>
            </div>
        )
    }
}
export default ComponentA;