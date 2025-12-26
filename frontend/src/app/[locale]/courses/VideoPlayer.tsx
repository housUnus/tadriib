"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const SAMPLE_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_POSTER = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";

interface VideoPlayerProps {
  videoUrl?: string
  title?: string
  onPrevious?: () => void
  onNext?: () => void
}

export function VideoPlayer({ videoUrl, onPrevious, onNext }:VideoPlayerProps) {
  console.log("🚀 ~ VideoPlayer ~ videoUrl:", videoUrl)
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize once
    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          volumePanel: {
            inline: false, // vertical volume slider like YouTube
          },
        },
      });
    }

    const player = playerRef.current;

    // ---- Restore saved progress ----
    player.on("loadedmetadata", () => {
      // if (savedProgress && savedProgress > 0) {
        player.currentTime(10);
      // }
    });

    // ---- Save progress every 3 seconds ----
    player.on("timeupdate", () => {
      const current = player.currentTime();
      console.log("🚀 ~ VideoPlayer ~ current:", current)
    });

    // ---- When video ends ----
    player.on("ended", () => {
      console.log('completed')
    });

    // Cleanup
    return () => {
      player?.dispose();
    };

   
  }, []);

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
