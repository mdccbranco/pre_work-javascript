let marsRoverI = {
    name: 1,
    direction: "N",
    x: 0,
    y: 0,
    travelLog: []
};

let marsRoverII = {
    name: 2,
    direction: "N",
    x: 1,
    y: 4,
    travelLog: []
};

var stop = false;

var grid = [
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function turnLeft(rover) {
    console.log(" turnLeft was called!");
    switch (rover.direction) {
        case "N":
            rover.direction = "W";
            break;
        case "W":
            rover.direction = "S";
            break;
        case "S":
            rover.direction = "R";
            break;
        case "R":
            rover.direction = "N";
            break;
    }
}

function turnRight(rover) {
    console.log(" turnRight was called!");
    switch (rover.direction) {
        case "N":
            rover.direction = "R";
            break;
        case "R":
            rover.direction = "S";
            break;
        case "S":
            rover.direction = "W";
            break;
        case "W":
            rover.direction = "N";
            break;
    }
}

function moveForward(rover) {
    console.log("moveForward was called");
    grid[rover.y][rover.x] = 0;
    if (rover.direction === "N") {
        if (rover.y > 0) {
            switch (grid[rover.y - 1][rover.x]) {
                case 0:
                    let lastPosition = {
                        x: rover.x,
                        y: rover.y
                    };
                    rover.travelLog.push(lastPosition);
                    rover.y--;
                    console.log("Moved forward north.");
                    break;
                case 1:
                    console.log("I can`t go. Found another Rover buddy.");
                    break;
                case 2:
                    console.log("I can`t go. There is an obstacle in my direction.");
                    break;
            }
            return true;
        } else {
            console.log("I can`t go. The next step is outside my grid. I don`t wanna be lost.");
            return false;
        }
    } else if (rover.direction === "R") {
        if (rover.x < 9) {
            switch (grid[rover.y][rover.x + 1]) {
                case 0:
                    let lastPosition = {
                        x: rover.x,
                        y: rover.y
                    };
                    rover.travelLog.push(lastPosition);
                    rover.x++;
                    console.log("Moved forward east.");
                    break;
                case 1:
                    console.log("I can`t go. Found another Rover buddy.");
                    break;
                case 2:
                    console.log("I can`t go. There is an obstacle in my direction.");
                    break;
            }
        } else {
            console.log("I can`t go. The next step is outside my grid. I don`t wanna be lost.");
            return false;
        }
    } else if (rover.direction === "S") {
        if (rover.y < 9) {
            switch (grid[rover.y + 1][rover.x]) {
                case 0:
                    let lastPosition = {
                        x: rover.x,
                        y: rover.y
                    };
                    rover.travelLog.push(lastPosition);
                    rover.y++;
                    console.log("Moved forward south.");
                    break;
                case 1:
                    console.log("I can`t go. Found another Rover buddy.");
                    break;
                case 2:
                    console.log("I can`t go. There is an obstacle in my direction.");
                    break;
            }
        } else {
            console.log("I can`t go. The next step is outside my grid. I don`t wanna be lost.");
            return false;
        }
    } else if (rover.direction === "W") {
        if (rover.x > 0) {
            switch (grid[rover.y][rover.x - 1]) {
                case 0:
                    let lastPosition = {
                        x: rover.x,
                        y: rover.y
                    };
                    rover.travelLog.push(lastPosition);
                    rover.x--;
                    console.log("Moved forward west.");
                    break;
                case 1:
                    console.log("I can`t go. Found another Rover buddy.");
                    break;
                case 2:
                    console.log("I can`t go. There is an obstacle in my direction.");
                    break;
            }
        } else {
            console.log("I can`t go. The next step is outside my grid. I don`t wanna be lost.");
            return false;
        }
    }
    grid[rover.y][rover.x] = 1;
}

function command(rover, orders) {
    stop = false;
    console.log(`Rover ${rover.name}:`);

    grid[rover.y][rover.x] = 0;
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i].toLowerCase();
        if (order !== 'f' && order !== 'b' && order !== 'r' && order !== 'l') {
            console.log("Invalid command. I will stay rigth here");
            return false;
        }
    }

    for (let i = 0; i < orders.length; i++) {
        let order = orders[i].toLowerCase();
        switch (order) {
            case "f":
                moveForward(rover);
                break;
            case "r":
                turnRight(rover);
                break;
            case "l": // up
                turnLeft(rover);
                break;
            case "b":
                moveBackward(rover);
                break;
            default:
                console.log("Command must be f, b, r, or l.")
                i = orders.length;
                break;
        }
        grid[rover.y][rover.x] = 1;

        if(stop){
            i = orders.length + 1;
        }
    }

    if (rover.travelLog.length === 0) {
        console.log("I haven't moved yet");
    } else {
        console.log("Travel log: ")
        for (let i = 0; i < rover.travelLog.length; i++) {
            console.log(`(${rover.travelLog[i].x},${rover.travelLog[i].y})`);
        }
    }
    console.log(`I'm here : (${rover.x},${rover.y})`);
}

