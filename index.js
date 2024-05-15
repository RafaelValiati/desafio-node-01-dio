const racer1 = {
  NAME: "Mario",
  SPEED: 4,
  MANEUVERABILITY: 3,
  POWER: 3,
  POINTS: 0,
};

const racer2 = {
  NAME: "Luigi",
  SPEED: 3,
  MANEUVERABILITY: 4,
  POWER: 4,
  POINTS: 0,
};

async function throwDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function selectRandomBlock() {
  let randomValue = Math.random();
  let blockType;

  switch (true) {
      case randomValue < 0.33:
          blockType = "STRAIGHT";
          break;
      case randomValue < 0.66:
          blockType = "TURN";
          break;
      default:
          blockType = "BATTLE";
  }

  return blockType;
}

async function printRollResult(characterName, block, diceResult, attribute) {
  console.log(
      `${characterName} 🎲 rolled a dice on ${block} ${diceResult} + ${attribute} = ${
          diceResult + attribute
      }`
  );
}

async function runRaceEngine(contender1, contender2) {
  for (let round = 1; round <= 5; round++) {
      console.log(`🏁 Round ${round}`);

      // Select block
      let block = await selectRandomBlock();
      console.log(`Block: ${block}`);

      // Roll the dice
      let diceResult1 = await throwDice();
      let diceResult2 = await throwDice();

      // Skill test
      let totalSkillTest1 = 0;
      let totalSkillTest2 = 0;

      if (block === "STRAIGHT") {
          totalSkillTest1 = diceResult1 + contender1.SPEED;
          totalSkillTest2 = diceResult2 + contender2.SPEED;

          await printRollResult(
              contender1.NAME,
              "speed",
              diceResult1,
              contender1.SPEED
          );

          await printRollResult(
              contender2.NAME,
              "speed",
              diceResult2,
              contender2.SPEED
          );
      }

      if (block === "TURN") {
          totalSkillTest1 = diceResult1 + contender1.MANEUVERABILITY;
          totalSkillTest2 = diceResult2 + contender2.MANEUVERABILITY;

          await printRollResult(
              contender1.NAME,
              "maneuverability",
              diceResult1,
              contender1.MANEUVERABILITY
          );

          await printRollResult(
              contender2.NAME,
              "maneuverability",
              diceResult2,
              contender2.MANEUVERABILITY
          );
      }

      if (block === "BATTLE") {
          let powerResult1 = diceResult1 + contender1.POWER;
          let powerResult2 = diceResult2 + contender2.POWER;

          console.log(`${contender1.NAME} confronted ${contender2.NAME}! 🥊`);

          await printRollResult(
              contender1.NAME,
              "power",
              diceResult1,
              contender1.POWER
          );

          await printRollResult(
              contender2.NAME,
              "power",
              diceResult2,
              contender2.POWER
          );

          if (powerResult1 > powerResult2 && contender2.POINTS > 0) {
              console.log(
                  `${contender1.NAME} won the battle! ${contender2.NAME} lost 1 point 🐢`
              );
              contender2.POINTS--;
          }

          if (powerResult2 > powerResult1 && contender1.POINTS > 0) {
              console.log(
                  `${contender2.NAME} won the battle! ${contender1.NAME} lost 1 point 🐢`
              );
              contender1.POINTS--;
          }

          console.log(
              powerResult2 === powerResult1
                  ? "Battle tied! No points were lost"
                  : ""
          );
      }

      // Determine the winner
      if (totalSkillTest1 > totalSkillTest2) {
          console.log(`${contender1.NAME} scored a point!`);
          contender1.POINTS++;
      } else if (totalSkillTest2 > totalSkillTest1) {
          console.log(`${contender2.NAME} scored a point!`);
          contender2.POINTS++;
      }

      console.log("-----------------------------");
  }
}

async function announceWinner(contender1, contender2) {
  console.log("Final results:");
  console.log(`${contender1.NAME}: ${contender1.POINTS} point(s)`);
  console.log(`${contender2.NAME}: ${contender2.POINTS} point(s)`);

  if (contender1.POINTS > contender2.POINTS)
      console.log(`\n${contender1.NAME} won the race! Congratulations! 🏆`);
  else if (contender2.POINTS > contender1.POINTS)
      console.log(`\n${contender2.NAME} won the race! Congratulations! 🏆`);
  else console.log("The race ended in a tie");
}

(async function main() {
  console.log(
      `🏁🚨 Race between ${racer1.NAME} and ${racer2.NAME} starting...\n`
  );

  await runRaceEngine(racer1, racer2);
  await announceWinner(racer1, racer2);
})();
