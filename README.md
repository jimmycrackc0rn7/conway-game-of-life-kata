# Conway Game Of Life Code Kata

Hello my name is James Leahy and this is my stab on the Conway Game Of Life.  I chose to write this in JavaScript as it is currently my tool of choice.  I used class syntax in JS because I find it easier to read.

I chose to use Karma as the environment and Jasmine as the testing framework because that is what I am familiar with.  

This project is in no way a final state.  I would need to abstract much of the grid logic into it's own class.  I would also need to write tests for all the classes along with more in depth testing.

## Getting Started

### Requirements
I wrote this kata with the following technologies:
`NodeJS v8.12.0`
`npm v6.4.1`
`Google Chrome` for tests

This directory should be zipped including all the node modules needed, but in case you have a different version of node feel free to `npm install`.

#### Run the kata
`node src/main.js`

#### Run Tests
`npm run test`

Karma is configured to use headless chrome.

There is currently a bug where the game will not step correctly after the first iteration, I need to spend some more time on it.
