import { Scene } from "phaser"

export default class Scene1 extends Scene {
	constructor() {
		super('bootGame');
	}
	preload() {
		this.load.image('mario', "../../assets/level/mario.png");
		this.load.image('kunai', "../../assets/ninjaSprites/Kunai.png");
			
		this.load.spritesheet('ninjaRun', "../../assets/spriteSheets/ninjaRun.png", {
			frameWidth: 364,
			frameHeight: 458
		})

		this.load.spritesheet('ninjaIdle', "../../assets/spriteSheets/ninjaIdle.png", {
			frameWidth: 235,
			frameHeight: 439
		})

		this.load.spritesheet('ship', "../../assets/spritesheets/ship.png", {
			frameWidth: 16,
			frameHeight: 16
		})
	
	}

	create() {
		this.add.text(20, 20, 'Loading game...')
		this.scene.start('playGame')

		this.anims.create({
			key: 'ship_anim',
			frames: this.anims.generateFrameNumbers('ship'),
			frameRate: 20,
			repeat: -1
		});

		this.anims.create({
			key: 'run_anim',
			frames: this.anims.generateFrameNumbers('ninjaRun'),
			frameRate: 20,
			repeat: -1
		})

		this.anims.create({
			key: 'idle_anim',
			frames: this.anims.generateFrameNumbers('ninjaIdle'),
			frameRate: 10,
			repeat: -1
		})

	}
}