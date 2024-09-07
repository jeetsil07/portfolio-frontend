declare module 'react-loadable' {
    import * as React from 'react';

    interface LoadableOptions {
        loader: () => Promise<any>;
        loading: React.ComponentType<any>;
        modules?: string[];
        delay?: number;
        timeout?: number;
        webpack?: () => any[];
    }

    export default function Loadable(options: LoadableOptions): React.ComponentType<any>;
}
