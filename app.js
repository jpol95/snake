$(function(){
    let square = $(".square")
    let contain = $(".contain")
    let leftmin = contain.position().left
    let topmin = contain.position().top
    let width =  contain.width() 
    let height = contain.height() 
    let left = 37;
    let up = 38
    let right = 39
    let down = 40
    let currentDirection;
    let currentInterval;
    let tail = 2;
    let allOffsets = [{left: leftmin, top: topmin}]
    let loseScreen = "<h2> Whoops! Looks like you're not very good. Care to try again?</h2"
    generateSquare()
        $('html').keydown(function(e){
        let invalidDirection = Math.abs(currentDirection - e.keyCode) == 0 || Math.abs(currentDirection - e.keyCode) == 2
         if(invalidDirection) return 
         if (currentInterval != undefined) clearInterval(currentInterval)
         currentInterval = move(e.keyCode)
        }
    )

function moveChildren(){
    $('.square').each(function(){
    let previousId = $(this).attr('id').substring(1) - 1
    if (previousId >= 1){
    $(this).offset({left: allOffsets[previousId - 1].left, top: allOffsets[previousId - 1].top})
    }
})
updatePosition()
}

setInterval(newSquare, 1)


function updatePosition(){ 
let i = 0
    $('.square').each(function(){
        allOffsets[i] = $(this).offset()
        i++
    }
    )
}

function collisionDetection(){
    let food = $('.food')
    let square = $('.square')
    let horizontalDelta = Math.abs(food.offset().left - square.offset().left)
    let verticalDelta = Math.abs(food.offset().top - square.offset().top)

    if (horizontalDelta < 10 && verticalDelta < 10) return true;
    return false
}

function newSquare(){
    if (collisionDetection()){
       $('.food').remove()
       generateSquare()
       for (let i = 0; i < 4; i++)
       extendLength()
       
}
}

function extendLength(){
    let leftPos = $('.contain :last-child').offset().left
    let topPos = $('.contain :last-child').offset().top
    let newSquare = `<div class='square' id=n${tail}></div>`
    $('.contain').append(newSquare)
    $(`#n${tail}`).offset({left: leftPos, top: topPos})
    allOffsets.push($('.contain :last-child').offset())
    tail++
}

function generateNumber(randNum){ 
    let deltaNum = randNum%10
    if (deltaNum < 5) randNum -= deltaNum
    else randNum += (10 - deltaNum)
    return randNum
}

function generateSquare(){
    let container = $('.contain')
    let randY = Math.random()*height + topmin - 5
    let randX = Math.random()*width + leftmin - 5
    let roundedX = generateNumber(randX)
    let roundedY=  generateNumber(randY)
    if (roundedX > 50) randY -=10
    if (roundedY > 50) randX -=10
    console.log(roundedX)
    console.log(roundedY)
    container.append("<div class='food'></div>")
    $(".food").offset({top: roundedY, left: roundedX})

}

function moveLeft(){
    currentDirection = left
    square.offset({left: square.offset().left - 10})
    moveChildren()
    checkLoss()
    
}

function moveRight(){
    currentDirection = right
    square.offset({left: square.offset().left + 10})
    moveChildren()
    checkLoss()

    
}

function moveDown(){
    currentDirection = down
    square.offset({top: square.offset().top + 10})
    moveChildren()
    checkLoss()

    
}

function moveUp(){
    currentDirection = up
    square.offset({top: square.offset().top - 10})
    moveChildren()
    checkLoss()


}

function move(direct){
    square.stop()
    switch(direct){
    case left:
        return setInterval(moveLeft, 50)
    case up:    
        return setInterval(moveUp, 50)
    case right:
        return setInterval(moveRight, 50)
    case down:
        return setInterval(moveDown, 50)
    }

}

function checkLoss(){
    if (outOfBounds() || selfCollision()){
    square.stop()
    $('.square').each(function(){
        $(this).remove()
        $('.contain').html(loseScreen)
    })
}
}
function outOfBounds(){
    console.log(allOffsets[0].left)
    // console.log(allPositions[0].left < leftmin)
    console.log(allOffsets[0].top)
    // console.log(allPositions[0].top)
    return allOffsets[0].left >  leftmin + width - 10 || allOffsets[0].left < leftmin || allOffsets[0].top > topmin+ height - 10 || allOffsets[0].top < topmin
}

function selfCollision(){
    let i = 0
    for (let pos of allOffsets){
        if (i >= 1){
        if (Math.abs(square.offset().left - pos.left) < 10 && Math.abs(square.offset().top - pos.top) < 10 ) return true
        }
        i++
    }
return false
 
}

}
)