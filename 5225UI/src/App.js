import React from 'react'
import './App.css';
import {Amplify, API, Storage} from 'aws-amplify';
import {Authenticator, Alert, useAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './aws-exports'


Amplify.configure(config);
export default function App() {
    return (
        <Authenticator.Provider signUpAttributes={[
            'email',
            'family_name',
            'given_name',
        ]}>

        </Authenticator.Provider>
    );
};

