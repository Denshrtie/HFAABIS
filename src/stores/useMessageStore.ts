import { create } from 'zustand';
import { Conversation, Message, ProviderType } from '../types';
import { INITIAL_CONVERSATIONS } from '../data/messages';

const STORAGE_KEY_MESSAGES = 'hfaabis_messages_v1';

function loadConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (!raw) return INITIAL_CONVERSATIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return INITIAL_CONVERSATIONS;
  } catch (e) {
    console.error('Error loading conversations from localStorage:', e);
    return INITIAL_CONVERSATIONS;
  }
}

function getContextualProviderReply(userText: string, programName?: string): string {
  const lower = userText.toLowerCase();

  if (lower.includes('medical certificate') || lower.includes('certificate') || lower.includes('abstract') || lower.includes('doctor')) {
    return "Yes. A medical certificate or clinical abstract is required for this program. Please check the Requirements section for the complete document checklist.";
  }

  if (lower.includes('available') || lower.includes('availability') || lower.includes('open') || lower.includes('slot') || lower.includes('still')) {
    return "The program is currently marked as available in this prototype. Please note that actual availability must be confirmed by the assistance provider.";
  }

  if (lower.includes('submit') || lower.includes('where') || lower.includes('pass') || lower.includes('office') || lower.includes('bring')) {
    return "You may review the application procedure and required documents on the program details page. For actual submissions, please follow the provider's official instructions.";
  }

  if (lower.includes('status') || lower.includes('application') || lower.includes('app-') || lower.includes('claim') || lower.includes('update') || lower.includes('track')) {
    return "Your application is currently being evaluated by our medical social work department. You will receive updates as verification progresses.";
  }

  if (lower.includes('indigency') || lower.includes('barangay') || lower.includes('certificate of indigency')) {
    return "A Barangay Certificate of Indigency is required to qualify for government subsidies and social service socio-economic classifications.";
  }

  if (lower.includes('how much') || lower.includes('discount') || lower.includes('amount') || lower.includes('coverage') || lower.includes('bill')) {
    return `Assistance coverage for ${programName || 'this program'} is determined based on medical social work assessment and net hospital billing balance after PhilHealth deduction.`;
  }

  return "Thank you for your message. Please review the program requirements and contact the assistance office directly for final confirmation.";
}

function formatCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

interface CreateConversationParams {
  providerId?: string;
  providerName: string;
  providerType?: ProviderType | string;
  programId?: string;
  programName?: string;
  applicationId?: string;
}

interface MessageState {
  conversations: Conversation[];
  typingConversations: Record<string, boolean>;
  getConversationById: (id: string) => Conversation | undefined;
  getOrCreateConversation: (params: CreateConversationParams) => string;
  sendMessage: (conversationId: string, text: string, sender?: 'user' | 'provider') => void;
  markConversationAsRead: (conversationId: string) => void;
  totalUnreadCount: () => number;
  resetMessagesToDefault: () => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: loadConversations(),
  typingConversations: {},

  getConversationById: (id: string) => {
    return get().conversations.find((c) => c.id === id);
  },

  getOrCreateConversation: (params: CreateConversationParams) => {
    const { conversations } = get();

    // 1. Look for existing conversation matching application ID first (if provided)
    if (params.applicationId) {
      const existing = conversations.find(
        (c) => c.applicationId === params.applicationId
      );
      if (existing) return existing.id;
    }

    // 2. Look for existing conversation matching programId and providerName
    if (params.programId) {
      const existing = conversations.find(
        (c) => c.programId === params.programId || (c.providerName === params.providerName && !c.applicationId)
      );
      if (existing) return existing.id;
    }

    // 3. Look for existing conversation matching provider name
    const existing = conversations.find(
      (c) => c.providerName.toLowerCase() === params.providerName.toLowerCase()
    );
    if (existing) return existing.id;

    // 4. Otherwise, create a new conversation
    const newId = `conv-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const newConv: Conversation = {
      id: newId,
      providerId: params.providerId || `prov-${Date.now().toString(36)}`,
      providerName: params.providerName,
      providerType: params.providerType || 'government_lgu',
      programId: params.programId,
      programName: params.programName,
      applicationId: params.applicationId,
      unreadCount: 0,
      updatedAt: new Date().toISOString(),
      isOnline: true,
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          sender: 'provider',
          text: `Hello! Thank you for reaching out to ${params.providerName}. How can we help you regarding ${params.programName || 'our assistance programs'}?`,
          timestamp: formatCurrentTime(),
          read: true,
        },
      ],
    };

    set((state) => {
      const updated = [newConv, ...state.conversations];
      try {
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save new conversation:', e);
      }
      return { conversations: updated };
    });

    return newId;
  },

  sendMessage: (conversationId: string, text: string, sender: 'user' | 'provider' = 'user') => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const time = formatCurrentTime();
    const userMsgId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    const userMessage: Message = {
      id: userMsgId,
      sender,
      text: trimmed,
      timestamp: time,
      read: true,
    };

    // Update conversation with user message immediately
    set((state) => {
      const updated = state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, userMessage],
            updatedAt: new Date().toISOString(),
          };
        }
        return conv;
      });

      try {
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save message:', e);
      }

      return { conversations: updated };
    });

    // If the message is from user, simulate provider response after 900–1400ms delay
    if (sender === 'user') {
      // Set typing state
      set((state) => ({
        typingConversations: {
          ...state.typingConversations,
          [conversationId]: true,
        },
      }));

      const delay = Math.floor(Math.random() * 500) + 900; // 900 - 1400ms

      setTimeout(() => {
        const conv = get().conversations.find((c) => c.id === conversationId);
        const replyText = getContextualProviderReply(trimmed, conv?.programName);
        const replyTime = formatCurrentTime();
        const providerMsg: Message = {
          id: `msg-rep-${Date.now()}`,
          sender: 'provider',
          text: replyText,
          timestamp: replyTime,
          read: true,
        };

        set((state) => {
          const updated = state.conversations.map((c) => {
            if (c.id === conversationId) {
              return {
                ...c,
                messages: [...c.messages, providerMsg],
                updatedAt: new Date().toISOString(),
              };
            }
            return c;
          });

          try {
            localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(updated));
          } catch (e) {
            console.error('Failed to save provider reply:', e);
          }

          return {
            conversations: updated,
            typingConversations: {
              ...state.typingConversations,
              [conversationId]: false,
            },
          };
        });
      }, delay);
    }
  },

  markConversationAsRead: (conversationId: string) => {
    set((state) => {
      let changed = false;
      const updated = state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          if (conv.unreadCount > 0 || conv.messages.some((m) => !m.read)) {
            changed = true;
            return {
              ...conv,
              unreadCount: 0,
              messages: conv.messages.map((m) => ({ ...m, read: true })),
            };
          }
        }
        return conv;
      });

      if (changed) {
        try {
          localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(updated));
        } catch (e) {
          console.error('Failed to mark conversation read:', e);
        }
        return { conversations: updated };
      }
      return state;
    });
  },

  totalUnreadCount: () => {
    return get().conversations.reduce((acc, conv) => acc + (conv.unreadCount || 0), 0);
  },

  resetMessagesToDefault: () => {
    try {
      localStorage.removeItem(STORAGE_KEY_MESSAGES);
    } catch (e) {
      console.error('Failed to reset messages:', e);
    }
    set({ conversations: INITIAL_CONVERSATIONS, typingConversations: {} });
  },
}));
