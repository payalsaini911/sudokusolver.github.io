
var arr=[[],[],[],[],[],[],[],[],[]];
var tmp=[[],[],[],[],[],[],[],[],[]];
let button=document.getElementById('generate-sudoku');
let solve=document.getElementById('solve');
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}
function InitializeTemp(tmp)
{
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
        {
            tmp[i][j]=false;
        }
    }
}
function ResetColor()
{
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
        {
            arr[i][j].style.color="green";
        }
    }
}
var board=[[],[],[],[],[],[],[],[],[]];

function SetTmp(board,tmp)
{
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
        {
            if(board[i][j]!=0)
                tmp[i][j]=true;
        }
    }
}
function Setcolor()
{
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
        {
            if(tmp[i][j]==true)
            {
                arr[i][j].style.color="#DC3545";
            }
        }
    }
}
console.log(arr);
function ChangeBoard(board)
{
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
        {
            if(board[i][j]!=0)
            {
                arr[i][j].innerText=board[i][j];
            }
            else
                arr[i][j].innerText='';
        }
    }
}
button.onclick=function(){
    //const responce=await fetch('https://sugoku.herokuapp.com/board?difficulty=easy');
    //responce.onload=function(){
        //const data=JSON.parse(this.responce)
   // }
    var req=new XMLHttpRequest()
    req.onload=function(){
        var res=JSON.parse(req.response);
        InitializeTemp(tmp);
        ResetColor()
        board=res.board;
        SetTmp(board,tmp);
        Setcolor(tmp);
        ChangeBoard(board);
    }
    req.open('get','https://sugoku.herokuapp.com/board?difficulty=easy');
    req.send();
}
function isValid(board,r,c,val)
{
    for(var i=0;i<9;i++)
    {
        if(board[i][c]==val)
            return false;
        if(board[r][i]==val)
            return false;
    }
    var row=r-r%3;
    var col=c-c%3;
    for(var i=row;i<row+3;i++)
    {
        for(var j=col;j<col+3;j++)
        {
            if(board[i][j]==val)return false;
        }
    }
    return true;
}
function solveSudoku(board)
{
    for(var i=0;i<9;i++)
    {
        for(var j=0;j<9;j++)
        {
            if(board[i][j]==0){
                for(var c=1;c<=9;c++)
                {
                    if(isValid(board,i,j,c))
                    {
                        board[i][j]=c;
                        if(solveSudoku(board))
                        {
                            ChangeBoard(board);
                            return true;
                        }
                        else
                        board[i][j]=0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

solve.onclick=function()
{
    solveSudoku(board);
}

