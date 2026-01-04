import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface VideoCallProps {
  contactName: string;
  contactInitials: string;
  isVideo: boolean;
  onEndCall: () => void;
}

const VideoCall = ({ contactName, contactInitials, isVideo, onEndCall }: VideoCallProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsConnecting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isConnecting) {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isConnecting]);

  useEffect(() => {
    if (isVideo && localVideoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.log('Error accessing media devices:', err));
    }
  }, [isVideo]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in">
      {isVideo ? (
        <div className="relative flex-1 bg-gradient-to-br from-background to-muted">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          
          {isConnecting && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
              <div className="text-center animate-scale-in">
                <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-primary/30">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl font-bold">
                    {contactInitials}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-3xl font-bold mb-2">{contactName}</h2>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <p className="text-lg">Соединение...</p>
                </div>
              </div>
            </div>
          )}

          <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
            <div className="bg-background/80 backdrop-blur-md rounded-2xl px-6 py-3 animate-fade-in">
              <h3 className="font-semibold text-lg mb-1">{contactName}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {formatDuration(callDuration)}
              </p>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={onEndCall}
              className="rounded-xl bg-background/80 backdrop-blur-md hover:bg-background/90"
            >
              <Icon name="Minimize2" size={20} />
            </Button>
          </div>

          <div className="absolute bottom-6 right-6 w-48 h-36 rounded-2xl overflow-hidden border-2 border-background shadow-2xl animate-scale-in">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
            {isVideoOff && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="VideoOff" size={32} className="text-white" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
          <div className="text-center animate-scale-in">
            <div className="relative inline-block mb-8">
              <Avatar className="w-48 h-48 border-8 border-background shadow-2xl">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-6xl font-bold">
                  {contactInitials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background rounded-full px-6 py-2 shadow-lg border border-border">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {formatDuration(callDuration)}
                </p>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-2">{contactName}</h2>
            <p className="text-xl text-muted-foreground">
              {isConnecting ? 'Соединение...' : 'Голосовой звонок'}
            </p>
          </div>
        </div>
      )}

      <div className="h-32 bg-card/50 backdrop-blur-xl border-t border-border flex items-center justify-center gap-6 px-6">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsMuted(!isMuted)}
          className={`w-16 h-16 rounded-2xl transition-all hover:scale-110 ${
            isMuted 
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' 
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} />
        </Button>

        {isVideo && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-16 h-16 rounded-2xl transition-all hover:scale-110 ${
              isVideoOff 
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            <Icon name={isVideoOff ? 'VideoOff' : 'Video'} size={24} />
          </Button>
        )}

        <Button
          size="icon"
          onClick={onEndCall}
          className="w-20 h-20 rounded-2xl bg-destructive hover:bg-destructive/90 transition-all hover:scale-110 shadow-lg"
        >
          <Icon name="PhoneOff" size={28} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="w-16 h-16 rounded-2xl bg-muted hover:bg-muted/80 transition-all hover:scale-110"
        >
          <Icon name="Volume2" size={24} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="w-16 h-16 rounded-2xl bg-muted hover:bg-muted/80 transition-all hover:scale-110"
        >
          <Icon name="MoreVertical" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default VideoCall;
