import { Track } from "./track.interface";
import { Tracks } from "./tracks.interface";
import { TrackStore } from "./track.store";

export const findAll = async (): Promise<Tracks> => {
  return TrackStore.tracks;
};

export const find = async (id: number): Promise<Track> => {
  const record: Track = TrackStore.tracks[id];

  if (record) {
    return record;
  }

  throw new Error("No record found");
};
