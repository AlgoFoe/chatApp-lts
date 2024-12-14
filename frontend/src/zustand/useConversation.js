import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  allConversations: [],
  setAllConversations: (newConversations) => set({ allConversations: newConversations }),

  updateConversation: (selectedChatConversation, message, senderId,formattedTime) => set((state) => {
    const index = state.allConversations.findIndex(conversation => conversation._id === selectedChatConversation._id);
    if (index !== -1) {
      const updatedConversation = {
        ...state.allConversations[index],
        lastMessage: {
          text: message,
          sender: senderId,
          updatedTime:formattedTime
        }
      };
      return {
        allConversations: [
          ...state.allConversations.slice(0, index),
          updatedConversation,
          ...state.allConversations.slice(index + 1)
        ]
      };
    }
    return state;
  }),
  updateNewConversation: (newMessage,formattedTime) => set((state) => {
    const index = state.allConversations.findIndex(conversation => conversation._id === newMessage.conversationId);
    if (index !== -1) {
      const updatedConversation = {
        ...state.allConversations[index],
        lastMessage: {
          text: newMessage.message,
          sender: newMessage.senderId,
          updatedTime:formattedTime
        }
      };
      return {
        allConversations: [
          ...state.allConversations.slice(0, index),
          updatedConversation,
          ...state.allConversations.slice(index + 1)
        ]
      };
    }
    return state;
  }),
  chatConversation: [],
  setChatConversation: (chatConversation) => set({ chatConversation }),
  formattedTimeOfLastMsg: '',
  setFormattedTimeOfLastMsg: (formattedTimeOfLastMsg) => set({ formattedTimeOfLastMsg }),
  lastMsgText: '',
  setLastMsgText: (lastMsgText) => set({ lastMsgText }),
  receiverId: '',
  setReceiverId: (receiverId) => set({ receiverId }),
  senderId: '',
  setSenderId: (senderId) => set({ senderId }),

  selectedChatConversation: {
    _id: "",
    userId: "",
    userProfilePic: "",
    username: ""
  },
  setSelectedChatConversation: (selectedChatConversation) => set({ selectedChatConversation }),

  markMessagesAsSeen: () => set((state) => ({
    messages: state.messages.map((message) =>
      !message.seen ? { ...message, seen: true } : message
    )
  })),
  updateConversationSeenStatus: (conversationId) => set((state) => ({
    allConversations: state.allConversations.map((conversation) =>
      conversation._id === conversationId
        ? {
            ...conversation,
            lastMessage: {
              ...conversation.lastMessage,
              seen: true,
            },
          }
        : conversation
    ),
  })),
}));

export default useConversation;
