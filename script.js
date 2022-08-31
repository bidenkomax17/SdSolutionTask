window.onload=function ()
{
    //let text="Max=Name, Macbook=Laptop, Table=Wood, John=Artist, Dad=Parent";
    let statusName=false;//<----Создаем статусную переменную, которая изначально false, считаем что пользователь неправильно ввел данные
    const userList=new Map();
    showItem();
    document.getElementById("button1").onclick=function ()
    {
        addItem();
    }
    document.getElementById("name").onblur=function ()
    {
        statusName=checkName(statusName);//<----Вызываем функцию, которой передаём статусную переменную, в случае правильного срабатывания функция вернет в эту переменную значение true
    }
    document.getElementById("sortbyname").onclick=function ()
    {
        sortName();
    }
    document.getElementById("delete").onclick=function ()
    {
        userList.clear();
        showItem();
    }
    document.getElementById("sortbyvalue").onclick=function ()
    {
        sortValue();
    }
    /*function sendForm(statusName)
    {
        if(statusName)
        {
            document.getElementById("f1").submit();
        }
        else
        {
            alert("отправка формы невозможна");
        }
    }
     */
    function checkName(statusName)
    {
        let regExp=/^\w+=\S\w+$/i;//<----Делаем регулярное выражение под нужное поле $ничего не должно быть после, example (Max=Name)/(Two=Number).
        let name=document.getElementById("name").value;
        if(name.match(regExp)!=null)//<----Сравнивает, правильно ли работает регулярое выражение
        {
            statusName=true;
            document.getElementById("sname").innerText="";//<----Sname..... это id тега span, через который мы будем показывать ошибку пользователь.В данном случае делаем очистку
        }
        else
        {
            statusName=false;
            document.getElementById("sname").innerText="Incorrect data";
        }
        return statusName;//<----Возвращает значение переменной true или false в зависимости от того насколько правильные данные ввел пользователь
    }
    function addItem()
    {
        let input=document.getElementById("name").value;
        //console.log(input);
        let index=input.indexOf("=");
        //console.log(index);
        let k=input.substring(0,index);//от первого символа до =
        //console.log(k);
        let v=input.substring(index+1);//от = до последнего символа
        //console.log(v);
        userList.set(k,v);
        //console.log(userList);
        showItem();
        document.getElementById("name").value="";//делаем очистку поля ввода пользователя
    }
    function showItem()
    {
        let result="";
        for(let item of userList)
        {
            result+=item[0]+"="+item[1]+"\r\n";
        }
        document.getElementById("area").innerHTML=result;
    }
    function sortName()
    {
        /*userList[Symbol.iterator]=function* ()
        {
            yield* [...this.entries()].sort((a,b) => a[1] - b[1]);
        }

         */
        /*userList.sort = function (a,b)
        {
            return a[1]>b[1]? 1:a[1]<b[1]?-1:0;
        }
        console.log([...userList]);
        showItem();

         */
        //alert("ff");
        let names=[];
        //alert("1");
        for(let item of userList)
        {
            names.push(item[0])
        }
        console.log(names);
        names.sort();
        console.log(names);
        let result="";
        for(let i=0; i<names.length; i++)
        {
            result+=names[i]+"="+userList.get(names[i])+"\r\n";
        }
        document.getElementById("area").innerHTML=result;
    }
    function sortValue()
    {
        let value=[];
        for (let item of userList)
        {
            value.push(item[1])
        }
        console.log(value);
        value.sort();
        console.log(value);
        let result="";
        for (let i=0; i<value.length; i++)
        {
            result+=getKey(userList,value[i])+"="+value[i]+"\r\n";
        }
        document.getElementById("area").innerHTML=result;
    }
    function getKey(map, value)
    {
        return [...map.keys()].find((key)=>map.get(key)===value);
    }
}