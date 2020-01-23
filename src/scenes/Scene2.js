import { Scene } from "phaser"
import {config} from '../index'


export default class Scene2 extends Scene {
	constructor() {
		super('playGame');
	}
	create() {
		this.background = this.add.image(0, 0, "mario")
		this.background.setOrigin(0, 0)
		this.kunai = this.add.image(config.width / 2, config.height / 2, "kunai")

	
		this.add.text(100, 100, 'Playing game'), {
			font: '25px Arial',
			fill: 'yellow'
		}
	}
	resetVerticalPosition(obj) {
		obj.y = 0;
	}
	moveIt(obj, speed) {
		obj.y += speed
		if (obj.y > config.height) {
			this.resetVerticalPosition(obj)
		}
	}
	
	update() {
		this.moveIt(this.kunai, 3)
	}
	
}