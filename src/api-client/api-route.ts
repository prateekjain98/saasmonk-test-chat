// conversation-participant
const conversationParticipant = "/conversation-participant";
export const createConversationParticipantRoute = `${conversationParticipant}/create`;

// conversation
const conversation = "/conversation";
export const createConversationRoute = `${conversation}/create`;

// message
const message = "/message";
export const createMessageRoute = `${message}/send`;
export const getAllMessagesRoute = `${message}/getAllMessages`;
export const setActionCompletedRoute = `${message}/setActionCompleted`;