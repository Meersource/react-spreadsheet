import { useState } from 'react';
import FFMPEG from "react-ffmpeg";
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

const VideoConverter = () => {
    const [source, setSource] = useState('')
    const [percentage, setPercentage] = useState(null)

    const changeHandler = async (e) => {
        const file = e.target.files[0];
        const ffmpeg = createFFmpeg({ corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js", log: true });
        await ffmpeg.load();
        await ffmpeg.FS('writeFile', file.name, await fetchFile(file))
        ffmpeg.setProgress(({ ratio }) => {
            setPercentage(Math.round(ratio * 100));
        });
        await ffmpeg.run("-i", file.name, "output.mp4");
        const data = ffmpeg.FS("readFile", "output.mp4");
        setSource(
            URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
        );
    }

    return <div>
        <input type="file" id="uploader" onChange={changeHandler} />
        <video src={source} controls width="320" height="240" />
        {percentage && <h1>{`${percentage}%`}</h1>}
        {percentage && <progress id="file" value={percentage} max="100" />}
    </div>
};

export default VideoConverter;