import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../utils/mongodb";
import { elasticSearchPlaylists, elasticSearchSongs } from "./elasticapi";

export const songsGet = async () => {
  const { db } = await connectToDatabase();
  const songs = await db.collection("songs").find({}).toArray();

  return songs;
};

export const searchSongsGet = async (_query: string) => {
  const result = await elasticSearchSongs(_query);
  const idArray = result.map((id) => new ObjectId(id));
  const { db } = await connectToDatabase();
  const songs = await db
    .collection("songs")
    .aggregate([
      { $match: { _id: { $in: idArray } } },
      { $addFields: { __order: { $indexOfArray: [idArray, "$_id"] } } },
      { $sort: { __order: 1 } },
    ])
    .toArray();
  return songs;
};

export const playlistGet = async () => {
  const { db } = await connectToDatabase();
  const playlist = await db.collection("playlists").find({}).toArray();
  return playlist;
};

export const searchPlaylistsGet = async (_query: string) => {
  const result = await elasticSearchPlaylists(_query);
  const idArray = result.map((id) => new ObjectId(id));
  const { db } = await connectToDatabase();
  const playlists = await db
    .collection("playlists")
    .aggregate([
      { $match: { _id: { $in: idArray } } },
      { $addFields: { __order: { $indexOfArray: [idArray, "$_id"] } } },
      { $sort: { __order: 1 } },
    ])
    .toArray();
  return playlists;
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
  return res.insertedId;
};

export const waveformFind = async (id: string) => {
  const { db } = await connectToDatabase();
  const waveform = await db.collection("waveform").find({ songID: id }).toArray();
  return waveform[0];
};

export const waveformsFind = async (ids: string[]) => {
  const { db } = await connectToDatabase();
  const waveforms = await db.collection("waveform").find({ songID: {$in: ids} }).toArray();
  return waveforms;
};

export const checkUserExists = async (id: string) => {
  const { db } = await connectToDatabase();
  const res = await db
    .collection("users")
    .aggregate([
      { $match: { userID: id } },
      { $group: { _id: null, count: { $sum: 1 } } },
      { $project: { _id: 0, count: 1 } },
    ]);
  return res.count && res.count > 0; //bool
};

export const addUser = async (id: string) => {
  const { db } = await connectToDatabase();
  const res = await db
    .collection("users")
    .updateOne({ userID: id }, { $set: { userID: id } }, { upsert: true });
  return res.acknowledged; //ack
};

export const addLikeRef = async (id: string, objectID: string) => {
  const { db } = await connectToDatabase();
  const res = await db
    .collection("users")
    .updateOne({ userID: id }, { $addToSet: { likes: objectID } }, { upsert: true });
  return res.acknowledged; //ack
};

export const addViewRef = async (id: string, objectID: string) => {
  const { db } = await connectToDatabase();
  const res = await db
    .collection("users")
    .updateOne({ userID: id }, { $push: { views: objectID } });
  return res.acknowledged; //ack
};

export const addPlaylistRef = async (id: string, objectID: string) => {
  const { db } = await connectToDatabase();
  const res = await db
    .collection("users")
    .updateOne({ userID: id }, { $push: { playlists: objectID } });
  return res.acknowledged; //ack
};

export const removeLikeRef = async (id: string, objectID: string) => {
  const { db } = await connectToDatabase();
  const res = await db
    .collection("users")
    .updateOne({ userID: id }, { $pull: { likes: objectID } });
  return res.acknowledged; //ack
};

export const removeViewRef = async (id: string, objectID: string) => {
  const { db } = await connectToDatabase();
  const res = await db
    .collection("users")
    .updateOne({ userID: id }, { $pull: { views: objectID } });
  return res.acknowledged; //ack
};

export const removePlaylistRef = async (id: string, objectID: string) => {
  const { db } = await connectToDatabase();
  const res = await db
    .collection("users")
    .updateOne({ userID: id }, { $pull: { playlists: objectID } });
  return res.acknowledged; //ack
};

export const isLikedByUser = async (id: string, objectID: string) => {
  const { db } = await connectToDatabase();
  const res = await db
    .collection("users")
    .aggregate([
      { $match: { userID: id, likes: objectID } },
      { $group: { _id: objectID, count: { $sum: 1 } } },
      { $project: { _id: 0, count: 1 } },
    ]).toArray();
  
  return (res[0]?.count > 0); //bool
};

export const getLikeRefs = async (id: string) => {
  const { db } = await connectToDatabase();
  const res = await db.collection("users").find({ userID: id }).toArray();
  const idArray = res[0].likes.map((_id: string) => new ObjectId(_id));
  const res2 = await db
    .collection("songs")
    .aggregate([{ $match: { _id: { $in: idArray } } }])
    .toArray();
  return res2; //song arr
};

export const getPlaylistRef = async (id: string) => {
  const { db } = await connectToDatabase();
  const res = await db.collection("users").find({ userID: id }).toArray();
  const idArray = res[0].playlists.map((_id: string) => new ObjectId(_id));
  const res2 = await db
    .collection("playlists")
    .aggregate([{ $match: { _id: { $in: idArray } } }])
    .toArray();
  return res2; //playlist arr
};

export const getLastViewdSongs = async (id: string) => {
  const { db } = await connectToDatabase();
  const res = await db.collection("users").find({ userID: id }).toArray();
  const idArray = res[0].views.map((_id: string) => new ObjectId(_id));
  const res2 = await db
    .collection("viewStats")
    .aggregate([{ $match: { _id: { $in: idArray } } }, { $sort: { time: 1 } }])
    .toArray();
  const idArray2 = res2.map((obj: any) => new ObjectId(obj.parentID));
  const res3 = await db
    .collection("songs")                            
    .aggregate([
      { $match: { _id: { $in: idArray2 } } },
      { $addFields: { __order: { $indexOfArray: [idArray2, "$_id"] } } },
      { $sort: { __order: -1 } },
    ])
    .toArray();

  return res3; //song arr
};

export const getMostViewdSongs = async () => {
  const { db } = await connectToDatabase();
  const res = await db
    .collection("viewStats")
    .aggregate([
      {
        $group: { _id: "$parentID", count: { $sum: 1 } },
      },
      { $sort: { count: -1 } },
    ])
    .toArray();
  const idArray = res.map((obj: any) => new ObjectId(obj._id));
  const res2 = await db
    .collection("songs")
    .aggregate([
      { $match: { _id: { $in: idArray } } },
      { $addFields: { __order: { $indexOfArray: [idArray, "$_id"] } } },
      { $sort: { __order: 1 } },
    ])
    .toArray();

  return res2; //song arr
};

export const getLatestSongs = async () => {
  const { db } = await connectToDatabase();

  const res = await db
    .collection("songs")
    .find({ isPublic: true })
    .sort({ createdDate: 1 })
    .toArray();

  return res; //song arr
};

export const getLatestPlaylists = async () => {
  const { db } = await connectToDatabase();

  const res = await db
    .collection("playlists")
    .find({ isPublic: true })
    .sort({ createdDate: 1 })
    .toArray();

  return res; //playlist arr
};