import React from 'react'
import { render, hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from '../app/App'

hydrate(
    <AppContainer>
        <App />
    </AppContainer>, document.getElementById('root'))

if (module.hot) {
    module.hot.accept('../app/App', () => {
        render(<AppContainer>
          <App />
        </AppContainer>, document.getElementById('root'))
    })
}