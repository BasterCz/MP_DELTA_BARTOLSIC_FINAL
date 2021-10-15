import type { NextPage } from "next";
import { Writable } from "stream";
import fs from "fs";
import React, { useCallback, useEffect, useState } from "react";
import { Grid, LinearProgress } from "@material-ui/core";
import { FileError, FileRejection, useDropzone } from "react-dropzone";

interface MyFormValues {
  firstName: string;
}

const [files, setFiles] = useState<UploadableFile[]>([]);
const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
  const mappedAcc = accFiles.map((file) => ({
    file,
    errors: [],
    id: getNewId(),
  }));
  const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
  setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
}, []);

const { getRootProps, getInputProps } = useDropzone({
  onDrop,
  accept: ["image/*", "video/*", ".pdf"],
  maxSize: 300 * 1024, // 300KB
});

const uploadFile = async (
  file: File,
  onProgress: (percentage: number) => void
) => {
  const fileProps = fs.stat(file.name, (Error, stats) => {
    fs.createReadStream(file.name)
      //.pipe(progress({ length: stats.size, time: 100 }).on("progress", onProgress))
      .pipe(fs.createWriteStream(`./public/${file.name}`));
  });
  return `./public/${file.name}`;
};

export function SingleFileUploadWithProgress({
  file,
  onDelete,
  onUpload,
}: SingleFileUploadWithProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress);
      onUpload(file, url);
    }

    upload();
  }, []);

  return (
    <Grid item>
      <LinearProgress variant="determinate" value={progress} />
    </Grid>
  );
}

const Test: NextPage = () => {
  const writable = new Writable();

  writable._write = function (chunk, encoding, next) {
    console.log(chunk.toString());
    next();
  };

  writable.write("Hello world!");

  return (
    <Grid item>
      <div {...getRootProps({ className: "classes.dropzone" })}>
        <input {...getInputProps()} />

        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </Grid>
  );
};

export default Test;

export interface UploadableFile {
  // id was added after the video being released to fix a bug
  // Video with the bug -> https://youtube-2021-feb-multiple-file-upload-formik-bmvantunes.vercel.app/bug-report-SMC-Alpha-thank-you.mov
  // Thank you for the bug report SMC Alpha - https://www.youtube.com/channel/UC9C4AlREWdLoKbiLNiZ7XEA
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
}

let currentId = 0;

function getNewId() {
  // we could use a fancier solution instead of a sequential ID :)
  return ++currentId;
}

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}
