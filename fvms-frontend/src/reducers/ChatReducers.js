import * as Actions from '../actions/Actions';

const initialState = {
    counter: 0,
    chatOpened: false
};

const chatReducers = (state = initialState, action) => {

    switch (action.type) {

        case Actions.CHAT_SET_NEW_COUNTER_VALUE:
            const chatOpened = action.counter === 0 ? true: false;
            return {
                ...state,
                counter: action.counter,
                chatOpened: chatOpened
            };
        case Actions.CHAT_SET_CHAT_OPENED_VALUE:
            return {
                ...state,
                chatOpened: action.chatOpened,
            };

        default: return state;
    }
};

export default chatReducers;