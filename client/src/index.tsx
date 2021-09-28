import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import {App} from './components/App/App';
import './index.css';

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
            <App />
    </BrowserRouter>,
    document.getElementById('root')
);
