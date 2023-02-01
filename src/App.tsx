import React, {/*ChangeEventHandler,*/ FC, useEffect, useRef, useState} from 'react';
import useAudioVisualization from "./hooks/useAudioVisualization";
import styles from './styles.module.scss';
import {defaultPlayList, PlayListItem} from "./constants";
import Header from "./components/Header";
import Player from "./components/Player";
import PlayList from "./components/PlayList";
// import {padLeft} from "./utils";

const App: FC = () => {
  const {visualize, stopVisualize, resetCanvas} = useAudioVisualization('#canvas', 50);

  const [curtTime/*, setCurtTime*/] = useState<string>('00:00');
  const [playList/*, setPlayList*/] = useState<PlayListItem[]>(defaultPlayList);
  const [playIndex, setPlayIndex] = useState<number>(0)

  const intervalRef = useRef<NodeJS.Timer>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const curtAudio = playList[playIndex]

  const onPlay = async () => {
    if (audioRef.current) {
      stopVisualize();
      await audioRef.current.play();
      // https://stackoverflow.com/a/48623627
      const audioEle = audioRef.current as any
      const stream = audioEle.mozCaptureStream ? audioEle.mozCaptureStream() : audioEle.captureStream();
      visualize(stream)
    }
  }

  const onPause = async () => {
    resetCanvas();
  }

  // const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   if (e.target.files) {
  //     const [file] = e.target.files;
  //     const blobUrl = URL.createObjectURL(file);
  //     const [filename] = file.name.split('.');
  //     setPlayList([...playList, { name: filename, url: blobUrl }])
  //     setPlayIndex(playList.length - 1)
  //   }
  // };

  // const setPlayProgress = (currentTime: number) => {
  //   const minute = Math.floor(currentTime / 60);
  //   const seconds = Math.floor(currentTime % 60);
  //   setCurtTime(`${padLeft(minute)}:${padLeft(seconds)}`);
  // }

  const toPlayNext = () => {
    if (playIndex < playList.length - 1) {
        setPlayIndex(playIndex + 1);
    } else {
        setPlayIndex(0);
    }
  }

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        if (audioRef.current.ended) {
          toPlayNext();
        // } else {
        //   setPlayProgress(audioRef.current.currentTime)
        }
      }
    }, 1000);
  }

  useEffect(() => {
    resetCanvas();
    return () => {
      stopVisualize()
    }
  });

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  return (
    <div className={styles.app}>
      <div className={styles.playerWrapper}>
        <Header>
          正在播放：{playIndex+1} - {curtAudio.name}
          <span style={{ marginLeft: "auto" }}>{curtTime}</span>
        </Header>
        <Player ref={audioRef} onPlay={onPlay} onPause={onPause} playItem={curtAudio} />
      </div>

      <div className={styles.playListWrapper}>
        <Header>播放列表</Header>
        <PlayList playList={playList} playItem={curtAudio} setPlayIndex={setPlayIndex} />
      </div>
    </div>
  )
}

export default App;
