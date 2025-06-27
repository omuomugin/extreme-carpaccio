# Extreme Carpaccio Server - Single Player Mode

## Requirements
- [Node.js](https://nodejs.org/en/)

## Install & Run

```bash
npm install
npm start
```

The server will start on port 3000 and automatically register a client at localhost:9000.

Start in debug mode:
```bash
DEBUG=xcarpaccio:server npm start
```

## Single Player Configuration

This server has been modified for single-player local development:

- **Auto-registration**: Automatically connects to localhost:9000 client (no manual registration needed)
- **UI disabled**: Client registration and multi-player ranking features are disabled
- **Request history**: Added comprehensive request/response tracking for learning
- **Score tracking**: Individual score and progress monitoring

## Configuration Options

Edit `configuration.json` to modify game behavior:

- **`active`**: Enable/disable order sending
- **`cashFreeze`**: Freeze scoring (useful for testing)
- **`reduction`**: Pricing strategy ("STANDARD", "HALF PRICE", "PAY THE PRICE")
- **`offlinePenalty`**: Penalty for unreachable clients
- **`badRequest`**: Settings for sending corrupted test orders

Changes to this file are automatically reloaded without restarting the server.

## Dashboard Features

Visit http://localhost:3000 to view:
- Current score and connection status
- Score history graph over time
- Detailed request/response history with:
  - Order details (prices, quantities, country, reduction)
  - Expected vs actual responses
  - Result status (correct/incorrect/no response)
  - Timestamps for each interaction

## Testing Commands

```bash
npm test        # Run server tests
npm run lint    # Check code style
```

## Workshop
Extreme Carpaccio is intended to be played with Product Owners (PO) and Developers together. It can be played with only Developers, but slicing strategies tend to be more biased since developers generally focus more on code and than on product and iterations.

The workshop has mainly 3 stages: slicing, implementation and retrospective. A session normally takes between 1:30 and 3:00 hours.

At the beginning, the facilitator exposes the problem to be solved to participants. The participants then form teams between 2-4 (ideally) and try to understand and slice the problem, and together define an implementation strategy, based on product value perspective and technical challenges trade-offs.

Next, the facilitator starts the server and makes sure all the teams are able to exchange HTTP messages with the server. Once everyone is ready, the facilitator allows teams to start implementing (normally requires restarting the server to reset the score) and people start playing.

During the session, the facilitator can activate some "constraints" via the [configuration.json file](https://github.com/dlresende/extreme-carpaccio/blob/master/server/configuration.json), in order to bring some chaos to the game and shake the score. Some examples are: send bad requests (**in which case participants should respond 400 - bad request**); change reduction strategies; change tax rules; charge downtime; etc. Any change to this file is automatically taken into account, no need to restart the server. It is up to the facilitator to announce when he/she triggers a constraint, based on how he/she wants to conduct the session.

At the end, when the facilitator decides to stop the implementation session and the winner becomes known, he/she takes some time at to exchange with participants about the exercise: what worked well, what could be improved, feedbacks, learnings, etc.

I strongly encourage people facilitating or playing Extreme Carpaccio to tweet using the hashtag [#ExtremeCarpaccio](https://twitter.com/search?vertical=default&q=%22extreme%20carpaccio%22%20OR%20%22Xtreme%20carpaccio%22%20OR%20%23ExtremeCarpaccio&src=typd) with their impressions, feelings, feedbacks, etc. Needless to say, but just in case, feel free to fork, hack, make pull requests, talk about, blog, run the exercise on meetups, conferences, compagnies, etc.

More details about the exercise [here](https://diegolemos.net/2016/01/07/extreme-carpaccio/).
