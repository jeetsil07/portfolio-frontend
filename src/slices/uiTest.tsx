import { BrowserRouter as Router } from 'react-router-dom';
import React, { JSXElementConstructor, ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import uiReducer from '../slices/ui'

interface WrapperProps{
    children: ReactNode;
}
export function renderWithProviders(
    ui: ReactElement<any, string | JSXElementConstructor<any>>,
    {
        preloadedState = {},
        store = configureStore({
            reducer: {
                ui: uiReducer,
            },

        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }: WrapperProps) {
        return <Provider store={store}>
            <Router>{children}</Router>
        </Provider>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}