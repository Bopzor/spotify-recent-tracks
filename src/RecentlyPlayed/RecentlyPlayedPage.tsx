import React, { useRef, useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Grid, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AxiosPromise } from 'axios';

import Loader from '../Loader';
import TrackDisplay from '../TrackDisplay';
import { Track } from '../types/Track/Track';

import RecentlyPlayedForm from './RecentlyPlayedForm';
import { useGetRecentlyPlayed } from './use-get-recently-played';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: spacing(2),
  },
  list: {
    marginTop: spacing(2),
    overflowY: 'auto',
  },
}));

const RecentlyPlayedPage: React.FC<{ refreshToken: () => AxiosPromise<any> }> = ({ refreshToken }) => {
  const classes = useStyles();
  const listRef = useRef<HTMLDivElement | undefined>();

  const [timeDirection, setTimeDirection] = useState<'before' | 'after'>('before');
  const { tracks, date, setDate, getRecentlyPlayedTracks, loading } = useGetRecentlyPlayed(timeDirection, refreshToken);

  return (
    <div className={classes.container}>
      <RecentlyPlayedForm
        timeDirection={timeDirection}
        setTimeDirection={setTimeDirection}
        date={date}
        setDate={setDate}
        getRecentlyPlayed={getRecentlyPlayedTracks}
      />

      <div className={classes.list} ref={listRef}>
        {tracks &&
          Object.keys(tracks).map((t: string) => (
            <Accordion key={t} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{t}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Grid container direction="column" alignItems="center" spacing={1}>
                  {tracks[t].map((track: Track, idx: number) => (
                    <Grid item key={`${track.id}-${t}-${idx}`}>
                      <TrackDisplay track={track} />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>

      <Loader loading={loading} />
    </div>
  );
};

export default RecentlyPlayedPage;
