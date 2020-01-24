import phaser,{ Scene } from "phaser"
import { config } from '../index'
import {gameSettings} from '../game'


export default class Scene2 extends Scene {
	constructor() {
		super('playGame');
	}
	create() {
		this.map = this.make.tilemap({ key: 'map' })
		
		const tileset = this.map.addTilesetImage("castle_tileset_part3", 'tile3')
		
		
		let belowLayer = this.map.createStaticLayer('Tile Layer 1', tileset, 0, 0)
		let worldLayer = this.map.createStaticLayer('Tile Layer 2', tileset, 0, 0)
		

		this.kunai = this.add.sprite(config.width / 2, config.height / 2, "kunai")

		this.ninja = this.physics.add.sprite(config.width / 2, config.height / 2, 'ninja')

		this.physics.add.collider(this.ninja, worldLayer)
	

		this.cursorKeys = this.input.keyboard.createCursorKeys()


	
		this.add.text(100, 100, 'Playing game'), {
			font: '25px Arial',
			fill: 'yellow'
		}
		this.ninja.setScale(.25)
		this.ninja.play('idle')

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
			obj.x=config.width	
		}
		if (obj.y < 0) {
			obj.y = config.height
		}
		if (obj.y > config.height) {
			obj.y = 0
		}
	}
	update() {
		this.moveIt(this.kunai, 1)
		this.movePlayerManager()
		this.edgeLoop(this.ninja)

	}
	movePlayerManager() {
		if (this.cursorKeys.left.isDown) {
			this.ninja.x -= gameSettings.playerSpeed;
			this.ninja.play('run', true); this.ninja.flipX=true
		} else if (this.cursorKeys.right.isDown) {
			this.ninja.x += gameSettings.playerSpeed;
			this.ninja.play('run', true); this.ninja.flipX=false
		} else if (this.cursorKeys.up.isDown) {
			this.ninja.y -= gameSettings.playerJump;
			this.ninja.play('jump', true)
		}
	}
	
}