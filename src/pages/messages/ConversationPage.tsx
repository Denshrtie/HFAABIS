import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMessageStore } from '../../stores/useMessageStore';
import { 
  ArrowLeft, 
  Send, 
  Building2, 
  Hospital, 
  Shield, 
  HeartHandshake, 
  Sparkles, 
  Info,
  CheckCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const ConversationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getConversationById, sendMessage, markConversationAsRead, typingConversations } = useMessageStore();

  const conversation = getConversationById(id || '');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isTyping = id ? typingConversations[id] : false;

  useEffect(() => {
    if (id) {
      markConversationAsRead(id);
    }
  }, [id, markConversationAsRead]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages, isTyping]);

  if (!conversation) {
    return (
      <div className="p-8 text-center space-y-4 max-w-md mx-auto">
        <h3 className="text-base font-bold text-slate-800">Conversation not found</h3>
        <p className="text-xs text-slate-500">
          The requested message thread could not be found or has been reset.
        </p>
        <Button variant="primary" onClick={() => navigate('/messages')}>
          Back to Messages
        </Button>
      </div>
    );
  }

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText;
    setInputText('');
    sendMessage(conversation.id, text, 'user');
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  const quickQuestions = [
    "Do I need a medical certificate?",
    "Is this assistance still available?",
    "Where do I submit my documents?",
    "How is my application status?"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem-4rem)] max-w-md mx-auto bg-slate-50 relative">
      {/* Chat Header */}
      <div className="bg-white border-b border-slate-200/90 px-4 py-2.5 flex items-center justify-between shadow-soft z-20 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => navigate('/messages')}
            aria-label="Back to messages list"
            className="touch-target p-1.5 -ml-1 text-slate-600 hover:text-brand-700 hover:bg-slate-100 rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-sm">
              {conversation.providerName.charAt(0)}
            </div>
            {conversation.isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
            )}
          </div>

          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug">
              {conversation.providerName}
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Available • Simulated Office</span>
            </div>
          </div>
        </div>
      </div>

      {/* Program / Application Context Bar */}
      {(conversation.programName || conversation.applicationId) && (
        <div className="bg-brand-50/80 border-b border-brand-100 px-4 py-1.5 flex items-center justify-between text-[11px] text-brand-900 shrink-0">
          <div className="flex items-center gap-1 truncate font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span className="truncate">
              {conversation.applicationId ? `Ref #${conversation.applicationId}: ` : ''}
              {conversation.programName || 'Assistance Inquiry'}
            </span>
          </div>
          {conversation.programId && (
            <button
              type="button"
              onClick={() => navigate(`/programs/${conversation.programId}`)}
              className="text-[10px] font-bold text-brand-700 underline hover:text-brand-900 shrink-0 ml-2"
            >
              View Program
            </button>
          )}
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
        {/* Prototype Info Banner */}
        <div className="p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-center space-y-0.5">
          <p className="text-[11px] font-bold text-amber-900">
            Simulated Assistance Helpdesk
          </p>
          <p className="text-[10px] text-amber-800">
            Responses are mock-generated to demonstrate typical provider guidance for Filipino patients and families.
          </p>
        </div>

        {conversation.messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-0.5 px-1">
                <span className="text-[10px] font-bold text-slate-400">
                  {isUser ? 'You' : conversation.providerName.split(' ')[0]}
                </span>
                <span className="text-[9px] text-slate-400">
                  {msg.timestamp}
                </span>
              </div>

              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-soft break-words ${
                  isUser
                    ? 'bg-brand-600 text-white rounded-tr-none font-medium'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none font-normal'
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          );
        })}

        {/* Provider is typing indicator */}
        {isTyping && (
          <div className="flex flex-col items-start animate-fade-in">
            <span className="text-[10px] font-bold text-slate-400 mb-0.5 px-1">
              {conversation.providerName.split(' ')[0]}
            </span>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-soft flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-[11px]">Provider is typing</span>
              <span className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-3 py-1.5 bg-slate-100/90 border-t border-slate-200/70 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 pl-1">
          Suggestions:
        </span>
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickQuestion(q)}
            className="touch-target px-2.5 py-1 bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-800 rounded-full border border-slate-200 text-[11px] font-medium whitespace-nowrap transition active:scale-95 shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Bottom Sticky Input Form */}
      <div className="bg-white border-t border-slate-200 p-2.5 shrink-0 shadow-lg">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to the provider..."
            aria-label="Type your message"
            className="flex-1 h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            aria-label="Send message"
            className={`touch-target w-11 h-11 rounded-2xl flex items-center justify-center font-bold transition-all ${
              inputText.trim()
                ? 'bg-brand-600 text-white shadow-md hover:bg-brand-700 active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
