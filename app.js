function store (location, minCustomer, maxCustomer,avgCookieCust)
{
    this.location = location;
    this.minCustomer =  minCustomer;
    this.maxCustomer = maxCustomer;
    this.avgCookieCust = avgCookieCust;
    this.randCustHour = function(){return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1)) + this.minCustomer};
    this.totalCookies = []

}
var PikeMarketPlace = new store('PikeMarketPlace', 17, 88, 5.2)
var SeaTacAirport = new store('SeaTacAirport', 6, 44, 1.2)
var SouthCenterMall = new store('SouthCenterMall', 11, 38, 1.9)
var BellevueSquare = new store('BellevueSquare', 20, 48, 3.3)
var Alki = new store('Alki', 3, 24, 2.6)


function createTable(store, id){
    console.log("createTable");
    //creat table with  empty <tr>
    var hours = ["10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
    var awsomeList = document.createElement('tr');
    var table = document.getElementById('storeTable')
    table.appendChild(awsomeList);

     // input data into <tr>
    var locationName = document.createElement('td');
    locationName.appendChild(document.createTextNode(store.location));
    awsomeList.appendChild(locationName);

    //push hourlyCookies into array totalCookies
    for (var i = 0; i<hours.length; i++) {
     var hourlyCookies = Math.floor(store.randCustHour() * store.avgCookieCust);
     store.totalCookies.push(hourlyCookies);
     // variable goes into table as table data
     var item = document.createElement ('td');
     item.appendChild(document.createTextNode(hourlyCookies));
     awsomeList.appendChild(item);
    }// table data goes into location id in html

     var sum = 0
    for(var i=0;i<hours.length;i++){
        sum += store.totalCookies[i];
    }
    //sum up after the for loop
    var text = document.createElement('td');
    text.appendChild(document.createTextNode(sum));
    awsomeList.appendChild(text);
    //print out location id and shows td in it
}

createTable(PikeMarketPlace, 'PikeMarketPlace');
createTable(SeaTacAirport, 'SeaTacAirport');
createTable(SouthCenterMall, 'SouthCenterMall');
createTable(BellevueSquare, 'BellevueSquare');
createTable(Alki, 'Alki');

//form part
//declare function of input
var submitstore = function(e){
    e.preventDefault();
    //store values from the form into variables
    var location = document.getElementById('location');
    var minCustomer = document.getElementById('minCustomer');
    var maxCustomer = document.getElementById('maxCustomer');
    var avgCookieCust = document.getElementById('avgCookieCust');

    //validate input
    if(!location.value||!minCustomer.value||!maxCustomer.value||!avgCookieCust.value){
    return alert('All input fields are mandatory');
    } else if(isNaN (minCustomer.value)||isNaN(maxCustomer.value)||isNaN(avgCookieCust.value)){
        return alert('Numbers please');
    }else if(minCustomer.value>= maxCustomer.value){
        return alert('Min should smaller than Max');
    }

    //create a store object with the values from the form
    var newStore = new store(location.value, parseInt(minCustomer.value), parseInt(maxCustomer.value), parseFloat(avgCookieCust.value));

    //call createTable to populate data within the row above
    createTable(newStore,location);
}

var submit = document.getElementById("submit");
submit.addEventListener('click',submitstore);
