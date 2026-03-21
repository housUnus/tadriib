"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const SAMPLE_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_POSTER = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";

type VideoPlayerProps = {
  videoUrl: string
  last_position_seconds?: number
  onTimeUpdate?: (time: number) => void
  onEnded?: () => void
  onPlay?: () => void
  onPause?: () => void
  onPrevious?: () => void
  onNext?: () => void
}

export function VideoPlayer({ 
  videoUrl, 
  last_position_seconds,
  onTimeUpdate,
  onEnded,
  onPlay,
  onPause,
  onPrevious,
  onNext,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          volumePanel: {
            inline: false,
          },
        },
      });
    }

    const player = playerRef.current;

    player.one("loadedmetadata", () => {
      player.currentTime(last_position_seconds || 0);
    });

    player.on("timeupdate", () => {
      onTimeUpdate?.(player.currentTime());
    });

    player.on("play", () => {
      onPlay?.();
    });

    player.on("pause", () => {
      onPause?.();
    });

    player.on("ended", () => {
      onEnded?.();
    });

    return () => {
      player?.dispose();
    };
  }, [videoUrl]);

  return (
    <div className="relative w-full h-[80vh] bg-black group">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin vjs-big-play-centered vjs-fill"
      // poster={SAMPLE_POSTER}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>


    </div>
  );
}
