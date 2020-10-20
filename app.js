$(function(){
    let square = $(".square")
    let contain = $(".contain")
    let width = contain.width()
    let height = contain.height()
    let left = 37;
    let up = 38
    let right = 39
    let down = 40
    let currentDirection;
    let currentInterval;
    let tail = 2;
    let allPositions = [{}]
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
  //  console.log($(this).attr('id'))
  //  let previousPosition = $(this).siblings(`#n${previousId}`).position()
    $(this).offset({left: allPositions[previousId - 1].left, top: allPositions[previousId - 1].top})
    }
}

)
updatePosition()
}

setInterval(function(){
    console.log(allPositions[1].left)
}, 1000)

setInterval(newSquare, 1)


function updatePosition(){ 
let i = 0
    $('.square').each(function(){
        allPositions[i] = $(this).position()
        i++
    }
    )
}

function collisionDetection(){
    let food = $('.food')
    let square = $('.square')
    let horizontalDelta = Math.abs(food.position().left - square.position().left)
    let verticalDelta = Math.abs(food.position().top - square.position().top)

    if (horizontalDelta < 10 && verticalDelta < 10) return true;
    return false
}

function newSquare(){
    if (collisionDetection()){
       $('.food').remove()
       generateSquare()
       extendLength()
       
}
}

function extendLength(){
    let leftPos = square.position().left
    let topPos = square.position().top
    let newSquare = `<div class='square' id=n${tail}></div>`
    console.log(leftPos)
    $('.contain').append(newSquare)
    $(`#n${tail}`).offset({left: leftPos - 10, top: topPos - 10})
    allPositions.push($('.contain :last-child').position())
    tail++
}

function generateNumber(randNum){ 
    let deltaNum = randNum%10
    if (deltaNum < 5) randNum -= deltaNum
    else randNum += (10 - deltaNum)
    return randNum
}

function generateSquare(){
    let randY = Math.random()*height - 5
    let randX = Math.random()*width - 5
    let container = $('.contain')
    let roundedX = generateNumber(randX)
    let roundedY=  generateNumber(randY)
    if (roundedX > 50) randY -=10
    if (roundedY > 50) randX -=10
    container.append("<div class='food'></div>")
    $(".food").offset({top: roundedY, left: roundedX})

}

function moveLeft(){
    if (square.position().left >= 10){
    currentDirection = left
    square.offset({left: square.position().left - 10})
    allPositions[0] = square.position()
    moveChildren()

    }
}

function moveRight(){
    if (square.position().left < width - 10){
    currentDirection = right
    square.offset({left: square.position().left + 10})
    allPositions[0] = square.position()
    moveChildren()

    }
}

function moveDown(){
    if (square.position().top < height - 10){
    currentDirection = down
    square.offset({top: square.position().top + 10})
    allPositions[0] = square.position()
    moveChildren()

    }
}

function moveUp(){
    if (square.position().top >= 10){
    currentDirection = up
    square.offset({top: square.position().top - 10})
    allPositions[0] = square.position()
    moveChildren()

}
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

})