# Rules

> You start the game with a number of lives equal to the number of players. Lose all your lives and you lose the game. You also start with a shuriken, and if everyone wants to use a shuriken, each player discards their lowest card face up, giving everyone information and getting closer to the end of the level. As you complete the levels, you may receive a reward (a shuriken or an additional life ). Complete all levels and you win!

> Vous commencez le jeu avec un nombre de vies égal au nombre de joueurs. Perdez toutes vos vies et vous perdez la partie. Vous commencez également avec un shuriken, et si tout le monde veut utiliser un shuriken, chaque joueur défausse sa carte la plus basse face visible, donnant à chacun des informations et vous rapprochant de la fin du niveau. À mesure que vous terminez les niveaux, vous pourriez recevoir une récompense d'un shuriken ou une vie supplémentaire. Terminez tous les niveaux et vous gagnez!


# Functional Description (WIP)

## Class
### State
### functions()

--

## Players
### State 
- login/name (string)
- hand (array)

### Functions
- joinGame()
- hesistateToDiscard()
- askShuriken()
- discardCard() (put card on board)

## Hand [Cards - Number]

### Functions
- drawCard()
- Cards - Numbers [0-100]

## Board (array)
### Functions
- cleanBoard()

## StackOfCards

## Game 
### State 
- Lives = playersCount (number)
- ShurikenCounts = 1 (number)
- Turn/Level
- isStarted
- isEnded
- Lose/win (gameResult)
- players
### Functions
- startGame()
- gainLife()
- loseLife()
- addShuriken()
- useShuriken()
- checkCardValue()
- resolveTurn(calculate penalties/bonus lifes lose)
- changeTurn()
- initTurn()
- dealCards()

## Lives
state = Count(Players);

## Rewards / bonus
- shuriken(bonus) or life



# BDD

## Tables

## user
- id_user (PK)
- user_name

## game
- id_game (PK)
- shared_code
- game_status (before / run / ended )
- start datetime
- end datetime
- game_result (Lose/win)
- lives
- shuriken
- turn
- move
- created_by (FK/id_user)
- created_at datetime

## game_user 
- id game_user (PK)
- id game (FK)
- id_user (FK)

## card
- id_card (PK)
- card_value

## card_game
- id_card_game
- id_card
- id_game

## card_state
- id_card_state
- id_card_game
- id_slot
- id_game_user
- move ?


## slot
- id_slot
- name_slot  library, hand, inGame, graveyard
- value_slot (default value : 0) possible value [library(0), hand(1), inGame(2), graveyard(3)]


# Tasks list
id-user 31 & id-user 32
...

Step 1 - build library (done)

// draft

Step 2 - draw cards

select id_card ou cardstate (random)

let data {
    slot : 2
    user : 31
    move : +1
}
put id(random), data

1 - 1 - 20 - 2 - 31 - 1
2 - 2 - 20 - 2 - 32 - 1

how to get library
select id_card_state from cards-state join card_game where gameid = 20 && slot_id = 1  

Step 3 - action player 31

select * from cards-state where user_id = 31 && slot_id = 2 && gameid = 20 

put
1 - 1 - 20 - 3 - 31 - 2

Step 4 - action player 32

put
2 - 2 - 20 - 3 - 32 - 3

check hand 

select * from cards-state where slot_id = 1 && gameid = 20

resultats []

Step 5 - change turn

select * from cards-state where gameid = 20 && slot_id = 1


# Style sheet 

## Palette

### First version

- DARK JUNGLE GREEN #1A1E27 (BLACK)
- LIGHT SEA GREEN #1DD3BO (GREEN)
- AWESOME #FF206E (RED)
- BABY POWDER #FDFFFC (WHITE)
- VIVID CERULEAN #00A6FB (BLUE)

### Second version

- RICH BLACK #000C26
- MUSTARD #FFC857
- RED SALSA #F03A47
- DARK IMPERIAL BLUE #08415C
- LIGHT CYAN #D7F9FF









