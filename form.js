var Data;
async function getData(){
  let response=await fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
  });
  Data=await response.json();
  //alert(Data);
}

(async () => {
  await getData();
  let country=document.getElementById("country");
  for(let i in Data)
  {
  	let option=document.createElement("option");
  	option.text=Data[i].name;
  	country.add(option);
  }
})();

function selectCountry(){
	let country=document.getElementById('country');
	let state=document.getElementById("state");
	state.innerHTML="";
	let option=document.createElement("option");
	option.text="Select State";
	option.value="state";
	state.add(option);
    for(let i in Data)
    {
    	if(Data[i].name==country.value)
    	{
    		var states=Data[i].states;
    		for(let j in states)
    		{
    			let option=document.createElement("option");
		  		option.text=states[j].name;
		  		state.add(option);
		  	}
    		break;
    	}
    }
}
function ValidateEmail(input) {
  var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (input.match(validRegex))
    return true;
  else
    return false;
}


function ValidateMobile(input){
	if(input.length!=10)
		return false;
	for(let i in input)
	{
		if(input[i]<'0'||input[i]>'9')
			return false;
	}
	return true;
}

function Validate(){
	var Result={};
	var name=document.getElementById('name').value,
	email=document.getElementById('email').value,
	contact_no=document.getElementById('contactNo').value,
	country=document.getElementById('country').value,
	state=document.getElementById('state').value;
	
	if(name.length<4||name.length>10)
	{
		let err={};
		err["error"]='Length should be between 4-10 characters.';
		Result['Name']=err;
	}

	if(!ValidateEmail(email))
	{
		let err={};
		err["error"]='Enterd email is not valid.';
		Result['Email']=err;
	}

	if(!ValidateMobile(contact_no))
	{
		let err={};
		err["error"]='Enterd contact no is not valid.';
		Result['Contact No']=err;
	}

	if(country=='country')
	{
		let err={};
		err["error"]='Country is not selected.';
		Result['Country']=err;
	}

	if(state=='state')
	{
		let err={};
		err["error"]='State is not selected.';
		Result['State']=err;
	}

	let parentWindow=window.parent;
	parentWindow.postMessage(Result, "*");
}