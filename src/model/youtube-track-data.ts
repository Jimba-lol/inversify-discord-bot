export interface YoutubeTrackData {
  url: string;
  title: string;
  onStart: () => void;
  onFinish: () => void;
  onError: (error: Error) => void;
}