function moveBackward(rover) {
    console.log("moveBackward was called");
    grid[rover.y][rover.x] = 0;
    if (rover.direction === "N") {
        if (rover.y < 9) {
            switch (grid[rover.y + 1][rover.x]) {
                case 0:
                    let lastPosition = {
                        x: rover.x,
                        y: rover.y
                    };
                    rover.travelLog.push(lastPosition);
                    rover.y++;
                    console.log("Moved backward south.");
                    return true;
                case 1:
                    console.log("I can`t go. Found another Rover buddy.");
                    stop = true;
                    break;
                case 2:
                    console.log("I can`t go. There is an obstacle in my direction.");
                    stop = true;
                    break;
            }
        } else {
            console.log("I can`t go. The next step is outside my grid. I don`t wanna be lost.");
            stop = true;
        }
    } else if (rover.direction === "R") {
        if (rover.x > 0) {
            switch (grid[rover.y][rover.x - 1]) {
                case 0:
                    let lastPosition = {
                        x: rover.x,
                        y: rover.y
                    };
                    rover.travelLog.push(lastPosition);
                    rover.x--;
                    console.log("Moved backward west.");
                    break;
                case 1:
                    console.log("I can`t go. Found another Rover buddy.");
                    stop = true;
                    break;
                case 2:
                    console.log("I can`t go. There is an obstacle in my direction.");
                    stop = true;
                    break;
            }
        } else {
            console.log("I can`t go. The next step is outside my grid. I don`t wanna be lost.");
            stop = true;
        }
    } else if (rover.direction === "S") {
        if (rover.y > 0) {
            switch (grid[rover.y - 1][rover.x]) {
                case 0:
                    let lastPosition = {
                        x: rover.x,
                        y: rover.y
                    };
                    rover.travelLog.push(lastPosition);
                    rover.y--;
                    console.log("Moved backward north.");
                    break;
                case 1:
                    console.log("I can`t go. Found another Rover buddy.");
                    stop = true;
                    break;
                case 2:
                    console.log("I can`t go. There is an obstacle in my direction.");
                    stop = true;
                    break;
            }
        } else {
            console.log("I can`t go. The next step is outside my grid. I don`t wanna be lost.");
            stop = true;
        }
    } else if (rover.direction === "W") {
        if (rover.x < 9) {
            switch (grid[rover.y][rover.x + 1]) {
                case 0:
                    let lastPosition = {
                        x: rover.x,
                        y: rover.y
                    };
                    rover.travelLog.push(lastPosition);
                    rover.x++;
                    console.log("Moved backward east.");
                    break;
                case 1:
                    console.log("I can`t go. Found another Rover buddy.");
                    stop = true;
                    break;
                case 2:
                    console.log("I can`t go. There is an obstacle in my direction.");
                    stop = true;
                    break;
            }
        } else {
            console.log("I can`t go. The next step is outside my grid. I don`t wanna be lost.");
            stop = true;
        }
        grid[rover.y][rover.x] = 1;
    }
}

//Put rovers on the grid
grid[marsRoverI.y][marsRoverI.x] = 1;
grid[marsRoverII.y][marsRoverII.x] = 1;

//command list
command(marsRoverI, "f");
command(marsRoverII, "rf");