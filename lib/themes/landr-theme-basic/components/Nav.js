import React from 'react';
import GithubIcon from 'react-icons/lib/go/mark-github';
import { Heading, Button, Toolbar, Navlink, NavLink, Link } from 'rebass';

const Nav = ({ repository }) => {
  return (
    <Toolbar
      color="white"
      bg="gray6"
      style={{ borderBottom: '1px solid rgba(0,0,0,.07)' }}
    >
      <NavLink href="/" is={Link}>
        {repository.name}
      </NavLink>
      <NavLink
        ml="auto"
        href="/changelog/"
        is={Link}
      >
        Changelog
      </NavLink>
      <NavLink to="/docs" is={Link}>
        Docs
      </NavLink>
      <NavLink href={repository.url} target="_blank">
        <GithubIcon />
      </NavLink>
    </Toolbar>
  );
};

export default Nav;
