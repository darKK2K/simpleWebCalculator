indexCount = 1;
var equation = "";
var displayBackup;
var eqBackup;

function signException(value,value1,display,toAdd)
{
    if(value===value1)
    {
        return display;
    }
    else
    {
        display+=toAdd;
        return display;
    }
}

function placeOnce(value,toPlace)
{
    var n = value.length;

    if(toPlace === '**')
    {
        if(value[n-1]==='*')
        {
            return "";
        }
    }

    if(toPlace==='/' || toPlace==='*')
    {
        if(value[n-1]==='/' && toPlace==='*')
        {
            return "";
        }
        else if(value[n-1]==='*' && toPlace==='/')
        {
            return "";
        }
    }


    if(value[n-1]===toPlace)
    {
        return "";
    }
    else
    {
        return toPlace;
    }
}


function rightBracketDisplayVerify(eq,eqBack,display)
{
    if(eq===eqBack)
    {
        return display;
    }
    else
    {
        return rightBracketEmptyCheck(eq,display);
    }
}

function mathFuncCheck(value,trigFunc)
{
    var n = value.length;

    if((value[n-1]>='0' && value[n-1]<='9') || value[n-1]==')')
    {
        value+='*';
    }
    else if(value[n-1]=='*' && value[n-2]=='*')
    {
        value+='1';
        value+='*';
    }

    value+=trigFunc;
    return value;
}

function eqSolveCheck(value, displayBackup1, eqBackup1)
{
    if(value==displayBackup1)
    {
        return eqBackup1;
    }

    return value;
}

function swapSign(value)
{
    var n = value.length;

    if(value[0] == '(')
    {
        indexCount++;
        if(indexCount==n)
        {
            indexCount = 1;
            return "";
        }
        else
        {
            return value[indexCount]+swapSign(value);
        }
    }
    else
    {
        return "(-"+value;
    }
}

function checkBracketForNum(value,num)
{   
    var n = value.length;

    if(value[n-1]==')')
    {
        value+='*';
    }
    value+=num;
    return value;
}

function checkforRightBracket(value)
{
    var n = value.length;
    var leftBracketCount = 0;
    var rightBracketCount = 0;

    for(i = 0 ; i < n ; i++)
    {
        if(value[i]==')')
        {
            rightBracketCount++;
        }
        else if(value[i]=='(')
        {
            leftBracketCount++;
        }
    }

    if(value[n-1]=='(')
    {
        if(value[n-3]>=0 && value[n-3]<=9)
        {
            value+='1';
        }
        else if(value[n-2]=='n' || value[n-2]=='s' || value[n-4]=='e')
        {
            alert("Enter a value first before closing brackets!");
            return value;
        }
        else
        {
            value+='1';
        }
    }

    if(rightBracketCount<leftBracketCount && leftBracketCount!=0)
    {
        value+=')';
        return value;
    }

    return value;
}

function rightBracketEmptyCheck(value,display)
{
    var n = value.length;

    if(value[n-1]===')' && value[n-2]==='1' && value[n-3]=='(')
    {
        display+='1)';
        return display;
    }
    else
    {
        display+=')';
        return display;
    }
}

function checkforLeftBracket(value)
{
    var n = value.length;
    // value[n-1]=='(' might have to add later/
    if((value[n-1]>='0' && value[n-1]<='9') || (value[n-1]==')'))
    {
        value+='*';
        value+='(';
    }
    else
    {
        value+='(';
    }

    return value;
}

function removeLastFromEQ(value)
{
    var n = value.length;
    var x = 2;
    var d = calc.display.value;
    var dL = calc.display.value.length;

    var temp = value;

    if(d[dL-1]=='π')
    {
        n-=3;
        d = "temp";
    }
    else if(temp[n-1]=='*' && temp[n-2]=='*')
    {
        n-=1;
        temp = "temp";
    }
    else if((temp[n-1]=='(' || temp[n-1]==')') && (temp[n-2]=='n' || temp[n-2]=='s' || temp[n-2]=='p'))
    {
        n-=8;
        temp = "temp";
    }
    else if(temp[n-1]=='(' && temp[n-2]=='t')
    {
        n-=9;
        temp = "temp";
    }
    else if(temp[n-1]=='(' && temp[n-2]=='*')
    {
        n-=1;
        temp = "temp";
    }
    else if(temp[n-1]=='(' && temp[n-4]=='g')
    {
        n-=10;
        temp = "temp";
    }

    if(value != "")
    {
        if(indexCount==n)
        {
            indexCount = 1;
            return "";
        }
        else
        {
            indexCount++;
            return value[indexCount-x] + removeLastFromEQ(value);
        }
    }
    else
    {
        return "";
    }
}

function solve(value,unsolvedDisplay)
{
    var n = value.length;

    var temp = value;

    var rightBracketCount = 0;
    var leftBracketCount = 0;

    if(value=="")
    {
        return '0';
    }
    else
    {
        for(i = n-1 ; i > -1 ; i--)
        {
            if(value[i]==')')
            {
                rightBracketCount++;
            }
            else if(value[i]=='(')
            {
                leftBracketCount++;
            }
        }
        
        while(leftBracketCount>rightBracketCount)
        {
            value = checkforRightBracket(value);
            if(temp==value)
            {
                // equation = value;
                return unsolvedDisplay;
            }
            rightBracketCount++;
        }
    }

    // equation = value;
    
    return eval(value);
}

function removeLastFromDisplay(value)
{
    var n = value.length;
    var x = 2;

    var temp = value;

    if(temp[n-1]=='*' && temp[n-2]=='*')
    {
        n-=1;
        temp = "temp";
    }
    else if((temp[n-1]=='(' || temp[n-1]==')') && (temp[n-2]=='n' || temp[n-2]=='s'))
    {
        n-=3;
        temp = "temp";
    }
    else if(temp[n-1]=='(' && temp[n-2]=='^' && temp[n-3]=='e')
    {
        n-=2;
        temp = "temp";
    }
    else if(temp[n-1]=='(' && temp[n-2]=='g')
    {
        n-=3;
        temp = "temp";
    }

    if(value != "")
    {
        if(indexCount==n)
        {
            indexCount = 1;
            return "";
        }
        else
        {
            indexCount++;
            return value[indexCount-x] + removeLastFromDisplay(value);
        }
    }
    else
    {
        return "";
    }
}