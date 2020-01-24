import phaser from 'phaser';
import Scene1 from './scenes/Scene1'
import Scene2 from './scenes/Scene2'

export let config = {
  type: phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 800,
	scene: [Scene1, Scene2],
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 10},
			debug: false
		}
	}

};

var game = new phaser.Game(config);

function preload ()
{
    this.load.image('logo', 'assets/logo.png');
}

function create ()
{
    var logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

}
