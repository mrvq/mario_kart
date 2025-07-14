const player1 = {
  NOME: "MARIO",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTO: 0,
};

const player2 = {
  NOME: "LUIGI",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTO: 0,
};

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "Reta";
      break;

    case random < 0.66:
      result = "Curva";
      break;

    default:
      result = "Confronto";
      break;
  }
  return result;
}

async function logRollResult(caracterName, block, diceResult, atribute) {
  console.log(
    `${caracterName} 🎲 rolou um dado ${block} ${diceResult} + ${atribute} = ${
      diceResult + atribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada ${round} iniciada!`);

    //sortear bloco

    let block = await getRandomBlock();

    console.log(`Bloco: ${block}`);

    //rolar dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "Reta") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );
      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }
    if (block === "Curva") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );
      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }
    if (block === "Confronto") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME} ! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );
      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2 && character2.PONTO > 0) {
        character2.PONTO--;
        console.log(`${character2.NOME} perdeu um ponto! 🐢`);
      }
      if (powerResult2 > powerResult1 && character1.PONTO > 0) {
        character1.PONTO--;
        console.log(`${character1.NOME} perdeu um ponto! 🐢`);
      }
      if (powerResult2 === powerResult1) {
        console.log("Empate no confronto! Nenhum ponto perdido.");
      }

      // if (powerResult1 > powerResult2) {
      //   if (character2.PONTO > 0) {
      //     character2.PONTO--;
      //     console.log(`${character2.NOME} perdeu um ponto!`);
      //   }
      // }
      // if (powerResult2 > powerResult1) {
      //   if (character1.PONTO > 0) {
      //     character1.PONTO--;
      //     console.log(`${character1.NOME} perdeu um ponto!`);
      //   }
      // }
      // if (powerResult2 === powerResult1) {
      //   console.log("Empate no confronto! Nenhum ponto perdido.");
      //   totalTestSkill1 = 0;
      // }

      //if ternario

      // character2.PONTO -=
      //   powerResult1 > powerResult2 && character2.PONTO > 0 ? 1 : 0;
      // character1.PONTO -=
      //   powerResult2 > powerResult1 && character1.PONTO > 0 ? 1 : 0;

      // console.log(
      //   powerResult2 === powerResult1
      //     ? "Empate no confronto! Nenhum ponto perdido."
      //     : ""
      // );
    }
    //verificando o vencedor da rodada

    if (totalTestSkill1 > totalTestSkill2) {
      character1.PONTO++;
      console.log(`${character1.NOME} venceu a rodada!`);
    } else if (totalTestSkill2 > totalTestSkill1) {
      character2.PONTO++;
      console.log(`${character2.NOME} venceu a rodada!`);
    } else {
      console.log("Empate na rodada!");
    }
  }
}

async function declareWinner(character1, character2) {
  console.log(
    `\n🏁🚨 Corrida finalizada! Placar final: ${character1.NOME} ${character1.PONTO} - ${character2.PONTO} ${character2.NOME}`
  );

  if (character1.PONTO > character2.PONTO) {
    console.log(`${character1.NOME} é o grande vencedor! 🏆`);
  } else if (character2.PONTO > character1.PONTO) {
    console.log(`${character2.NOME} é o grande vencedor! 🏆`);
  } else {
    console.log("A corrida terminou em empate! 🤝");
  }
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

(async function main() {
  // const dice1 = await rollDice();
  // const dice2 = await rollDice();

  // console.log(`Dado do ${player1.NOME}: ${dice1}`);
  // console.log(`Dado do ${player2.NOME}: ${dice2}`);

  // if (dice1 > dice2) {
  //   player1.PONTO++;
  //   console.log(`${player1.NOME} venceu a rodada!`);
  // } else if (dice2 > dice1) {
  //   player2.PONTO++;
  //   console.log(`${player2.NOME} venceu a rodada!`);
  // } else {
  //   console.log("Empate!");
  // }

  // console.log(
  //   `Placar: ${player1.NOME} ${player1.PONTO} - ${player2.PONTO} ${player2.NOME}`
  // );
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );

  await playRaceEngine(player1, player2);
})();
