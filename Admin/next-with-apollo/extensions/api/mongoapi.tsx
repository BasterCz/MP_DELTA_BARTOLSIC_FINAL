import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../utils/mongodb";

export const songsGet = async () => {
  const { db } = await connectToDatabase();
  const songs = await db.collection("songs").find({}).toArray();
  return songs;
};

export const playlistGet = async () => {
  const { db } = await connectToDatabase();
  const playlist = await db.collection("playlists").find({}).toArray();
  return playlist;
};

export const songsGetOne = async (_id: string) => {
  const { db } = await connectToDatabase();
  const songs = await db
    .collection("songs")
    .findOne({ _id: new ObjectId(_id) });

  return songs;
};

export const playlistGetOne = async (_id: string) => {
  const { db } = await connectToDatabase();
  const playlist = await db
    .collection("playlists")
    .findOne({ _id: new ObjectId(_id) });
  return playlist;
};

export const songsUpdate = async (
  _id: string,
  name: string,
  file_path: string,
  image_path: string,
  isPublic: Boolean
) => {
  const { db } = await connectToDatabase();

  const update = {
    $set: {
      name: name,
      file_path: file_path,
      image_path: image_path,
      isPublic: isPublic,
      modifiedDate: new Date(Date.now()),
    },
  };
  const res = await db.collection("songs").updateOne(
    {
      _id: new ObjectId(_id),
    },
    update
  );
  return res.matchedCount > 0;
};

export const playlistUpdate = async (
  _id: string,
  name: string,
  description: string,
  image_path: string,
  isPublic: Boolean
) => {
  const { db } = await connectToDatabase();

  const update = {
    $set: {
      name: name,
      description: description,
      image_path: image_path,
      isPublic: isPublic,
      modifiedDate: new Date(Date.now()),
    },
  };
  const res = await db.collection("playlists").updateOne(
    {
      _id: new ObjectId(_id),
    },
    update
  );
  return res.matchedCount > 0;
};

export const songsDelete = async (_id: string) => {
  const { db } = await connectToDatabase();

  const res = await db.collection("songs").deleteOne({
    _id: new ObjectId(_id),
  });
  return { _id: _id };
};

export const playlistDelete = async (_id: string) => {
  const { db } = await connectToDatabase();

  const res = await db.collection("playlists").deleteOne({
    _id: new ObjectId(_id),
  });
  return { _id: _id };
};

export const songsAdd = async (
  name: string,
  file_path: string,
  image_path: string,
  isPublic: Boolean
) => {
  const { db } = await connectToDatabase();
  const res = await db.collection("songs").insertOne({
    name: name,
    file_path: file_path,
    image_path: image_path,
    isPublic: isPublic,
    createdDate: new Date(Date.now()),
    modifiedDate: new Date(Date.now()),
  });
  return res.insertedId;
};

export const playlistAdd = async (
  name: string,
  description: string,
  image_path: string,
  isPublic: Boolean,
  songs?: string[]
) => {
  const { db } = await connectToDatabase();
  const res = await db.collection("playlists").insertOne({
    name: name,
    description: description,
    songs: (songs = []),
    image_path: image_path,
    isPublic: isPublic,
    createdDate: new Date(Date.now()),
    modifiedDate: new Date(Date.now()),
  });
  return res.insertedId;
};

export const playlistAddSong = async (_id: string, song: string) => {
  const { db } = await connectToDatabase();

  const update = {
    $addToSet: { songs: new ObjectId(song) },
    $set: { modifiedDate: new Date(Date.now()) },
  };
  const res = await db.collection("playlists").updateOne(
    {
      _id: new ObjectId(_id),
    },
    update
  );
  return res.matchedCount > 0;
};

export const playlistRemoveSong = async (_id: string, song: string) => {
  const { db } = await connectToDatabase();

  const update = {
    $pull: {
      songs: new ObjectId(song),
    },
    $set: {
      modifiedDate: new Date(Date.now()),
    },
  };
  const res = await db.collection("playlists").updateOne(
    {
      _id: new ObjectId(_id),
    },
    update
  );
  return res.matchedCount > 0;
};

export const playlistSongs = async (_id: string) => {
  const { db } = await connectToDatabase();

  const songs = await db.collection("playlists").findOne({
    _id: new ObjectId(_id),
  });
  const songsArray = songs.songs;

  const find = {
    _id: {
      $in: songsArray,
    },
  };

  const res = await db.collection("songs").find(find).toArray();
  return res;
};

export const songPlaylists = async (_id: string) => {
  const { db } = await connectToDatabase();

  const find = {
    songs: new ObjectId(_id),
  };

  const res = await db.collection("playlists").find(find).toArray();
  return res;
};

export const objectViewsDate = async (_id: string, groupByMinutes: number) => {
  const { db } = await connectToDatabase();

  const match = {
    $match: { parentID: new ObjectId(_id) },
  };

  const group = {
    $group: {
      _id: {
        $toDate: {
          $subtract: [
            { $toLong: "$time" },
            { $mod: [{ $toLong: "$time" }, groupByMinutes] },
          ],
        },
      },
      count: { $sum: 1 },
    },
  };

  const sort = {
    $sort: { _id: 1 },
  };

  const aggregate = [match, group, sort];

  const res = await db.collection("viewStats").aggregate(aggregate).toArray();
  return res;
};

export const objectViews = async (_id: string) => {
  const { db } = await connectToDatabase();

  const match = {
    $match: { parentID: new ObjectId(_id) },
  };

  const group = {
    $group: { _id: "$parentID", count: { $sum: 1 } },
  };

  const aggregate = [match, group];

  const res = await db.collection("viewStats").aggregate(aggregate).toArray();
  return res;
};

export const addView = async (_id: string) => {
  const { db } = await connectToDatabase();
  const res = await db.collection("viewStats").insertOne({
    parentID: new ObjectId(_id),
    time: new Date(Date.now()),
  });
  return res.acknowledged;
};

export const waveformAdd = async (id: string, waveform: number[]) => {
  const { db } = await connectToDatabase();
  const res = await db.collection("waveforms").insertOne({
    songID: id,
    waveform: waveform,
  });
  return res.insertedId;
};

export const waveformUpdate = async (id: string, waveform: number[]) => {
  const { db } = await connectToDatabase();
  const update = {
    $set: {
      waveform: waveform,
    },
  };
  const res = await db.collection("waveforms").updateOne(
    {
      songID: id,
    },
    update
  );
  return res.matchedCount > 0;
};