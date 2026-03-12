'use client'

import { create } from 'zustand'
import type { ChatThread, ChatMessage } from '@/types'
import { mockThreads, mockMessages } from '@/data/mock-chats'

interface ChatState {
  threads: ChatThread[]
  messages: Record<string, ChatMessage[]>

  sendMessage: (threadId: string, senderId: string, text: string) => void
  markRead: (threadId: string, userId: string) => void
  getThreadForEvent: (eventId: string) => ChatThread | undefined
  getUnreadCount: (userId: string) => number
  getMessagesForThread: (threadId: string) => ChatMessage[]
}

export const useChatStore = create<ChatState>()((set, get) => ({
  threads: [...mockThreads],
  messages: { ...mockMessages },

  sendMessage: (threadId, senderId, text) =>
    set((state) => {
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        threadId,
        senderId,
        text,
        timestamp: new Date().toISOString(),
        read: false,
      }
      const threadMessages = state.messages[threadId] || []
      return {
        messages: {
          ...state.messages,
          [threadId]: [...threadMessages, newMessage],
        },
        threads: state.threads.map((t) =>
          t.id === threadId ? { ...t, lastMessage: newMessage } : t,
        ),
      }
    }),

  markRead: (threadId, userId) =>
    set((state) => {
      const threadMessages = state.messages[threadId] || []
      return {
        messages: {
          ...state.messages,
          [threadId]: threadMessages.map((m) =>
            m.senderId !== userId ? { ...m, read: true } : m,
          ),
        },
      }
    }),

  getThreadForEvent: (eventId) =>
    get().threads.find((t) => t.eventId === eventId),

  getMessagesForThread: (threadId) =>
    get().messages[threadId] || [],

  getUnreadCount: (userId) => {
    const { threads, messages } = get()
    let count = 0
    for (const thread of threads) {
      if (!thread.participantIds.includes(userId)) continue
      const threadMsgs = messages[thread.id] || []
      count += threadMsgs.filter(
        (m) => m.senderId !== userId && !m.read,
      ).length
    }
    return count
  },
}))
