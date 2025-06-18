function createInitialGameState() {
  return {
    health: 100,
    xp: 0,
    relics: [],
    inventory: [],
    timeAbilities: ['Slow Time', 'Reverse Event', 'Fast Forward'],
    allRelicsCollected: false,
    coins: 0,
    diamonds: 0,
    achievements: []
  };
}

let gameState = createInitialGameState();

function resetGameState() {
  gameState = createInitialGameState();
}

function updateStats({ hp = 0, xp = 0, item = null, relic = null, coins = 0, diamonds = 0, achievement = null }) {
  gameState.health += hp;
  gameState.xp += xp;
  gameState.coins += coins;
  gameState.diamonds += diamonds;

  if (item) gameState.inventory.push(item);

  if (relic && !gameState.relics.includes(relic)) {
    gameState.relics.push(relic);
    if (gameState.relics.length === 3) {
      gameState.allRelicsCollected = true;
      updateStats({ diamonds: 3, achievement: "🕰️ Chrono Conqueror" });
    }
  }

  if (achievement && !gameState.achievements.includes(achievement)) {
    gameState.achievements.push(achievement);
    console.log(`🎉 Achievement Unlocked: ${achievement}`);
  }
}

function showInventory() {
  console.log("\n🎒 Inventory:");
  console.log("Items:", gameState.inventory.join(', ') || "None");
  console.log("Relics:", gameState.relics.join(', ') || "None");
  console.log("Abilities:", gameState.timeAbilities.join(', '));
  console.log("💰 Coins:", gameState.coins);
  console.log("💎 Diamonds:", gameState.diamonds);
  console.log("🏆 Achievements:", gameState.achievements.join(', ') || "None");
}

module.exports = { gameState, updateStats, showInventory, resetGameState };