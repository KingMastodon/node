var fs = require('fs');




fs.readFile('file1.txt', 'utf8', function(err, data1) {
	if(err) throw err;
	fs.readFile('file2.txt', 'utf8', function(err, data2) {
	
	
	
	
	
		//Первый документ--------начало
		if(err) throw err;
		var sum1=0;
		var sum2=0;
		var array1 = data1.toString().split(" ");
		var arraynum1 = array1.map(function (x) { 
			return parseInt(x, 10); 
		});		
		for(i in arraynum1) {		
			sum1 += arraynum1[i];
			console.log(arraynum1[i]);
			console.log(sum1);
		}
		//Первый документ--------конец
		
		//Второй документ--------начало
		var array2 = data2.toString().split(" ");
		var arraynum2 = array2.map(function (x) { 
			return parseInt(x, 10); 
		});		
		for(i in arraynum2) {		
			sum2 += arraynum2[i];
			console.log(arraynum2[i]);
			console.log(sum2);
		}		
		//Второй документ--------конец
		
		var sum=sum1+sum2;
		fs.writeFile('./output.txt',sum ,function(err) {	
			if(err) throw err;
		});	
	
		
	});
});

console.log('after calling readFile');
