import { Grid, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FileHeader } from "./fileHeader";
import fs from "fs";
import progress from "progress-stream";

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}

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
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={progress} />
    </Grid>
  );
}

const uploadFile = async (
  file: File,
  onProgress: (percentage: number) => void
) => {
  const fileProps = fs.stat(file.name, (Error, stats) => {
    fs
    .createReadStream(file.name)
    //.pipe(progress({ length: stats.size, time: 100 }).on("progress", onProgress))
    .pipe(fs.createWriteStream(`./public/${file.name}`));
  }
  );
  return `./public/${file.name}`;
};
