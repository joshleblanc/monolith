import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default ({open}) => {
  if(open) {
    return <ExpandLessIcon />
  } else {
    return <ExpandMoreIcon />
  }
}