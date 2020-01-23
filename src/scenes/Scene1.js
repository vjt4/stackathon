import { Scene } from "phaser"

export default class Scene1 extends Scene {
	constructor() {
		super('bootGame');
	}
	preload() {
		this.load.image('mario', "../../assets/level/mario.png");
		this.load.image('kunai', "../../assets/ninjaSprites/Kunai.png")
	}
	create() {
		this.add.text(20, 20, 'Loading game...')
		this.scene.start('playGame')

	}
}