#Functional Description

*Class
->state
functions()

--

*Players 
->login/name (string)
->hand (array)
joinGame()
hesistateToDiscard()
askShuriken()
discardCard() (put card on board)

*Hand [Cards - Number]
drawCard()
Cards - Numbers
[0-100]

*Board (array)
cleanBoard()

*StackOfCards

*Game 
->Lives = playersCount (number)
->ShurikenCounts = 1 (number)
->Turn/Level
->isStarted
->isEnded
->Lose/win (gameResult)
->players
startGame()
gainLife()
LoseLife()
addShuriken()
useShuriken()
CheckCardValue()
ResolveTurn(calculate penalties/bonus lifes lose)
ChangeTurn()
initTurn()
dealCards()

*Lives
state = Count(Players);

*Rewards / bonus
-> shuriken(bonus) or life



> Vous commencez le jeu avec un nombre de vies égal au nombre de joueurs. Perdez toutes vos vies et vous perdez la partie. Vous commencez également avec un shuriken, et si tout le monde veut utiliser un shuriken, chaque joueur défausse sa carte la plus basse face visible, donnant à chacun des informations et vous rapprochant de la fin du niveau. À mesure que vous terminez les niveaux, vous pourriez recevoir une récompense d'un shuriken ou une vie supplémentaire. Terminez tous les niveaux et vous gagnez!


#BDD

##Tables

*account
->id
->login/name
~~->password~~

*game
-> playerId
-> status (before / run / ended )
-> lives
-> turn
-> shuriken
-> begin datetime
-> end datetime
-> gameResult (Lose/win)
-> boardState string

*Hands
->gameId
->playeriD
->hand(list of numbers in string)

#Tasks list






