import fs from "fs";
import { Track } from "./track.interface";
import { Tracks } from "./tracks.interface";
import { Artists } from "./artists.interface";
import { TrackFile } from "./trackFile.interface";

const trackFile = "../data/tracks.json";

export class TrackStore {
  private static _tracks: Tracks;
  private static _artists: Artists;

  static get tracks() { return this._tracks; }
  static get artists() { return this._artists; }

  static updateTrackFile() {
    const trackData = require(trackFile);
    this._tracks = readTrackFile(trackData.tracks);
    this._artists = preloadArtists(trackData.tracks);
  };
};

// Not ideal, but neither is using JSON as a database...
const readTrackFile = (trackData: Track[]): Tracks => {
  return trackData.reduce((res: Tracks, el: Track) => {
    res[el.id] = el;
    return res;
  }, {});
};
const preloadArtists = (trackData: Track[]): Artists => {
  return trackData.reduce((res: Artists, el: Track) => {
    res[el.artist] = res[el.artist] || {};
    res[el.artist][el.id] = el;
    return res;
  }, {});
};

fs.watchFile(trackFile, TrackStore.updateTrackFile);
TrackStore.updateTrackFile();
