# lex-chat

[![CircleCI](https://circleci.com/gh/dwmkerr/lex-chat.svg?style=shield)](https://circleci.com/gh/dwmkerr/lex-chat) [![codecov](https://codecov.io/gh/dwmkerr/lex-chat/branch/master/graph/badge.svg)](https://codecov.io/gh/dwmkerr/lex-chat) [![Greenkeeper badge](https://badges.greenkeeper.io/dwmkerr/lex-chat.svg)](https://greenkeeper.io/)

A simple CLI to chat with an [Amazon Lex Chatbot](https://aws.amazon.com/lex/) - great for developing and debugging! The perfect companion to the [Lex Starter Kit](https://github.com/dwmkerr/lex-starter-kit).

![Example Screenshot](./docs/lex-chat.gif)

# Introduction

This guide covers how to use the tool, as well as how to develop for it and extend it.

<!-- vim-markdown-toc GFM -->

* [Usage](#usage)
* [Developer Guide](#developer-guide)
    * [Diagnostics](#diagnostics)
* [Troubleshooting](#troubleshooting)
    * [No Bots Found](#no-bots-found)
* [TODO](#todo)

<!-- vim-markdown-toc -->

# Usage

Install with `npm`:

```bash
npm install -g lex-chat
```

Run it up:

```bash
lex-chat
```

All available bots will be listed, choose the one you want to chat to then chat away!

# Developer Guide

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

## Diagnostics

For extra diagnostics, use the `DEBUG` environment variable:

```sh
DEBUG=lex-chat lex-chat
```

This will output additional low-level data if needed. This is powered by the powerful [`debug`](https://github.com/visionmedia/debug) library.

# Troubleshooting

Some troubleshooting tips for common issues are below.

## No Bots Found

If you see the following message:

<img src="./docs/no-bots.png" width="800" alt="No Bots Image" />

Then the tool cannot find any Lex bots on your AWS account. Make sure the AWS CLI is setup to connect to the correct account. Verify your account with:

```sh
aws sts get-caller-identity
```

Which should show you the current AWS account your configuration is targeting.

If you need to create a bot, try the [`lex-starter-kit`](https://github.com/dwmkerr/lex-starter-kit) project.

# TODO

Some notes on key next steps for the big refactor:

- [x] If no bots, show a more helpful interface, possibly link to the lex starter kit? Even offer the option to create one?
- [ ] For debugging, when we get an intent back, we can see what the intent is and get the lambda logs
- [ ] Show a demo/screenshot with a broken lambda function
- [ ] Show bot version in list?
