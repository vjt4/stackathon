import { Scene } from "phaser"

export default class Scene1 extends Scene {
	constructor() {
		super('bootGame');
	}
	preload() {
		this.load.image('mario', "../../assets/level/mario.png");
		this.load.image('kunai', "../../assets/Kunai.png");
		this.load.image('tile3', "../../assets/level/castle_tileset_part3.png")
		this.load.image('tile1', "../../assets/level/castle_tileset_part1.png")

		
		this.load.tilemapTiledJSON("map", '../../assets/level/desert.json')

			
		this.load.atlas('ninja', "../../assets/spritesheets/ninja.png", "../../assets/spritesheets/ninja.json")
	
	}

	create() {
		this.add.text(20, 20, 'Loading game...')
		this.scene.start('playGame')

		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNames('ninja', {
				start: 0,
				end: 9,
				zeroPad: 0,
				prefix: 'idle__',
				suffix: '.png'
			}),
			frameRate: 8,
			repeat: -1
		})
		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNames('ninja', {
				start: 0,
				end: 9,
				zeroPad: 1,
				prefix: 'run__',
				suffix: '.png'
			}),
			frameRate: 24,
			repeat: 0
		})
		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNames('ninja', {
				start: 0,
				end: 9,
				zeroPad: 1,
				prefix: 'jump__',
				suffix: '.png'
			}),
			frameRate: 8,
			repeat: 0
		})
		this.anims.create({
			key: 'throw',
			frames: this.anims.generateFrameNames('ninja', {
				start: 0,
				end: 9,
				zeroPad: 1,
				prefix: 'throw__',
				suffix: '.png'
			}),
			frameRate: 8,
			repeat: -1
		})
		this.anims.create({
			key: 'attack',
			frames: this.anims.generateFrameNames('ninja', {
				start: 0,
				end: 9,
				zeroPad: 1,
				prefix: 'attack__',
				suffix: '.png'
			}),
			frameRate: 24,
			repeat: 0
		})
		this.anims.create({
			key: 'jump_attack',
			frames: this.anims.generateFrameNames('ninja', {
				start: 0,
				end: 9,
				zeroPad: 1,
				prefix: 'jump_attack__',
				suffix: '.png'
			}),
			frameRate: 8,
			repeat: -1
		})
	}
}