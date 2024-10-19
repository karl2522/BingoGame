# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



### Project Overview

### Bingo Plus

## Overview
Bingo Plus is a modern web-based Bingo game application built with React. The application allows users to join a game using a game code, fetch Bingo cards, and check for winning cards. The UI is designed for clarity and interactivity, featuring a responsive layout and visually appealing elements.

## Features
- **User Interface**: Clean and user-friendly interface for easy navigation.
- **Bingo Card Generation**: Dynamically fetches Bingo cards based on user-provided game codes.
- **Winning Check**: Users can check if their Bingo cards are winning cards.
- **Responsive Design**: Works seamlessly across different devices.

## Technologies Used
- **React**: Front-end library for building user interfaces.
- **JavaScript (ES6+)**: Programming language for interactive elements.
- **CSS**: Styling language to create a visually appealing layout.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (version 14 or later)
- **npm** (Node Package Manager)

### Installation
1. Clone the repository:
   `git clone https://github.com/karl2522/BingoGame.git`
   
   `cd BingoGame`

2. Install Dependencies:
   `npm install`

3. Start the development server:
   `npm start`

## Usage
1. Enter a valid game code in the input field. The game code is fetched from the server at:
   `http://www.hyeumine.com/getcard.php?bcode=<game_code>`

2. Click the "Join Game" button to fetch your Bingo card.

3. View your Bingo card, which includes a unique player token. The player token can be used to check if your card is winning by querying:
   `http://www.hyeumine.com/checkwin.php?playcard_token=<player_token>`

4. Check the status to see if you have a winning card.

## Code Structure
The main components of the application are:
- **App**: The main component that serves as the entry point and calls the `BingoGame` component.
- **BingoGame**: A component that displays individual Bingo cards, including the grid of numbers, headers, and status information.
- **StylesCSS**: A separate component for styling the application.

### Component Details
- **BingoCard**:
  - Displays a Bingo card with a grid of numbers.
  - Has headers for "B", "I", "N", "G", "O".
  - Shows player token, game code, and card status.
  - Includes a button to check for winning status.

- **BingoApp**:
  - Manages the game code input and state for fetched cards.
  - Fetches card data from a remote server.
  - Checks for winning status of cards.

## Styling
The application uses CSS for styling. Key styles include:
- Card background colors and shadows for depth.
- Grid layout for Bingo numbers.
- Hover effects for interactive elements.

