const personagensEmojis = {
  MARIO: "🍄",
  LUIGI: "🛠️",
};

let historico = [];

function getEmoji(nome) {
  return personagensEmojis[nome] || "🏎️";
}

function registrarEvento(evento) {
  historico.push(evento);
  console.log(evento);
}

function criarPersonagem(nome, velocidade, manobrabilidade, poder) {
  return {
    NOME: nome.toUpperCase(),
    VELOCIDADE: velocidade,
    MANOBRABILIDADE: manobrabilidade,
    PODER: poder,
    PONTO: 0,
  };
}

function ajustarDificuldade(personagem, dificuldade) {
  if (dificuldade === "fácil") {
    personagem.VELOCIDADE += 1;
  } else if (dificuldade === "difícil") {
    personagem.PODER += 1;
  }
}

async function getRandomBlock() {
  const blocks = ["Reta", "Curva", "Confronto", "Obstáculo", "Turbo"];
  return blocks[Math.floor(Math.random() * blocks.length)];
}

async function logRollResult(caracterName, block, diceResult, atribute) {
  registrarEvento(
    `${getEmoji(
      caracterName
    )} ${caracterName} 🎲 rolou em ${block}: ${diceResult} + ${atribute} = ${
      diceResult + atribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    registrarEvento(`\n🏁 Rodada ${round} iniciada!`);

    let block = await getRandomBlock();
    registrarEvento(`Bloco: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    switch (block) {
      case "Reta":
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
        break;

      case "Curva":
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
        break;

      case "Confronto":
        let powerResult1 = diceResult1 + character1.PODER;
        let powerResult2 = diceResult2 + character2.PODER;

        registrarEvento(
          `${getEmoji(character1.NOME)} ${character1.NOME} confrontou com ${
            character2.NOME
          } ${getEmoji(character2.NOME)}! 🥊`
        );
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
          registrarEvento(`${character2.NOME} perdeu um ponto! 🐢`);
        } else if (powerResult2 > powerResult1 && character1.PONTO > 0) {
          character1.PONTO--;
          registrarEvento(`${character1.NOME} perdeu um ponto! 🐢`);
        } else {
          registrarEvento("Empate no confronto! Nenhum ponto perdido.");
        }
        break;

      case "Obstáculo":
        totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
        totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

        await logRollResult(
          character1.NOME,
          "obstáculo",
          diceResult1,
          character1.MANOBRABILIDADE
        );
        await logRollResult(
          character2.NOME,
          "obstáculo",
          diceResult2,
          character2.MANOBRABILIDADE
        );

        if (totalTestSkill1 < 5) {
          character1.PONTO = Math.max(0, character1.PONTO - 1);
          registrarEvento(`${character1.NOME} bateu no obstáculo! ❌`);
        }

        if (totalTestSkill2 < 5) {
          character2.PONTO = Math.max(0, character2.PONTO - 1);
          registrarEvento(`${character2.NOME} bateu no obstáculo! ❌`);
        }
        break;

      case "Turbo":
        character1.PONTO++;
        character2.PONTO++;
        registrarEvento("🚀 Bloco Turbo! Ambos ganham um ponto extra!");
        break;
    }

    // Verificar vencedor da rodada (exceto em confronto puro)
    if (["Reta", "Curva"].includes(block)) {
      if (totalTestSkill1 > totalTestSkill2) {
        character1.PONTO++;
        registrarEvento(`${character1.NOME} venceu a rodada!`);
      } else if (totalTestSkill2 > totalTestSkill1) {
        character2.PONTO++;
        registrarEvento(`${character2.NOME} venceu a rodada!`);
      } else {
        registrarEvento("Empate na rodada!");
      }
    }

    // Placar parcial
    registrarEvento(
      `🏆 Placar parcial: ${character1.NOME} ${character1.PONTO} - ${character2.PONTO} ${character2.NOME}`
    );
  }
}

async function declareWinner(character1, character2) {
  registrarEvento(`\n🏁🚨 Corrida finalizada!`);
  registrarEvento(
    `🔢 Placar final: ${character1.NOME} ${character1.PONTO} - ${character2.PONTO} ${character2.NOME}`
  );

  if (character1.PONTO > character2.PONTO) {
    registrarEvento(`🏆 ${character1.NOME} é o grande vencedor!`);
  } else if (character2.PONTO > character1.PONTO) {
    registrarEvento(`🏆 ${character2.NOME} é o grande vencedor!`);
  } else {
    registrarEvento("🤝 A corrida terminou em empate!");
  }
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

(async function main() {
  const player1 = criarPersonagem("Mario", 4, 3, 3);
  const player2 = criarPersonagem("Luigi", 3, 4, 4);

  ajustarDificuldade(player1, "fácil");
  ajustarDificuldade(player2, "difícil");

  registrarEvento(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);

  console.log("\n📜 Histórico da Corrida:");
  historico.forEach((evento) => console.log(evento));
})();
