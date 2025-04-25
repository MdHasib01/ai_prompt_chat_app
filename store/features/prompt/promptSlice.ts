import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { generatePrompt } from "../../../app/GeneratePrompt";
type Message = {
  id: string | number;
  type: "user" | "bot";
  text: string;
  loading?: boolean;
};

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

export const fetchBotResponse = createAsyncThunk<string, string>(
  "chat/fetchBotResponse",
  async (userInput) => {
    const botResponse = await generatePrompt(userInput);
    return botResponse;
  }
);
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: Date.now(),
        type: "user",
        text: action.payload,
      });
    },
    addBotTyping: (state) => {
      state.messages.push({
        id: "typing",
        type: "bot",
        text: "typing...",
        loading: true,
      });
    },
    updateBotMessage: (state, action: PayloadAction<string>) => {
      const index = state.messages.findIndex((msg) => msg.id === "typing");
      if (index !== -1) {
        state.messages[index] = {
          id: Date.now(),
          type: "bot",
          text: action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBotResponse.fulfilled, (state, action) => {
      chatSlice.caseReducers.updateBotMessage(state, {
        payload: action.payload,
        type: "chat/updateBotMessage",
      });
    });
  },
});

export const { addUserMessage, addBotTyping, updateBotMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
