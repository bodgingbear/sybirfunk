import 'phaser';

import './index.css';

import { GameOverScene } from 'scenes/GameOverScene';
import { BootScene } from './scenes/BootScene';
import { LoadingScene } from './scenes/LoadingScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { GameScene } from './scenes/GameScene';
import { HowToPlayScene } from './scenes/HowToPlayScene';
import { CreditsScene } from './scenes/CreditsScene';
import { IntroScene } from './scenes/IntroScene';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  banner: true,
  width: 1920,
  height: 1080,
  scene: [
    BootScene,
    LoadingScene,
    MainMenuScene,
    GameScene,
    HowToPlayScene,
    CreditsScene,
    GameOverScene,
    IntroScene,
  ],
  scale: {
    parent: 'app',
    mode: Phaser.Scale.FIT,
    width: 1280,
    height: 720,
  },
  zoom: 5,
  physics: {
    default: 'arcade',
  },
});

window.addEventListener('load', (): Phaser.Game => game);
