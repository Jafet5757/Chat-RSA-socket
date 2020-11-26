//instanciamos nuestras variables
let p = 0;
let q = 0;
let n = 0;
let fi = 0;
let e = 0;
let d = 0;

function generateKeys(){
    //generamos dos numeros p y q aleatorios primos
    do{
		p = bigInt.randBetween(1, 100);
	}while(!p.isPrime());
	do{
		q = bigInt.randBetween(1, 100);
	}while(!q.isPrime());

	//generamos n=p*q
	n = p.multiply(q);
	 //calculamos fi(n) = (p-1)(q-1)
	fi = (p.subtract(1)).multiply(q.subtract(1));
	 //calculamos el coprimo 1<e<fi
	e = 0;
	do{
		 e = bigInt.randBetween(1, fi);
		 if(e.isOdd() && bigInt.gcd(e,fi)==1){
		 	console.log(true);
		 	break;
		 }
	}while(true);

	//hasta aquí tenemos nuestra llave publica, compuesta por n y e
	//vamos a generar la llave privada
	d = e.modInv(fi);
}

function cipher(m, ee, nn){
    let c = (bigInt(m).pow(ee)).mod(nn);
    return c;
}

function decript(c){
    let m = (bigInt(c).pow(d)).mod(n);
    return m;
}

//esta es la funcion para encriptar, necesitamos que nos de su llave publica
function doFinalC(message, ee, nn){
    let mCifrado = "";
    for(var i = 0; i<message.length; i++){
        mCifrado += String.fromCharCode(cipher(message.charCodeAt(i), ee, nn));
    }
    return mCifrado;
}

//esta es la funcion para desencriptar, no necesitamos mas que el mensaje
function doFinalD(message){
    let mDecifrado = "";
    for(var i = 0; i<message.length; i++){
        mDecifrado += String.fromCharCode(decript(message.charCodeAt(i)));
    }
    return mDecifrado;
}