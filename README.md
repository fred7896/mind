# Functional Description (WIP)

* 
## Class
### State
### functions()

--

* 
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

> Vous commencez le jeu avec un nombre de vies égal au nombre de joueurs. Perdez toutes vos vies et vous perdez la partie. Vous commencez également avec un shuriken, et si tout le monde veut utiliser un shuriken, chaque joueur défausse sa carte la plus basse face visible, donnant à chacun des informations et vous rapprochant de la fin du niveau. À mesure que vous terminez les niveaux, vous pourriez recevoir une récompense d'un shuriken ou une vie supplémentaire. Terminez tous les niveaux et vous gagnez!

> You start the game with a number of lives equal to the number of players. Lose all your lives and you lose the game. You also start with a shuriken, and if everyone wants to use a shuriken, each player discards their lowest card face up, giving everyone information and getting closer to the end of the level. As you complete the levels, you may receive a reward (a shuriken or an additional life ). Complete all levels and you win!


# BDD

## Tables

## account
- id
- login/name
~~->password~~

## game
- playerId
- status (before / run / ended )
- lives
- turn
- shuriken
- begin datetime
- end datetime
- gameResult (Lose/win)
- boardState string

## Hands
- gameId
- playeriD
- hand(list of numbers in string)

# Tasks list
...





