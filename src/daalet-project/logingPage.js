import React from "react";



export default function SingUp(props){
    const [user ,setUser] = React.useState({firstName :'' , lastName: '' , email:'' , password :'' , confirmPassword :''})
    let users = props.users

    function handelFormChange(e){
       
        setUser(old =>  {
           
        return {...old ,[ e.target.name ] : e.target.value}
         })
         if (e.target.value.length > 15 ){
           
            e.target.value = '';
               
               let message = document.createElement('div')
               message.innerText = ` the ${e.target.name} is too long`
               message.style.position = 'absolute';
               message.style.button = '-13px'; 
               message.style.left = '20%'
               message.style.width = 'contentSize'
               message.style.height = '20px'
               message.style.backgroundColor = 'inherit';
               message.style.borderColor =  ' rgba(20,163,187,0.99781162464986)'
               message.style.borderWidth = '1px'
               message.style.borderStyle = 'solid'
               message.style.borderRadius = '5px'
               message.style.color = ' rgba(20,163,187,0.99781162464986)'
               message.style.fontSize = 'small'
               message.style.transition = '1s'
               message.style.boxShadow = '-3px 6px 7px rgba(11, 11, 11, 0.264)'
               message.style.padding = '5px'

              
              e.target.parentElement.style.position = 'relative'
              e.target.parentElement.appendChild(message)
              setTimeout(()=>{
               e.target.parentElement.removeChild(message)
              } , 3000)
           
    }     


    }
    function handelSubmit(e){
        e.preventDefault()
        users = {...users , user}
        
         
    }

    function PassThefocus(e){
    
         
        

    }

   
    window.onload =  function focusOnFirst(){
        let  ele = document.querySelector('form')
        let first= ele.firstChild.firstElementChild
    
         first.focus()
    }

  
    return (
        <div className="formContainer">
            <form className="singUpForm">
                <label>
                    First Name :
                    <input type ='text'  name ='firstName' placeholder="enter your first name" onChange = {handelFormChange}  onblur={PassThefocus}  >

                    </input>
                 </label>
                 <label>
                    lastName : 
                    <input type="text" name ='lastName' placeholder="enter your last name " onChange = {handelFormChange}>
                    </input>
                 </label>

                 <label>
                    email :
                    <input type = 'email' placeholder="enter your Email" name = 'email' onChange = {handelFormChange} >
                    </input>
                 </label>
                
                 <label>
                    password :
                    <input type="password" placeholder="inter A strong password" name ='password' onChange = {handelFormChange}>
                    </input>
                 </label>
                 <label>
                    confirmPassword : 
                    <input type = 'password' placeholder="inter your password again " name = 'confirmPassword'  onChange = {handelFormChange}>
                    </input>
                </label>
                 <button type = 'submit' onSubmit={handelSubmit}>Submit</button>

            </form>
        </div>
    )
}

