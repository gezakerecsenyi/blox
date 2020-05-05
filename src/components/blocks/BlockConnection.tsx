import { ConnectionType } from '../../types';
import { ReactElement } from 'react';

interface Props {
    type: ConnectionType
}

export default function BlockConnection(props: Props): ReactElement {
    switch (props.type) {
        case 'top':
            return null;
        default:
            return null;
    }
}
