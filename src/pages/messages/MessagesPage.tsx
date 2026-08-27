import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessageStore } from '../../stores/useMessageStore';
import { 
  Building2, 
  MessageSquare, 
  ChevronRight, 
  Hospital, 
  Shield, 
  HeartHandshake, 
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { conversations, markConversationAsRead } = useMessageStore();

  const handleSelectConversation = (id: string) => {
    markConversationAsRead(id);
    navigate(`/messages/${id}`);
  };

  const getProviderIcon = (type?: string) => {
    switch (type) {
      case 'hospital':
        return <Hospital className="w-5 h-5" />;
      case 'government_lgu':
        return <Building2 className="w-5 h-5" />;
      case 'insurance':
        return <Shield className="w-5 h-5" />;
      case 'charity':
        return <HeartHandshake className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4 px-4 py-4 pb-12 max-w-md mx-auto">
      {/* Page Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-brand-700 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Direct Inquiries
          </span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
            Simulated Chat
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Assistance Provider Messages
        </h1>
        <p className="text-xs text-slate-500">
          Inquire directly with hospital social service desks, LGUs, and subsidy providers.
        </p>
      </div>

      {/* Conversations List */}
      {conversations.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 mx-auto flex items-center justify-center">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">No messages yet</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Contact an assistance provider from a program or application details page to start a conversation.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Assistance Programs
          </Button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {conversations.map((conv) => {
            const lastMsg = conv.messages[conv.messages.length - 1];
            const hasUnread = conv.unreadCount > 0;

            return (
              <button
                key={conv.id}
                type="button"
                onClick={() => handleSelectConversation(conv.id)}
                className={`touch-target w-full text-left p-4 rounded-3xl border transition-all duration-200 active:scale-[0.99] flex items-start gap-3.5 ${
                  hasUnread
                    ? 'bg-brand-50/40 border-brand-300 shadow-soft'
                    : 'bg-white border-slate-200/80 hover:border-brand-200 hover:shadow-soft'
                }`}
              >
                {/* Provider Avatar / Icon */}
                <div className="relative shrink-0 mt-0.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                    conv.providerType === 'hospital'
                      ? 'bg-teal-50 text-teal-700'
                      : conv.providerType === 'government_lgu'
                      ? 'bg-amber-50 text-amber-700'
                      : conv.providerType === 'insurance'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}>
                    {getProviderIcon(conv.providerType)}
                  </div>
                  {conv.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Online" />
                  )}
                </div>

                {/* Conversation Body */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug">
                      {conv.providerName}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap shrink-0">
                      {lastMsg?.timestamp || 'Recent'}
                    </span>
                  </div>

                  {/* Program / Application context tag */}
                  {(conv.programName || conv.applicationId) && (
                    <div className="flex items-center gap-1.5 text-[11px] text-brand-700 font-semibold truncate">
                      <Sparkles className="w-3 h-3 shrink-0" />
                      <span className="truncate">
                        {conv.applicationId ? `#${conv.applicationId} • ` : ''}
                        {conv.programName || 'Assistance Inquiry'}
                      </span>
                    </div>
                  )}

                  {/* Message Preview */}
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs truncate leading-relaxed ${
                      hasUnread ? 'text-slate-800 font-bold' : 'text-slate-500'
                    }`}>
                      {lastMsg ? (
                        <span>
                          {lastMsg.sender === 'user' ? 'You: ' : ''}
                          {lastMsg.text}
                        </span>
                      ) : (
                        'No messages yet.'
                      )}
                    </p>

                    {hasUnread && (
                      <span className="shrink-0 min-w-[18px] h-4 px-1 bg-brand-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 self-center" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
