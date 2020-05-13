import { Track } from "./track.interface";
import { Tracks } from "./tracks.interface";
import { Artists } from "./artists.interface";
import { TrackStore } from "./track.store";

export const findAll = async (): Promise<Artists> => {
  return TrackStore.artists;
};

export const find = async (name: string): Promise<Tracks> => {
  const record: Tracks = TrackStore.artists[name];

  if (record) {
    return record;
  }

  throw new Error("No record found");
};
