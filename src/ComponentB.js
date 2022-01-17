import React from 'react';
import { strings } from './localization'

class ComponentB extends React.Component {

    render() {
        return (
            <div>
                <h1>{strings.choice}{' 2'}</h1>
                {strings.setLanguage('en')}
                <h1>{strings.choice}{' 2'}</h1>
            </div>
        )
    }
}
export default ComponentB;