import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { generatePrompt } from "../../../app/GeneratePrompt";
import { AppDispatch } from "@/store/store";
type Message = {
  id: string | number;
  type: "user" | "bot";
  text: string;
  loading?: boolean;
};

type History = {
  type: "user" | "bot";
  text: string;
};
interface ChatState {
  messages: Message[];
  history: History[];
}

const initialState: ChatState = {
  messages: [],
  history: [],
};
export const fetchBotResponse = createAsyncThunk<
  string,
  { userInput: string; dispatch: AppDispatch; history: History[] }
>("chat/fetchBotResponse", async ({ userInput, dispatch, history }) => {
  const botResponse = await generatePrompt(userInput, dispatch, history);
  return botResponse;
});
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
    addHistory: (state, action: PayloadAction<History>) => {
      state.history.push(action.payload);
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

export const { addUserMessage, addBotTyping, updateBotMessage, addHistory } =
  chatSlice.actions;

export default chatSlice.reducer;
