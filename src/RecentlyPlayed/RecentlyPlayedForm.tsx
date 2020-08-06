import React, { useState } from 'react';

import {
  Button,
  Collapse,
  Grid,
  IconButton,
  makeStyles,
  Switch,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';

import { formatDate } from '../utils/formatDate';

import { RecentlyPlayedQueries } from './use-get-recently-played';

type RecentlyPlayerProps = {
  timeDirection: 'after' | 'before';
  setTimeDirection: (timeDirection: 'after' | 'before') => void;
  getRecentlyPlayed: (params: RecentlyPlayedQueries) => void;
};

const useStyles = makeStyles(({ palette }: Theme) => ({
  limit: {
    alignSelf: 'flex-end',
  },
  limitLabel: {
    lineHeight: 0.7,
  },
  label: {
    fontSize: '0.8em',
    color: palette.secondary.light,
  },
  selected: {
    fontWeight: 'bold',
    color: palette.primary.main,
  },
}));

const RecentlyPlayedForm: React.FC<RecentlyPlayerProps> = ({ timeDirection, setTimeDirection, getRecentlyPlayed }) => {
  const classes = useStyles();
  const small = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const [date, setDate] = useState(formatDate(new Date(Date.now())));
  const [openSettings, setOpenSettings] = useState(false);

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const params: RecentlyPlayedQueries = { limit: 50 };

    if (timeDirection === 'after') {
      params.after = new Date(date).getTime();
    } else {
      params.before = new Date(date).getTime();
    }

    return getRecentlyPlayed(params);
  };

  return (
    <Grid container justify="space-evenly">
      <Grid item xs={12}>
        <Button type="button" variant="outlined" onClick={handleClick}>
          Get recently played tracks
        </Button>
        {!small && (
          <IconButton onClick={() => setOpenSettings((o) => !o)}>
            <SettingsIcon color="primary" />
          </IconButton>
        )}
        <Collapse component="div" in={small ? true : openSettings}>
          <Grid container item wrap="nowrap" spacing={2}>
            <Grid item container direction="column">
              <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Grid item className={clsx(classes.label, timeDirection === 'before' && classes.selected)}>
                    Before
                  </Grid>
                  <Grid item>
                    <Switch
                      size="small"
                      checked={timeDirection === 'after'}
                      onChange={(e) => setTimeDirection(e.target.checked ? 'after' : 'before')}
                      name="before"
                      color="primary"
                    />
                  </Grid>
                  <Grid item className={clsx(classes.label, timeDirection === 'after' && classes.selected)}>
                    After
                  </Grid>
                </Grid>
              </Typography>
              <TextField type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default RecentlyPlayedForm;
