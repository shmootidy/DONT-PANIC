function handleOption(selectedOption) {
    // identify option features
    const scoreEffect = selectedOption.scoreEffect
    const playerMove = selectedOption.playerMove
    const newSkill = selectedOption.newSkill

    // update score
    if (scoreEffect) {
        for (effect in scoreEffect.platter) {
            playerMetrics.platter[effect] += scoreEffect.platter[effect]
        }
        for (effect in scoreEffect.primaryMetrics) {
            playerMetrics.primaryMetrics[effect] += scoreEffect.primaryMetrics[effect]
        }
        calculateStress(playerMetrics)
        loseTime()
    }
    // move player
    if (playerMove) {
        Crafty.enterScene(playerMove)
        currentLocation = playerMove // update player's location (req'd for world event prompts - prompts.js)
        loseTime()
    }
    // display call info
    if (newSkill) {
        // pass newSkill object (described in prompts.js) to new OptionsBox (in options.js)
        setTimeout(takeCall, 200, newSkill) // timeout prevents Crafty confusion - may be fixed in refactor // TODO - check if this can be called without timeout
        playerMetrics.previousDays.newSkill = true // enable newSkill
        document.getElementById('new-skill').innerText = 'Body Check • SHIFT'
        loseTime()
    }
}