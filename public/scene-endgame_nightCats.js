Crafty.scene('nightCats', function() {
    /* cat image source https://www.levelwinner.com/meow-match-beginners-guide-tips-cheats-strategies/ */
    Crafty.background('white url(assets/sleepWCats.jpg) no-repeat center right')

    /* into the final scene and instruct the user to press enter to start another game*/
    Crafty.e('2D, DOM, Canvas, Text, Mouse')
    .attr({ x: 120, y: 280 })
    .text('Press enter to start another game')
    .textFont({ size: '30px', weight: 'bold', type: 'italic'})
    .textColor('white')
    .bind('KeyDown', function(e) {
        if (e.key == Crafty.keys.ENTER) { // TODO - refactor
            const timer = document.getElementById('timer')  /* redisplay the timer */
            timer.style.display = 'block'
            gameOver = false
            const chart = document.getElementById('myChart')
            chart.style.display = 'none'
            Crafty.enterScene('bedroom')
            currentLocation = 'bedroom'
            checkUser(playerMetrics.name)
        }
      })
})
