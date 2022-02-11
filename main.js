
const boton = document.getElementById('boton')
let inputIngreso = document.getElementById('ingreso')
let fechaFin1 = document.getElementById('egreso')
let sueldo = document.getElementById('sueldo')

      

boton.addEventListener('click', function() {
    inputIngreso = new Date(inputIngreso.value);
    inputIngreso.setMinutes(inputIngreso.getMinutes() + inputIngreso.getTimezoneOffset())
    fechaFin1 = new Date(fechaFin1.value);
    fechaFin1.setMinutes(fechaFin1.getMinutes() + fechaFin1.getTimezoneOffset())
    
    function validarSueldo(){
        if(sueldo.value == ''){
            alert('Ingrese un monto valido')
            location.reload()
        }else{
            return sueldo = parseInt(sueldo.value)
        }
    }   

    sueldo = validarSueldo()
   
   
    class DatosUsuario{
            constructor(inputIngreso, fechaFin1, sueldo){
                this.inputIngreso = inputIngreso;
                this.fechaFin1 = fechaFin1;
                this.sueldo = sueldo;
            }  
        }
    let datosInicio = new DatosUsuario(inputIngreso, fechaFin1, sueldo)
    
    
    let añoActual = fechaFin1.getFullYear()
    let añoIngreso = inputIngreso.getFullYear()
    let añosAnt = añoActual - añoIngreso
    let cantDiasInd = fechaFin1.getTime()-inputIngreso.getTime()
    let diasInd = parseInt(cantDiasInd/(1000*60*60*24));


//LIQUIDACION FINAL POR DESPIDO

//PREAVISO 
    function preaviso(diasInd, sueldo){
        while(diasInd>90){
            if (diasInd >= 1825){
                return(sueldo * 2) 
            }else if(diasInd<1825){
                return sueldo
            }
        }
            return sueldo/2  
    }

//SAC SOBRE PREAVISO
    function sacPreaviso() {
        return Math.trunc(preaviso(diasInd, sueldo)*0.0833)
    }


//INDEMNIZACION
    function indemnizacion (diasInd, añosAnt, sueldo){
        while(diasInd>90){
            if(diasInd > 455){
                return añosAnt * sueldo
            }
            else if (diasInd < 455){
                return sueldo
            }
        }
            return 0
    }

//LIQUIDACION FINAL RENUNCIA

//DIAS DE VACACIONES
    function diasvacaciones(añosAnt){
        if( añosAnt >= 0 && añosAnt<5 ){
            return 14
        }else if (añosAnt>=5 && añosAnt<10){
            return 21
        }else if (añosAnt>=10 && añosAnt<20){
            return 28
        }else if (añosAnt>=20){
            return 35
        }
    }

    let fechaFin = fechaFin1.getTime()




    function ingreso(){
        if(añoIngreso<añoActual){
            return fechaInicio = new Date(añoActual,0,1).getTime();
        }
        else{
            return fechaInicio = inputIngreso.getTime()
        }
    }

    let cantDiasVac = fechaFin - ingreso();
    let dias = parseInt(cantDiasVac/(1000*60*60*24));
   
//VACACIONES
    function vac() {
        return (Math.trunc((sueldo/25)*(dias/365)*diasvacaciones(añosAnt)))
    }


//SAC SOBRE VACACIONES
    function sacVac() {
        return Math.trunc(vac()*0.0833)
    }

//SAC PROPORCIONAL
    function diasSac(dias){
        if(dias>360){
            return dias = 180
        }
        else if(dias > 0 && dias <= 184 ){
            return dias
        }else if (dias>184 && dias <= 360){
            return dias = (dias-180)
         }else{
            alert('Ingrese una fecha valida'); 
            location.reload();
            e.isImmediatePropagationStopped()    
        }
    }
    

    function sac() {
        return (Math.trunc((sueldo/2)*(diasSac(dias)/180)))
    }


    class FinalRenuncia{
        constructor(vac, sacVac, sac){
            this.vac = vac
            this.sacVac = sacVac
            this.sac = sac
        }  
        totalRenuncia(){
            return this.vac + this.sacVac + this.sac
        } 
    }

    const finalRenuncia1 = new FinalRenuncia(vac(), sacVac(), sac())



    class FinalDespido{
        constructor(preaviso, sacPreaviso, indemnizacion, vac, sacVac, sac ){
            this.preaviso = preaviso
            this.sacPreaviso = sacPreaviso
            this.indemnizacion = indemnizacion
            this.vac = vac
            this.sacVac = sacVac
            this.sac = sac
        }  
        totalDespido(){
            return this.preaviso + this.sacPreaviso + this.indemnizacion + this.vac + this.sacVac + this.sac
        }  
    }

    const finalDespido1 = new FinalDespido(preaviso(diasInd, sueldo), sacPreaviso(), indemnizacion(diasInd, añosAnt, sueldo), vac(), sacVac(), sac())


    const liquidaciones = [];
    liquidaciones.push(finalRenuncia1)
    liquidaciones.push(finalDespido1)



    let form = document.createElement("div")    
    form.innerHTML = `<div class= 'form1 datos'>
        <br><h3><u>Tus Datos</u></h3><br>
        <p> Fecha de Ingreso: ${datosInicio.inputIngreso.toLocaleDateString()}</p>
        <p> Fecha de Egreso: ${datosInicio.fechaFin1.toLocaleDateString()}</p>
        <p> Sueldo Bruto: $${datosInicio.sueldo}</p>
        </div>`;
        document.getElementById('nuevo').appendChild(form);

    const tipoRenuncia = document.getElementById('renuncia')
    const tipoDespido = document.getElementById('despido')
    document.getElementById('formulario').classList.add('ocultar')
        if(tipoRenuncia.checked){
            let div = document.createElement("div");    
            div.innerHTML = `<div class= 'form1'>
                      <br><h3><u>Liquidacion final por Renuncia</u></h3><br>
                      <p> Vacaciones no Gozadas: $${finalRenuncia1.vac}</p>
                      <p> Sac sobre Vacaciones: $${finalRenuncia1.sacVac}</p>
                      <p> Sac Proporcional: $${finalRenuncia1.sac}</p><br>
                      <p><u>Total:</u> $ ${finalRenuncia1.totalRenuncia()}</p>  
                      </div> <br>`;
            document.getElementById('nuevo').appendChild(div);
       }else if(tipoDespido.checked){
            let div1 = document.createElement("div");
            div1.innerHTML = `<div class='form1'>
                          <br><h3><u>Liquidacion final por Despido</u></h3><br>
                          <p> Preaviso: $${finalDespido1.preaviso}</p>
                          <p> Sac sobre Preaviso: $${finalDespido1.sacPreaviso}</p>
                          <p> Indemnizacion: $${finalDespido1.indemnizacion}</p>
                          <p> Vacaciones no Gozadas: $${finalDespido1.vac}</p>
                          <p> Sac sobre Vacaciones: $${finalDespido1.sacVac}</p>
                          <p> Sac Proporcional: $${finalDespido1.sac}</p><br>
                          <p><u>Total:</u>: $ ${finalDespido1.totalDespido()}</p>   
                          </div>`;
            document.getElementById('nuevo').appendChild(div1);
        }else{
            alert('Elija un tipo de liquidación')
            location.reload()
        }
        let volverCalcular = document.getElementById('volverCalcular')
        volverCalcular.innerHTML = `<button class='btn' id='boton4'>Volver a Calcular</button>`;
               
})
