import React, { useEffect, useRef, useState } from 'react';

import { Grid, makeStyles, Theme } from '@material-ui/core';
import ColorThief from 'colorthief';

import { Track } from './types/Track/Track';

export const buildEmbedUrl = (uri: string) => {
  const parsedUri = uri.split(':');

  return `https://open.spotify.com/embed/${parsedUri[1]}/${parsedUri[2]}`;
};

type TrackDisplayProps = {
  track: Track;
};

const useStyles = makeStyles(({ spacing }: Theme) => ({
  fakePlayer: {
    background: ({ backgroundColor }) => `linear-gradient(180deg, ${backgroundColor} 0%, rgba(0,0,0,1) 100%)`,
    width: 300,
    height: 80,
  },
  description: {
    color: '#ffff',
    padding: spacing(1),
    textShadow: 'rgba(0, 0, 0, 0.4) 0px 0px 2px',
  },
  name: {
    fontWeight: 'bold',
    maxWidth: '165px',
    fontSize: '13px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

const toRGBColor = (colors: number[]): string => `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;

const TrackDisplay: React.FC<TrackDisplayProps> = ({ track }) => {
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [played, setPlayed] = useState(false);

  const classes = useStyles({ backgroundColor });
  const imageRef = useRef<HTMLImageElement | undefined>();
  const playerRef = useRef<HTMLIFrameElement | undefined>();
  const colorThief = new ColorThief();

  useEffect(() => {
    if (!imageRef.current) {
      return;
    }

    if (imageRef.current.complete) {
      colorThief.getColor(imageRef.current);
    } else {
      const currentImage = imageRef.current;
      const getColor = () => {
        const color = colorThief.getColor(imageRef.current);
        setBackgroundColor(toRGBColor(color));
      };

      currentImage.addEventListener('load', getColor);

      return () => currentImage.removeEventListener('load', getColor);
    }
  }, [colorThief, imageRef]);

  if (played) {
    return (
      <iframe
        title={track.name}
        src={buildEmbedUrl(track.uri)}
        width="300"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
        ref={playerRef}
      />
    );
  }

  return (
    <Grid container wrap="nowrap" className={classes.fakePlayer} onClick={() => setPlayed(true)}>
      <Grid item>
        <img ref={imageRef} src={track.image} width={80} height={80} crossOrigin="anonymous" />
      </Grid>
      <Grid container item direction="column" className={classes.description}>
        <Grid item className={classes.name}>
          {track.name}
        </Grid>
        <Grid item>{track.artist}</Grid>
      </Grid>
    </Grid>
  );
};

export default TrackDisplay;
