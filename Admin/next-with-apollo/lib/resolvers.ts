import { QueryResolvers, MutationResolvers } from './type-defs.graphqls'
import { ResolverContext } from './apollo'
import { addView, objectViews, objectViewsDate, playlistAdd, playlistAddSong, playlistDelete, playlistGet, playlistGetOne, playlistRemoveSong, playlistSongs, playlistUpdate, songPlaylists, songsAdd, songsDelete, songsGet, songsGetOne, songsUpdate, } from '../extensions/api/mongoapi'

const Query: Required<QueryResolvers<ResolverContext>> = {
  async songs(_parent, args, _context, _info) {
    return await songsGet();
  },
  async playlists(_parent, args, _context, _info) {
    return await playlistGet();
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
}

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  async songsUpdate(_parent, args, _context, _info) {
    return await songsUpdate(args._id, args.name, args.file_path, args.image_path, args.isPublic);
  },
  async playlistUpdate(_parent, args, _context, _info) {
    return await playlistUpdate(args._id, args.name, args.description, args.image_path, args.isPublic);
  },
  async songsAdd(_parent, args, _context, _info) {
    return await songsAdd(args.name, args.file_path, args.image_path, args.isPublic);
  },
  async playlistAdd(_parent, args, _context, _info) {
    return await playlistAdd(args.name, args.description, args.image_path, args.isPublic);
  },
  async songsDelete(_parent, args, _context, _info) {
    return await songsDelete(args._id)
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
  }
}
export default { Query, Mutation }
