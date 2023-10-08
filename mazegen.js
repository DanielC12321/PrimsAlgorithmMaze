document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('generatemaze-button').addEventListener('click', () => {
        guess(); 
    });
   guess();
});
function guess() {
    
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";
ctx.clearRect(0, 0, document.getElementById("mycanvas").width, document.getElementById("mycanvas").height);
    console.log(document.getElementById('guess').value);
let arr = new Array(document.getElementById('guess').value);




//sets everything to black
for(var i = 0; i <document.getElementById('guess').value; i++)
{
    arr[i]= new Array(document.getElementById('guess').value);
    for(var j = 0; j <document.getElementById('guess').value; j++)
{
        arr[i][j] = 0;
}

}

//make path
var visited = Array();
var frontier = Array();
arr[Math.floor(document.getElementById('guess').value/2)][Math.floor(document.getElementById('guess').value/2)] = 1;
for(var i = 0; i<document.getElementById('guess').value; i++){
    for(var j = 0; j<document.getElementById('guess').value; j++)
    {
        if(arr[i][j]==0){
            ctx.beginPath();
            ctx.rect(0+j*20, 0+i*20, 20, 20);
            ctx.fill();
    }
    }
    }
    ctx.beginPath();
ctx.rect(0, 0, document.getElementById('guess').value*20, document.getElementById('guess').value*20);
ctx.stroke();
makemaze(arr,visited, frontier,Math.floor(document.getElementById('guess').value/2),Math.floor(document.getElementById('guess').value/2));







//print maze



console.log(arr);
}

function makemaze(maze,visited, frontier,  y, x)
{
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    

//find frontier
ctx.fillStyle = "#FF0000";

    for(var i = 0; i<4; i++)
    {
        switch(i)
        {
            case 0:
                if(y-2>=0&&maze[y-2][x]==0&&!frontier.includes([y-2,x]))
                {
                    frontier.push([y-2,x]);
                    ctx.fillRect((y-2)*20, x*20, 20, 20);
                }
            break;
            case 1:
                if(x+2<document.getElementById('guess').value&&maze[y][x+2]==0&&!frontier.includes([y,x+2]))
                {
                    frontier.push([y, x+2]);
                    ctx.fillRect(y*20, (x+2)*20, 20, 20);
                }
            break;
            case 2:
                if(y+2<document.getElementById('guess').value&&maze[y+2][x]==0&&!frontier.includes([y+2,x]))
                {
                    frontier.push([y+2,x]);
                    ctx.fillRect((y+2)*20, x*20, 20, 20);
                }
            break;
            case 3:
                if(x-2>=0&&maze[y][x-2]==0&&!frontier.includes([y,x-2]))
                {
                    frontier.push([y, x-2]);
                    ctx.fillRect(y*20, (x-2)*20, 20, 20);
                }
            break;
        }
    }
    var randfindex = Math.floor(Math.random()*frontier.length);
    var randfrontier = frontier[randfindex];
    frontier.splice(randfindex, 1);
var neighbors = Array();
//chuck neighbors of the random frontier
for(var j = 0; j<4; j++)
    {
        switch(j)
        {
            case 0:
                if(randfrontier[0]-2>=0&&maze[randfrontier[0]-2][randfrontier[1]]==1)
                {
                    console.log("hello");
                    neighbors.push([randfrontier[0]-2,randfrontier[1], 'N']);
                }
            break;
            case 1:
                if(randfrontier[1]+2<document.getElementById('guess').value&&maze[randfrontier[0]][randfrontier[1]+2]==1)
                {
                    neighbors.push([randfrontier[0], randfrontier[1]+2, 'E']);
                }
            break;
            case 2:
                if(randfrontier[0]+2<document.getElementById('guess').value&&maze[randfrontier[0]+2][randfrontier[1]]==1)
                {
                    neighbors.push([randfrontier[0]+2,randfrontier[1], 'S']);
                }
            break;
            case 3:
                if(randfrontier[1]-2>=0&&maze[randfrontier[0]][randfrontier[1]-2]==1)
                {
                    neighbors.push([randfrontier[0], randfrontier[1]-2, 'W']);
                }
            break;
        }
    }
    if(neighbors.length==0)
    return;
        var randnindex =  Math.floor(Math.random()*neighbors.length)
        var randneighbor = neighbors[randnindex];

        for(var i = 0; i<frontier.length; i++)
        {
            if(frontier[i][0]==randfrontier[0]&&frontier[i][1]==randfrontier[1])
                frontier.splice(i, 1);
        }



      
    switch(randneighbor[2])
    {
        case 'N':
            
            for(var i = randneighbor[0]; i<=randfrontier[0]; i++)
            {
                maze[i][randneighbor[1]]=1;
                ctx.clearRect(0+i*20, 0+randneighbor[1]*20, 20, 20);
                for(var j = 0; j<frontier.length; j++)
                {
            if(frontier[j][0]==i&&frontier[j][1]==randneighbor[1])
                frontier.splice(j, 1);
                }
                console.log('N');
            }
            break;
            
        case 'E':
            for(var i = randfrontier[1]; i<=randneighbor[1]; i++)
            {
                maze[randneighbor[0]][i]=1;
                ctx.clearRect(0+randneighbor[0]*20, 0+i*20, 20, 20);
                for(var j = 0; j<frontier.length; j++)
                {
                    if(frontier[j][0]==randneighbor[0]&&frontier[j][1]==i)
                        frontier.splice(j, 1);
                }
                console.log('E');
            }
            break;
        case 'S':
            for(var i = randfrontier[0]; i<=randneighbor[0]; i++)
            {
                maze[i][randneighbor[1]]=1;
                ctx.clearRect(0+i*20, 0+randneighbor[1]*20, 20, 20);
                for(var j = 0; j<frontier.length; j++)
                {
                    if(frontier[j][0]==i&&frontier[j][1]==randneighbor[1])
                        frontier.splice(j, 1);
                }
                console.log('S');
            }
            break;
        case 'W':
            for(var i = randneighbor[1]; i<=randfrontier[1]; i++)
            {
                maze[randneighbor[0]][i]=1;
                ctx.clearRect(0+randneighbor[0]*20, 0+i*20, 20, 20);
                for(var j = 0; j<frontier.length; j++)
                {
                    if(frontier[j][0]==randneighbor[0]&&frontier[j][1]==i)
                        frontier.splice(j, 1);
                }
                console.log('W');
            }
            break;
    }
    console.log(frontier);
   
    
    if(frontier.length==0)
        return;
        setTimeout(function() {
            makemaze(maze,visited, frontier, randfrontier[0], randfrontier[1]);
           }, .00001);
        


 
}