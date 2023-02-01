import React, {FC,/* ReactEventHandler*/} from "react";
import styles from "./styles.module.scss";
import {PlayListItem} from "../../constants";

interface Props {
  playList: PlayListItem[];
  playItem: PlayListItem;
  setPlayIndex: (playIndex: number) => void;
  // onUpload: ReactEventHandler<HTMLInputElement>;
}

const PlayList: FC<Props> = (props) => {
  // const { playList, playItem, setPlayIndex, onUpload } = props;
  const { playList, playItem, setPlayIndex } = props;

      // <div className={styles.uploader}>
      //   <label>
      //     <span>添加</span>
      //     <input type="file" onChange={onUpload} accept="audio/*"/>
      //   </label>
      // </div>

  return (
    <div className={styles.listWrapper}>
      <ul className={styles.list}>
        {playList.map((audio, index) => (
          <li key={audio.url} className={playItem.url === audio.url ? styles.active : undefined} onClick={() => setPlayIndex(index)}>
            {index + 1}. {audio.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlayList;
