import * as Actions from '../actions/Actions';

const initialState = {
    friends: []
};

const friendsReducers = (state = initialState, action) => {

    switch (action.type) {

        case Actions.FETCH_FRIENDS_STORAGE:
        case Actions.FETCH_FRIENDS:
            return {
                ...state,
                friends: action.friends
            };

        default: return state;
    }
};

export default friendsReducers;