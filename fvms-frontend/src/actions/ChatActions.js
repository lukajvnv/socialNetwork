export const CHAT_SET_NEW_COUNTER_VALUE = '[CHAT] SET NEW COUNTER VALUE';
export const CHAT_SET_CHAT_OPENED_VALUE = '[CHAT] SET CHAT OPENED VALUE';

export function chatSetNewCounterValue(counter) {
    return {
        type: CHAT_SET_NEW_COUNTER_VALUE,
        counter
    }
}

export function chatSetChatOpenedValue(chatOpened) {
    return {
        type: CHAT_SET_CHAT_OPENED_VALUE,
        chatOpened
    }
}