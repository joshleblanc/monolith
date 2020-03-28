import React from "react";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export default ({children, href}) => (
  <Link to={href}>
    <Button>{children}</Button>
  </Link>
)
