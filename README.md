# lex-chat [![CircleCI](https://circleci.com/gh/dwmkerr/lex-chat.svg?style=shield)](https://circleci.com/gh/dwmkerr/lex-chat) [![codecov](https://codecov.io/gh/dwmkerr/lex-chat/branch/master/graph/badge.svg)](https://codecov.io/gh/dwmkerr/lex-chat) [![Greenkeeper badge](https://badges.greenkeeper.io/dwmkerr/lex-chat.svg)](https://greenkeeper.io/) [![GuardRails badge](https://badges.production.guardrails.io/dwmkerr/lex-chat.svg)](https://www.guardrails.io)

A simple CLI to chat with a Lex bot - great for developing and debugging! The perfect companion to the [Lex Starter Kit](https://github.com/dwmkerr/lex-starter-kit).

![Example Screenshot](./docs/lex-chat.gif)

## Usage

Install with `npm`:

```bash
npm install -g lex-chat
```

Run it up:

```bash
lex-chat
```

All available bots will be listed, choose the one you want to chat to then chat away.

## Developer Guide

Run it:

```bash
npm start
```

Debug it:

```bash
npm run debug
```

Publish it:

```bash
npm version patch # or minor/major
git push --follow-tags
npm publish
```
