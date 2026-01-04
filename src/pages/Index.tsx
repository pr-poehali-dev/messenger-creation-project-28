import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  sender: 'me' | 'other';
  text: string;
  time: string;
  type: 'text' | 'voice';
  duration?: string;
}

const Index = () => {
  const [activeView, setActiveView] = useState<'chats' | 'contacts' | 'settings' | 'profile' | 'archive'>('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');

  const chats: Chat[] = [
    { id: 1, name: 'Анна Иванова', avatar: '', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 3, online: true },
    { id: 2, name: 'Команда разработки', avatar: '', lastMessage: 'Созвон в 15:00', time: '13:10', unread: 0, online: false },
    { id: 3, name: 'Максим Петров', avatar: '', lastMessage: 'Голосовое сообщение', time: '12:45', unread: 1, online: true },
    { id: 4, name: 'Мария Сидорова', avatar: '', lastMessage: 'Спасибо за помощь!', time: 'Вчера', unread: 0, online: false },
    { id: 5, name: 'Группа проекта', avatar: '', lastMessage: 'Файл отправлен', time: 'Вчера', unread: 5, online: false },
  ];

  const messages: Message[] = [
    { id: 1, sender: 'other', text: 'Привет! Как дела?', time: '14:30', type: 'text' },
    { id: 2, sender: 'me', text: 'Отлично! Работаю над новым проектом', time: '14:31', type: 'text' },
    { id: 3, sender: 'other', text: 'Звучит интересно! Расскажешь?', time: '14:32', type: 'text' },
    { id: 4, sender: 'me', text: 'Конечно, сейчас записал голосовое', time: '14:32', type: 'text' },
    { id: 5, sender: 'me', text: '', time: '14:33', type: 'voice', duration: '0:42' },
  ];

  const sidebarItems = [
    { id: 'chats', icon: 'MessageCircle', label: 'Чаты' },
    { id: 'contacts', icon: 'Users', label: 'Контакты' },
    { id: 'archive', icon: 'Archive', label: 'Архив' },
    { id: 'settings', icon: 'Settings', label: 'Настройки' },
    { id: 'profile', icon: 'User', label: 'Профиль' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6 gap-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 animate-scale-in">
          <Icon name="MessageSquare" size={24} className="text-white" />
        </div>
        
        <div className="flex flex-col gap-4 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                activeView === item.id
                  ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Icon name={item.icon as any} size={22} />
            </button>
          ))}
        </div>

        <button className="w-12 h-12 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200 hover:scale-110">
          <Icon name="LogOut" size={22} />
        </button>
      </div>

      <div className="w-96 bg-card border-r border-border flex flex-col animate-fade-in">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Чаты
            </h1>
            <Button size="icon" variant="ghost" className="rounded-xl hover:scale-110 transition-all">
              <Icon name="PlusCircle" size={22} />
            </Button>
          </div>
          
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Поиск..." 
              className="pl-10 rounded-xl border-border bg-muted/50 focus:bg-background transition-colors"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 rounded-2xl mb-2 transition-all duration-200 hover:scale-[1.02] ${
                  selectedChat === chat.id
                    ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12 border-2 border-background">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                        {chat.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground ml-2 shrink-0">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <Badge className="bg-gradient-to-r from-primary to-secondary text-white shrink-0 rounded-full px-2 py-0.5 text-xs">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col bg-background animate-slide-in-right">
        {selectedChat ? (
          <>
            <div className="h-20 bg-card border-b border-border px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-primary/30">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                    АИ
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-lg">Анна Иванова</h2>
                  <p className="text-sm text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    онлайн
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="rounded-xl hover:scale-110 transition-all hover:bg-accent hover:text-accent-foreground">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-xl hover:scale-110 transition-all hover:bg-accent hover:text-accent-foreground">
                  <Icon name="Video" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-xl hover:scale-110 transition-all">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-end gap-2 animate-fade-in ${
                      message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {message.sender === 'other' && (
                      <Avatar className="w-8 h-8 border border-border shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs">
                          АИ
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-lg ${message.sender === 'me' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      {message.type === 'text' ? (
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.sender === 'me'
                              ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-md'
                              : 'bg-card border border-border rounded-bl-md'
                          }`}
                        >
                          <p className="text-sm font-body">{message.text}</p>
                        </div>
                      ) : (
                        <div
                          className={`px-4 py-3 rounded-2xl flex items-center gap-3 ${
                            message.sender === 'me'
                              ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-md'
                              : 'bg-card border border-border rounded-bl-md'
                          }`}
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            className={`w-8 h-8 rounded-full ${
                              message.sender === 'me' ? 'hover:bg-white/20' : 'hover:bg-muted'
                            }`}
                          >
                            <Icon name="Play" size={16} />
                          </Button>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {[...Array(20)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1 rounded-full ${
                                    message.sender === 'me' ? 'bg-white/60' : 'bg-primary/60'
                                  }`}
                                  style={{ height: `${Math.random() * 16 + 8}px` }}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-medium">{message.duration}</span>
                          </div>
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground px-2">{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="h-20 bg-card border-t border-border px-6 flex items-center gap-3">
              <Button size="icon" variant="ghost" className="rounded-xl hover:scale-110 transition-all text-muted-foreground hover:text-foreground">
                <Icon name="Paperclip" size={20} />
              </Button>
              
              <div className="flex-1 relative">
                <Input
                  placeholder="Написать сообщение..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="rounded-2xl border-border bg-muted/50 focus:bg-background pr-12 transition-colors"
                />
                <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-xl text-muted-foreground hover:text-foreground">
                  <Icon name="Smile" size={20} />
                </Button>
              </div>

              <Button
                size="icon"
                className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:scale-110 transition-all shadow-lg hover:shadow-xl"
              >
                <Icon name="Mic" size={20} />
              </Button>
              
              <Button
                size="icon"
                className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:scale-110 transition-all shadow-lg hover:shadow-xl"
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center animate-fade-in">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
                <Icon name="MessageCircle" size={48} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Выберите чат</h2>
              <p className="text-muted-foreground">Выберите чат из списка, чтобы начать общение</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
