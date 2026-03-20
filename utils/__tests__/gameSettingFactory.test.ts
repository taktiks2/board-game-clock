import {
  generateDefaultPlayer,
  generateGameSetting,
  generateInitialGameSettings,
  refreshPlayers,
} from "../gameSettingFactory";

describe("generateDefaultPlayer", () => {
  it("creates a player with correct order and name", () => {
    const player = generateDefaultPlayer(0);
    expect(player.name).toBe("Player1");
    expect(player.order).toBe(0);
    expect(player.time).toBe(60);
    expect(player.move).toBe(0);
    expect(player.id).toBeDefined();
  });

  it("creates player with order-based name", () => {
    const player = generateDefaultPlayer(2);
    expect(player.name).toBe("Player3");
    expect(player.order).toBe(2);
  });
});

describe("generateGameSetting", () => {
  it("creates setting with correct player count", () => {
    const setting = generateGameSetting(3);
    expect(setting.playerCount).toBe(3);
    expect(setting.players).toHaveLength(3);
    expect(setting.name).toBe("For 3 players");
    expect(setting.isAudioOn).toBe(true);
    expect(setting.isKeepAwake).toBe(true);
    expect(setting.gameMode).toBe("normal");
  });

  it("assigns correct order to each player", () => {
    const setting = generateGameSetting(4);
    setting.players.forEach((player, i) => {
      expect(player.order).toBe(i);
    });
  });
});

describe("generateInitialGameSettings", () => {
  it("creates 3 settings for 2, 3, 4 players", () => {
    const settings = generateInitialGameSettings();
    expect(settings).toHaveLength(3);
    expect(settings[0].playerCount).toBe(2);
    expect(settings[1].playerCount).toBe(3);
    expect(settings[2].playerCount).toBe(4);
  });
});

describe("refreshPlayers", () => {
  it("returns players with new ids but same name and time", () => {
    const setting = generateGameSetting(2);
    const originalIds = setting.players.map((p) => p.id);
    const refreshed = refreshPlayers(setting.players);

    expect(refreshed).toHaveLength(2);
    refreshed.forEach((player, i) => {
      expect(player.id).not.toBe(originalIds[i]);
      expect(player.name).toBe(setting.players[i].name);
      expect(player.time).toBe(setting.players[i].time);
    });
  });
});
