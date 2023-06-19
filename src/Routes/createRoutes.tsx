import React from 'react'
import { RoutesProvider } from '../Provider/RoutesProvider/RoutesProvider'

export const createRoutes = (args: any) => {
    return {
        ...args,
        element:
            <RoutesProvider>
                <args.element />
            </RoutesProvider>,
        errorElement: <h1>Something went wrong...</h1>
    }
}
