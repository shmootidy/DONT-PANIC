Crafty.init(500, 350, document.getElementById('game'));

// defines interactable items
Crafty.c('Item', {
    init: function() {
        this.addComponent('2D, DOM, Color')
        this.w = 30
        this.h = 30
    },
    place: function(x, y) {
        this.x = x
        this.y = y
        return this
    }
})

// generate interactable items
Crafty.e('Item')
    .place(150, 100)
    .color('green')

Crafty.e('Item')
    .place(250, 150)
    .color('green')

Crafty.e('Item')
    .place(300, 300)
    .color('green')

// defines pop up
Crafty.c('OptionsBox', {
    init: function() {
        this.addComponent('2D, DOM, Color')
        this.x = 20
        this.y = 20
        this.w = 400
        this.h = 400
    },
    optionsList: function(optionsObj) {
        let iteration = 0
        for (const option in optionsObj) {
            let optionTitle = optionsObj[option].title
            iteration = iteration + 50
            Crafty.e('Option').text(optionTitle).place(iteration)
        }
    }
})

// define options in pop up
Crafty.c('Option', {
    init: function() {
        this.addComponent('2D, DOM, Color, Text')
        this.w = 250
        this.h = 20
    },
    text: function(text) {
        this.text = text
    },
    place: function(iteration) {
        this.x = 35
        this.y = 23 + iteration
    },
    action: function(action) {
        // action of each option goes here
    }
})

// define and generate player
const player = Crafty.e('Player, 2D, DOM, Color, Fourway, Collision')
    .attr({
        x: 10,
        y: 10,
        w: 40,
        h: 40,
    })
    .color('red')
    .fourway(200)
    .checkHits('Item')
    .bind('HitOn', function(hitItem) {
        itemPopUp(hitItem)
        // this.freeze() // stops player while options are up
    })

function itemPopUp(hitItem) {
    Crafty.e('ItemPopUp, 2D, DOM, Color, Text')
        .color('grey')
        .attr({
            x: 300,
            y: 300,
            w: 100,
            h: 30,
        })
        .text('HIT ENTER TO SELECT')
        .bind('KeyDown', function(e) {
            if (e.key == Crafty.keys.ENTER) {
                makePopUp(hitItem) // no use for passed data yet
                Crafty('Player').freeze()
                this.destroy()
            }
        })
}

function makePopUp (hitItem) { // hitItem will be passed in order to set the options in popUp
    const popUp = Crafty.e('OptionsBox').color('grey').optionsList({
        option1: {
            title: 'CALL A GOOD FRIEND',
            changeScore: function() {}
        },
        option2: {
            title: 'BROWSE TWITTER',
            changeScore: function() {}
        }
    })
    const selector = Crafty.e('Selector, 2D, DOM, Color, Collision')
        .attr({
            w: 300,
            h: 20,
            x: 30,
            y: 70,
            selectOption: { canSelect: false, optionObj: undefined },
        })
        .color('rgba(255, 99, 71, 0.5)')
        .bind('KeyDown', function(e) {
            if (e.key == Crafty.keys.UP_ARROW) {
                this.selectOption.canSelect = false
                this.y = this.y - 50
                this.resetHitChecks()
            } else if (e.key == Crafty.keys.DOWN_ARROW) {
                this.selectOption.canSelect = false
                this.y = this.y + 50
                this.resetHitChecks()
            } else if (e.key == Crafty.keys.ENTER && this.selectOption.canSelect) {
                const optionID = this.selectOption.optionObj['0']
                const selectedOption = Crafty(optionID)
                console.log(selectedOption)
                Crafty('Player').unfreeze()
                Crafty('Option, OptionsBox, Selector').destroy()
            }
        })
        .checkHits('Option')
        .bind('HitOn', function(hitOption) {
            this.selectOption.optionObj = hitOption[0].obj
            this.selectOption.canSelect = true
        })
}
// limit selectors movement

// get player to not move until directed to with arrows after removing options popup
// as a workaround, I could have a popup the describes the hit entity and allows the user to hit enter to select that item, THEN trigger the popup to occur
