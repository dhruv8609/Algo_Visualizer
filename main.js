var new_array = document.querySelector('.gr-btn').querySelector('button');
var bubble_sort = document.querySelector('.sort-btn').querySelector('#bubble');
var selection_sort = document.querySelector('.sort-btn').querySelector('#selection');
var insertion_sort = document.querySelector('.sort-btn').querySelector('#insertion');
var arr_size=document.querySelector(".arr_sz"); 
var speed = document.querySelector(".speed_sz");

console.log(speed.value);

var bar_array = [];

//this function initialises whole set of array by removing all previous child
function initialise_array(num){

	var visual_div = document.querySelector('.visual');
	while(visual_div.hasChildNodes())
	{
		visual_div.removeChild(visual_div.firstChild);
	}

	for(i = 0; i<num+1; i++)
	{
		bar_array.push(Math.floor(Math.random()*301));
	}

	for(i = 0; i<num; i++){
		var bars = document.createElement('div');
		visual_div.appendChild(bars);
	}
	var listing = document.querySelector('.visual').querySelectorAll('div');
	for(i = 0; i<num; i++){
		listing[i].classList.add("add-style");
		listing[i].style.height = (bar_array[i]) + "px";
	}
}

//this function only changes the array without change in size of array
function create_array(num){
	while(bar_array.length > 0)
	{
		bar_array.pop();
	}
	for(i = 0; i<num+1; i++){
	bar_array.push(Math.floor(Math.random()*301));
	}
	var listing = document.querySelector('.visual').querySelectorAll('div');
	for(i = 0; i<num; i++){
		// listing[i].classList.add("add-style");
		listing[i].style.height = (bar_array[i]) + "px";
		listing[i].style.background = 'white';
	}
}

new_array.addEventListener('click' , ()=>{create_array(arr_size.value);}); 

//delay function to provide delay to the animation

function delayit(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}


//============================================BUBBLE SORT==================================================================
async function bubblesort(delaytime){
	var swaps = 0;
	var listing = document.querySelector('.visual').querySelectorAll('div');
	var position_sorted = listing.length-1;
	while(position_sorted>=0)
	{
		swaps = 0;
		for(i = 0; i<listing.length-1; i++)
		{
			var colour1 = window.getComputedStyle(listing[i]).getPropertyValue("background");
			var colour2 = window.getComputedStyle(listing[i+1]).getPropertyValue("background");
			listing[i].style.background = 'yellow';
			listing[i+1].style.background = 'yellow';
			const val1 = window.getComputedStyle(listing[i]).getPropertyValue("height");
			const val2 = window.getComputedStyle(listing[i+1]).getPropertyValue("height");
			await delayit(delaytime);
			if(parseInt(val1) > parseInt(val2))
			{
				swaps++;
				//implementing swap function 
				listing[i].style.height = val2;
				listing[i+1].style.height = val1;
			}
			listing[i].style.background = colour1;
			listing[i+1].style.background = colour2;
		}
		listing[position_sorted].style.background = 'green';
		await delayit(delaytime);
		position_sorted -= 1;
		if(swaps == 0)
		{break;}
	}
} 
//=====================================SELECTION SORT==============================================
async function selectionsort(delaytime){
	var listing = document.querySelector('.visual').querySelectorAll('div');
	for(i = 0; i<listing.length; i++)
	{
		listing[i].style.background = 'yellow';
		await delayit(delaytime/2);
		var min_value = 1000;
		var min_index = i;
		for(j = i+1; j<listing.length; j++)
		{
			const val1 = window.getComputedStyle(listing[j]).getPropertyValue("height");
			if(parseInt(val1) < min_value)
			{
				min_value = parseInt(val1);
				min_index = j;
			}
		}
		listing[min_index].style.background = 'yellow';
		await delayit(delaytime);
		const val2 = window.getComputedStyle(listing[i]).getPropertyValue("height");
		if(parseInt(val2) > min_value)
		{
			listing[i].style.height = min_value+'px';
			listing[min_index].style.height = val2;
		}
		listing[i].style.background = 'green';
		listing[min_index].style.background = 'white';
		await delayit(delaytime/4);
	}
}

//=========================================INSERTION SORT======================================================

async function insertionsort(delaytime){
	var listing = document.querySelector('.visual').querySelectorAll('div');
	for(i = 1; i<listing.length; i++)
	{
		listing[i].style.background = 'gray';
		await delayit(delaytime);
		const val1 = window.getComputedStyle(listing[i]).getPropertyValue("height");
		var key = parseInt(val1);
		var j = i-1;
		while(j >= 0 && parseInt(window.getComputedStyle(listing[j]).getPropertyValue("height")) > key)
		{
			listing[j+1].style.background = 'yellow';
			listing[j].style.background = 'yellow';
			await delayit(delaytime/2);
			listing[j+1].style.height = listing[j].style.height;
			listing[j+1].style.background = 'white';
			listing[j].style.background = 'white';
			j-=1;
		}
		listing[j+1].style.height = key+'px';

	}
}



initialise_array(arr_size.value);
bubble_sort.addEventListener('click' ,()=>{bubblesort((speed.value)*10);});
selection_sort.addEventListener('click' ,()=>{selectionsort((speed.value)*10);});
insertion_sort.addEventListener('click' ,()=>{insertionsort((speed.value)*10);});
arr_size.addEventListener('input' , ()=>{initialise_array(arr_size.value);});