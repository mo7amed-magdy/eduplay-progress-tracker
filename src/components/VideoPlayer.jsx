import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Maximize, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const VideoPlayer = ({ videoUrl, title, onComplete }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const updateDuration = () => {
      if (video.duration) setDuration(video.duration);
    };
    
    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
      
      if (video.currentTime >= video.duration - 1 && onComplete) {
        onComplete();
      }
    };
    
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('timeupdate', updateProgress);
    
    return () => {
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, [onComplete]);
  
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleSeek = (value) => {
    if (!videoRef.current) return;
    const newTime = (value[0] / 100) * duration;
    videoRef.current.currentTime = newTime;
    setProgress(value[0]);
  };
  
  const handleVolumeChange = (value) => {
    if (!videoRef.current) return;
    videoRef.current.volume = value[0];
    setVolume(value[0]);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="rounded-lg overflow-hidden bg-black">
      <div className="relative">
        <video 
          ref={videoRef} 
          className="w-full aspect-video"
          poster="/placeholder.svg"
          controlsList="nodownload"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              onClick={togglePlay} 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white bg-opacity-75 hover:bg-opacity-100"
            >
              <Play className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="bg-gray-900 text-white p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium truncate">{title}</h3>
          <div className="text-xs text-gray-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        
        <div className="mb-3">
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button onClick={togglePlay} variant="ghost" size="icon" className="text-white">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-gray-400" />
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24 cursor-pointer"
            />
            <Button variant="ghost" size="icon" className="text-white">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
