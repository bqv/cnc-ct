import express, { Request, Response } from "express";

import * as TrackService from "./track.service";
import { Track } from "./track.interface";
import { Tracks } from "./tracks.interface";

import * as ArtistService from "./artist.service";
import { Artists } from "./artists.interface";

export const trackRouter = express.Router();

// GET track/
trackRouter.get("/", async (req: Request, res: Response) => {
  try {
    const tracks: Tracks = await TrackService.findAll();

    res.status(200).send(tracks);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// GET track/:id
trackRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const track: Track = await TrackService.find(id);

    res.status(200).send(track);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export const artistRouter = express.Router();

// GET artist/
artistRouter.get("/", async (req: Request, res: Response) => {
 try {
   const artists: Artists = await ArtistService.findAll();

   res.status(200).send(artists);
 } catch (e) {
   res.status(404).send(e.message);
 }
});

// GET artist/:name
artistRouter.get("/:name", async (req: Request, res: Response) => {
 const name: string = req.params.name;

 try {
   const tracks: Tracks = await ArtistService.find(name);

   res.status(200).send(tracks);
 } catch (e) {
   res.status(404).send(e.message);
 }
});
