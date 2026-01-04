import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface IncomingCallProps {
  contactName: string;
  contactInitials: string;
  isVideo: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const IncomingCall = ({ contactName, contactInitials, isVideo, onAccept, onDecline }: IncomingCallProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center animate-fade-in">
      <div className="text-center animate-scale-in">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full animate-pulse opacity-30 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full animate-ping opacity-20" />
          <Avatar className="relative w-48 h-48 border-8 border-background shadow-2xl">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-6xl font-bold">
              {contactInitials}
            </AvatarFallback>
          </Avatar>
        </div>

        <h2 className="text-4xl font-bold mb-2">{contactName}</h2>
        <p className="text-xl text-muted-foreground mb-3 flex items-center justify-center gap-2">
          <Icon name={isVideo ? 'Video' : 'Phone'} size={20} />
          {isVideo ? 'Видеозвонок' : 'Голосовой звонок'}
        </p>
        <p className="text-lg text-primary font-semibold animate-pulse">Входящий звонок...</p>

        <div className="flex items-center justify-center gap-8 mt-12">
          <div className="text-center">
            <Button
              size="icon"
              onClick={onDecline}
              className="w-20 h-20 rounded-full bg-destructive hover:bg-destructive/90 transition-all hover:scale-110 shadow-lg mb-3"
            >
              <Icon name="PhoneOff" size={32} />
            </Button>
            <p className="text-sm text-muted-foreground font-medium">Отклонить</p>
          </div>

          <div className="text-center">
            <Button
              size="icon"
              onClick={onAccept}
              className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 transition-all hover:scale-110 shadow-lg mb-3"
            >
              <Icon name={isVideo ? 'Video' : 'Phone'} size={32} />
            </Button>
            <p className="text-sm text-muted-foreground font-medium">Принять</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
