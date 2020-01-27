import phaser,{ Scene } from "phaser"
import { config } from '../index'
import {gameSettings} from '../game'


export default class Scene2 extends Scene {
	constructor() {
		super('playGame');
	}
	create() {
		const map = this.make.tilemap({ key: 'map' })
		const tileset1 = map.addTilesetImage('castle_tileset_part1', 'tile1')
		
		const tileset3 = map.addTilesetImage("castle_tileset_part3", 'tile3')
		let jumpTimer = 0;
		
		const belowLayer = map.createStaticLayer('Tile Layer 1', tileset1, 0, 0)
		const worldLayer= map.createStaticLayer('Tile Layer 2', tileset3, 0, 0)
		
		worldLayer.setCollisionByProperty({collides: true})
		

		this.kunai = this.add.sprite(config.width / 2, config.height / 2, "kunai")

		this.ninja = this.physics.add.sprite(config.width / 2, config.height / 2, 'ninja')

		this.physics.add.collider(this.ninja, worldLayer)

		this.cursorKeys = this.input.keyboard.createCursorKeys()
		this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		this.ninja.setScale(.25)
		this.ninja.body.sourceHeight = 425
		this.ninja.body.sourceWidth = 150

		this.add.text(100, 100, 'Playing game'), {
			font: '25px Arial',
			fill: 'yellow'
		}
		this.ninja.play('idle')
		console.log(this.ninja)
		
	}



	resetVerticalPosition(obj) {
		obj.y = 0;
	}
	resetHorizontalPosition(obj) {
		obj.x =0
	}
	moveIt(obj, speed) {
		obj.y += speed;
		this.edgeLoop(obj)
		}
	
	edgeLoop(obj) {
		if (obj.x > config.width) {
			obj.x = 0
		}
		if (obj.x < 0) {
			obj.x = config.width
		}
		if (obj.y < 0) {
			obj.y = config.height
		}
		if (obj.y > config.height) {
			obj.y = 0
		}
		
	}
	update() {
//	this.moveIt(this.kunai, 1)
		this.movePlayerManager()
		this.edgeLoop(this.ninja)
		this.jump()
		this.attackPlayerManager()

	}

	jump() {
		if (this.cursorKeys.up.isDown && this.ninja.body.onFloor()) {
			this.ninja.body.velocity.y = -250; this.ninja.play('jump', true)
		}
		else if (!this.ninja.body.onFloor()) {
			this.ninja.play('jump', true, 8)
		}
	}



	movePlayerManager() {
		if  (this.cursorKeys.left.isDown) {
			this.ninja.x -= gameSettings.playerSpeed; this.ninja.flipX = true
			if (this.ninja.body.onFloor()) {
				this.ninja.play('run', true);}
		}
		else if (this.cursorKeys.right.isDown) {
			this.ninja.x += gameSettings.playerSpeed; this.ninja.flipX=false
			if (this.ninja.body.onFloor()) {
				this.ninja.play('run', true);
			}
		}
		else if (this.ninja.body.onFloor()) {
			this.ninja.anims.chain('idle')
		}
	}
	attackPlayerManager() {
		if (this.spaceBar.isDown && this.ninja.body.onFloor()) {
			this.ninja.play('attack', true); this.throwKunai(this.ninja) 
		}
		else if (this.spaceBar.isDown) {
			this.ninja.play('jump_attack', true); this.throwKunai(this.ninja)
		}
	}
	throwKunai(obj) {
 		let thrown = this.physics.add.sprite(obj.x, obj.y, 'kunai')
		thrown.setScale(.25); thrown.body.rotation = 1000
		if (obj.flipX) {
			thrown.body.velocity.x = -1000
		}
		else {
			thrown.body.velocity.x = 1000;
		}
	}
}


