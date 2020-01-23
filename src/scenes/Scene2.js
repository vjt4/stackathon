import { Scene } from "phaser"
import { config } from '../index'
import {gameSettings} from '../game'

console.log(gameSettings)


export default class Scene2 extends Scene {
	constructor() {
		super('playGame');
	}
	create() {
		this.background = this.add.image(0, 0, "mario")
		this.background.setOrigin(0, 0)

		this.kunai = this.add.sprite(config.width / 2, config.height / 2, "kunai")

		this.ninjaIdle= this.physics.add.sprite(config.width/2-50, config.height - 200, "ninjaIdle")

		this.ninjaRun = this.add.sprite(config.width / 2, config.height / 2, "ninjaRun")

		this.ship = this.add.sprite(config.width / 8, config.height / 8, "ship")

		this.cursorKeys = this.input.keyboard.createCursorKeys()
	
		this.add.text(100, 100, 'Playing game'), {
			font: '25px Arial',
			fill: 'yellow'
		}
		this.ninjaIdle.setScale(.25)
		this.ship.play('ship_anim')
		this.ninjaRun.play('run_anim')
		this.ninjaIdle.play('idle_anim')

	}
	resetVerticalPosition(obj) {
		obj.y = 0;
	}
	resetHorizontalPosition(obj) {
		obj.x =0
	}
	moveIt(obj, speed) {
		obj.y += speed
		if (obj.y > config.height) {
			this.resetVerticalPosition(obj)
		}
	}
	edgeLoop(obj) {
		if (obj.x > config.width) {
			obj.x = 0
		}
		if (obj.x < 0) {
			obj.x=config.width	
		}
		if (obj.y > config.height) {
			obj.x = 0
		}
		if (obj.y < 0) {
			obj.x=config.height	
		}

	}
	update() {
		this.moveIt(this.kunai, 3)
		this.edgeLoop(this.ninjaIdle)
		this.movePlayerManager(this.ninjaIdle)
	}
	movePlayerManager() {
		if (this.cursorKeys.left.isDown) {
			this.ninjaIdle.setVelocityX(-gameSettings.playerSpeed)
		} else if (this.cursorKeys.right.isDown) {
			this.ninjaIdle.setVelocityX(gameSettings.playerSpeed)
		}
		else(this.ninjaIdle.setVelocity(0))
	}
	
}