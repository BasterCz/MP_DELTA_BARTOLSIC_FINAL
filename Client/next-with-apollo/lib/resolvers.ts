import { QueryResolvers, MutationResolvers } from "./type-defs.graphqls";
import { ResolverContext } from "./apollo";
import {
  addLikeRef,
  addPlaylistRef,
  addUser,
  addView,
  addViewRef,
  checkUserExists,
  getLastViewdSongs,
  getLatestPlaylists,
  getLatestSongs,
  getLikeRefs,
  getMostViewdSongs,
  getPlaylistRef,
  isLikedByUser,
  objectViews,
  objectViewsDate,
  playlistAdd,
  playlistAddSong,
  playlistDelete,
  playlistGet,
  playlistGetOne,
  playlistRemoveSong,
  playlistSongs,
  playlistUpdate,
  removeLikeRef,
  removePlaylistRef,
  removeViewRef,
  searchPlaylistsGet,
  searchSongsGet,
  songPlaylists,
  songsAdd,
  songsDelete,
  songsGet,
  songsGetOne,
  songsUpdate,
  waveformFind as getWavefromFind,
  waveformsFind
} from "../extensions/api/mongoapi";

const Query: Required<QueryResolvers<ResolverContext>> = {
  async songs(_parent, args, _context, _info) {
    return await songsGet();
  },
  async playlists(_parent, args, _context, _info) {
    return await playlistGet();
  },
  async songsSearch(_parent, args, _context, _info) {
    return await searchSongsGet(args.query);
  },
  async playlistsSearch(_parent, args, _context, _info) {
    return await searchPlaylistsGet(args.query);
  },
  async song(_parent, args, _context, _info) {
    return await songsGetOne(args._id);
  },
  async playlist(_parent, args, _context, _info) {
    return await playlistGetOne(args._id);
  },
  async playlistSongs(_parent, args, _context, _info) {
    return await playlistSongs(args._id);
  },
  async songPlaylists(_parent, args, _context, _info) {
    return await songPlaylists(args._id);
  },
  async objectViewsDate(_parent, args, _context, _info) {
    return await objectViewsDate(args._id, args.groupByMinutes);
  },
  async objectViews(_parent, args, _context, _info) {
    return await objectViews(args._id);
  },
  async waveformFind(_parent, args, _context, _info) {
    return await getWavefromFind(args._id);
  },
  async waveformsFind(_parent, args, _context, _info) {
    return await waveformsFind(args._ids);
  },
  async checkUserExists(_parent, args, _context, _info) {
    return await checkUserExists(args.userID);
  },
  async isLikedByUser(_parent, args, _context, _info) {
    return await isLikedByUser(args.userID, args.objectID);
  },
  async getLikeRefs(_parent, args, _context, _info) {
    return await getLikeRefs(args.userID);
  },
  async getPlaylistRef(_parent, args, _context, _info) {
    return await getPlaylistRef(args.userID);
  },
  async getLastViewdSongs(_parent, args, _context, _info) {
    return await getLastViewdSongs(args.userID);
  },
  async getMostViewdSongs(_parent, args, _context, _info) {
    return await getMostViewdSongs();
  },
  async getLatestSongs(_parent, args, _context, _info) {
    return await getLatestSongs();
  },
  async getLatestPlaylists(_parent, args, _context, _info) {
    return await getLatestPlaylists();
  },
};

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  async songsUpdate(_parent, args, _context, _info) {
    return await songsUpdate(
      args._id,
      args.name,
      args.file_path,
      args.image_path,
      args.isPublic
    );
  },
  async playlistUpdate(_parent, args, _context, _info) {
    return await playlistUpdate(
      args._id,
      args.name,
      args.description,
      args.image_path,
      args.isPublic
    );
  },
  async songsAdd(_parent, args, _context, _info) {
    return await songsAdd(
      args.name,
      args.file_path,
      args.image_path,
      args.isPublic
    );
  },
  async playlistAdd(_parent, args, _context, _info) {
    return await playlistAdd(
      args.name,
      args.description,
      args.image_path,
      args.isPublic
    );
  },
  async songsDelete(_parent, args, _context, _info) {
    return await songsDelete(args._id);
  },
  async playlistDelete(_parent, args, _context, _info) {
    return await playlistDelete(args._id);
  },
  async playlistAddSong(_parent, args, _context, _info) {
    return await playlistAddSong(args._id, args.song);
  },
  async playlistRemoveSong(_parent, args, _context, _info) {
    return await playlistRemoveSong(args._id, args.song);
  },
  async addView(_parent, args, _context, _info) {
    return await addView(args._id);
  },
  async addUser(_parent, args, _context, _info) {
    return await addUser(args.userID);
  },
  async addLikeRef(_parent, args, _context, _info) {
    return await addLikeRef(args.userID, args.objectID);
  },
  async addViewRef(_parent, args, _context, _info) {
    return await addViewRef(args.userID, args.objectID);
  },
  async addPlaylistRef(_parent, args, _context, _info) {
    return await addPlaylistRef(args.userID, args.objectID);
  },
  async removeLikeRef(_parent, args, _context, _info) {
    return await removeLikeRef(args.userID, args.objectID);
  },
  async removeViewRef(_parent, args, _context, _info) {
    return await removeViewRef(args.userID, args.objectID);
  },
  async removePlaylistRef(_parent, args, _context, _info) {
    return await removePlaylistRef(args.userID, args.objectID);
  },
};
export default { Query, Mutation };
