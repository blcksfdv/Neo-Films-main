import React, { FC, PropsWithChildren, Suspense } from 'react'

export const RoutesProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Suspense fallback={<h1>loading...</h1>}>
            {children}
        </Suspense>
    )
}
