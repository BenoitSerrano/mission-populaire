import { EventEmitter } from 'events';

import { eventNameType } from './types';

const nativeEventEmitter = new EventEmitter();

function buildEventHandler<dataT>(eventName: eventNameType) {
    return {
        on: (handler: (data: dataT) => void) => {
            nativeEventEmitter.on(eventName, handler);
        },
        emit: (data: dataT) => nativeEventEmitter.emit(eventName, data),
    };
}

export { buildEventHandler };
